import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { X, Play, Info } from "lucide-react";

import drstrangeMom from '../../assets/images_bhumi/drstrange_mom.jpg';
import endgame from '../../assets/images_bhumi/endgame.jpg';
import infinityMovie from '../../assets/images_bhumi/infinity_movie.jpg';
import nowayhome from '../../assets/images_bhumi/nowayhome.jpg';
import wandaVision from '../../assets/images_bhumi/wanda_vision.jpg';
import thor from '../../assets/images_bhumi/image.png'

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
`;

const CHARACTERS = {
    strange: {
        name: "DR. STEPHEN STRANGE", alter: "Doctor Strange // Sorcerer Supreme",
        avatar: "⬡", stats: { int: 92, pow: 88, com: 80, mys: 97 },
        abilities: ["Sling Rings", "Time Stone", "Astral Projection", "Dimensional Magic"],
        classification: "AVENGER — SORCERER SUPREME", reality: "Earth-616", threat: "OMEGA CLASS",
        color: "#7b2fbe", scanColor: "#00d4ff", glow: "rgba(123,47,190,0.35)", type: "strange",
        image: drstrangeMom, // Using stylized visual representations
    },
    wanda: {
        name: "WANDA MAXIMOFF", alter: "Scarlet Witch // Nexus Being",
        avatar: "✦", stats: { int: 85, pow: 100, com: 75, mys: 99 },
        abilities: ["Chaos Magic", "Reality Warp", "Telekinesis", "Mind Control"],
        classification: "NEXUS BEING — SCARLET WITCH", reality: "Earth-838 / 616", threat: "CELESTIAL CLASS",
        color: "#e63946", scanColor: "#ff2244", glow: "rgba(230,57,70,0.4)", type: "wanda",
        image: wandaVision,
    },
    ironman: {
        name: "TONY STARK", alter: "Iron Man // Man In The Machine",
        avatar: "◈", stats: { int: 99, pow: 82, com: 85, mys: 10 },
        abilities: ["Arc Reactor", "J.A.R.V.I.S.", "Extremis", "Quantum Tunnel"],
        classification: "AVENGER — GENIUS / BILLIONAIRE", reality: "Earth-616", threat: "ALPHA CLASS",
        color: "#0066ff", scanColor: "#00aaff", glow: "rgba(0,100,255,0.3)", type: "ironman",
        image: endgame,
    },
    thor: {
        name: "THOR ODINSON", alter: "God of Thunder // Avenger",
        avatar: "⚡", stats: { int: 72, pow: 95, com: 90, mys: 70 },
        abilities: ["Mjolnir", "Stormbreaker", "Lightning", "Asgardian Strength"],
        classification: "ASGARDIAN — GOD OF THUNDER", reality: "Asgard-616", threat: "ALPHA CLASS",
        color: "#ffd700", scanColor: "#ffd700", glow: "rgba(255,215,0,0.25)", type: "thor",
        image: thor,
    },
    spiderman: {
        name: "PETER PARKER", alter: "Spider-Man // Friendly Neighborhood",
        avatar: "◉", stats: { int: 88, pow: 70, com: 78, mys: 5 },
        abilities: ["Spider-Sense", "Web-Slingers", "Wall Crawling", "Enhanced Reflexes"],
        classification: "AVENGER — ENHANCED HUMAN", reality: "Earth-616", threat: "BETA CLASS",
        color: "#e63946", scanColor: "#e63946", glow: "rgba(230,57,70,0.3)", type: "spiderman",
        image: nowayhome,
    },
};

const TIMELINE = [
    { id: "im1", phase: "Phase 1", year: "2008", title: "Iron Man", chars: ["iron-man"], description: "Billionaire Tony Stark builds a high-tech suit.", director: "Jon Favreau", runtime: "126 min", poster: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=400&h=600" },
    { id: "th1", phase: "Phase 1", year: "2011", title: "Thor", chars: ["thor"], description: "The God Thor is cast out to live amongst humans.", director: "K. Branagh", runtime: "115 min", poster: "https://images.unsplash.com/photo-1608889175123-8ee362205f81?q=80&w=400&h=600" },
    { id: "av1", phase: "Phase 1", year: "2012", title: "The Avengers", chars: ["iron-man", "thor"], description: "Earth's mightiest heroes fight Loki.", director: "J. Whedon", runtime: "143 min", poster: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=400&h=600" },
    { id: "cw1", phase: "Phase 3", year: "2016", title: "Civil War", chars: ["iron-man", "spiderman"], description: "A rift between Cap and Iron Man.", director: "Russo Bros", runtime: "147 min", poster: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=400&h=600" },
    { id: "iw1", phase: "Phase 3", year: "2018", title: "Infinity War", chars: ["iron-man", "thor", "strange", "wanda"], description: "The Avengers must sacrifice to defeat Thanos.", director: "Russo Bros", runtime: "149 min", poster: "https://images.unsplash.com/photo-1618471171853-bf227f71dfb3?q=80&w=400&h=600" },
    { id: "eg1", phase: "Phase 3", year: "2019", title: "Endgame", chars: ["iron-man", "thor", "strange"], description: "The remaining Avengers assemble once more.", director: "Russo Bros", runtime: "181 min", poster: "https://images.unsplash.com/photo-1596727147705-611529ce2b9f?q=80&w=400&h=600" },
    { id: "wv1", phase: "Phase 4", year: "2021", title: "WandaVision", chars: ["wanda"], description: "Wanda and Vision live suburban lives.", director: "M. Shakman", runtime: "350m", poster: "https://images.unsplash.com/photo-1642106649757-bb09772b14bb?q=80&w=400&h=600" },
    { id: "nw1", phase: "Phase 4", year: "2021", title: "No Way Home", chars: ["spiderman", "strange"], description: "Peter asks Doctor Strange for help.", director: "J. Watts", runtime: "148 min", poster: "https://images.unsplash.com/photo-1604975701397-6365ccaeefe2?q=80&w=400&h=600" },
    { id: "mm1", phase: "Phase 4", year: "2022", title: "Dr Strange MoM", chars: ["strange", "wanda"], description: "Strange crosses into the Multiverse.", director: "S. Raimi", runtime: "126 min", poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&h=600" }
];

const CHAR_FILTERS = [
    { label: "ALL BRANCHES", value: "all" },
    { label: "IRON MAN", value: "iron-man" },
    { label: "THOR", value: "thor" },
    { label: "SCARLET WITCH", value: "wanda" },
    { label: "SPIDER-MAN", value: "spiderman" },
    { label: "DOCTOR STRANGE", value: "strange" },
];

// ─── STYLES ──────────────────────────────────────────────────
const GLOBAL_CSS = `
${FONTS}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; width:100%; }
body { background:#030308; color:#fff; font-family:'Rajdhani',sans-serif; overflow-x:hidden; cursor:none; width:100%; min-height:100vh; }
#root { width:100%; min-height:100vh; display:block; }
body.timeline-modal-open { cursor:default !important; }
.timeline-modal-overlay { cursor:pointer !important; }
.timeline-modal-content { cursor:default !important; }
.timeline-modal-close-btn { cursor:pointer !important; }
::-webkit-scrollbar { width:4px; height:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:#7b2fbe; border-radius:2px; }

@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes pulse { 0%,100%{transform:scale(1);filter:drop-shadow(0 0 20px #7b2fbe)} 50%{transform:scale(1.08);filter:drop-shadow(0 0 35px #7b2fbe) drop-shadow(0 0 15px #00d4ff)} }
@keyframes orbit { from{transform:rotate(0deg) translateX(var(--r))} to{transform:rotate(360deg) translateX(var(--r))} }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes laserScan { 0%{top:-5%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:105%;opacity:0} }
@keyframes chaos { 0%{transform:translate(0,0) scale(1);opacity:0.6} 33%{transform:translate(var(--cx),var(--cy)) scale(1.5);opacity:0.3} 100%{transform:translate(0,0) scale(1);opacity:0.6} }
@keyframes float { 0%,100%{transform:translateY(0) scale(1);opacity:0.15} 50%{transform:translateY(-30px) scale(1.2);opacity:0.3} }
@keyframes glitch { 0%,90%,100%{transform:translateX(0)} 95%{transform:translateX(-3px)} }

.portal-ring-1 { animation:spin 8s linear infinite; filter:drop-shadow(0 0 15px rgba(123,47,190,0.5)); }
.portal-ring-2 { animation:spin 12s linear infinite reverse; filter:drop-shadow(0 0 20px rgba(230,57,70,0.6)); }
.portal-ring-3 { animation:spin 6s linear infinite; filter:drop-shadow(0 0 10px rgba(0,212,255,0.4)); }
.portal-runes { animation:spin 20s linear infinite; opacity:0.3; }
.hero-float { animation:heroFloat 4s ease-in-out infinite; }
.status-dot { animation:blink 1.5s step-end infinite; }
.glitch::before { animation:glitch 4s infinite; animation-delay:1s; }

.dive-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#e63946,#7b2fbe); opacity:0; transition:opacity 0.3s; }
.dive-btn:hover::before { opacity:0.15; }
.dive-btn:hover { border-color:#e63946 !important; box-shadow:0 0 30px rgba(230,57,70,0.6), 0 0 60px rgba(230,57,70,0.2) !important; }

.char-pill:hover,.char-pill.active { color:#fff !important; border-color:#e63946 !important; background:rgba(230,57,70,0.1) !important; box-shadow:0 0 15px rgba(230,57,70,0.6) !important; text-shadow:0 0 8px rgba(230,57,70,0.8) !important; }
.nav-link:hover { color:#00d4ff !important; text-shadow:0 0 10px rgba(0,212,255,0.4) !important; }
`;

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [dot, setDot] = useState({ x: -100, y: -100 });
    const [scale, setScale] = useState(1);
    const ref = useRef({ x: -100, y: -100, cx: -100, cy: -100 });
    const mx = useRef(-100), my = useRef(-100);

    useEffect(() => {
        const move = (e) => { mx.current = e.clientX; my.current = e.clientY; setDot({ x: e.clientX, y: e.clientY }); };
        window.addEventListener("mousemove", move);
        let raf;
        const animate = () => {
            ref.current.cx += (mx.current - ref.current.cx) * 0.12;
            ref.current.cy += (my.current - ref.current.cy) * 0.12;
            setPos({ x: ref.current.cx, y: ref.current.cy });
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
    }, []);

    return { pos, dot, scale, setScale };
}

function useStarfield(canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let stars = [], raf;
        const resize = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            stars = Array.from({ length: 220 }, () => ({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3, a: Math.random(), s: Math.random() * 0.004 + 0.001,
                color: Math.random() < 0.15 ? "rgba(123,47,190," : "rgba(255,255,255,",
            }));
        };
        resize();
        window.addEventListener("resize", resize);
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((s) => {
                s.a += s.s; if (s.a > 1 || s.a < 0) s.s *= -1;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = s.color + s.a + ")"; ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
    }, [canvasRef]);
}

function useHudClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            const n = new Date();
            setTime(`TIMELINE: ACTIVE — ${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}:${String(n.getSeconds()).padStart(2, "0")}`);
        };
        update(); const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return time;
}

function useParallaxPortal() {
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    useEffect(() => {
        const move = (e) => {
            setTilt({ rx: (e.clientY / window.innerHeight - 0.5) * -18, ry: (e.clientX / window.innerWidth - 0.5) * 18 });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);
    return tilt;
}

// ─── EFFECTS HOOK ──────────────────────────────────────────────────────────
function TiltCard({ children, style, className, onClick }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.div
            className={className}
            style={{ ...style, x: 0, y: 0, rotateX, rotateY, z: 100, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Cursor({ pos, dot, scale, hideWhenModalOpen }) {
    if (hideWhenModalOpen) return null;
    return (
        <>
            <div style={{ position: "fixed", top: 0, left: 0, width: 20, height: 20, border: "2px solid #00d4ff", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: `translate(${pos.x - 10}px, ${pos.y - 10}px) scale(${scale})`, mixBlendMode: "screen", transition: "transform 0.2s ease", boxShadow: "0 0 8px rgba(0,212,255,0.4)" }} />
            <div style={{ position: "fixed", top: 0, left: 0, width: 6, height: 6, background: "#00d4ff", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: `translate(${dot.x - 3}px, ${dot.y - 3}px)`, boxShadow: "0 0 10px #00d4ff" }} />
        </>
    );
}

function Nav({ hudTime }) {
    return (
        <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "16px 48px", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)", background: "rgba(3,3,8,0.6)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.3em", color: "#e63946", textShadow: "0 0 20px rgba(230,57,70,0.6),0 0 40px rgba(230,57,70,0.6)" }}>◈ MARVEL — MNE</div>
            <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
                {["ENTRY POINT", "TIMELINE", "IDENTITY SCAN", "MULTIVERSE"].map((l, i) => (
                    <li key={i}><a href={["#hero", "#timeline", "#character", "#multiverse"][i]} className="nav-link" style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.3s,text-shadow 0.3s" }}>{l}</a></li>
                ))}
            </ul>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{hudTime}</div>
        </motion.nav>
    );
}

function Portal({ tilt }) {
    const particles = Array.from({ length: 20 }, (_, i) => {
        const r = 130 + Math.random() * 30;
        const dur = 4 + (i * 0.4);
        const colors = ["#7b2fbe", "#e63946", "#00d4ff"];
        return { r, dur, color: colors[i % 3], sz: 2 + (i % 3), del: (i * 0.3) % dur };
    });

    return (
        <div style={{ position: "relative", width: 320, height: 320, transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: "transform 0.1s ease" }}>
            {[
                { inset: 0, cls: "portal-ring-1", grad: `conic-gradient(from 0deg, transparent 60%, #7b2fbe 80%, transparent 100%)` },
                { inset: 12, cls: "portal-ring-2", grad: `conic-gradient(from 120deg, transparent 60%, #e63946 80%, transparent 100%)` },
                { inset: 24, cls: "portal-ring-3", grad: `conic-gradient(from 240deg, transparent 60%, #00d4ff 80%, transparent 100%)` },
            ].map(({ inset, cls, grad }) => (
                <div key={cls} className={cls} style={{ position: "absolute", inset, borderRadius: "50%", background: grad }} />
            ))}
            <div style={{ position: "absolute", inset: 36, borderRadius: "50%", background: "radial-gradient(ellipse at 40% 35%, rgba(123,47,190,0.8) 0%, rgba(0,0,20,0.95) 60%, rgba(0,212,255,0.1) 100%)", boxShadow: "inset 0 0 40px rgba(123,47,190,0.5),inset 0 0 80px rgba(0,0,30,0.8),0 0 60px rgba(123,47,190,0.3)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg className="portal-runes" style={{ position: "absolute", inset: 0 }} viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" stroke="rgba(123,47,190,0.5)" strokeWidth="0.5" fill="none" />
                    <defs><path id="rp" d="M100,15 A85,85 0 1,1 99.9,15" /></defs>
                    <text fontSize="10" fill="rgba(123,47,190,0.6)" fontFamily="serif"><textPath href="#rp">✦ DORMAMMU ✦ AGAMOTTO ✦ VISHANTI ✦ OCTESSENCE ✦ </textPath></text>
                </svg>
                <div className="portal-eye" style={{ fontSize: "3rem", zIndex: 2, filter: "drop-shadow(0 0 20px #7b2fbe)" }}>◈</div>
            </div>
            {particles.map((p, i) => (
                <div key={i} style={{ position: "absolute", width: p.sz, height: p.sz, borderRadius: "50%", background: p.color, top: "50%", left: "50%", transformOrigin: `${p.r}px center`, animation: `orbit ${p.dur}s linear infinite ${p.del}s` }} />
            ))}
        </div>
    );
}

function HeroSection({ onDive }) {
    const canvasRef = useRef(null);
    const tilt = useParallaxPortal();
    useStarfield(canvasRef);

    return (
        <section id="hero" style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,212,255,0.01) 2px,rgba(0,212,255,0.01) 4px)" }} />

            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.4em", color: "#00d4ff" }}>MARVEL STUDIOS — NARRATIVE ENGINE v4.0</div>
                <Portal tilt={tilt} />
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
                    <h1 className="glitch" data-text="TRAVERSE THE" style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 900, textAlign: "center", lineHeight: 1.1, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        TRAVERSE THE<br />
                        <span style={{ color: "#e63946", textShadow: "0 0 30px rgba(230,57,70,0.6)" }}>MULTIVERSE</span>
                    </h1>
                    <p style={{ fontSize: "1rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", maxWidth: 400 }}>A 3D-spatial narrative engine for fans to traverse the MCU across infinite realities</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
                    <button onClick={onDive} className="dive-btn" style={{ position: "relative", padding: "14px 48px", background: "transparent", border: "1px solid rgba(230,57,70,0.5)", color: "#fff", fontFamily: "'Orbitron',sans-serif", fontSize: "0.8rem", letterSpacing: "0.3em", cursor: "none", clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)" }}>
                        <span style={{ position: "relative", zIndex: 1 }}>⬡ ENTER THE NEXUS</span>
                    </button>
                    <a href="#multiverse" style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.5)", color: "#ffd700", fontFamily: "'Orbitron',sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none", clipPath: "polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%)", cursor: "pointer" }}>
                        ✦ EXPLORE MULTIVERSE
                    </a>
                </div>
                </div>
            </motion.div>
        </section>
    );
}

function TimelineModal({ item, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        document.body.classList.add("timeline-modal-open");
        window.addEventListener("keydown", handleEsc);
        return () => {
            document.body.classList.remove("timeline-modal-open");
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="timeline-modal-overlay"
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                width: "100vw",
                minHeight: "100vh",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.88)",
                backdropFilter: "blur(20px)",
                padding: 16,
                boxSizing: "border-box",
                overflow: "auto",
            }}
        >
            <motion.div
                layoutId={`card-${item.id}`}
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="timeline-modal-content"
                style={{
                    background: "linear-gradient(180deg, rgba(20,8,35,0.98) 0%, rgba(8,2,18,0.98) 100%)",
                    border: "2px solid #e63946",
                    outline: "1px solid rgba(255,215,0,0.4)",
                    outlineOffset: 2,
                    padding: 0,
                    width: "100%",
                    maxWidth: 820,
                    maxHeight: "90vh",
                    margin: "auto",
                    position: "relative",
                    overflow: "auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1.5fr",
                    gap: 0,
                    boxShadow: "0 0 80px rgba(230,57,70,0.2), 0 0 120px rgba(123,47,190,0.15), inset 0 0 60px rgba(0,0,0,0.3)",
                    clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
                }}
            >
                {/* Marvel Studios header bar */}
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "linear-gradient(90deg, #c41e3a 0%, #8b0000 50%, #0d0d0d 100%)", borderBottom: "1px solid rgba(255,215,0,0.4)" }}>
                    <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: "0.75rem", letterSpacing: "0.35em", color: "#ffd700", textShadow: "0 0 12px rgba(255,215,0,0.6)" }}>
                        ◈ MARVEL STUDIOS — ARCHIVE
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="timeline-modal-close-btn"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 18px",
                            background: "rgba(230,57,70,0.9)",
                            border: "1px solid #ffd700",
                            color: "#fff",
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: "0.7rem",
                            letterSpacing: "0.2em",
                            fontWeight: 700,
                            boxShadow: "0 0 20px rgba(230,57,70,0.5)",
                        }}
                    >
                        <X size={18} /> CLOSE
                    </button>
                </div>

                <p style={{ gridColumn: "1 / -1", margin: 0, padding: "8px 20px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                    Click outside or press ESC to return
                </p>

                <div style={{ position: "relative", height: 380, borderRight: "1px solid rgba(255,215,0,0.15)", overflow: "hidden" }}>
                    <img src={item.poster} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) contrast(1.15)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,2,18,0.98), transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                        <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#e63946", fontSize: "0.7rem", letterSpacing: "0.2em", textShadow: "0 0 10px rgba(230,57,70,0.8)" }}>
                            {item.phase} // {item.year}
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px 28px 28px" }}>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 12, color: "#fff", textShadow: "0 0 24px rgba(123,47,190,0.5), 0 0 8px rgba(230,57,70,0.3)" }}>
                        {item.title}
                    </h2>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                        <div style={{ background: "rgba(255,255,255,0.06)", padding: "8px 14px", borderLeft: "3px solid #00d4ff" }}>
                            <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>DIRECTOR</p>
                            <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.director}</p>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.06)", padding: "8px 14px", borderLeft: "3px solid #7b2fbe" }}>
                            <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>RUNTIME</p>
                            <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.runtime}</p>
                        </div>
                    </div>

                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 24 }}>{item.description}</p>

                    <button className="timeline-modal-close-btn" style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "linear-gradient(135deg, rgba(230,57,70,0.3), rgba(123,47,190,0.2))", border: "1px solid #e63946", color: "#fff", fontFamily: "'Orbitron',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", boxShadow: "0 0 20px rgba(230,57,70,0.3)" }}>
                        <Play size={16} fill="currentColor" /> INITIATE PLAYBACK
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function TimelineNode({ item, index, activeFilter, onSelect }) {
    const isEven = index % 2 === 0;
    const isHighlighted = activeFilter !== "all" && item.chars.includes(activeFilter);
    const isDimmed = activeFilter !== "all" && !item.chars.includes(activeFilter);

    return (
        <div style={{ position: "relative", flexShrink: 0, margin: "0 24px", transform: isEven ? "none" : "translateY(-40px)" }}>
            {isEven && <div style={{ position: "absolute", bottom: "100%", left: "50%", width: 1, height: 60, background: "rgba(255,255,255,0.15)", transform: "translateX(-50%)" }} />}

            <TiltCard
                onClick={() => onSelect(item)}
                className={`timeline-node-card${isHighlighted ? " highlighted" : ""}${isDimmed ? " dimmed" : ""}`}
                style={{ width: 220, background: "rgba(10,5,25,0.85)", border: "1px solid rgba(255,255,255,0.08)", padding: 20, position: "relative", overflow: "hidden", cursor: "none", clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))", backdropFilter: "blur(10px)" }}>
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#7b2fbe", textTransform: "uppercase", marginBottom: 6 }}>{item.phase}</div>
                <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", lineHeight: 1, marginBottom: 4 }}>{item.year}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", marginBottom: 10 }}>{item.title}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {item.chars.map((c) => (
                        <span key={c} style={{ fontSize: "0.6rem", padding: "2px 8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", fontFamily: "'Share Tech Mono',monospace" }}>{c.replace("-", " ")}</span>
                    ))}
                </div>
            </TiltCard>

            <div style={{ position: "absolute", [isEven ? "bottom" : "top"]: -68, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#7b2fbe", boxShadow: "0 0 15px rgba(123,47,190,0.6)", border: "2px solid rgba(123,47,190,0.3)" }} />
            {!isEven && <div style={{ position: "absolute", top: "100%", left: "50%", width: 1, height: 60, background: "rgba(255,255,255,0.15)", transform: "translateX(-50%)" }} />}
        </div>
    );
}

