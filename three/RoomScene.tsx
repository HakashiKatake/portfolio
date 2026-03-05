"use client";

import {
  Suspense,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Animated neon grid projection on walls/ceiling (pure shader)       */
/* ------------------------------------------------------------------ */
const projectionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const projectionFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  float grid(vec2 uv, float spacing) {
    vec2 g = abs(fract(uv * spacing) - 0.5);
    float line = min(g.x, g.y);
    return 1.0 - smoothstep(0.0, 0.06, line);
  }

  void main() {
    vec2 uv = vUv;

    // Scrolling UV
    vec2 scrollUv = uv + vec2(uTime * 0.05, uTime * 0.08);

    // Multi-layer grid
    float g1 = grid(scrollUv, 8.0) * 0.6;
    float g2 = grid(scrollUv * 1.5 + vec2(uTime * 0.03), 12.0) * 0.3;

    // Pulsing glow
    float pulse = 0.5 + 0.5 * sin(uTime * 1.5 + uv.y * 3.0);

    // Scanline effect
    float scanline = 0.9 + 0.1 * sin(uv.y * 80.0 + uTime * 2.0);

    float intensity = (g1 + g2) * pulse * scanline;

    // Fade edges
    float edgeFade = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x)
                   * smoothstep(0.0, 0.15, uv.y) * smoothstep(1.0, 0.85, uv.y);

    gl_FragColor = vec4(uColor * intensity * edgeFade, intensity * uOpacity * edgeFade);
  }
