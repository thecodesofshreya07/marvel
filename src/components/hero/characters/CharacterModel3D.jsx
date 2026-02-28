import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────
// PROCEDURAL 3D CHARACTER FIGURE
// Stylized geometric superhero silhouette
// ─────────────────────────────────────────────

export default function CharacterModel3D({
    char,
    isActive,
    isAnyActive,
    onClick,
}) {
    const groupRef = useRef();
    const rimLightRef = useRef();

    // Target values for smooth transitions
    const targetScale = isActive ? 1.35 : isAnyActive ? 0.85 : 1;
    const targetOpacity = isActive ? 1 : isAnyActive ? 0.35 : 1;
    const targetEmissive = isActive ? 0.4 : 0;
    const targetRimIntensity = isActive ? 2.5 : 0;

    // Smooth animation refs
    const currentScale = useRef(1);
    const currentOpacity = useRef(1);
    const currentEmissive = useRef(0);
    const currentRimIntensity = useRef(0);
    const hoverRef = useRef(false);
    const floatOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    // Character-specific colors
    const bodyMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(char.bodyColor),
                roughness: 0.3,
                metalness: 0.7,
                transparent: true,
            }),
        [char.bodyColor]
    );

    const suitMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(char.suitColor),
                roughness: 0.25,
                metalness: 0.8,
                transparent: true,
            }),
        [char.suitColor]
    );

    const accentMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(char.accentSuit || char.accentColor),
                roughness: 0.2,
                metalness: 0.9,
                transparent: true,
                emissive: new THREE.Color(char.accentSuit || char.accentColor),
                emissiveIntensity: 0,
            }),
        [char.accentSuit, char.accentColor]
    );

    const headMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: new THREE.Color(char.bodyColor).lerp(
                    new THREE.Color("#ffffff"),
                    0.15
                ),
                roughness: 0.35,
                metalness: 0.5,
                transparent: true,
            }),
        [char.bodyColor]
    );

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        const speed = 4 * delta;

        // Lerp scale
        currentScale.current = THREE.MathUtils.lerp(
            currentScale.current,
            targetScale + (hoverRef.current && !isActive ? 0.08 : 0),
            speed
        );
        groupRef.current.scale.setScalar(currentScale.current);

        // Lerp opacity
        currentOpacity.current = THREE.MathUtils.lerp(
            currentOpacity.current,
            targetOpacity,
            speed
        );
        bodyMat.opacity = currentOpacity.current;
        suitMat.opacity = currentOpacity.current;
        accentMat.opacity = currentOpacity.current;
        headMat.opacity = currentOpacity.current;

        // Lerp emissive
        currentEmissive.current = THREE.MathUtils.lerp(
            currentEmissive.current,
            targetEmissive,
            speed
        );
        accentMat.emissiveIntensity = currentEmissive.current;

        // Lerp rim light
        currentRimIntensity.current = THREE.MathUtils.lerp(
            currentRimIntensity.current,
            targetRimIntensity,
            speed
        );
        if (rimLightRef.current) {
            rimLightRef.current.intensity = currentRimIntensity.current;
        }

        // Subtle floating animation for active character
        if (isActive) {
            const time = performance.now() * 0.001;
            groupRef.current.position.y =
                char.position3D[1] +
                Math.sin(time * 1.5 + floatOffset) * 0.06;
        } else {
            groupRef.current.position.y = THREE.MathUtils.lerp(
                groupRef.current.position.y,
                char.position3D[1],
                speed
            );
        }
    });

    return (
        <group
            ref={groupRef}
            position={char.position3D}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onPointerOver={() => {
                hoverRef.current = true;
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                hoverRef.current = false;
                document.body.style.cursor = "default";
            }}
        >
            {/* Rim light for selected character */}
            <pointLight
                ref={rimLightRef}
                position={[0, 1.5, -1]}
                color={char.accentSuit || char.accentColor}
                intensity={0}
                distance={4}
            />

            {/* ─── TORSO (main body) ─── */}
            <mesh position={[0, 0.85, 0]} material={suitMat}>
                <capsuleGeometry args={[0.28, 0.55, 8, 16]} />
            </mesh>

            {/* ─── CHEST PLATE ─── */}
            <mesh position={[0, 1.0, 0.2]} material={accentMat}>
                <boxGeometry args={[0.42, 0.35, 0.08]} />
            </mesh>

            {/* ─── SHOULDERS ─── */}
            <mesh
                position={[-0.38, 1.18, 0]}
                rotation={[0, 0, 0.3]}
                material={bodyMat}
            >
                <sphereGeometry args={[0.14, 12, 12]} />
            </mesh>
            <mesh
                position={[0.38, 1.18, 0]}
                rotation={[0, 0, -0.3]}
                material={bodyMat}
            >
                <sphereGeometry args={[0.14, 12, 12]} />
            </mesh>

            {/* ─── ARMS ─── */}
            <mesh
                position={[-0.44, 0.75, 0]}
                rotation={[0, 0, 0.1]}
                material={suitMat}
            >
                <capsuleGeometry args={[0.08, 0.5, 6, 12]} />
            </mesh>
            <mesh
                position={[0.44, 0.75, 0]}
                rotation={[0, 0, -0.1]}
                material={suitMat}
            >
                <capsuleGeometry args={[0.08, 0.5, 6, 12]} />
            </mesh>

            {/* ─── HEAD ─── */}
            <mesh position={[0, 1.52, 0]} material={headMat}>
                <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>

            {/* ─── NECK ─── */}
            <mesh position={[0, 1.32, 0]} material={bodyMat}>
                <cylinderGeometry args={[0.08, 0.1, 0.12, 12]} />
            </mesh>

            {/* ─── WAIST / BELT ─── */}
            <mesh position={[0, 0.52, 0]} material={accentMat}>
                <cylinderGeometry args={[0.26, 0.28, 0.08, 16]} />
            </mesh>

            {/* ─── LEGS ─── */}
            <mesh position={[-0.14, 0.15, 0]} material={suitMat}>
                <capsuleGeometry args={[0.1, 0.45, 6, 12]} />
            </mesh>
            <mesh position={[0.14, 0.15, 0]} material={suitMat}>
                <capsuleGeometry args={[0.1, 0.45, 6, 12]} />
            </mesh>

            {/* ─── FEET ─── */}
            <mesh position={[-0.14, -0.15, 0.04]} material={bodyMat}>
                <boxGeometry args={[0.12, 0.06, 0.2]} />
            </mesh>
            <mesh position={[0.14, -0.15, 0.04]} material={bodyMat}>
                <boxGeometry args={[0.12, 0.06, 0.2]} />
            </mesh>

            {/* ─── GROUND GLOW (circle under feet) ─── */}
            <mesh
                position={[0, -0.17, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <circleGeometry args={[0.45, 32]} />
                <meshBasicMaterial
                    color={char.accentSuit || char.accentColor}
                    transparent
                    opacity={isActive ? 0.25 : 0.05}
                />
            </mesh>
        </group>
    );
}