function TimelineSection({ activeFilter, setActiveFilter, selectedItem: controlledItem, setSelectedItem: setControlledItem }) {
    const [localItem, setLocalItem] = useState(null);
    const selectedItem = controlledItem !== undefined ? controlledItem : localItem;
    const setSelectedItem = setControlledItem || setLocalItem;

    return (
        <section id="timeline" style={{ position: "relative", minHeight: "100vh", padding: "120px 0 80px", overflow: "hidden", background: "linear-gradient(180deg,#030308 0%,rgba(10,0,30,1) 50%,#030308 100%)" }}>

            {/* Passive Background Image */}
            <AnimatePresence>
                {activeFilter !== "all" && CHARACTERS[activeFilter.replace("-", "")] && (
                    <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        src={CHARACTERS[activeFilter.replace("-", "")].image}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, mixBlendMode: "screen", filter: "blur(2px)", animation: "heroFloat 10s ease-in-out infinite" }}
                    />
                )}
            </AnimatePresence>

            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: "relative", zIndex: 10 }}>
                <div style={{ textAlign: "center", padding: "0 48px 64px" }}>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#00d4ff", textTransform: "uppercase" }}>// MODULE 02 — TEMPORAL ARCHIVE</span>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 900 }}>MULTIVERSE <span style={{ color: "#7b2fbe" }}>TIMELINE</span></h2>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 56, padding: "0 48px" }}>
                    {CHAR_FILTERS.map((f) => (
                        <button key={f.value} onClick={() => setActiveFilter(f.value)} className={`char-pill${activeFilter === f.value ? " active" : ""}`} style={{ padding: "8px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)", cursor: "none", clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)" }}>{f.label}</button>
                    ))}
                </div>
                <div style={{ overflowX: "auto", padding: "40px 80px 60px" }}>
                    <div style={{ display: "flex", alignItems: "center", width: "max-content", position: "relative", padding: "80px 0" }}>
                        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2, background: "linear-gradient(90deg,transparent,rgba(123,47,190,0.3) 5%,rgba(123,47,190,0.6) 20%,rgba(230,57,70,0.6) 50%,rgba(123,47,190,0.6) 80%,rgba(123,47,190,0.3) 95%,transparent)", transform: "translateY(-50%)" }} />
                        {TIMELINE.map((item, i) => (
                            <TimelineNode key={i} item={item} index={i} activeFilter={activeFilter} onSelect={setSelectedItem} />
                        ))}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedItem && <TimelineModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </AnimatePresence>
        </section>
    );
}