`;

function NeonProjection({
  position,
  rotation,
  scale,
  color = [0.66, 0.33, 0.97],
  opacity = 0.4,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number];
  color?: [number, number, number];
  opacity?: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={scale} />
      <shaderMaterial
        ref={matRef}
        vertexShader={projectionVertexShader}
        fragmentShader={projectionFragmentShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(...color) },
          uOpacity: { value: opacity },
        }}
      />
    </mesh>
  );
}

interface GamingRoomProps {
  onBootPC: () => void;
  onOpenSimple: () => void;
  isBooted: boolean;
  screenContent: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Seated camera – no walking, just look around; project on screen   */
/* ------------------------------------------------------------------ */
function GamingRoom({
  onBootPC,
  onOpenSimple,
  isBooted,
  screenContent,
}: GamingRoomProps) {
  const { scene } = useGLTF("/assets/gaming_room.glb");
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  /* ---- find monitor screen mesh & compute positions ---- */
  const screenCenter = useRef(new THREE.Vector3()).current;
  const screenNormal = useRef(new THREE.Vector3(0, 0, 1)).current;
  const screenSize = useRef({ w: 0.5, h: 0.4 }).current;
  const positionsReady = useRef(false);

  useEffect(() => {
    const screenMesh = scene.getObjectByName("Cube002") as THREE.Mesh | undefined;
    if (screenMesh) {
      // Get world‑space bounding box of the screen
      screenMesh.updateWorldMatrix(true, false);
      const box = new THREE.Box3().setFromObject(screenMesh);
      box.getCenter(screenCenter);
      screenSize.w = box.max.x - box.min.x;
      screenSize.h = box.max.y - box.min.y;

      // Normal = direction screen faces (use +Z of screen mesh)
      screenNormal.set(0, 0, 1).applyQuaternion(screenMesh.getWorldQuaternion(new THREE.Quaternion()));

      console.log("[RoomScene] Screen center:", screenCenter, "size:", screenSize, "normal:", screenNormal);
      positionsReady.current = true;
    } else {
      console.warn("[RoomScene] Cube002 not found, using fallback positions");
      screenCenter.set(-0.05, 0.82, -0.45);
      positionsReady.current = true;
    }
  }, [scene, screenCenter, screenNormal, screenSize]);

  /* ---- key positions (derived from screen when ready) ---- */
  const SEAT_POS = useRef(new THREE.Vector3(0.85, 1.0, 0.15)).current;
  const glowRef = useRef<THREE.Mesh>(null);
  const glowLightRef1 = useRef<THREE.PointLight>(null);
  const glowLightRef2 = useRef<THREE.PointLight>(null);

  /* ---- refs ---- */
  const yawRef = useRef(1.0);
  const pitchRef = useRef(0.15);
  const isPointerLocked = useRef(false);

  const [interactPrompt, setInteractPrompt] = useState("");

  /* ---- mouse look (pointer‑lock) ---- */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isPointerLocked.current) return;
    yawRef.current -= e.movementX * 0.002;
    pitchRef.current -= e.movementY * 0.002;
    yawRef.current = Math.max(-1.5, Math.min(3.5, yawRef.current));
    pitchRef.current = Math.max(-0.8, Math.min(0.8, pitchRef.current));
  }, []);

  const handlePointerLockChange = useCallback(() => {
    isPointerLocked.current = document.pointerLockElement !== null;
  }, []);

  /* ---- keyboard ---- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // When game is running (booted), only handle Tab; let Phaser handle the rest
      if (isBooted) {
        if (e.key === "Tab") {
          e.preventDefault();
          onOpenSimple();
        }
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        onOpenSimple();
        return;
      }
      if (e.key === " " || e.key === "e" || e.key === "E") {
        e.preventDefault();
        onBootPC();
      }
    },
    [onOpenSimple, isBooted, onBootPC]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [handleKeyDown, handleMouseMove, handlePointerLockChange]);

  /* ---- per frame ---- */
  useFrame(() => {
    if (!positionsReady.current) return;

    // Position glow plane on the screen
    if (glowRef.current) {
      glowRef.current.position.copy(screenCenter).add(screenNormal.clone().multiplyScalar(0.02));
      glowRef.current.lookAt(screenCenter.clone().add(screenNormal));
      glowRef.current.scale.set(screenSize.w * 0.9, screenSize.h * 0.9, 1);
    }
    if (glowLightRef1.current) {
      glowLightRef1.current.position.copy(screenCenter).add(screenNormal.clone().multiplyScalar(0.25));
    }
    if (glowLightRef2.current) {
      glowLightRef2.current.position.copy(screenCenter).add(screenNormal.clone().multiplyScalar(0.05));
    }

    /* camera stays at seat, just rotates */
    camera.position.lerp(SEAT_POS, 0.1);
    const lookDir = new THREE.Vector3(
      -Math.sin(yawRef.current),
      pitchRef.current,
      -Math.cos(yawRef.current)
    ).normalize();
    const lookTarget = camera.position.clone().add(lookDir.multiplyScalar(3));
    camera.lookAt(lookTarget);

    /* interact prompt */
    if (!isBooted) {
      setInteractPrompt("Press SPACE or E to boot the PC");
    } else {
      setInteractPrompt("");
    }
  });

  /* ---- model material ---- */
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
        }
      }
    });
  }, [scene]);

  /* ---- pixel sizes for Html to fill screen ---- */
  const pxW = screenSize.w * 420;
  const pxH = screenSize.h * 420;

  return (
    <>
      <primitive ref={groupRef} object={scene} scale={1} position={[0, 0, 0]} />

      {/* CRT monitor glow — positioned dynamically on Cube002 */}
      <mesh ref={glowRef}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={isBooted ? "#60ff90" : "#80ffdd"}
          transparent
          opacity={isBooted ? 0.25 : 0.15}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight ref={glowLightRef1} intensity={isBooted ? 2.5 : 1.5} color="#80ffe0" distance={2} decay={2} />
      <pointLight ref={glowLightRef2} intensity={isBooted ? 1.2 : 0.8} color="#a0ffd0" distance={1.2} decay={2} />

      {/* ---- Project content onto Cube002 screen via Html ---- */}
      {isBooted && positionsReady.current && screenContent && (
          <Html
            position={[screenCenter.x - 0.7, screenCenter.y + 0.04, screenCenter.z - 0.15]}
            rotation={[0, Math.atan2(SEAT_POS.x - screenCenter.x, SEAT_POS.z - screenCenter.z), 0]}
            transform
            distanceFactor={0.55}
            style={{
              width: `${Math.max(pxW, 320)}px`,
              height: `${Math.max(pxH, 280)}px`,
              overflow: "hidden",
              borderRadius: "4px",
            }}
          >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#000",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* CRT scanlines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
                pointerEvents: "none",
                opacity: 0.12,
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.06) 2px, rgba(0,255,0,0.06) 4px)",
              }}
            />
            {/* CRT curvature shadow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 11,
                pointerEvents: "none",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
                borderRadius: "4px",
              }}
            />
            {screenContent}
          </div>
        </Html>
      )}

      {/* Animated neon grid projections on walls & ceiling */}
      <NeonProjection
        position={[0, 2.5, -2.5]}
        rotation={[0, 0, 0]}
        scale={[6, 3]}
        color={[0.66, 0.33, 0.97]}
        opacity={0.4}
      />
      <NeonProjection
        position={[-3, 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[5, 3]}
        color={[0.53, 0.36, 0.96]}
        opacity={0.3}
      />
      <NeonProjection
        position={[3, 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[5, 3]}
        color={[0.37, 0.65, 0.98]}
        opacity={0.3}
      />
      <NeonProjection
        position={[0, 4, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[6, 5]}
        color={[0.5, 0.2, 0.9]}
        opacity={0.25}
      />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 1.5, -2]} intensity={1} color="#a855f7" />
      <pointLight position={[-2, 1.5, 0]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0.5, 1.2, -1.5]} intensity={0.8} color="#60a5fa" />

      {interactPrompt && !isBooted && (
        <Html center position={[screenCenter.x, screenCenter.y + 0.35, screenCenter.z + 0.1]}>
          <div className="bg-black/80 border-2 border-purple-500 rounded px-4 py-2 text-purple-300 text-sm whitespace-nowrap pointer-events-none animate-pulse">
            {interactPrompt}
          </div>
        </Html>
      )}
    </>
  );
}

/* ================================================================== */
/*  Exported wrapper                                                  */
/* ================================================================== */
interface RoomSceneWrapperProps {
  onBootPC: () => void;
  onExitPC: () => void;
  onOpenSimple: () => void;
  isBooted: boolean;
  screenContent: ReactNode;
}

export default function RoomScene({
  onBootPC,
  onExitPC,
  onOpenSimple,
  isBooted,
  screenContent,
}: RoomSceneWrapperProps) {
  const [showInstructions, setShowInstructions] = useState(true);

  const handleClick = () => {
    document.body.requestPointerLock();
    setShowInstructions(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBooted) {
        onExitPC();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isBooted, onExitPC]);

  return (
    <div className="relative w-full h-screen bg-black" onClick={handleClick}>
      <Canvas
        camera={{ position: [0.85, 1.0, 0.15], fov: 60, near: 0.1, far: 100 }}
        shadows
        gl={{ alpha: false }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("#0a0a1a");
        }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-purple-400 text-lg animate-pulse whitespace-nowrap">
                Loading Gaming Room...
              </div>
            </Html>
          }
        >
          <GamingRoom
            onBootPC={onBootPC}
            onOpenSimple={onOpenSimple}
            isBooted={isBooted}
            screenContent={screenContent}
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Instructions */}
      {showInstructions && !isBooted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
          <div className="bg-[#1a1a2e] border-4 border-purple-600 rounded-lg p-8 max-w-md text-center">
            <h2 className="text-2xl text-purple-300 font-bold mb-4">🎮 Gaming Room</h2>
            <p className="text-purple-400 text-sm mb-4">Click to start looking around</p>
            <div className="text-left text-purple-500 text-xs space-y-1">
              <p>🖱️ Mouse → Look around the room</p>
              <p>⏎ SPACE / E → Boot the PC</p>
              <p>⎋ ESC → Exit PC / Release cursor</p>
              <p>⇥ TAB → Simple portfolio</p>
            </div>
            <p className="text-purple-300 text-sm mt-4 animate-pulse">Click anywhere to begin</p>
          </div>
        </div>
      )}

      {!isBooted && !showInstructions && (
        <div className="absolute bottom-4 left-4 text-purple-600 text-xs z-10">
          Mouse: Look around | SPACE/E: Boot PC | TAB: Simple Mode
        </div>
      )}
    </div>
  );
}

useGLTF.preload("/assets/gaming_room.glb");
