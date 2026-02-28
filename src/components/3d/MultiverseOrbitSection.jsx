import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterOrbitScene from "./CharacterOrbitScene";
import { useOrbitDrag } from "../../hooks/animation/useOrbitDrag";
import { useSnapToCenter } from "../../hooks/animation/useSnapToCenter";
import { ORBIT_CONFIG } from "../../lib/three/orbitUtils";

/**
 * Production 3D circular character multiverse section.
 * - Drag to rotate (mouse + touch), inertia decay.
 * - Click character: snap to center + camera zoom + animated info panel.
 * - Bloom postprocessing, optimized rendering, proper cleanup.
 */
export default function MultiverseOrbitSection({
  characters,
  selectedIndex: controlledSelectedIndex,
  onSelect,
  onConfirmSelection,
  accentColor = "#c0392b",
}) {
  const containerRef = useRef(null);
  const orbitOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(
    controlledSelectedIndex ?? 0
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const selectedChar = characters[selectedIndex] ?? null;

  const handleRotationChange = useCallback((angle) => {
    orbitOffsetRef.current = angle;
  }, []);

  const snap = useSnapToCenter({
    rotationRef: orbitOffsetRef,
    onRotationChange: handleRotationChange,
    selectedIndex,
    total: characters.length,
  });

  const {
    onPointerDown: hookPointerDown,
    onPointerUp: hookPointerUp,
    onPointerLeave: hookPointerLeave,
  } = useOrbitDrag({
    containerRef,
    rotationRef: orbitOffsetRef,
    onRotationChange: handleRotationChange,
    enabled: true,
    inertiaDecay: ORBIT_CONFIG.inertiaDecay,
  });

  const handlePointerDown = useCallback(
    (e) => {
      isDraggingRef.current = true;
      hookPointerDown(e);
    },
    [hookPointerDown]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    hookPointerUp();
  }, [hookPointerUp]);

  const handlePointerLeave = useCallback(() => {
    isDraggingRef.current = false;
    hookPointerLeave();
  }, [hookPointerLeave]);

  const handleCharacterSelect = useCallback(
    (index) => {
      setSelectedIndex(index);
      setIsZoomed(true);
      snap();
      onSelect?.(index);
    },
    [snap, onSelect]
  );

  const handleConfirm = useCallback(() => {
    onConfirmSelection?.(selectedIndex);
  }, [onConfirmSelection, selectedIndex]);

  useEffect(() => {
    if (controlledSelectedIndex != null && controlledSelectedIndex !== selectedIndex) {
      setSelectedIndex(controlledSelectedIndex);
      setIsZoomed(true);
      snap();
    }
  }, [controlledSelectedIndex]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "400px",
        background: "linear-gradient(180deg, #0d0d1a 0%, #1a0d0d 100%)",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <CharacterOrbitScene
        characters={characters}
        selectedIndex={selectedIndex}
        onSelect={handleCharacterSelect}
        orbitOffsetRef={orbitOffsetRef}
        isDraggingRef={isDraggingRef}
        isZoomed={isZoomed}
      />

      {/* Animated info panel outside canvas */}
      <AnimatePresence mode="wait">
        {selectedChar && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "auto",
              textAlign: "center",
              maxWidth: "90vw",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "rgba(0,0,0,0.75)",
                border: `1px solid ${accentColor}66`,
                borderRadius: "8px",
                boxShadow: `0 0 24px ${accentColor}22`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {selectedChar.group}
              </div>
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(20px, 4vw, 32px)",
                  color: "#fff",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {selectedChar.nameLine1} {selectedChar.nameLine2}
              </div>
              <button
                type="button"
                onClick={handleConfirm}
                style={{
                  padding: "10px 24px",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: accentColor,
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                VIEW DETAILS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
