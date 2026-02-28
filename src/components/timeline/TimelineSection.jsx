import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Calendar, DollarSign, Image } from "lucide-react";
import { CHARACTERS, TIMELINE, CHAR_FILTERS, TIMELINE_IMAGES } from "./constants";
import { TiltCard } from "./SharedComponents";
import { gsap } from "gsap";
import ImagePopup from "./ImagePopup";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: i * 0.1 },
    }),
    exit: { opacity: 0 },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
};

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
                initial={{ scale: 0.9, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="timeline-modal-grid timeline-modal-content"
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
                    boxShadow: "0 0 80px rgba(230,57,70,0.2), 0 0 120px rgba(123,47,190,0.15)",
                    clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
                }}
            >
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "linear-gradient(90deg, #c41e3a 0%, #8b0000 50%, #0d0d0d 100%)", borderBottom: "1px solid rgba(255,215,0,0.4)" }}>
                    <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 900, fontSize: "0.75rem", letterSpacing: "0.35em", color: "#ffd700", textShadow: "0 0 12px rgba(255,215,0,0.6)" }}>
                        ◈ MARVEL STUDIOS — ARCHIVE
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="timeline-modal-close-btn"
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "rgba(230,57,70,0.9)", border: "1px solid #ffd700", color: "#fff", fontFamily: "'Orbitron',sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 700, boxShadow: "0 0 20px rgba(230,57,70,0.5)", cursor: "pointer" }}
                    >
                        <X size={18} /> CLOSE
                    </button>
                </div>
                <p style={{ gridColumn: "1 / -1", margin: 0, padding: "8px 20px", fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>
                    Click outside or press ESC to return
                </p>

                <div className="timeline-modal-poster" style={{ position: "relative", height: 360, borderRight: "1px solid rgba(255,215,0,0.15)", overflow: "hidden" }}>
                    <img src={item.poster} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) contrast(1.1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,5,25,0.95), transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
                        <span style={{ fontFamily: "'Share Tech Mono',monospace", color: "#e63946", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
                            {item.phase} // {item.year}
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 8 }}>
                    <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 8, textShadow: "0 0 20px rgba(123,47,190,0.4)" }}>
                        {item.title}
                    </h2>
                    {item.tagline && (
                        <p style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: 16 }}>"{item.tagline}"</p>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderLeft: "2px solid #00d4ff" }}>
                            <Calendar size={14} color="#00d4ff" />
                            <div>
                                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>DIRECTOR</p>
                                <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.director}</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderLeft: "2px solid #7b2fbe" }}>
                            <Play size={14} color="#7b2fbe" />
                            <div>
                                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>RUNTIME</p>
                                <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.runtime}</p>
                            </div>
                        </div>
                        {item.boxOffice && (
                            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", padding: "8px 14px", borderLeft: "2px solid #e63946" }}>
                                <DollarSign size={14} color="#e63946" />
                                <div>
                                    <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>BOX OFFICE</p>
                                    <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.boxOffice}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 24 }}>{item.description}</p>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                        {item.chars.map((c) => {
                            const ch = CHARACTERS[c.replace("-", "")];
                            return ch ? (
                                <span
                                    key={c}
                                    style={{
                                        fontSize: "0.65rem",
                                        padding: "4px 10px",
                                        background: `${ch.glow}`,
                                        border: `1px solid ${ch.color}`,
                                        color: "#fff",
                                        fontFamily: "'Share Tech Mono',monospace",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    {ch.name.split(" ").pop()}
                                </span>
                            ) : null;
                        })}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            alignSelf: "flex-start",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 24px",
                            background: "rgba(230,57,70,0.15)",
                            border: "1px solid #e63946",
                            color: "#fff",
                            fontFamily: "'Orbitron',sans-serif",
                            fontSize: "0.75rem",
                            letterSpacing: "0.15em",
                            cursor: "pointer",
                        }}
                    >
                        <Play size={16} fill="currentColor" /> INITIATE PLAYBACK
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function TimelineNode({ item, index, activeFilter, onSelect, onImageClick }) {
    const isEven = index % 2 === 0;
    const isHighlighted = activeFilter !== "all" && item.chars.includes(activeFilter);
    const isDimmed = activeFilter !== "all" && !item.chars.includes(activeFilter);

    return (
        <motion.div
            variants={itemVariants}
            data-timeline-node
            style={{
                position: "relative",
                flexShrink: 0,
                margin: "0 16px",
                transform: isEven ? "none" : "translateY(-36px)",
            }}
        >
            {isEven && (
                <div style={{ position: "absolute", bottom: "100%", left: "50%", width: 1, height: 50, background: "rgba(255,255,255,0.12)", transform: "translateX(-50%)" }} />
            )}

            <TiltCard
                onClick={() => onSelect(item)}
                className={`timeline-node-card ${isHighlighted ? "highlighted" : ""} ${isDimmed ? "dimmed" : ""} timeline-node-card-width`}
                style={{
                    width: 220,
                    minWidth: 220,
                    background: "rgba(10,5,25,0.9)",
                    border: `1px solid ${isHighlighted ? "rgba(230,57,70,0.5)" : "rgba(255,255,255,0.08)"}`,
                    padding: 20,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                    backdropFilter: "blur(12px)",
                    boxShadow: isHighlighted ? "0 0 30px rgba(230,57,70,0.2)" : "0 4px 24px rgba(0,0,0,0.3)",
                }}
            >
                <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#7b2fbe", textTransform: "uppercase", marginBottom: 6 }}>
                    {item.phase}
                </div>
                <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1.35rem", fontWeight: 700, color: "rgba(255,255,255,0.95)", lineHeight: 1, marginBottom: 4 }}>
                    {item.year}
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.05em", marginBottom: 10 }}>{item.title}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {item.chars.map((c) => (
                        <span
                            key={c}
                            style={{
                                fontSize: "0.6rem",
                                padding: "2px 8px",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "rgba(255,255,255,0.5)",
                                fontFamily: "'Share Tech Mono',monospace",
                            }}
                        >
                            {c.replace("-", " ")}
                        </span>
                    ))}
                </div>
                <div style={{ marginTop: 10, fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.35)" }}>Tap for details</div>
                {TIMELINE_IMAGES[item.id] && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onImageClick(item);
                        }}
                        style={{
                            marginTop: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 12px',
                            background: 'rgba(123,47,190,0.2)',
                            border: '1px solid #7b2fbe',
                            borderRadius: 6,
                            color: '#7b2fbe',
                            fontFamily: "'Share Tech Mono',monospace",
                            fontSize: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(123,47,190,0.4)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(123,47,190,0.2)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <Image size={12} /> VIEW IMAGE
                    </button>
                )}
            </TiltCard>

            <div
                style={{
                    position: "absolute",
                    [isEven ? "bottom" : "top"]: -56,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "#7b2fbe",
                    boxShadow: "0 0 15px rgba(123,47,190,0.6)",
                    border: "2px solid rgba(123,47,190,0.4)",
                }}
            />
            {!isEven && (
                <div style={{ position: "absolute", top: "100%", left: "50%", width: 1, height: 50, background: "rgba(255,255,255,0.12)", transform: "translateX(-50%)" }} />
            )}
        </motion.div>
    );
}

