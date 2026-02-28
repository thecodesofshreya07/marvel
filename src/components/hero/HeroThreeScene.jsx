import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Torus } from "@react-three/drei";
import { useRef } from "react";

function GauntletCore() {
  const meshRef  = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.6;
    if (ringRef2.current) {
      ringRef2.current.rotation.x = t * 0.4;
      ringRef2.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      {/* Main infinity stone */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial color="#f0a500" emissive="#f0a500" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </Sphere>

      {/* Inner core glow */}
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={2} transparent opacity={0.4} />
      </Sphere>

      {/* Orbit ring 1 */}
      <Torus ref={ringRef1} args={[1.8, 0.025, 16, 100]}>
        <meshStandardMaterial color="#e62429" emissive="#e62429" emissiveIntensity={1.5} transparent opacity={0.8} />
      </Torus>

      {/* Orbit ring 2 */}
      <Torus ref={ringRef2} args={[2.2, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={1.2} transparent opacity={0.6} />
      </Torus>

      {/* Orbiting infinity stones */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <OrbitingSphere key={i} index={i} />
      ))}
    </group>
  );
}

function OrbitingSphere({ index }) {
  const ref    = useRef();
  const angle  = (index / 6) * Math.PI * 2;
  const radius = 2.0;
  const colors = ["#e62429","#0066cc","#00aa44","#aa00cc","#ff6600","#ffff00"];

  useFrame((state) => {
    const t = state.clock.elapsedTime + angle;
    ref.current.position.x = Math.cos(t * 0.5) * radius;
    ref.current.position.z = Math.sin(t * 0.5) * radius;
    ref.current.position.y = Math.sin(t * 0.3) * 0.4;
  });

  return (
    <Sphere ref={ref} args={[0.12, 16, 16]}>
      <meshStandardMaterial color={colors[index]} emissive={colors[index]} emissiveIntensity={2} />
    </Sphere>
  );
}

export default function HeroThreeScene() {
  return (
    <Canvas
      style={{ height: "100%", width: "100%", background: "transparent" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]}   intensity={1.5} color="#f0a500" />
      <pointLight position={[-10,-10,-10]}  intensity={0.8} color="#e62429" />
      <pointLight position={[0, 10, -5]}    intensity={0.6} color="#0066cc" />

      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />

      <GauntletCore />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
