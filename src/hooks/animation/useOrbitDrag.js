import { useRef, useCallback, useEffect } from "react";

/**
 * Drag-to-rotate orbit with inertia decay.
 * Returns { rotationRef, onPointerDown, onPointerMove, onPointerUp, onPointerLeave }
 * and attaches pointer events to a container.
 * @param {Object} options
 * @param {React.RefObject<HTMLElement>} options.containerRef - DOM element to attach events
 * @param {React.MutableRefObject<number>} options.rotationRef - current orbit angle (radians)
 * @param {function(number): void} options.onRotationChange - called when rotation updates
 * @param {boolean} options.enabled - enable drag
 * @param {number} options.inertiaDecay - 0-1
 */
export function useOrbitDrag({
  containerRef,
  rotationRef,
  onRotationChange,
  enabled = true,
  inertiaDecay = 0.94,
}) {
  const isDragging = useRef(false);
  const prevX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef(null);

  const applyRotation = useCallback(
    (deltaAngle) => {
      if (typeof rotationRef.current !== "number") return;
      rotationRef.current += deltaAngle;
      onRotationChange?.(rotationRef.current);
    },
    [onRotationChange, rotationRef]
  );

  const onPointerDown = useCallback(
    (e) => {
      if (!enabled) return;
      isDragging.current = true;
      prevX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      velocity.current = 0;
    },
    [enabled]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isDragging.current || !enabled) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const delta = x - prevX.current;
      const sensitivity = 0.008;
      velocity.current = delta * sensitivity;
      applyRotation(-velocity.current);
      prevX.current = x;
    },
    [enabled, applyRotation]
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onPointerLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      if (!isDragging.current && Math.abs(velocity.current) > 0.0005) {
        applyRotation(-velocity.current);
        velocity.current *= inertiaDecay;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, inertiaDecay, applyRotation]);

  useEffect(() => {
    const el = containerRef?.current;
    if (!el || !enabled) return;

    const handleMove = (e) => onPointerMove(e);
    const handleUp = () => onPointerUp();
    const handleLeave = () => onPointerLeave();

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerup", handleUp);
    el.addEventListener("pointerleave", handleLeave);
    el.addEventListener("pointercancel", handleUp);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerup", handleUp);
      el.removeEventListener("pointerleave", handleLeave);
      el.removeEventListener("pointercancel", handleUp);
    };
  }, [enabled, containerRef, onPointerMove, onPointerUp, onPointerLeave]);

  return {
    rotationRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
  };
}
