import { useState, useEffect, useRef } from "react";

export function useCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [dot, setDot] = useState({ x: -100, y: -100 });
    const [scale, setScale] = useState(1);
    const ref = useRef({ x: -100, y: -100, cx: -100, cy: -100 });
    const mx = useRef(-100), my = useRef(-100);

    useEffect(() => {
        const move = (e) => { mx.current = e.clientX; my.current = e.clientY; setDot({ x: e.clientX, y: e.clientY }); };
        window.addEventListener("mousemove", move);
        let raf;
        const animate = () => {
            ref.current.cx += (mx.current - ref.current.cx) * 0.12;
            ref.current.cy += (my.current - ref.current.cy) * 0.12;
            setPos({ x: ref.current.cx, y: ref.current.cy });
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
    }, []);

    return { pos, dot, scale, setScale };
}

export function useStarfield(canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let stars = [], raf;
        const resize = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            stars = Array.from({ length: 220 }, () => ({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3, a: Math.random(), s: Math.random() * 0.004 + 0.001,
                color: Math.random() < 0.15 ? "rgba(123,47,190," : "rgba(255,255,255,",
            }));
        };
        resize();
        window.addEventListener("resize", resize);
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                s.a += s.s; if (s.a > 1 || s.a < 0) s.s *= -1;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.color + s.a + ")"; ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
    }, [canvasRef]);
}

export function useHudClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            const n = new Date();
            setTime(`TIMELINE: ACTIVE — ${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`);
        };
        update(); const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export function useParallaxPortal() {
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    useEffect(() => {
        const move = (e) => {
            setTilt({ rx: (e.clientY / window.innerHeight - 0.5) * -18, ry: (e.clientX / window.innerWidth - 0.5) * 18 });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);
    return tilt;
}