function StatBlock({ label, value, pct, accentColor }) {
    return (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px" }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>{value}</div>
            <div style={{ height: 2, marginTop: 6, background: "rgba(255,255,255,0.08)", borderRadius: 1, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 1.5, ease: "easeOut" }} style={{ height: "100%", background: `linear-gradient(90deg,${accentColor || "#7b2fbe"},#00d4ff)`, boxShadow: "0 0 8px #00d4ff" }} />
            </div>
        </div>
    );
}

function IdentityCard({ char, scanning }) {
    const c = CHARACTERS[char];
    return (
        <TiltCard style={{ background: "rgba(5,2,20,0.8)", border: "1px solid rgba(255,255,255,0.08)", padding: 40, backdropFilter: "blur(20px)", position: "relative", overflow: "hidden", clipPath: "polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px))", boxShadow: `0 0 40px ${c.glow},inset 0 1px 0 rgba(255,255,255,0.06)` }}>
            {scanning && <div style={{ position: "absolute", left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${c.scanColor},rgba(255,255,255,0.8),${c.scanColor},transparent)`, boxShadow: `0 0 15px ${c.scanColor}`, zIndex: 10, animation: "laserScan 1.2s ease-in-out forwards" }} />}
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: c.scanColor, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <div className="status-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: c.scanColor, boxShadow: `0 0 8px ${c.scanColor}` }} />
                SCAN COMPLETE — IDENTITY VERIFIED
            </div>

            <div style={{ position: "relative", width: "100%", height: 200, marginBottom: 24, borderRadius: 8, overflow: "hidden", border: `1px solid ${c.color}` }}>
                <img src={c.image} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(5,2,20,1), transparent)` }} />
                <div className="hero-float" style={{ position: "absolute", bottom: 10, right: 10, fontSize: "3rem", filter: `drop-shadow(0 0 20px ${c.color})` }}>{c.avatar}</div>
            </div>

            <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.6rem", fontWeight: 900, textTransform: "uppercase", textShadow: `0 0 30px ${c.glow}`, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", fontFamily: "'Share Tech Mono',monospace", marginBottom: 28 }}>{c.alter}</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                <StatBlock label="Intelligence" value={c.stats.int} pct={c.stats.int} accentColor={c.color} />
                <StatBlock label="Power" value={c.stats.pow} pct={c.stats.pow} accentColor={c.color} />
                <StatBlock label="Combat" value={c.stats.com} pct={c.stats.com} accentColor={c.color} />
                <StatBlock label="Mysticism" value={c.stats.mys} pct={c.stats.mys} accentColor={c.color} />
            </div>
        </TiltCard>
    );
}

