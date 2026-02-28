import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Film, Sparkles } from "lucide-react";
import { CHARACTERS } from "../timeline/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAR_KEYS = ["ironman", "thor", "strange", "wanda", "spiderman"];

export default function MultiversePage() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const charactersRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        const handleMouse = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    useEffect(() => {
        // GSAP Animations
        const ctx = gsap.context(() => {
            // Hero animation
            gsap.fromTo(heroRef.current.querySelector("h1"), 
                { opacity: 0, y: 100, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
            );

            gsap.fromTo(heroRef.current.querySelector("p"), 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
            );

            // Character cards animation
            const cards = charactersRef.current?.querySelectorAll('[data-character-card]');
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 100, rotationY: -45 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        rotationY: 0, 
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: charactersRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Floating animation for character cards
            cards?.forEach((card, index) => {
                gsap.to(card, {
                    y: "-=10",
                    duration: 2 + index * 0.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const goHome = () => {
        window.location.hash = "";
    };

    const handleCharacterClick = (characterKey) => {
        const character = CHARACTERS[characterKey];
        setSelectedCharacter(characterKey);
        
        // Navigate to timeline with character filter
        setTimeout(() => {
            window.location.hash = "#timeline";
            // Trigger timeline filter
            window.dispatchEvent(new CustomEvent('filterTimeline', { detail: characterKey }));
        }, 300);
    };

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                minHeight: "100vh",
                background: "linear-gradient(180deg, #0a0612 0%, #1a0a2e 30%, #0d0d1a 60%, #0a0612 100%)",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                scrollSnapType: "y mandatory",
                overflowY: "auto",
                cursor: "default",
            }}
        >
            {/* Nav */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: "16px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(10,6,18,0.85)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,215,0,0.2)",
                }}
            >
                <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "0.3em", color: "#ffd700", textShadow: "0 0 20px rgba(255,215,0,0.5)" }}>
                    ◈ MULTIVERSE
                </span>
                <button
                    type="button"
                    onClick={goHome}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 20px",
                        background: "linear-gradient(135deg, #e63946, #7b2fbe)",
                        border: "1px solid rgba(255,215,0,0.5)",
                        borderRadius: 8,
                        color: "#fff",
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        cursor: "pointer",
                        boxShadow: "0 0 30px rgba(230,57,70,0.3)",
                    }}
                >
                    ← BACK TO NEXUS
                </button>
            </motion.nav>

            {/* Section 1: Hero */}
            <section
                ref={heroRef}
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 24px 40px",
                    position: "relative",
                    scrollSnapAlign: "start",
                }}
            >
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(123,47,190,0.25), transparent 60%)", pointerEvents: "none" }} />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: "relative", textAlign: "center", zIndex: 1 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "8px 20px", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.4)", borderRadius: 999, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#ffd700" }}
                    >
                        <Sparkles size={14} /> INFINITE REALITIES
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: "linear-gradient(135deg, #fff 0%, #ffd700 50%, #e63946 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                        MULTIVERSE
                        <br />
                        TRANSITIONS
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto 32px" }}
                    >
                        Journey through dimensions. Meet heroes from every reality. Scroll to explore 3D characters and multiverse stories.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
                    >
                        ↓ Scroll to explore
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 2: 3D Characters */}
            <section
                ref={charactersRef}
                style={{
                    minHeight: "100vh",
                    padding: "100px 24px 80px",
                    position: "relative",
                    scrollSnapAlign: "start",
                }}
            >
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(230,57,70,0.08), transparent)", pointerEvents: "none" }} />
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, textAlign: "center", marginBottom: 48, color: "#fff" }}
                >
                    HEROES ACROSS <span style={{ color: "#ffd700" }}>REALITIES</span>
                </motion.h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 32,
                        maxWidth: 1200,
                        margin: "0 auto",
                        perspective: "1200px",
                    }}
                >
                    {CHAR_KEYS.map((key, i) => {
                        const c = CHARACTERS[key];
                        if (!c) return null;
                        return (
                            <Character3DCard
                                key={key}
                                char={c}
                                characterKey={key}
                                index={i}
                                mousePos={mousePos}
                                onCharacterClick={handleCharacterClick}
                            />
                        );
                    })}
                </div>
            </section>

            {/* Section 3: Iframe / Watch */}
            <section
                style={{
                    minHeight: "100vh",
                    padding: "100px 24px 80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    scrollSnapAlign: "start",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ width: "100%", maxWidth: 900, textAlign: "center" }}
                >
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, color: "#e63946", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                        <Film size={18} /> MARVEL UNIVERSE
                    </div>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, marginBottom: 16, color: "#fff" }}>
                        WATCH THE MULTIVERSE
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 32, fontSize: "0.95rem" }}>
                        Official trailers and clips from the MCU. Embed your favorite moments.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{
                            width: "100%",
                            maxWidth: 800,
                            margin: "0 auto",
                            borderRadius: 16,
                            overflow: "hidden",
                            border: "2px solid rgba(255,215,0,0.3)",
                            boxShadow: "0 0 60px rgba(123,47,190,0.2), 0 0 100px rgba(230,57,70,0.1)",
                        }}
                    >
                        <iframe
                            title="Marvel Multiverse"
                            src="https://www.youtube.com/embed/moY78qMJuxM?rel=0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                width: "100%",
                                aspectRatio: "16/9",
                                border: "none",
                                display: "block",
                            }}
                        />
                        <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.5)", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
                            Marvel Studios — Multiverse of Madness | Official Trailer
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 4: CTA */}
            <section
                style={{
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px 24px",
                    scrollSnapAlign: "start",
                    background: "linear-gradient(180deg, transparent, rgba(123,47,190,0.15))",
                }}
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 700, marginBottom: 24, color: "rgba(255,255,255,0.9)" }}
                >
                    Ready to traverse the timeline?
                </motion.p>
                <motion.a
                    href="#"
                    onClick={(e) => { e.preventDefault(); goHome(); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "16px 32px",
                        background: "linear-gradient(135deg, #e63946, #7b2fbe)",
                        borderRadius: 12,
                        color: "#fff",
                        fontFamily: "'Orbitron',sans-serif",
                        fontSize: "0.9rem",
                        letterSpacing: "0.2em",
                        textDecoration: "none",
                        boxShadow: "0 0 40px rgba(230,57,70,0.4)",
                        border: "1px solid rgba(255,215,0,0.4)",
                    }}
                >
                    ENTER THE NEXUS <ArrowRight size={20} />
                </motion.a>
            </section>
        </div>
    );
}

