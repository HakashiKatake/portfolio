// CameraController is integrated directly into the RoomScene component
// using React Three Fiber's useFrame hook for camera position updates.
// This file is kept as a reference for the camera control logic.

export interface CameraState {
  position: { x: number; y: number; z: number };
  yaw: number;
  pitch: number;
}

export function clampPitch(pitch: number): number {
  return Math.max(-0.5, Math.min(0.5, pitch));
}

export function clampPosition(x: number, y: number, z: number) {
  return {
    x: Math.max(-4, Math.min(4, x)),
    y: Math.max(1, Math.min(3, y)),
    z: Math.max(-4, Math.min(4, z)),
  };
}
