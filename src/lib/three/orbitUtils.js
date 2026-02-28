/**
 * Circular orbit positioning for 3D character multiverse.
 * angle = (index / total) * Math.PI * 2
 * x = radius * Math.cos(angle), z = radius * Math.sin(angle)
 */

export const ORBIT_CONFIG = {
  /** Base radius (desktop) */
  radius: 5.5,
  /** Mobile radius */
  radiusMobile: 4,
  /** Auto-rotation speed (rad/s) */
  autoRotateSpeed: 0.12,
  /** Minimum scale (back) */
  scaleMin: 0.5,
  /** Maximum scale (front) */
  scaleMax: 1.25,
  /** Plane size (height) */
  planeHeight: 2.2,
  /** Camera distance when not zoomed */
  cameraDistance: 10,
  /** Camera distance when character selected (zoom) */
  cameraDistanceZoom: 6,
  /** Inertia decay factor (0–1, higher = faster stop) */
  inertiaDecay: 0.94,
  /** Snap-to-center duration (ms) */
  snapDuration: 600,
};

/**
 * Get position on circle in XZ plane (Y = 0).
 * @param {number} index - Character index
 * @param {number} total - Total count
 * @param {number} radius - Circle radius
 * @param {number} offsetAngle - Current rotation offset (radians)
 * @returns {{ x: number, z: number, angle: number }}
 */
export function getOrbitPosition(index, total, radius, offsetAngle = 0) {
  const angle = (index / total) * Math.PI * 2 + offsetAngle;
  return {
    x: radius * Math.cos(angle),
    z: radius * Math.sin(angle),
    angle,
  };
}

/**
 * Depth-based scale: front (facing camera) = larger.
 * @param {number} angle - Character angle in orbit
 * @param {number} currentOffset - Current orbit rotation
 * @returns {number} scale factor
 */
export function getDepthScale(angle, currentOffset) {
  const { scaleMin, scaleMax } = ORBIT_CONFIG;
  const relativeAngle = angle + currentOffset;
  const normalized = (Math.cos(relativeAngle) + 1) / 2;
  return scaleMin + normalized * (scaleMax - scaleMin);
}

/**
 * Normalize angle to [0, 2*PI).
 */
export function normalizeAngle(a) {
  const twoPi = Math.PI * 2;
  let out = a % twoPi;
  if (out < 0) out += twoPi;
  return out;
}

/**
 * Shortest angular distance to bring target to front (angle 0).
 */
export function angleToSnapToFront(currentOffset, targetAngle) {
  const front = 0;
  const diff = front - (currentOffset + targetAngle);
  const twoPi = Math.PI * 2;
  let normalized = diff % twoPi;
  if (normalized > Math.PI) normalized -= twoPi;
  if (normalized < -Math.PI) normalized += twoPi;
  return normalized;
}
