import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "./hero.css";

const avengerNames = [
  "Iron Man",
  "Captain America",
  "Thor",
  "Hulk",
  "Black Widow",
  "Hawkeye",
  "Spider-Man",
  "Black Panther",
  "Doctor Strange",
  "Scarlet Witch",
  "War Machine",
  "Falcon",
];

const phaseOneFilms = [
  "Iron Man (2008)",
  "The Incredible Hulk (2008)",
  "Iron Man 2 (2010)",
  "Thor (2011)",
  "Captain America: The First Avenger (2011)",
  "The Avengers (2012)",
];

// Avengers theme — public domain orchestral fanfare feel via Web Audio API
function useAvengersTheme() {
  const [playing, setPlaying] = useState(false);
  const ctxRef    = useRef(null);
  const nodesRef  = useRef([]);

  const stopAll = () => {
    nodesRef.current.forEach((n) => { try { n.stop(); } catch (_) {} });
    nodesRef.current = [];
  };

  // Heroic brass fanfare built from pure oscillators
  const playTheme = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
    master.connect(ctx.destination);

    // Reverb via convolver impulse
    const convolver = ctx.createConvolver();
    const irLength  = ctx.sampleRate * 2.5;
    const irBuffer  = ctx.createBuffer(2, irLength, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = irBuffer.getChannelData(ch);
      for (let i = 0; i < irLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.2);
      }
    }
    convolver.buffer = irBuffer;
    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.28;
    convolver.connect(wetGain);
    wetGain.connect(master);

    const playNote = (freq, start, duration, type = "sawtooth", gainVal = 0.12) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type      = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + start + 0.04);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime + start + duration - 0.08);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + duration);

      osc.connect(gain);
      gain.connect(master);
      gain.connect(convolver);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.1);
      nodesRef.current.push(osc);
    };

    // Heroic fanfare motif — ascending brass-like pattern
    // G major feel: G3 B3 D4 G4 B4 D5 G5
    const notes = [
      // Opening call
      [196.00, 0.00,  0.18],
      [246.94, 0.20,  0.18],
      [293.66, 0.40,  0.18],
      [392.00, 0.60,  0.35],
      // Rise
      [349.23, 1.10,  0.14],
      [392.00, 1.26,  0.14],
      [440.00, 1.42,  0.14],
      [493.88, 1.58,  0.40],
      // Triumphant peak
      [523.25, 2.10,  0.20],
      [587.33, 2.32,  0.20],
      [659.25, 2.54,  0.45],
      // Resolution
      [587.33, 3.10,  0.18],
      [523.25, 3.30,  0.18],
      [493.88, 3.50,  0.55],
      // Echo / diminuendo
      [440.00, 4.20,  0.14],
      [392.00, 4.36,  0.14],
      [349.23, 4.52,  0.55],
      // Final chord
      [261.63, 5.20,  0.80],
      [329.63, 5.20,  0.80],
      [392.00, 5.20,  0.80],
      [523.25, 5.20,  0.80],
    ];

    notes.forEach(([freq, start, dur]) => {
      playNote(freq, start, dur, "sawtooth", 0.10);
      playNote(freq * 2, start, dur * 0.7, "sine", 0.04); // overtone
    });

    // Percussive low boom
    const boom = (start) => {
      const buf  = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < buf.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.18));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.value = 0.35;
      src.connect(g);
      g.connect(master);
      src.start(ctx.currentTime + start);
      nodesRef.current.push(src);
    };
    [0, 1.1, 2.1, 3.1, 5.2].forEach(boom);

    // Fade out after 7 seconds
    master.gain.setValueAtTime(0.18, ctx.currentTime + 5.8);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 7.5);

    setTimeout(() => {
      try { ctx.close(); } catch (_) {}
      setPlaying(false);
    }, 7600);
  };

  const toggle = () => {
    if (playing) {
      stopAll();
      if (ctxRef.current) { try { ctxRef.current.close(); } catch (_) {} }
      setPlaying(false);
    } else {
      setPlaying(true);
      playTheme();
    }
  };

  useEffect(() => () => { stopAll(); if (ctxRef.current) { try { ctxRef.current.close(); } catch (_) {} } }, []);

  return { playing, toggle };
}

