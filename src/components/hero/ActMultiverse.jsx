import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./hero.css";

const variants = [
  { name: "Doctor Strange",  role: "Sorcerer Supreme",   color: "#c9151e" },
  { name: "Wanda Maximoff",  role: "Scarlet Witch",       color: "#c9151e" },
  { name: "Loki",            role: "God of Mischief",     color: "#1a6ea8" },
  { name: "Kang",            role: "The Conqueror",       color: "#d4890a" },
  { name: "Spider-Man",      role: "Multiverse Variant",  color: "#c9151e" },
  { name: "America Chavez",  role: "Star Portal",         color: "#1a6ea8" },
];

const timelines = [
  { id: "TVA",    label: "Time Variance Authority",  sub: "Sacred Timeline Enforcement" },
  { id: "838",    label: "Earth-838",                sub: "Illuminati Dimension"        },
  { id: "19999",  label: "Earth-19999",              sub: "Prime MCU Universe"          },
  { id: "65011",  label: "Earth-65011",              sub: "Spider-Verse Origin"         },
];

export default function ActMultiverse() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBg      = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const yContent = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -80]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.2], [10, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);

  return (
    <section
      ref={sectionRef}
      id="multiverse"
      className="hero-section act-multiverse storyline-act"
    >
      {/* ── ANIMATED BG ── */}
      <motion.div className="act-multiverse-bg" style={{ y: yBg }} aria-hidden>
        {/* Portal rings */}
        <div className="mv-ring mv-ring--1" />
        <div className="mv-ring mv-ring--2" />
        <div className="mv-ring mv-ring--3" />
        <div className="mv-ring mv-ring--4" />
        {/* Ambient glow */}
        <div className="mv-glow mv-glow--red"  />
        <div className="mv-glow mv-glow--blue" />
        {/* Fracture lines */}
        <div className="mv-fractures" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`mv-fracture mv-fracture--${i + 1}`} />
          ))}
        </div>
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="act-multiverse-content glass-card"
        style={{ y: yContent, opacity, rotateX, scale, perspective: "1200px", transformOrigin: "left bottom" }}
      >
        {/* Eyebrow */}
        <motion.p
          className="act-multiverse-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Phase 4 · 5 · 6
        </motion.p>

        {/* Title */}
        <motion.h2
          className="act-multiverse-title"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mv-title-top">MULTIVERSE</span>
          <span className="mv-title-bottom">SAGA</span>
        </motion.h2>

        {/* Glow line */}
        <motion.span
          className="title-glow-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, delay: 0.35 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Body */}
        <motion.p
          className="mv-body"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          After the events of Avengers: Endgame, the Infinity Stones' destruction
          fractured the Sacred Timeline. Kang the Conqueror, the TVA, and countless
          variants now threaten the fabric of reality. Doctor Strange, Wanda Maximoff,
          and a new generation of heroes must navigate infinite parallel worlds —
          where every choice creates a new universe.
        </motion.p>

        {/* Timeline cards */}
        <motion.div
          className="mv-timelines"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
          }}
        >
          <span className="mv-section-label">Active Timelines</span>
          <div className="mv-timeline-grid">
            {timelines.map((t) => (
              <motion.div
                key={t.id}
                className="mv-timeline-card"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <span className="mv-timeline-id">{t.id}</span>
                <span className="mv-timeline-label">{t.label}</span>
                <span className="mv-timeline-sub">{t.sub}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Variant roster */}
        <motion.div
          className="mv-variants"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } },
          }}
        >
          <span className="mv-section-label">Key Variants</span>
          <div className="mv-variant-list">
            {variants.map((v) => (
              <motion.div
                key={v.name}
                className="mv-variant"
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span
                  className="mv-variant-dot"
                  style={{ background: v.color, boxShadow: `0 0 8px ${v.color}` }}
                />
                <span className="mv-variant-name">{v.name}</span>
                <span className="mv-variant-role">{v.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Right-side decorative portal */}
      <div className="mv-portal-deco" aria-hidden>
        <div className="mv-portal-outer" />
        <div className="mv-portal-mid"   />
        <div className="mv-portal-inner" />
        <div className="mv-portal-core"  />
      </div>
    </section>
  );
}
