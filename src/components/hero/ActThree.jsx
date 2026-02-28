import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroThreeScene from "./HeroThreeScene";
import "./hero.css";

const stats = [
  { number: "30+", label: "Heroes"          },
  { number: "33",  label: "Films"           },
  { number: "6",   label: "Infinity Stones" },
  { number: "4",   label: "Phases (so far)" },
];

const sagaHighlights = [
  "Infinity Saga — Thanos and the Gauntlet",
  "Multiverse Saga — Kang, variants, and new worlds",
  "Phase 4–6 — Disney+ series and theatrical events",
];

export default function ActThree() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBg      = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70]);
  const yContent = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [110, 0, 0, -90]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.2], [8, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.15], [0.9, 1]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="hero-section act-three storyline-act">

      {/* Background image + overlays */}
      <motion.div
        className="hero-bg-image act-parallax-bg"
        style={{ y: useTransform(scrollYProgress, [0, 0.5, 1], [0, 35, 0]) }}
      >
        <img
          src="https://placehold.co/1920x1080/0a1628/2d1b4e?text=MULTIVERSE+SAGA"
          alt=""
          loading="lazy"
        />
      </motion.div>
      <div className="hero-bg-overlay" aria-hidden />
      <motion.div
        className="hero-foreground"
        style={{ y: useTransform(scrollYProgress, [0, 0.6], [0, 45]) }}
        aria-hidden
      />

      {/* Animated bg: stars + rings */}
      <motion.div className="act-three-bg act-parallax-bg" style={{ y: yBg }}>
        <div className="stars-field" aria-hidden />
        <div className="multiverse-ring" aria-hidden />
        <div className="multiverse-ring" aria-hidden />
        <div className="multiverse-ring" aria-hidden />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="act-three-content glass-card"
        style={{ y: yContent, rotateX, scale, opacity, transformOrigin: "left bottom", perspective: "1200px" }}
      >
        {/* Eyebrow */}
        <motion.p
          className="act-three-eyebrow"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          Multiverse Saga · Now
        </motion.p>

        {/* Title */}
        <motion.h2
          className="act-three-title"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          A New Era Of Heroes
        </motion.h2>

        {/* Glowing accent line — steel-blue variant */}
        <motion.span
          className="title-glow-line title-glow-line--gold"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.36, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Body text */}
        <motion.p
          className="act-three-text"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          From the Battle of New York to the Blip and beyond, Earth's mightiest
          defenders have faced cosmic threats, time travel, and the multiverse
          itself. The Infinity Stones have been destroyed, but new dangers emerge
          across timelines. With Kang the Conqueror and countless variants, the
          saga continues — more heroes, more worlds, and infinite possibilities.
        </motion.p>

        {/* Saga highlights */}
        <motion.div
          className="saga-highlights"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.32 } },
          }}
        >
          {sagaHighlights.map((item) => (
            <motion.span
              key={item}
              className="saga-highlight"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.38 } },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="hero-stat"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              <span className="hero-stat-number">{s.number}</span>
              <span className="hero-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          className="three-scene-wrapper"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, delay: 0.48 }}
        >
          <HeroThreeScene />

          {/* HUD corners */}
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />

          {/* HUD label */}
          <div className="hud-label">Infinity Gauntlet · Interactive</div>
        </motion.div>
      </motion.div>

      {/* NOTE: Poster removed — "Multiverse Saga" poster was redundant with ActMultiverse section */}
    </section>
  );
}