function Character3DCard({ char, characterKey, index, mousePos, onCharacterClick }) {
    const [flipped, setFlipped] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                rotationY: flipped ? 180 : 0,
                rotationX: mousePos.y * 6,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [mousePos, flipped]);

    const handleCardClick = () => {
        if (!flipped) {
            // Primary click - filter timeline
            onCharacterClick(characterKey);
        } else {
            // Secondary click - flip back
            setFlipped(false);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            data-character-card
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
                perspective: "1000px",
                cursor: "pointer",
            }}
            onClick={handleCardClick}
        >
            <motion.div
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3/4",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front */}
                <motion.div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        borderRadius: 20,
                        overflow: "hidden",
                        border: `2px solid ${char.color}`,
                        boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5), 0 0 40px ${char.glow}`,
                        background: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%), url("${char.image}") center/cover`,
                    }}
                    whileHover={{ scale: 1.03 }}
                >
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(5,2,15,0.95) 0%, transparent 50%)` }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 }}>
                        <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", fontWeight: 900, color: "#fff", textShadow: `0 0 20px ${char.glow}` }}>
                            {char.name.split(" ").pop()}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{char.alter.split(" // ")[0]}</div>
                        <div style={{ marginTop: 8, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: char.color }}>Click to view timeline</div>
                    </div>
                </motion.div>
                {/* Back */}
                <motion.div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        rotateY: 180,
                        borderRadius: 20,
                        overflow: "hidden",
                        border: `2px solid ${char.color}`,
                        boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5), 0 0 40px ${char.glow}`,
                        background: "rgba(10,5,25,0.95)",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.85rem", fontWeight: 700, color: char.color, marginBottom: 12 }}>{char.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{char.classification}</div>
                    <div style={{ fontStyle: "italic", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", borderLeft: `3px solid ${char.color}`, paddingLeft: 10 }}>
                        "{char.quote}"
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
