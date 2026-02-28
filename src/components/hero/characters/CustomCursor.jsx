import { useState, useEffect, useRef } from "react";

// Shared custom cursor — used on both Choose and Detail pages
export default function CustomCursor() {
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const cursorTargetRef = useRef({ x: -100, y: -100 });
    const cursorCurrentRef = useRef({ x: -100, y: -100 });
    const cursorRafRef = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            cursorTargetRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMove);
        const animate = () => {
            const ease = 0.13;
            cursorCurrentRef.current.x += (cursorTargetRef.current.x - cursorCurrentRef.current.x) * ease;
            cursorCurrentRef.current.y += (cursorTargetRef.current.y - cursorCurrentRef.current.y) * ease;
            setCursorPos({
                x: cursorCurrentRef.current.x,
                y: cursorCurrentRef.current.y,
            });
            cursorRafRef.current = requestAnimationFrame(animate);
        };
        cursorRafRef.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(cursorRafRef.current);
        };
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                left: cursorPos.x,
                top: cursorPos.y,
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.8)",
                boxShadow: "0 0 18px rgba(255,255,255,0.2), inset 0 0 8px rgba(255,255,255,0.05)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 9999,
                mixBlendMode: "difference",
                transition: "width 0.15s, height 0.15s",
            }}
        />
    );
}
