import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useStarfield, useParallaxPortal } from "./hooks";
import { Portal } from "./SharedComponents";
import { CHARACTERS } from "./constants";

const passiveChars = Object.entries(CHARACTERS).map(([key, ch], i) => ({
    key,
    ...ch,
    left: 8 + (i * 18) % 80,
    top: 15 + (i * 23) % 70,
    delay: i * 0.2,
    size: 56 + (i % 3) * 12,
}));

export default function HeroSection({ onDive }) {
    const canvasRef = useRef(null);
    const tilt = useParallaxPortal();
    useStarfield(canvasRef);

    return (
        <section
            id="hero"
            style={{
                position: "relative",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    zIndex: 5,
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.02) 2px, rgba(0,212,255,0.02) 4px)",
                }}
            />

            {/* Passive floating character avatars */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
                {passiveChars.map((ch, i) => (
                    <motion.div
                        key={ch.key}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ duration: 1.2, delay: ch.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{
                            position: "absolute",
                            left: `${ch.left}%`,
                            top: `${ch.top}%`,
                            width: ch.size,
                            height: ch.size,
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: `2px solid ${ch.color}`,
                            boxShadow: `0 0 20px ${ch.glow}`,
                        }}
                    >
                        <motion.img
                            src={ch.image}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="timeline-hero-gap"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 40,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)", letterSpacing: "0.4em", color: "#00d4ff" }}
                >
                    MARVEL STUDIOS — NARRATIVE ENGINE v4.0
                </motion.div>
                <Portal tilt={tilt} />
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                    <motion.h1
                        className="glitch"
                        data-text="TRAVERSE THE"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 900,
                            textAlign: "center",
                            lineHeight: 1.1,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}
                    >
                        TRAVERSE THE
                        <br />
                        <span style={{ color: "#e63946", textShadow: "0 0 30px rgba(230,57,70,0.6)" }}>MULTIVERSE</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", maxWidth: 400, textAlign: "center" }}
                    >
                        A 3D-spatial narrative engine for fans to traverse the MCU across infinite realities
                    </motion.p>
                    <motion.button
                        onClick={onDive}
                        className="dive-btn"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            position: "relative",
                            padding: "14px 48px",
                            background: "transparent",
                            border: "1px solid rgba(230,57,70,0.5)",
                            color: "#fff",
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                            letterSpacing: "0.3em",
                            cursor: "pointer",
                            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                        }}
                    >
                        <span style={{ position: "relative", zIndex: 1 }}>⬡ ENTER THE NEXUS</span>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
