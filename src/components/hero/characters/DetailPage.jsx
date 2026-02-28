import { useState, useEffect } from "react";
import ThreeBackground from "./ThreeBackground";
import CharacterFigure from "./CharacterFigure";

const MOVIE_COLORS = ["#1a2a4a", "#2a1a1a", "#1a3a1a", "#2a2a1a", "#2a1a3a"];

// ─────────────────────────────────────────────
// DETAIL PAGE
// ─────────────────────────────────────────────
export default function DetailPage({ char, onBack }) {
    const [visible, setVisible] = useState(false);

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
                            {Object.entries(char.stats).map(([key, val]) => (
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
                </div>
            </div>
        </div>
    );
}