export default function ActOne() {
  const sectionRef = useRef(null);
  const { playing, toggle } = useAvengersTheme();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBg      = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -60]);
  const yContent = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [120, 0, 0, -80]);
  const rotateX  = useTransform(scrollYProgress, [0, 0.2], [12, 0]);
  const scale    = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const opacity  = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="hero-section act-one storyline-act">

      {/* Background image + overlays */}
      <motion.div
        className="hero-bg-image act-parallax-bg"
        style={{ y: useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 0]) }}
      >
        <img
          src="https://placehold.co/1920x1080/0a1628/1a3a52?text=AVENGERS+PHASE+ONE"
          alt=""
          loading="eager"
        />
      </motion.div>
      <div className="hero-bg-overlay" aria-hidden />
      <motion.div
        className="hero-foreground"
        style={{ y: useTransform(scrollYProgress, [0, 0.6], [0, 40]) }}
        aria-hidden
      />

      <div className="act-one-radial" aria-hidden />

      <motion.div className="act-one-bg act-parallax-bg" style={{ y: yBg }}>
        <div className="orb-1" aria-hidden />
        <div className="orb-2" aria-hidden />
        <div className="grid-lines" aria-hidden />
      </motion.div>

      {/* Shield decoration */}
      <motion.div
        className="shield-deco"
        style={{ y: useTransform(scrollYProgress, [0, 0.5], [40, -20]) }}
        aria-hidden
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="195" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="200" r="50"  stroke="white" strokeWidth="1.5" />
          <line x1="5"   y1="200" x2="395" y2="200" stroke="white" strokeWidth="0.8" />
          <line x1="200" y1="5"   x2="200" y2="395" stroke="white" strokeWidth="0.8" />
          <line x1="60"  y1="60"  x2="340" y2="340" stroke="white" strokeWidth="0.5" />
          <line x1="340" y1="60"  x2="60"  y2="340" stroke="white" strokeWidth="0.5" />
          <polygon
            points="200,170 207,192 230,192 212,205 219,227 200,215 181,227 188,205 170,192 193,192"
            fill="white"
          />
        </svg>
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        className="act-one-content hero-content-overlay glass-card"
        style={{ y: yContent, rotateX, scale, opacity, transformOrigin: "left bottom", perspective: "1200px" }}
      >
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          Marvel Cinematic Universe · Phase I
        </motion.p>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="act-one-title">
            <span className="t-solid">The Birth</span>
            <span className="t-outline">Of Avengers</span>
          </h1>
        </motion.div>

        {/* Glowing accent line */}
        <motion.span
          className="title-glow-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Sound button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, delay: 0.40 }}
          style={{ marginBottom: "1.1rem" }}
        >
          <button
            onClick={toggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.40rem 1.0rem",
              background: playing ? "rgba(201,21,30,0.18)" : "rgba(3,11,24,0.70)",
              border: `1px solid ${playing ? "rgba(201,21,30,0.65)" : "rgba(201,21,30,0.30)"}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.56rem",
              fontWeight: 700,
              letterSpacing: "0.20em",
              textTransform: "uppercase",
              color: playing ? "#e02028" : "rgba(200,220,255,0.80)",
              transition: "all 0.25s",
              backdropFilter: "blur(8px)",
            }}
            aria-label={playing ? "Stop Avengers theme" : "Play Avengers theme"}
          >
            {/* Speaker icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {playing ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
            {playing ? "Stop Fanfare" : "Play Avengers Fanfare"}
            {playing && (
              <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                {[0, 0.15, 0.30].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: "2px",
                      height: "10px",
                      background: "#e02028",
                      borderRadius: "1px",
                      animation: `soundBar 0.7s ease-in-out ${d}s infinite alternate`,
                    }}
                  />
                ))}
              </span>
            )}
          </button>
          <style>{`
            @keyframes soundBar {
              from { transform: scaleY(0.3); opacity: 0.6; }
              to   { transform: scaleY(1.0); opacity: 1.0; }
            }
          `}</style>
        </motion.div>

        {/* Body text */}
        <motion.p
          className="act-one-body"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
        >
          When Loki and the Chitauri threatened New York, S.H.I.E.L.D. Director Nick Fury
          activated the Avengers Initiative — a plan years in the making. Tony Stark,
          Steve Rogers, Thor, Bruce Banner, Natasha Romanoff, and Clint Barton came
          together as Earth's mightiest heroes to defend what no single individual
          could protect alone. From the streets of Manhattan to the infinite multiverse,
          this was only the beginning of a saga that would reshape the universe.
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          className="act-one-quote"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, delay: 0.55 }}
        >
          "There was an idea to bring together a group of remarkable people, to see
          if they could become something more."
          <cite>— Nick Fury</cite>
        </motion.blockquote>

        {/* Phase One film list */}
        <motion.div
          className="phase-one-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } },
          }}
        >
          <span className="phase-label">Phase One · 2008–2012</span>
          {phaseOneFilms.map((film) => (
            <motion.span
              key={film}
              className="phase-film"
              variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
            >
              {film}
            </motion.span>
          ))}
        </motion.div>

        {/* Avenger tags */}
        <motion.div
          className="avenger-tags"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.65 } },
          }}
        >
          {avengerNames.map((name) => (
            <motion.span
              key={name}
              className="avenger-tag"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              {name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
