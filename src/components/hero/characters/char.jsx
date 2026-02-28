import { useState, lazy, Suspense } from "react";
import { CHARACTERS } from "./data/characters";
import ChoosePage from "./ChoosePage";
import DetailPage from "./DetailPage";
import CustomCursor from "./CustomCursor";

const MultiverseOrbitSection = lazy(() =>
    import("../../3d/MultiverseOrbitSection.jsx").then((m) => ({ default: m.default }))
);

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function MarvelApp() {
    const [page, setPage] = useState("choose"); // "choose" | "detail"
    const [selectedIdx, setSelectedIdx] = useState(3);
    const [transitioning, setTransitioning] = useState(false);
    const [displayPage, setDisplayPage] = useState("choose");
    const [chooseView, setChooseView] = useState("carousel"); // "carousel" | "multiverse"

    const transitionTo = (newPage) => {
        setTransitioning(true);
        setTimeout(() => {
            setDisplayPage(newPage);
            setPage(newPage);
            setTimeout(() => setTransitioning(false), 50);
        }, 280);
    };

    const handleSelect = (idx) => {
        setSelectedIdx(idx);
        transitionTo("detail");
    };

    const handleBack = () => {
        transitionTo("choose");
    };

    const char = CHARACTERS[selectedIdx];

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#0d0d1a", overflow: "hidden", position: "relative", fontFamily: "'Barlow', sans-serif", cursor: "none" }}>

            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@600;700;800&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { display:none; }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 16px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 28px rgba(255,255,255,0.55); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        button { outline: none; }
      `}</style>

            {/* NAV */}
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 32px", background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)" }}>
                <div style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", cursor: "pointer", letterSpacing: "3px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>≡</div>
                <div style={{ fontFamily: "'Anton', sans-serif", fontSize: "22px", letterSpacing: "4px", color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>MARVEL</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {displayPage === "choose" && (
                        <div style={{ display: "flex", gap: "4px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>
                            <button
                                type="button"
                                onClick={() => setChooseView("carousel")}
                                style={{
                                    padding: "6px 12px",
                                    background: chooseView === "carousel" ? "rgba(192,57,43,0.4)" : "transparent",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    color: "#fff",
                                    cursor: "pointer",
                                    textTransform: "uppercase",
                                }}
                            >
                                Carousel
                            </button>
                            <button
                                type="button"
                                onClick={() => setChooseView("multiverse")}
                                style={{
                                    padding: "6px 12px",
                                    background: chooseView === "multiverse" ? "rgba(192,57,43,0.4)" : "transparent",
                                    border: "1px solid rgba(255,255,255,0.3)",
                                    color: "#fff",
                                    cursor: "pointer",
                                    textTransform: "uppercase",
                                }}
                            >
                                Multiverse
                            </button>
                        </div>
                    )}
                    <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>👤</div>
                </div>
            </nav>

            {/* Custom cursor — moves on both choose and detail pages */}
            <CustomCursor />

            {/* PAGE TRANSITION OVERLAY */}
            <div
                style={{
                    position: "fixed", inset: 0, zIndex: 999,
                    background: "#000",
                    opacity: transitioning ? 1 : 0,
                    pointerEvents: transitioning ? "all" : "none",
                    transition: "opacity 0.28s ease",
                }}
            />

            {/* CHOOSE PAGE — carousel or 3D multiverse orbit */}
            <div style={{ opacity: displayPage === "choose" ? 1 : 0, pointerEvents: displayPage === "choose" ? "all" : "none", position: "absolute", inset: 0, transition: "opacity 0.3s", overflow: "visible" }}>
                {chooseView === "carousel" && (
                    <ChoosePage onSelect={handleSelect} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
                )}
                {chooseView === "multiverse" && (
                    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.6)", fontFamily: "'Barlow Condensed', sans-serif" }}>Loading Multiverse…</div>}>
                        <MultiverseOrbitSection
                            characters={CHARACTERS}
                            selectedIndex={selectedIdx}
                            onSelect={setSelectedIdx}
                            onConfirmSelection={handleSelect}
                            accentColor={char?.accentColor ?? "#c0392b"}
                        />
                    </Suspense>
                )}
            </div>

            {/* DETAIL PAGE */}
            <div style={{ opacity: displayPage === "detail" ? 1 : 0, pointerEvents: displayPage === "detail" ? "all" : "none", position: "absolute", inset: 0, transition: "opacity 0.3s" }}>
                {displayPage === "detail" && <DetailPage char={char} onBack={handleBack} />}
            </div>

            {/* BACK BUTTON */}
            {displayPage === "detail" && (
                <button
                    onClick={handleBack}
                    style={{
                        position: "fixed", bottom: "28px", left: "32px", zIndex: 200,
                        background: "transparent",
                        border: "1.5px solid rgba(255,255,255,0.35)",
                        color: "#fff",
                        padding: "10px 26px",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700, fontSize: "12px", letterSpacing: "3px",
                        textTransform: "uppercase", cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.7)"; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.35)"; }}
                >
                    ← BACK
                </button>
            )}
        </div>
    );
}