import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import CharacterFigure from "./CharacterFigure";

const MOVIE_COLORS = ["#1a2a4a", "#2a1a1a", "#1a3a1a", "#2a2a1a", "#2a1a3a"];

// ─────────────────────────────────────────────
// DETAIL PAGE
// ─────────────────────────────────────────────
export default function DetailPage({ char, onBack, allChars = [] }) {
    const [visible, setVisible] = useState(false);
    const [showCompare, setShowCompare] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "hidden", paddingBottom: "70px", cursor: "none" }}>
            <ThreeBackground bgColor={char.detailBg} />

            {/* Background gradient */}
            <div
                style={{
                    position: "absolute", inset: 0, zIndex: 0,
                    background: `radial-gradient(ellipse at 25% 70%, ${char.bgColor}dd 0%, ${char.detailBg}99 45%, #111118 100%)`,
                    transition: "background 0.5s",
                }}
            />

            <div style={{ position: "relative", zIndex: 1, display: "flex", flex: 1, paddingTop: "62px", overflow: "auto", minHeight: 0 }}>

                {/* LEFT — character art (centered vertically) */}
                <div
                    style={{
                        width: "48%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 10px 0 30px",
                        position: "relative",
                        overflow: "hidden",
                        minHeight: 0,
                    }}
                >
                    {/* Blurred ghost behind */}
                    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%) scale(1.15)", opacity: 0.12, filter: "blur(20px)", zIndex: 0 }}>
                        <CharacterFigure char={char} height={Math.min(window.innerHeight * 0.7, 480)} centerImage />
                    </div>

                    {/* Main character — centered */}
                    <div
                        style={{
                            transform: visible ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.93)",
                            opacity: visible ? 1 : 0,
                            transition: "all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                            zIndex: 1,
                            position: "relative",
                        }}
                    >
                        <CharacterFigure char={char} height={Math.min(window.innerHeight * 0.7, 480)} centerImage />
                    </div>
                </div>

                {/* RIGHT — info panel (ensures APPEARANCES is visible with proper scroll) */}
                <div
                    style={{
                        width: "52%",
                        flex: 1,
                        minWidth: 0,
                        minHeight: 0,
                        padding: "40px 44px 80px 16px",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        overflowX: "hidden",
                        scrollbarWidth: "none",
                        transform: visible ? "translateX(0)" : "translateX(30px)",
                        opacity: visible ? 1 : 0,
                        transition: "all 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s",
                    }}
                >
                    {/* Red top line */}
                    <div style={{ width: "260px", height: "2px", background: "#c0392b", marginBottom: "12px", boxShadow: "0 0 8px #c0392b66" }} />

                    {/* Group */}
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "3px", color: "rgba(255,255,255,0.65)", textTransform: "uppercase", marginBottom: "8px" }}>
                        {char.group}
                    </div>

                    {/* Name */}
                    <h2
                        style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: "clamp(36px, 4.5vw, 58px)",
                            color: "#fff",
                            lineHeight: 0.95,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            marginBottom: "26px",
                            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                        }}
                    >
                        {char.nameLine1}<br />{char.nameLine2}
                    </h2>

                    {/* Background label */}
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        BACKGROUND
                    </div>

                    {/* Stats table */}
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "22px" }}>
                        <tbody>
                            {[...Object.entries(char.stats), ...(char.power != null ? [["POWER LEVEL", char.power] ] : [])].map(([key, val]) => (
                                <tr key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    <td style={{ padding: "5px 12px 5px 0", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "9.5px", fontWeight: 600, width: "38%", fontFamily: "'Barlow Condensed', sans-serif", verticalAlign: "top", paddingTop: "8px" }}>
                                        {key}
                                    </td>
                                    <td style={{ padding: "6px 0", color: "rgba(255,255,255,0.82)", fontSize: "12px", lineHeight: 1.55, fontFamily: "'Barlow', sans-serif" }}>
                                        {val}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Compare power toggle button */}
                    {char.power != null && allChars.length > 0 && (
                        <div style={{ marginBottom: "20px" }}>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.04, boxShadow: "0 0 18px rgba(192,57,43,0.6)" }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowCompare((v) => !v)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "4px",
                                    border: "1px solid rgba(255,255,255,0.4)",
                                    background: showCompare ? "linear-gradient(135deg, #c0392b, #7b241c)" : "transparent",
                                    color: "#fff",
                                    cursor: "pointer",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "11px",
                                    letterSpacing: "3px",
                                    textTransform: "uppercase",
                                }}
                            >
                                {showCompare ? "Hide Comparison" : "Compare Power"}
                            </motion.button>
                        </div>
                    )}

                    {/* Appearances */}
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "14px", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        APPEARANCES
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {char.movies.slice(0, 5).map((movie, i) => (
                            <div
                                key={movie.title}
                                style={{
                                    width: "64px",
                                    height: "92px",
                                    borderRadius: "4px",
                                    background: `linear-gradient(160deg, ${MOVIE_COLORS[i % MOVIE_COLORS.length]}, #0d0d1a)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    flexShrink: 0,
                                    overflow: "hidden",
                                    transition: "transform 0.2s, border-color 0.2s",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                            >
                                {movie.poster ? (
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                ) : (
                                    <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.55)", textAlign: "center", lineHeight: 1.3, fontFamily: "'Barlow', sans-serif", padding: "6px" }}>{movie.title}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Compare power expanded section */}
                    <AnimatePresence initial={false}>
                        {showCompare && char.power != null && allChars.length > 0 && (() => {
                            const others = allChars.filter(c => c.id !== char.id && typeof c.power === "number");
                            const stronger = [...others].filter(c => c.power > char.power).sort((a, b) => b.power - a.power);
                            const weaker = [...others].filter(c => c.power < char.power).sort((a, b) => a.power - b.power);

                            const renderCard = (c, idx, type) => {
                                const diff = c.power - char.power;
                                const isStronger = diff > 0;
                                const magnitude = Math.min(Math.abs(diff), 40); // cap bar size
                                const barWidth = `${(magnitude / 40) * 100}%`;
                                const barColor = isStronger ? "#e74c3c" : "#27ae60";
                                const label = `${diff > 0 ? "+" : ""}${diff} Power`;

                                return (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                                        whileHover={{ scale: 1.03, boxShadow: "0 0 18px rgba(255,255,255,0.22)" }}
                                        style={{
                                            background: "rgba(0,0,0,0.6)",
                                            borderRadius: "6px",
                                            overflow: "hidden",
                                            border: "1px solid rgba(255,255,255,0.18)",
                                            width: "100%",
                                            maxWidth: "180px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {c.image && (
                                            <div style={{ width: "100%", height: "110px", overflow: "hidden" }}>
                                                <img
                                                    src={c.image}
                                                    alt={`${c.nameLine1} ${c.nameLine2}`}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                                />
                                            </div>
                                        )}
                                        <div style={{ padding: "8px 10px" }}>
                                            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "2px" }}>
                                                {c.nameLine1} {c.nameLine2}
                                            </div>
                                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", marginBottom: "4px" }}>
                                                Power: <span style={{ color: "#fff", fontWeight: 600 }}>{c.power}</span>
                                            </div>
                                            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", marginBottom: "4px" }}>
                                                {label}
                                            </div>
                                            <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
                                                <div
                                                    style={{
                                                        width: barWidth,
                                                        height: "100%",
                                                        background: barColor,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            };

                            return (
                                <motion.div
                                    key="compare-section"
                                    initial={{ opacity: 0, y: 16, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: 16, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ marginTop: "18px", overflow: "hidden" }}
                                >
                                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "10px" }}>
                                        POWER COMPARISON
                                    </div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "14px", fontFamily: "'Barlow', sans-serif" }}>
                                        Overall power level: <span style={{ color: "#fff", fontWeight: 600 }}>{char.power}</span>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px" }}>
                                        <div style={{ flex: "1 1 200px", minWidth: "0" }}>
                                            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", color: "rgba(231,76,60,0.9)", textTransform: "uppercase", marginBottom: "8px" }}>
                                                Stronger Avengers
                                            </div>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                {stronger.length === 0 ? (
                                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>None</div>
                                                ) : (
                                                    stronger.map((c, idx) => renderCard(c, idx, "stronger"))
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ flex: "1 1 200px", minWidth: "0" }}>
                                            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", color: "rgba(46,204,113,0.9)", textTransform: "uppercase", marginBottom: "8px" }}>
                                                Weaker Avengers
                                            </div>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                                {weaker.length === 0 ? (
                                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>None</div>
                                                ) : (
                                                    weaker.map((c, idx) => renderCard(c, idx, "weaker"))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
