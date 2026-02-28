import { useState, useEffect, useRef, useCallback } from "react";
import ThreeBackground from "./ThreeBackground";
import CharacterFigure from "./CharacterFigure";
import { CHARACTERS } from "./data/characters";

// ─────────────────────────────────────────────
// CHOOSE PAGE
// ─────────────────────────────────────────────
export default function ChoosePage({ onSelect, selectedIdx, setSelectedIdx }) {
    const rowRef = useRef(null);
    const wrapRef = useRef(null);
    const [rowOffset, setRowOffset] = useState(0);
    const [zoomed, setZoomed] = useState(false); // First click = zoom + blur, second = details
    const scrollAccRef = useRef(0);
    const isScrollingRef = useRef(false);

    const centerOn = useCallback((idx) => {
        if (!rowRef.current || !wrapRef.current) return;
        const figs = rowRef.current.querySelectorAll("[data-fig]");
        if (!figs[idx]) return;
        const wrap = wrapRef.current;
        const fig = figs[idx];
        const wrapW = wrap.offsetWidth;
        const figLeft = fig.offsetLeft;
        const figW = fig.offsetWidth;
        setRowOffset(-(figLeft - wrapW / 2 + figW / 2));
    }, []);

    useEffect(() => {
        setTimeout(() => centerOn(selectedIdx), 50);
    }, [selectedIdx, centerOn]);

    // Reset zoom when selecting a different character
    useEffect(() => {
        setZoomed(false);
    }, [selectedIdx]);

    useEffect(() => {
        const ro = new ResizeObserver(() => centerOn(selectedIdx));
        if (wrapRef.current) ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, [selectedIdx, centerOn]);

    // Mouse wheel / trackpad scroll to navigate characters
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            scrollAccRef.current += e.deltaY || e.deltaX;

            if (!isScrollingRef.current) {
                isScrollingRef.current = true;
                const threshold = 60;

                const processScroll = () => {
                    if (Math.abs(scrollAccRef.current) >= threshold) {
                        const direction = scrollAccRef.current > 0 ? 1 : -1;
                        scrollAccRef.current = 0;
                        setSelectedIdx((prev) => {
                            const next = Math.max(0, Math.min(CHARACTERS.length - 1, prev + direction));
                            return next;
                        });
                    } else {
                        scrollAccRef.current = 0;
                    }
                    isScrollingRef.current = false;
                };

                setTimeout(processScroll, 80);
            }
        };

        // Also support keyboard arrow keys
        const handleKey = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                setSelectedIdx((p) => Math.min(CHARACTERS.length - 1, p + 1));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                setSelectedIdx((p) => Math.max(0, p - 1));
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKey);
        };
    }, [setSelectedIdx]);

    const char = CHARACTERS[selectedIdx];

    const arrowBtnStyle = {
        width: "48px", height: "48px", borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.5)",
        background: "transparent", color: "#fff", fontSize: "18px",
        cursor: "none", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", flexShrink: 0,
    };

    return (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", overflow: "visible", cursor: "none" }}>

            <ThreeBackground bgColor={char.bgColor} />

            {/* BG color layer */}
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 60%, ${char.bgColor}cc 0%, ${char.bgColor}88 40%, #0d0d1a 100%)`, transition: "background 0.6s ease", zIndex: 0 }} />

            {/* Header — lower z-index so character images appear above when zoomed */}
            <div style={{ position: "relative", zIndex: 1, padding: "82px 52px 0", flexShrink: 0, pointerEvents: "none" }}>
                <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(52px, 7.5vw, 96px)", color: "#fff", lineHeight: 0.9, letterSpacing: "1px", textTransform: "uppercase", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>
                    CHOOSE<br />CHARACTER
                </h1>
                <div style={{ width: "100%", height: "2px", background: "#c0392b", marginTop: "18px", boxShadow: "0 0 10px #c0392b88" }} />
            </div>

            {/* Characters row — higher z-index so images appear above header/red line */}
            <div ref={wrapRef} style={{ position: "relative", zIndex: 10, flex: 1, overflow: "visible", display: "flex", alignItems: "flex-end" }}>
                <div
                    ref={rowRef}
                    style={{
                        display: "flex", alignItems: "flex-end", gap: "0px",
                        transform: `translateX(${rowOffset}px)`,
                        transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                        paddingBottom: "8px", willChange: "transform",
                    }}
                >
                    {CHARACTERS.map((ch, i) => {
                        const isSelected = i === selectedIdx;
                        const dist = Math.abs(i - selectedIdx);
                        const isNeighbor = dist === 1; // left or right of selected
                        // When zoomed: selected zooms in, neighbors blur
                        const scale = isSelected
                            ? (zoomed ? 1.55 : 1.06)
                            : dist === 1 ? 0.9 : 0.78;
                        const opacity = isSelected ? 1 : dist === 1 ? (zoomed ? 0.35 : 0.7) : (zoomed ? 0.15 : 0.45);
                        const filter = zoomed && isNeighbor ? "blur(6px)" : "none";
                        return (
                            <div
                                key={ch.id}
                                data-fig
                                onClick={() => {
                                    if (isSelected) {
                                        if (zoomed) onSelect(i);
                                        else setZoomed(true);
                                    } else {
                                        setSelectedIdx(i);
                                    }
                                }}
                                style={{
                                    flexShrink: 0,
                                    width: "clamp(110px, 12vw, 165px)",
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "flex-end",
                                    cursor: "none",
                                    transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease, filter 0.5s ease",
                                    transform: `translateY(${isSelected ? (zoomed ? "-140px" : "-14px") : "0"}) scale(${scale})`,
                                    opacity, position: "relative", padding: "0 6px",
                                    filter,
                                }}
                            >
                                <CharacterFigure char={ch} height={isSelected ? (zoomed ? 440 : 290) : 240} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Zoomed hint — "Click again for details" */}
            {zoomed && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "90px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "12px",
                        letterSpacing: "4px",
                        color: "rgba(255,255,255,0.7)",
                        textTransform: "uppercase",
                        animation: "fadeIn 0.4s ease",
                    }}
                >
                    CLICK AGAIN FOR DETAILS
                </div>
            )}

            {/* Footer — arrows + group info */}
            <div style={{ position: "relative", zIndex: 10, padding: "14px 52px 26px", display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
                <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
                    <button
                        onClick={() => setSelectedIdx((p) => Math.max(0, p - 1))}
                        style={arrowBtnStyle}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                    >←</button>
                    <button
                        onClick={() => setSelectedIdx((p) => Math.min(CHARACTERS.length - 1, p + 1))}
                        style={arrowBtnStyle}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                    >→</button>
                </div>
                <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "14px", letterSpacing: "3px", color: "#fff", textTransform: "uppercase", marginBottom: "5px" }}>
                        AVENGERS
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "340px" }}>
                        Earth's Mightiest Heroes stand as the planet's first line of defense against the most powerful threats in the universe.
                    </div>
                </div>
            </div>
        </div>
    );
}
