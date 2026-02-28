// ─────────────────────────────────────────────
// CHARACTER FIGURE — displays actual character images
// Same API: <CharacterFigure char={char} height={320} centerImage={false} />
// centerImage: when true, image is vertically centered (for detail page)
// ─────────────────────────────────────────────
export default function CharacterFigure({ char, height = 320, centerImage = false }) {
    return (
        <div
            style={{
                height,
                width: height * 0.55,
                display: "flex",
                alignItems: centerImage ? "center" : "flex-end",
                justifyContent: "center",
                position: "relative",
                filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8))",
            }}
        >
            {/* Colour aura glow underneath */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    height: "40%",
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse, ${char.accentSuit}55 0%, ${char.bgColor}00 70%)`,
                    filter: "blur(18px)",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />

            {/* Character portrait image — mix-blend-mode helps light backgrounds blend on dark UI */}
            {char.image && (
                <img
                    src={char.image}
                    alt={char.nameLine1 + " " + char.nameLine2}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: centerImage ? "center center" : "bottom center",
                        position: "relative",
                        zIndex: 1,
                    }}
                />
            )}
        </div>
    );
}