export default function TimelineSection({ activeFilter, setActiveFilter, selectedItem, setSelectedItem }) {
    const [localSelected, setLocalSelected] = useState(null);
    const selected = selectedItem !== undefined ? selectedItem : localSelected;
    const setSelected = setSelectedItem || setLocalSelected;
    const timelineRef = useRef(null);
    const [imagePopup, setImagePopup] = useState({ isOpen: false, imageSrc: '', title: '' });

    useEffect(() => {
        // Listen for character selection from multiverse
        const handleFilterTimeline = (event) => {
            const characterKey = event.detail;
            const filterValue = characterKey === 'ironman' ? 'iron-man' : characterKey;
            setActiveFilter(filterValue);
        };

        window.addEventListener('filterTimeline', handleFilterTimeline);
        return () => window.removeEventListener('filterTimeline', handleFilterTimeline);
    }, [setActiveFilter]);

    useEffect(() => {
        // GSAP Timeline animations
        const ctx = gsap.context(() => {
            // Animate timeline nodes on scroll
            const nodes = timelineRef.current?.querySelectorAll('[data-timeline-node]');
            if (nodes) {
                gsap.fromTo(nodes,
                    { opacity: 0, x: -50, scale: 0.8 },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Floating animation for timeline line
            const timelineLine = timelineRef.current?.querySelector('.timeline-line');
            if (timelineLine) {
                gsap.to(timelineLine, {
                    opacity: 0.3,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
        }, timelineRef);

        return () => ctx.revert();
    }, []);

    const handleImageClick = (item) => {
        const imageSrc = TIMELINE_IMAGES[item.id];
        if (imageSrc) {
            setImagePopup({
                isOpen: true,
                imageSrc: imageSrc,
                title: item.title
            });
        }
    };

    const closeImagePopup = () => {
        setImagePopup({ isOpen: false, imageSrc: '', title: '' });
    };

    return (
        <section
            id="timeline"
            className="timeline-section-pad"
            style={{
                position: "relative",
                minHeight: "100vh",
                padding: "120px 48px 80px",
                overflow: "hidden",
                background: "linear-gradient(180deg, #030308 0%, rgba(10,0,30,1) 50%, #030308 100%)",
            }}
        >
            <AnimatePresence>
                {activeFilter !== "all" && CHARACTERS[activeFilter.replace("-", "")] && (
                    <motion.img
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 0.12, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        src={CHARACTERS[activeFilter.replace("-", "")].image}
                        alt=""
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 0,
                            mixBlendMode: "screen",
                            filter: "blur(3px)",
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={containerVariants}
                style={{ position: "relative", zIndex: 10 }}
                ref={timelineRef}
            >
                <div style={{ textAlign: "center", padding: "0 24px 48px" }}>
                    <motion.span
                        variants={itemVariants}
                        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "clamp(0.6rem, 1.5vw, 0.65rem)", letterSpacing: "0.4em", color: "#00d4ff", textTransform: "uppercase" }}
                    >
                        // MODULE 02 — TEMPORAL ARCHIVE
                    </motion.span>
                    <motion.h2 variants={itemVariants} style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 3rem)", fontWeight: 900, marginTop: 8 }}>
                        MULTIVERSE <span style={{ color: "#7b2fbe" }}>TIMELINE</span>
                    </motion.h2>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40, padding: "0 24px" }}>
                    {CHAR_FILTERS.map((f) => (
                        <motion.button
                            key={f.value}
                            onClick={() => setActiveFilter(f.value)}
                            className={`char-pill${activeFilter === f.value ? " active" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: "8px 20px",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 2,
                                fontFamily: "'Share Tech Mono',monospace",
                                fontSize: "clamp(0.65rem, 1.5vw, 0.7rem)",
                                letterSpacing: "0.15em",
                                color: "rgba(255,255,255,0.5)",
                                cursor: "pointer",
                                clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                            }}
                        >
                            {f.label}
                        </motion.button>
                    ))}
                </div>
                <div className="timeline-timeline-pad" style={{ overflowX: "auto", overflowY: "visible", padding: "32px 24px 48px", scrollSnapType: "x proximity" }}>
                    <div style={{ display: "flex", alignItems: "center", width: "max-content", position: "relative", padding: "64px 0", gap: 8 }}>
                        <div
                            className="timeline-line"
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: "50%",
                                height: 2,
                                background: "linear-gradient(90deg, transparent, rgba(123,47,190,0.35) 5%, rgba(123,47,190,0.6) 20%, rgba(230,57,70,0.6) 50%, rgba(123,47,190,0.6) 80%, rgba(123,47,190,0.35) 95%, transparent)",
                                transform: "translateY(-50%)",
                            }}
                        />
                        {TIMELINE.map((item, i) => (
                            <div key={item.id} style={{ scrollSnapAlign: "center" }}>
                                <TimelineNode item={item} index={i} activeFilter={activeFilter} onSelect={setSelected} onImageClick={handleImageClick} />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {selected && <TimelineModal item={selected} onClose={() => setSelected(null)} />}
                {imagePopup.isOpen && (
                    <ImagePopup
                        imageSrc={imagePopup.imageSrc}
                        title={imagePopup.title}
                        isOpen={imagePopup.isOpen}
                        onClose={closeImagePopup}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
