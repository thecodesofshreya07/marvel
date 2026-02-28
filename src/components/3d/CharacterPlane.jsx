import { useRef, useMemo, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getDepthScale } from "../../lib/three/orbitUtils";
import { ORBIT_CONFIG } from "../../lib/three/orbitUtils";

function PlaneWithTexture({ char, index, total, orbitOffsetRef, onSelect }) {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const imgSrc = typeof char.image === "string" ? char.image : (char.image ?? null);
  const texture = useTexture(imgSrc || "/favicon.svg");

  const { angle, scale } = useMemo(() => {
    const angle = (index / total) * Math.PI * 2;
    return { angle, scale: 1 };
  }, [index, total]);

  useFrame(() => {
    if (!groupRef.current || orbitOffsetRef?.current == null) return;
    const offset = orbitOffsetRef.current;
    const depthScale = getDepthScale(angle, offset);
    groupRef.current.scale.setScalar(depthScale);
  });

  const { planeHeight } = ORBIT_CONFIG;
  const planeWidth = planeHeight * 0.55;

  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite
          toneMapped
        />
      </mesh>
    </group>
  );
}

/**
 * Single character as a textured plane in the orbit.
 * Real 3D depth; scale by depth (front = larger).
 */
function FallbackPlane({ char, index, total, orbitOffsetRef, onSelect }) {
  const groupRef = useRef(null);
  const angle = useMemo(() => (index / total) * Math.PI * 2, [index, total]);

  useFrame(() => {
    if (!groupRef.current || orbitOffsetRef?.current == null) return;
    const depthScale = getDepthScale(angle, orbitOffsetRef.current);
    groupRef.current.scale.setScalar(depthScale);
  });

  const w = ORBIT_CONFIG.planeHeight * 0.55;
  const h = ORBIT_CONFIG.planeHeight;

  return (
    <group ref={groupRef}>
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => { e.stopPropagation(); onSelect?.(index); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={char?.accentColor ?? "#333"} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function CharacterPlane(props) {
  const { char } = props;
  const hasImage = char?.image != null;
  const imgSrc = hasImage && (typeof char.image === "string" ? char.image : char.image);

  if (!hasImage || !imgSrc) {
    return (
      <FallbackPlane
        char={char}
        index={props.index}
        total={props.total}
        orbitOffsetRef={props.orbitOffsetRef}
        onSelect={props.onSelect}
      />
    );
  }

  return (
    <Suspense fallback={null}>
      <PlaneWithTexture {...props} />
    </Suspense>
  );
}
