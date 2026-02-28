import { useState, useMemo } from "react";

// ─────────────────────────────────────────────
// TEAM BUILDER PAGE
// ─────────────────────────────────────────────
export default function TeamBuilder({ characters, onBack }) {
    const [selectedIds, setSelectedIds] = useState(() => new Set());

    const toggleId = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const { totalPower, averagePower, memberCount, selectedChars } = useMemo(() => {
        const selected = characters.filter((c) => selectedIds.has(c.id));
        const count = selected.length;
        const sum = selected.reduce((acc, c) => acc + (c.power ?? 0), 0);
        return {
            totalPower: sum,
            averagePower: count ? Math.round(sum / count) : 0,
            memberCount: count,
            selectedChars: selected,
        };
    }, [characters, selectedIds]);

    return (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#0d0d1a", color: "#fff" }}>
            {/* Header */}
            <div style={{ padding: "80px 52px 16px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                    <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "2px", lineHeight: 1, textTransform: "uppercase" }}>
                        Team Builder
                    </h1>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "8px", maxWidth: "420px", fontFamily: "'Barlow', sans-serif" }}>
                        Select Avengers to form a squad and see their combined power level.
                    </div>
                </div>
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        style={{
                            background: "transparent",
                            border: "1px solid rgba(255,255,255,0.4)",
                            color: "#fff",
                            padding: "8px 18px",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "11px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            cursor: "pointer",
                        }}
                    >
                        ← Back to characters
                    </button>
                )}
            </div>

            {/* Content */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden", padding: "0 52px 32px", gap: "32px" }}>
                {/* Character list */}
                <div style={{ flex: 1.4, minWidth: 0, overflowY: "auto" }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "12px", letterSpacing: "2px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "10px" }}>
                        Select Avengers
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
                        {characters.map((c) => {
                            const selected = selectedIds.has(c.id);
                            return (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => toggleId(c.id)}
                                    style={{
                                        textAlign: "left",
                                        padding: "10px 12px",
                                        borderRadius: "6px",
                                        border: selected ? "1px solid #c0392b" : "1px solid rgba(255,255,255,0.18)",
                                        background: selected ? "linear-gradient(135deg, #c0392b33, #0d0d1a)" : "rgba(0,0,0,0.35)",
                                        cursor: "pointer",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                    }}
                                >
                                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "2px", fontSize: "12px", textTransform: "uppercase" }}>
                                        {c.nameLine1} {c.nameLine2}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                                        Power: <span style={{ color: "#fff" }}>{c.power ?? "N/A"}</span>
                                    </div>
                                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1px" }}>
                                        {c.group}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Summary panel */}
                <div style={{ flex: 1, minWidth: 0, borderLeft: "1px solid rgba(255,255,255,0.12)", paddingLeft: "24px", fontFamily: "'Barlow', sans-serif" }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "10px" }}>
                        Squad Summary
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                            Members: <span style={{ fontWeight: 600 }}>{memberCount}</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" }}>
                            Combined Power: <span style={{ fontWeight: 600 }}>{totalPower}</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                            Average Power: <span style={{ fontWeight: 600 }}>{averagePower}</span>
                        </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", marginBottom: "8px" }}>
                        Selected Avengers:
                    </div>
                    {selectedChars.length === 0 ? (
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>No team selected yet.</div>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>
                            {selectedChars.map((c) => (
                                <li key={c.id} style={{ marginBottom: "4px" }}>
                                    {c.nameLine1} {c.nameLine2}
                                    <span style={{ marginLeft: "6px", color: "rgba(255,255,255,0.6)" }}>({c.power})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

