import { useRef, useCallback } from "react";
import { ORBIT_CONFIG } from "../../lib/three/orbitUtils";

/**
 * Smooth snap: rotate orbit so selected character moves to front (angle 0).
 * Uses linear interpolation over snapDuration.
 * @param {Object} options
 * @param {React.MutableRefObject<number>} options.rotationRef - current orbit angle
 * @param {function(number): void} options.onRotationChange
 * @param {number} options.selectedIndex
 * @param {number} options.total
 * @returns {function(): void} snap() - call to start snap
 */
export function useSnapToCenter({
  rotationRef,
  onRotationChange,
  selectedIndex,
  total,
}) {
  const startTime = useRef(0);
  const startAngle = useRef(0);
  const targetAngle = useRef(0);
  const rafId = useRef(null);

  const snap = useCallback(() => {
    if (total <= 0 || typeof selectedIndex !== "number") return;
    const current = rotationRef.current;
    const targetAngleForIndex = (selectedIndex / total) * Math.PI * 2;
    let delta = -current - targetAngleForIndex;
    const twoPi = Math.PI * 2;
    while (delta > Math.PI) delta -= twoPi;
    while (delta < -Math.PI) delta += twoPi;
    startAngle.current = current;
    targetAngle.current = current + delta;
    startTime.current = performance.now();

    const { snapDuration } = ORBIT_CONFIG;

    const animate = () => {
      const t = (performance.now() - startTime.current) / snapDuration;
      if (t >= 1) {
        rotationRef.current = targetAngle.current;
        onRotationChange?.(targetAngle.current);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      rotationRef.current =
        startAngle.current +
        (targetAngle.current - startAngle.current) * eased;
      onRotationChange?.(rotationRef.current);
      rafId.current = requestAnimationFrame(animate);
    };
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(animate);
  }, [
    selectedIndex,
    total,
    rotationRef,
    onRotationChange,
  ]);

  return snap;
}
