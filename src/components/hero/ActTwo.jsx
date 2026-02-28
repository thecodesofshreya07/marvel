import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./hero.css";

const bars = [
  { label: "Strength",     percent: 100 },
  { label: "Agility",      percent: 95  },
  { label: "Endurance",    percent: 98  },
  { label: "Intelligence", percent: 72  },
  { label: "Combat",       percent: 97  },
  { label: "Leadership",   percent: 88  },
];

const infoCards = [
  {
    label:  "Project",
    value:  "Operation: Rebirth",
    sub:    "Strategic Scientific Reserve, 1943",
  },
  {
    label:  "Scientist",
    value:  "Dr. Abraham Erskine",
    sub:    "Lead researcher — Vita-Ray treatment",
  },
  {
    label:  "Subject",
    value:  "Steve Rogers",
    sub:    "Private, 107th Infantry Regiment",
  },
  {
    label:  "Outcome",
    value:  "Super Soldier Created",
    sub:    "First and only successful serum dose",
  },
];

const attributes = [
  "Peak Human Biology",
  "Accelerated Healing",
  "Enhanced Reflexes",
  "Prolonged Lifespan",
  "Vibranium Shield",
  "Tactical Genius",
];

const timeline = [
  { year: "1918", event: "Steve Rogers born in Brooklyn, NY" },
  { year: "1941", event: "Rejected from military service — 5 times" },
  { year: "1943", event: "Recruited by Dr. Erskine for Project Rebirth" },
  { year: "1943", event: "Successfully transformed — serum administered" },
  { year: "1944", event: "Captain America leads assault on HYDRA" },
  { year: "1945", event: "Sacrifices himself; frozen in ice" },
  { year: "2011", event: "Discovered and revived by S.H.I.E.L.D." },
  { year: "2012", event: "Leads Avengers in Battle of New York" },
];

// Stable particle positions
const particles = Array.from({ length: 24 }, (_, i) => ({
  id:    i,
  x:     `${(i * 4.3 + 5) % 100}%`,
  dur:   `${4 + (i % 6)}s`,
  delay: `${(i * 0.28) % 6}s`,
}));

export default function ActTwo() {
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="hero-section act-two" ref={ref}>

      {/* Background */}
      <div className="act-two-bg" aria-hidden>
        <div className="serum-glow" />
        <div className="serum-particles">
          {particles.map((p) => (
            <span
              key={p.id}
              style={{ "--x": p.x, "--dur": p.dur, "--delay": p.delay }}
            />
          ))}
        </div>
      </div>

      <div className="act-two-inner">

        {/* ── LEFT: Serum Vial ── */}
        <motion.div
          className="act-two-left"
          initial={{ opacity: 0, rotateY: -25, x: -50 }}
          whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <div className="serum-vial-wrapper">
            {/* Rotating orbit rings */}
            <motion.div
              style={{
                position: "absolute", inset: -30, borderRadius: "50%",
                border: "1px solid rgba(74,158,221,0.22)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute", inset: -55, borderRadius: "50%",
                border: "1px dashed rgba(74,158,221,0.10)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              style={{
                position: "absolute", inset: -80, borderRadius: "50%",
                border: "1px solid rgba(201,21,30,0.10)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
            />

            {/* Vial body */}
            <div className="serum-vial">
              <div className="serum-bubbles" />
              <div className="serum-liquid" />
              {/* Cap */}
              <div style={{
                position: "absolute", top: -12, left: "50%",
                transform: "translateX(-50%)",
                width: 22, height: 18,
                background: "linear-gradient(180deg, rgba(120,180,240,0.8), rgba(50,100,180,0.9))",
                borderRadius: "4px 4px 0 0",
                boxShadow: "0 0 8px rgba(74,158,221,0.40)",
              }} />
            </div>

            {/* SSS label */}
            <div style={{
              position: "absolute", bottom: -26, width: "100%",
              textAlign: "center",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.50rem",
              letterSpacing: "0.32em",
              color: "rgba(74,158,221,0.80)",
              textTransform: "uppercase",
            }}>
              SSS — Batch 01
            </div>

            {/* Glow pulse ring */}
            <motion.div
              style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(74,158,221,0.08) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ── RIGHT: Text content ── */}
        <div className="act-two-right">

          <motion.p
            className="act-two-eyebrow"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Project Rebirth · 1943
          </motion.p>

          <motion.span
            className="act-two-number"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            02
          </motion.span>

          <motion.h2
            className="act-two-title"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            The Super Soldier Serum
          </motion.h2>

          {/* Glowing accent line — cyan/steel */}
          <motion.span
            className="title-glow-line title-glow-line--cyan"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />

          {/* Body */}
          <motion.p
            className="act-two-text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Dr. Abraham Erskine's experimental compound, combined with Vita-Ray
            exposure, rewrote the limits of human biology — transforming a frail
            Steven Rogers from Brooklyn into Captain America: the living embodiment
            of human potential, courage, and sacrifice.
          </motion.p>

          {/* Quote */}
          <motion.blockquote
            className="act-two-quote"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            "Whatever happens tomorrow you must promise me one thing. That you will
            stay who you are — not a perfect soldier, but a good man."
            <cite>— Dr. Abraham Erskine</cite>
          </motion.blockquote>

          {/* Info cards grid */}
          <motion.div
            className="act-two-info-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
          >
            {infoCards.map((card) => (
              <motion.div
                key={card.label}
                className="act-two-info-card"
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                <span className="act-two-info-label">{card.label}</span>
                <span className="act-two-info-value">{card.value}</span>
                <span className="act-two-info-sub">{card.sub}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Transformation bars */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
            }}
          >
            <span style={{
              display: "block",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.28em",
              color: "rgba(180,210,240,0.82)",
              textTransform: "uppercase",
              marginBottom: "0.65rem",
            }}>
              Enhanced Attributes
            </span>
            {bars.map((bar) => (
              <motion.div
                key={bar.label}
                className="transformation-bar"
                variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
              >
                <div className="transformation-bar-label">
                  <span>{bar.label}</span>
                  <span>{bar.percent}%</span>
                </div>
                <div className="transformation-bar-track">
                  <div
                    className="transformation-bar-fill"
                    style={{ "--fill": `${bar.percent}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Attribute pills */}
          <motion.div
            className="act-two-attributes"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.7 } },
            }}
          >
            {attributes.map((attr) => (
              <motion.span
                key={attr}
                className="act-two-attr"
                variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
              >
                {attr}
              </motion.span>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div
            style={{ marginTop: "1.6rem" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.65 } },
            }}
          >
            <span style={{
              display: "block",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.28em",
              color: "rgba(180,210,240,0.82)",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}>
              Steve Rogers — Timeline
            </span>
            {timeline.map((item) => (
              <motion.div
                key={item.year + item.event}
                style={{ display: "flex", gap: "0.9rem", marginBottom: "0.42rem", alignItems: "flex-start" }}
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
              >
                <span style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "0.54rem",
                  fontWeight: 700,
                  color: "#4a9edd",
                  letterSpacing: "0.12em",
                  flexShrink: 0,
                  paddingTop: "0.12rem",
                  minWidth: "38px",
                }}>
                  {item.year}
                </span>
                <span style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(0.82rem, 1.15vw, 0.93rem)",
                  fontWeight: 500,
                  color: "rgba(210,230,255,0.88)",
                  lineHeight: 1.45,
                  position: "relative",
                  paddingLeft: "0.75rem",
                }}>
                  <span style={{
                    position: "absolute",
                    left: 0,
                    top: "0.45em",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(74,158,221,0.70)",
                  }} />
                  {item.event}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
