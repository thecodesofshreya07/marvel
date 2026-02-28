import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// POWER COMPARE — cinematic comparison panel
// ─────────────────────────────────────────────

// Stagger animation variants
const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        transition: {
            height: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.3, delay: 0.1 },
            staggerChildren: 0.07,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            height: { duration: 0.35, delay: 0.1 },
            opacity: { duration: 0.2 },
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
};

const sectionLabelVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// ─── Character Card ───
function CharCard({ char: c, diff, isStronger, selectedPower }) {
    const barWidth = Math.min(100, Math.max(8, c.power));
    const selectedBarWidth = Math.min(100, Math.max(8, selectedPower));
    const diffColor = isStronger ? "#e74c3c" : "#2ecc71";
    const diffSign = isStronger ? "+" : "";

    return (
        <motion.div
            variants={cardVariants}
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                padding: "10px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
            }}
            whileHover={{
                borderColor: `${diffColor}55`,
                backgroundColor: "rgba(255,255,255,0.07)",
                boxShadow: `0 0 18px ${diffColor}22, inset 0 0 30px ${diffColor}08`,
            }}
        >
            {/* Character thumbnail */}
            <div
                style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${diffColor}66`,
                    flexShrink: 0,
                    background: c.bgColor || "#1a1a2e",
                }}
            >
                {c.image ? (
                    <img
                        src={c.image}
                        alt={c.nameLine1}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            color: "rgba(255,255,255,0.6)",
                        }}
                    >
                        {c.nameLine1?.[0]}
                    </div>
                )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "12px",
                        letterSpacing: "1.5px",
                        color: "#fff",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {c.nameLine1} {c.nameLine2}
                </div>

                {/* Power bar */}
                <div
                    style={{
                        height: "4px",
                        width: "100%",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "2px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        style={{
                            height: "100%",
                            borderRadius: "2px",
                            background: `linear-gradient(90deg, ${diffColor}88, ${diffColor})`,
                            boxShadow: `0 0 6px ${diffColor}66`,
                        }}
                    />
                    {/* Ghost bar showing selected character's power for comparison */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100%",
                            width: `${selectedBarWidth}%`,
                            borderRight: "1.5px solid rgba(255,255,255,0.35)",
                        }}
                    />
                </div>
            </div>

            {/* Power value + diff */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                    style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: "18px",
                        color: "#fff",
                        lineHeight: 1,
                    }}
                >
                    {c.power}
                </div>
                <div
                    style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: diffColor,
                        letterSpacing: "0.5px",
                    }}
                >
                    {diffSign}{diff}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main component ───
export default function PowerCompare({ char, allChars, show }) {
    const { stronger, weaker } = useMemo(() => {
        if (!char?.power || !allChars?.length) return { stronger: [], weaker: [] };

        const others = allChars
            .filter((c) => c.id !== char.id && c.power != null);

        const strongerList = others
            .filter((c) => c.power > char.power)
            .sort((a, b) => b.power - a.power);

        const weakerList = others
            .filter((c) => c.power < char.power)
            .sort((a, b) => a.power - b.power);

        return { stronger: strongerList, weaker: weakerList };
    }, [char, allChars]);

    return (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div
                    key="power-compare"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ overflow: "hidden", marginTop: "16px" }}
                >
                    {/* ─── STRONGER section ─── */}
                    <motion.div variants={sectionLabelVariants}>
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: "11px",
                                letterSpacing: "3px",
                                color: "#e74c3c",
                                textTransform: "uppercase",
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <span style={{ fontSize: "13px" }}>🟥</span>
                            STRONGER AVENGERS
                            <span
                                style={{
                                    background: "rgba(231,76,60,0.15)",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    color: "#e74c3c",
                                }}
                            >
                                {stronger.length}
                            </span>
                        </div>
                    </motion.div>

                    {stronger.length === 0 ? (
                        <motion.div
                            variants={cardVariants}
                            style={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.45)",
                                fontStyle: "italic",
                                marginBottom: "16px",
                                fontFamily: "'Barlow', sans-serif",
                            }}
                        >
                            No one! {char.nameLine1} {char.nameLine2} is the most powerful Avenger!
                        </motion.div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: "8px",
                                marginBottom: "18px",
                            }}
                        >
                            {stronger.map((c) => (
                                <CharCard
                                    key={c.id}
                                    char={c}
                                    diff={c.power - char.power}
                                    isStronger
                                    selectedPower={char.power}
                                />
                            ))}
                        </div>
                    )}

                    {/* ─── WEAKER section ─── */}
                    <motion.div variants={sectionLabelVariants}>
                        <div
                            style={{
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 800,
                                fontSize: "11px",
                                letterSpacing: "3px",
                                color: "#2ecc71",
                                textTransform: "uppercase",
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <span style={{ fontSize: "13px" }}>🟨</span>
                            WEAKER AVENGERS
                            <span
                                style={{
                                    background: "rgba(46,204,113,0.15)",
                                    padding: "2px 8px",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    color: "#2ecc71",
                                }}
                            >
                                {weaker.length}
                            </span>
                        </div>
                    </motion.div>

                    {weaker.length === 0 ? (
                        <motion.div
                            variants={cardVariants}
                            style={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.45)",
                                fontStyle: "italic",
                                fontFamily: "'Barlow', sans-serif",
                            }}
                        >
                            No one is weaker!
                        </motion.div>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: "8px",
                            }}
                        >
                            {weaker.map((c) => (
                                <CharCard
                                    key={c.id}
                                    char={c}
                                    diff={c.power - char.power}
                                    isStronger={false}
                                    selectedPower={char.power}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
