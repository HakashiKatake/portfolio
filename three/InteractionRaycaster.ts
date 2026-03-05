// InteractionRaycaster is integrated into RoomScene via distance-based proximity checks.
// This file provides utility types for the interaction system.

export interface InteractableObject {
  id: string;
  position: { x: number; y: number; z: number };
  radius: number;
  prompt: string;
  onInteract: () => void;
}

export function isWithinRange(
  playerPos: { x: number; y: number; z: number },
  objectPos: { x: number; y: number; z: number },
  radius: number
): boolean {
  const dx = playerPos.x - objectPos.x;
  const dy = playerPos.y - objectPos.y;
  const dz = playerPos.z - objectPos.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz) < radius;
}
