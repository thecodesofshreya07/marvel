import { useState } from "react";
import { CHARACTERS } from "./data/characters";
import ChoosePage from "./ChoosePage";
import DetailPage from "./DetailPage";
import CustomCursor from "./CustomCursor";
import TeamBuilder from "./TeamBuilder";

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function MarvelApp() {
    const [page, setPage] = useState("choose"); // "choose" | "detail" | "team"
    const [selectedIdx, setSelectedIdx] = useState(3);
    const [transitioning, setTransitioning] = useState(false);
    const [displayPage, setDisplayPage] = useState("choose");

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
                    <button
                        type="button"
                        onClick={() => transitionTo("team")}
                        style={{
                            padding: "6px 14px",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "11px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            border: "1px solid rgba(255,255,255,0.4)",
                            background: page === "team" ? "rgba(192,57,43,0.4)" : "transparent",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        Team Builder
                    </button>
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

            {/* CHOOSE PAGE */}
            <div style={{ opacity: displayPage === "choose" ? 1 : 0, pointerEvents: displayPage === "choose" ? "all" : "none", position: "absolute", inset: 0, transition: "opacity 0.3s", overflow: "visible" }}>
                <ChoosePage onSelect={handleSelect} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} />
            </div>

            {/* TEAM BUILDER PAGE */}
            <div style={{ opacity: displayPage === "team" ? 1 : 0, pointerEvents: displayPage === "team" ? "all" : "none", position: "absolute", inset: 0, transition: "opacity 0.3s" }}>
                {displayPage === "team" && <TeamBuilder characters={CHARACTERS} onBack={() => transitionTo("choose")} />}
            </div>

            {/* DETAIL PAGE */}
            <div style={{ opacity: displayPage === "detail" ? 1 : 0, pointerEvents: displayPage === "detail" ? "all" : "none", position: "absolute", inset: 0, transition: "opacity 0.3s" }}>
                {displayPage === "detail" && <DetailPage char={char} allChars={CHARACTERS} onBack={handleBack} />}
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