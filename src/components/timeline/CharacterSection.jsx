import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film } from "lucide-react";
import { CHARACTERS, getMoviesForCharacter } from "./constants";
import { TiltCard, StatBlock } from "./SharedComponents";

function IdentityCard({ char, scanning }) {
    const c = CHARACTERS[char];
    if (!c) return null;
    return (
        <TiltCard
            style={{
                background: "rgba(5,2,20,0.85)",
                border: `1px solid ${c.color}40`,
                padding: "clamp(24px, 4vw, 40px)",
                backdropFilter: "blur(20px)",
                position: "relative",
                overflow: "hidden",
                clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                boxShadow: `0 0 40px ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
        >
            {scanning && (
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: 3,
                        background: `linear-gradient(90deg, transparent, ${c.scanColor}, rgba(255,255,255,0.8), ${c.scanColor}, transparent)`,
                        boxShadow: `0 0 15px ${c.scanColor}`,
                        zIndex: 10,
                        animation: "laserScan 1.2s ease-in-out forwards",
                    }}
                />
            )}
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: c.scanColor, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: c.scanColor, boxShadow: `0 0 8px ${c.scanColor}` }} />
                SCAN COMPLETE — IDENTITY VERIFIED
            </div>

            <motion.div
                style={{
                    position: "relative",
                    width: "100%",
                    height: 200,
                    marginBottom: 24,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `1px solid ${c.color}`,
                    transformStyle: "preserve-3d",
                    perspective: "800px",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,2,20,0.95), transparent 40%)" }} />
                <div className="hero-float" style={{ position: "absolute", bottom: 10, right: 10, fontSize: "2.5rem", filter: `drop-shadow(0 0 20px ${c.color})` }}>
                    {c.avatar}
                </div>
            </motion.div>

            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 900, textTransform: "uppercase", textShadow: `0 0 30px ${c.glow}`, marginBottom: 4 }}>
                {c.name}
            </div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", fontFamily: "'Share Tech Mono',monospace", marginBottom: 20 }}>
                {c.alter}
            </div>
            {c.quote && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ fontSize: "0.8rem", fontStyle: "italic", color: "rgba(255,255,255,0.5)", marginBottom: 20, borderLeft: `3px solid ${c.color}`, paddingLeft: 12 }}
                >
                    "{c.quote}"
                </motion.p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <StatBlock label="Intelligence" value={c.stats.int} pct={c.stats.int} accentColor={c.color} />
                <StatBlock label="Power" value={c.stats.pow} pct={c.stats.pow} accentColor={c.color} />
                <StatBlock label="Combat" value={c.stats.com} pct={c.stats.com} accentColor={c.color} />
                <StatBlock label="Mysticism" value={c.stats.mys} pct={c.stats.mys} accentColor={c.color} />
            </div>
        </TiltCard>
    );
}

function CharacterMovieList({ charKey, onMovieClick }) {
    const movies = getMoviesForCharacter(charKey);
    if (!movies.length) return null;
    return (
        <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Film size={12} /> FEATURED IN
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {movies.map((m) => (
                    <motion.button
                        key={m.id}
                        type="button"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onMovieClick(m)}
                        style={{
                            textAlign: "left",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "10px 14px",
                            color: "rgba(255,255,255,0.85)",
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                        }}
                    >
                        {m.year} — {m.title}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

export default function CharacterSection({ activeFilter, onOpenMovie }) {
    const [selectedChar, setSelectedChar] = useState("strange");
    const [scanning, setScanning] = useState(false);

    useEffect(() => {
        if (activeFilter !== "all" && CHARACTERS[activeFilter.replace("-", "")]) {
            setSelectedChar(activeFilter.replace("-", ""));
        }
    }, [activeFilter]);

    const handleSelect = useCallback((key) => {
        setSelectedChar(key);
        setScanning(false);
        setTimeout(() => setScanning(true), 50);
        setTimeout(() => setScanning(false), 1300);
    }, []);

    const c = CHARACTERS[selectedChar];
    if (!c) return null;

    return (
        <section
            id="character"
            className="timeline-character-pad"
            style={{ position: "relative", minHeight: "100vh", padding: "120px 48px 80px", overflow: "hidden" }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${c.glow}, transparent 65%)`,
                    transition: "background 1.2s ease",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* Passive character strip */}
            <div className="timeline-passive-strip" style={{ position: "absolute", bottom: 24, left: 0, right: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
                <motion.div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        opacity: 0.25,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.25 }}
                    viewport={{ once: true }}
                >
                    {Object.entries(CHARACTERS).map(([key, ch]) => (
                        <div
                            key={key}
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: `1px solid ${ch.color}60`,
                                boxShadow: `0 0 12px ${ch.glow}`,
                            }}
                        >
                            <img src={ch.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    ))}
                </motion.div>
            </div>

            <motion.img
                key={selectedChar}
                initial={{ opacity: 0, filter: "blur(12px)", scale: 1.1 }}
                animate={{ opacity: 0.08, filter: "blur(5px)", scale: 1 }}
                transition={{ duration: 1.5 }}
                src={c.image}
                alt=""
                style={{
                    position: "absolute",
                    top: "5%",
                    right: "-15%",
                    width: "55vw",
                    height: "85vh",
                    objectFit: "cover",
                    mixBlendMode: "screen",
                    zIndex: 0,
                    maskImage: "radial-gradient(ellipse 40% 50% at 70% 50%, black 20%, transparent 70%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ position: "relative", zIndex: 10 }}
            >
                <div style={{ textAlign: "center", maxWidth: 1200, margin: "0 auto", paddingBottom: 48 }}>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.65rem)", letterSpacing: "0.4em", color: "#00d4ff" }}>
                        // MODULE 03 — IDENTITY MATRIX
                    </span>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.5rem, 3.5vw, 3rem)", fontWeight: 900, marginTop: 8 }}>
                        CHARACTER <span style={{ color: "#7b2fbe" }}>IDENTITY</span> SCAN
                    </h2>
                </div>
                <div className="timeline-character-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", maxWidth: 1200, margin: "0 auto" }}>
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: 12 }}>
                            SELECT HERO — CLICK FOR BIO & MOVIES
                        </p>
                        <div className="timeline-char-selector" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
                            {Object.entries(CHARACTERS).map(([key, ch]) => (
                                <motion.div
                                    key={key}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelect(key)}
                                    className={`char-item${selectedChar === key ? " active" : ""}`}
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: `1px solid ${selectedChar === key ? ch.color : "rgba(255,255,255,0.08)"}`,
                                        padding: 16,
                                        textAlign: "center",
                                        cursor: "pointer",
                                        clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                                        boxShadow: selectedChar === key ? `0 0 24px ${ch.glow}` : "none",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: "50%",
                                            margin: "0 auto 10px",
                                            overflow: "hidden",
                                            border: `2px solid ${ch.color}80`,
                                        }}
                                    >
                                        <img src={ch.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </motion.div>
                                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.8)" }}>
                                        {ch.name.split(" ").pop()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                            {[
                                ["Classification", c.classification],
                                ["Reality Origin", c.reality],
                                ["First Appearance", c.firstAppearance || "—"],
                                ["Threat Level", c.threat, c.color],
                            ].map(([label, val, col]) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        backdropFilter: "blur(10px)",
                                        padding: "14px 18px",
                                        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                                    }}
                                >
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>
                                        {label}
                                    </div>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: col || "rgba(255,255,255,0.8)" }}>{val}</div>
                                </motion.div>
                            ))}
                        </div>
                        {onOpenMovie && <CharacterMovieList charKey={selectedChar} onMovieClick={onOpenMovie} />}
                    </div>
                    <IdentityCard char={selectedChar} scanning={scanning} />
                </div>
            </motion.div>
        </section>
    );
}