function CharacterSection({ activeFilter }) {
    const [selectedChar, setSelectedChar] = useState("strange");
    const [scanning, setScanning] = useState(false);

    // Sync selected character with timeline filter if changed
    useEffect(() => {
        if (activeFilter !== "all" && CHARACTERS[activeFilter.replace("-", "")]) {
            setSelectedChar(activeFilter.replace("-", ""));
        }
    }, [activeFilter]);

    const handleSelect = useCallback((key) => {
        setSelectedChar(key); setScanning(false);
        setTimeout(() => setScanning(true), 50);
        setTimeout(() => setScanning(false), 1300);
    }, []);

    const c = CHARACTERS[selectedChar];

    return (
        <section id="character" style={{ position: "relative", minHeight: "100vh", padding: "120px 48px 80px", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%,${c.glow},transparent 70%)`, transition: "background 1s ease", pointerEvents: "none", zIndex: 0 }} />

            {/* Background passive image */}
            <motion.img
                key={selectedChar}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                animate={{ opacity: 0.1, filter: "blur(4px)", scale: 1 }}
                transition={{ duration: 2 }}
                src={c.image}
                style={{ position: "absolute", top: "10%", right: "-10%", width: "60vw", height: "80vh", objectFit: "cover", mixBlendMode: "screen", zIndex: 0, maskImage: "radial-gradient(ellipse, black 30%, transparent 70%)" }}
            />

            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ position: "relative", zIndex: 10 }}>
                <div style={{ textAlign: "center", maxWidth: 1200, margin: "0 auto", paddingBottom: 64 }}>
                    <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.4em", color: "#00d4ff" }}>// MODULE 03 — IDENTITY MATRIX</span>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 900 }}>CHARACTER <span style={{ color: "#7b2fbe" }}>IDENTITY</span> SCAN</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: 8 }}>SELECT HERO FOR BIOMETRIC SCAN</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 16 }}>
                            {Object.entries(CHARACTERS).map(([key, ch]) => (
                                <motion.div whileHover={{ scale: 1.05 }} key={key} onClick={() => handleSelect(key)} className={`char-item${selectedChar === key ? " active" : ""}`} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${selectedChar === key ? ch.color : "rgba(255,255,255,0.08)"}`, padding: "20px 12px", textAlign: "center", cursor: "none", clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", boxShadow: selectedChar === key ? `0 0 20px ${ch.glow}` : "none" }}>
                                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>{ch.avatar}</div>
                                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>{ch.name.split(" ").pop()}</div>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                            {[["Classification", c.classification], ["Reality Origin", c.reality], ["Threat Level", c.threat, c.color]].map(([label, val, col]) => (
                                <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", padding: "16px 20px", clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}>
                                    <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>{label}</div>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: col || "rgba(255,255,255,0.7)" }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <IdentityCard char={selectedChar} scanning={scanning} />
                </div>
            </motion.div>
        </section>
    );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
    const { pos, dot, scale, setScale } = useCursor();
    const hudTime = useHudClock();
    const [flash, setFlash] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const el = document.createElement("style"); el.textContent = GLOBAL_CSS;
        document.head.appendChild(el); return () => document.head.removeChild(el);
    }, []);

    useEffect(() => {
        if (selectedMovie) document.body.classList.add("timeline-modal-open");
        return () => document.body.classList.remove("timeline-modal-open");
    }, [selectedMovie]);

    useEffect(() => {
        const targets = "button,.char-pill,.char-item,.timeline-node-card";
        const over = () => setScale(2), out = () => setScale(1);
        const attach = () => document.querySelectorAll(targets).forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
        attach(); const obs = new MutationObserver(attach); obs.observe(document.body, { childList: true, subtree: true });
        return () => obs.disconnect();
    }, [setScale]);

    const handleDive = () => {
        setFlash(true); setTimeout(() => setFlash(false), 350);
        setTimeout(() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" }), 200);
    };

    return (
        <div style={{ background: "#030308", minHeight: "100vh", width: "100%", position: "relative", boxSizing: "border-box", overflowX: "hidden" }}>
            <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 1000, opacity: 0.4 }} />
            <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "radial-gradient(ellipse at center,rgba(123,47,190,0.9),rgba(230,57,70,0.5),transparent)", pointerEvents: "none", opacity: flash ? 0.6 : 0, mixBlendMode: "screen", transition: "opacity 0.15s" }} />

            <Cursor pos={pos} dot={dot} scale={scale} hideWhenModalOpen={!!selectedMovie} />
            <Nav hudTime={hudTime} />
            <HeroSection onDive={handleDive} />
            <TimelineSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} selectedItem={selectedMovie} setSelectedItem={setSelectedMovie} />
            <CharacterSection activeFilter={activeFilter} />
        </div>
    );
}

// ─── MAIN ROOT COMPONENT ─────────────────────────────────────

function Timeline() {
    const { pos, dot, scale } = useCursor();
    const hudTime = useHudClock();
    const [activeFilter, setActiveFilter] = useState("all");

    const handleDive = () => {
        document
            .getElementById("timeline")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* Global Styles */}
            <style>{GLOBAL_CSS}</style>

            {/* Custom Cursor */}
            <Cursor pos={pos} dot={dot} scale={scale} />

            {/* Navigation */}
            <Nav hudTime={hudTime} />

            {/* Sections */}
            <HeroSection onDive={handleDive} />

            <TimelineSection
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />
        </>
    );
}

