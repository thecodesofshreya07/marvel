import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { getOrbitPosition } from "../../lib/three/orbitUtils";
import { ORBIT_CONFIG } from "../../lib/three/orbitUtils";
import CharacterPlane from "./CharacterPlane";

/**
 * Inner orbit group: positions characters in a circle, applies rotation offset.
 */
function OrbitGroup({ characters, orbitOffsetRef, selectedIndex, onSelect }) {
  const groupRef = useRef(null);
  const total = characters.length;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const radius = isMobile ? ORBIT_CONFIG.radiusMobile : ORBIT_CONFIG.radius;

  useFrame((_, delta) => {
    if (!groupRef.current || orbitOffsetRef?.current == null) return;
    groupRef.current.rotation.y = orbitOffsetRef.current;
  });

  const positions = useMemo(() => {
    return characters.map((_, i) =>
      getOrbitPosition(i, total, radius, 0)
    );
  }, [characters.length, total, radius]);

  return (
    <group ref={groupRef}>
      {characters.map((char, i) => (
        <group
          key={char.id}
          position={[positions[i].x, 0, positions[i].z]}
          rotation={[0, -positions[i].angle, 0]}
        >
          <CharacterPlane
            char={char}
            index={i}
            total={total}
            orbitOffsetRef={orbitOffsetRef}
            isSelected={selectedIndex === i}
            onSelect={onSelect}
          />
        </group>
      ))}
    </group>
  );
}

/**
 * Camera controller: smooth zoom when selected, slow auto-rotate when idle.
 */
function CameraRig({ orbitOffsetRef, selectedIndex, isZoomed }) {
  const cameraRef = useRef(null);
  const targetZ = useRef(ORBIT_CONFIG.cameraDistance);
  const currentZ = useRef(ORBIT_CONFIG.cameraDistance);

  useFrame((state, delta) => {
    const target =
      isZoomed && selectedIndex != null
        ? ORBIT_CONFIG.cameraDistanceZoom
        : ORBIT_CONFIG.cameraDistance;
    targetZ.current = target;
    currentZ.current += (targetZ.current - currentZ.current) * Math.min(delta * 3, 1);
    if (state.camera) {
      state.camera.position.z = currentZ.current;
      state.camera.lookAt(0, 0, 0);
      state.camera.updateProjectionMatrix?.();
    }
  });

  return null;
}

/**
 * Auto-rotation when no drag: slow spin.
 */
function AutoRotate({ orbitOffsetRef, isDraggingRef }) {
  useFrame((_, delta) => {
    if (orbitOffsetRef?.current == null || isDraggingRef?.current) return;
    orbitOffsetRef.current += ORBIT_CONFIG.autoRotateSpeed * delta;
  });
  return null;
}

export default function CharacterOrbitScene({
  characters,
  selectedIndex,
  onSelect,
  orbitOffsetRef,
  isDraggingRef,
  isZoomed,
}) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{
        position: [0, 0, ORBIT_CONFIG.cameraDistance],
        fov: 50,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 2]}
      frameloop="always"
      onCreated={({ gl }) => {
        gl.setClearColor(0x0d0d1a, 1);
      }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 8, 5]} intensity={1.2} color="#fff" />
      <pointLight position={[-5, 5, -5]} intensity={0.4} color="#c0392b" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#fff" />

      <OrbitGroup
        characters={characters}
        orbitOffsetRef={orbitOffsetRef}
        selectedIndex={selectedIndex}
        onSelect={onSelect}
      />

      <CameraRig
        orbitOffsetRef={orbitOffsetRef}
        selectedIndex={selectedIndex}
        isZoomed={isZoomed}
      />
      <AutoRotate orbitOffsetRef={orbitOffsetRef} isDraggingRef={isDraggingRef} />

      <EffectComposer>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
