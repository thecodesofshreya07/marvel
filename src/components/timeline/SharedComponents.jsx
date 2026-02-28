import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export function TiltCard({ children, style, className, onClick }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-120, 120], [12, -12]);
    const rotateY = useTransform(x, [-120, 120], [-12, 12]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            className={className}
            style={{
                ...style,
                x: 0,
                y: 0,
                rotateX,
                rotateY,
                z: 100,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            onMouseMove={handleMouse}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            onClick={onClick}
            whileHover={{ scale: 1.03, z: 120 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
            {children}
        </motion.div>
    );
}

export function Cursor({ pos, dot, scale, hideWhenModalOpen }) {
    const [isTouch, setIsTouch] = useState(false);
    React.useEffect(() => {
        setIsTouch(typeof window !== "undefined" && "ontouchstart" in window);
    }, []);
    if (isTouch || hideWhenModalOpen) return null;
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 20,
                    height: 20,
                    border: "2px solid #00d4ff",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    transform: `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${scale})`,
                    mixBlendMode: "screen",
                    transition: "transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    boxShadow: "0 0 8px rgba(0,212,255,0.4)",
                }}
            />
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    background: "#00d4ff",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    transform: `translate(${dot.x - 3}px, ${dot.y - 3}px)`,
                    boxShadow: "0 0 10px #00d4ff",
                }}
            />
        </>
    );
}

export function Nav({ hudTime }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const links = [
        { label: "ENTRY POINT", href: "#hero" },
        { label: "MULTIVERSE LOG", href: "#timeline" },
        { label: "IDENTITY SCAN", href: "#character" },
    ];
    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="timeline-nav-wrap"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 500,
                padding: "16px 48px",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                background: "rgba(3,3,8,0.7)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div
                style={{
                    fontFamily: "'Orbitron',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
                    letterSpacing: "0.3em",
                    color: "#e63946",
                    textShadow: "0 0 20px rgba(230,57,70,0.6)",
                }}
            >
                ◈ MARVEL — MNE
            </div>
            <ul className="timeline-nav-links" style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
                {links.map((l, i) => (
                    <li key={i}>
                        <a
                            href={l.href}
                            className="nav-link"
                            onClick={() => setMobileOpen(false)}
                            style={{
                                fontFamily: "'Share Tech Mono',monospace",
                                fontSize: "0.75rem",
                                letterSpacing: "0.15em",
                                color: "rgba(255,255,255,0.5)",
                                textDecoration: "none",
                                textTransform: "uppercase",
                                transition: "color 0.3s, text-shadow 0.3s",
                            }}
                        >
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="timeline-nav-time" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
                {hudTime}
            </div>
            <button
                type="button"
                aria-label="Menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="timeline-nav-burger"
                style={{
                    display: "none",
                    background: "none",
                    border: "none",
                    color: "#fff",
                    padding: 8,
                    cursor: "pointer",
                }}
            >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "rgba(3,3,8,0.98)",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    {links.map((l, i) => (
                        <a key={i} href={l.href} className="nav-link" onClick={() => setMobileOpen(false)} style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                            {l.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
}

export function Portal({ tilt }) {
    const particles = Array.from({ length: 20 }, (_, i) => {
        const r = 130 + Math.random() * 30;
        const dur = 4 + i * 0.4;
        const colors = ["#7b2fbe", "#e63946", "#00d4ff"];
        return { r, dur, color: colors[i % 3], sz: 2 + (i % 3), del: (i * 0.3) % dur };
    });

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                position: "relative",
                width: "min(320px, 85vw)",
                height: "min(320px, 85vw)",
                transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: "transform 0.12s ease-out",
            }}
        >
            {[
                { inset: 0, cls: "portal-ring-1", grad: "conic-gradient(from 0deg, transparent 60%, #7b2fbe 80%, transparent 100%)" },
                { inset: 12, cls: "portal-ring-2", grad: "conic-gradient(from 120deg, transparent 60%, #e63946 80%, transparent 100%)" },
                { inset: 24, cls: "portal-ring-3", grad: "conic-gradient(from 240deg, transparent 60%, #00d4ff 80%, transparent 100%)" },
            ].map(({ inset, cls, grad }) => (
                <div key={cls} className={cls} style={{ position: "absolute", inset, borderRadius: "50%", background: grad }} />
            ))}
            <div
                style={{
                    position: "absolute",
                    inset: 36,
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse at 40% 35%, rgba(123,47,190,0.8) 0%, rgba(0,0,20,0.95) 60%, rgba(0,212,255,0.1) 100%)",
                    boxShadow: "inset 0 0 40px rgba(123,47,190,0.5), 0 0 60px rgba(123,47,190,0.3)",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg className="portal-runes" style={{ position: "absolute", inset: 0 }} viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="rgba(123,47,190,0.5)" strokeWidth="0.5" fill="none" />
                    <defs>
                        <path id="rp" d="M100,15 A85,85 0 1,1 99.9,15" />
                    </defs>
                    <text fontSize="10" fill="rgba(123,47,190,0.6)" fontFamily="serif">
                        <textPath href="#rp">✦ DORMAMMU ✦ AGAMOTTO ✦ VISHANTI ✦ </textPath>
                    </text>
                </svg>
                <div className="portal-eye" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", zIndex: 2, filter: "drop-shadow(0 0 20px #7b2fbe)" }}>
                    ◈
                </div>
            </div>
            {particles.map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: p.sz,
                        height: p.sz,
                        borderRadius: "50%",
                        background: p.color,
                        top: "50%",
                        left: "50%",
                        transformOrigin: `${p.r}px center`,
                        animation: `orbit ${p.dur}s linear infinite ${p.del}s`,
                    }}
                />
            ))}
        </motion.div>
    );
}

export function StatBlock({ label, value, pct, accentColor }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}
        >
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
                {label}
            </div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{value}</div>
            <div style={{ height: 2, marginTop: 6, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden" }}>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ height: "100%", background: `linear-gradient(90deg,${accentColor || "#7b2fbe"},#00d4ff)`, boxShadow: "0 0 8px #00d4ff" }}
                />
            </div>
        </motion.div>
    );
}
