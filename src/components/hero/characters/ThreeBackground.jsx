import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────
// THREE.JS PARTICLE BACKGROUND
// ─────────────────────────────────────────────
export default function ThreeBackground({ bgColor }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animRef = useRef(null);
    const particlesMeshRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Particles
        const count = 1800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const color1 = new THREE.Color(bgColor);
        const color2 = new THREE.Color("#ffffff");

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            const mix = Math.random();
            const c = color1.clone().lerp(color2, mix * 0.3);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;

            sizes[i] = Math.random() * 3 + 0.5;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(time * 0.3 + position.x * 0.5) * 0.15;
          pos.x += cos(time * 0.2 + position.y * 0.4) * 0.1;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
            transparent: true,
            vertexColors: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const mesh = new THREE.Points(geo, mat);
        scene.add(mesh);
        particlesMeshRef.current = mesh;

        let t = 0;
        const animate = () => {
            animRef.current = requestAnimationFrame(animate);
            t += 0.01;
            mat.uniforms.time.value = t;
            mesh.rotation.y = t * 0.03;
            mesh.rotation.x = t * 0.01;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(animRef.current);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    // Update particle colors when bgColor changes
    useEffect(() => {
        if (!particlesMeshRef.current) return;
        const geo = particlesMeshRef.current.geometry;
        const colAttr = geo.getAttribute("color");
        const color1 = new THREE.Color(bgColor);
        const color2 = new THREE.Color("#ffffff");
        for (let i = 0; i < colAttr.count; i++) {
            const mix = Math.random();
            const c = color1.clone().lerp(color2, mix * 0.3);
            colAttr.setXYZ(i, c.r, c.g, c.b);
        }
        colAttr.needsUpdate = true;
    }, [bgColor]);

    return <div ref={mountRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}
