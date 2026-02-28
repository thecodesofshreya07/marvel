import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ActOne from "../components/hero/ActOne";
import ActTwo from "../components/hero/ActTwo";
import ActThree from "../components/hero/ActThree";
import ActMultiverse from "../components/hero/ActMultiverse";
import MarvelNavbar from "../components/hero/MarvelNavbar";
import marvelBg from "../assets/images/marvelMain.jpg";
import "./HeroCinematic.css";

/* ─────────────────────────────────────────────────
   LANDING SCREEN
───────────────────────────────────────────────── */
function LandingScreen() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawOpacity   = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const opacity      = useSpring(rawOpacity, { stiffness: 90, damping: 22, restDelta: 0.001 });
  const bgScale      = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const titleY       = useTransform(scrollYProgress, [0, 0.45], [0, -55]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const cueOpacity   = useTransform(scrollYProgress, [0, 0.20], [1, 0]);

  return (
    <section ref={ref} className="landing-screen" id="top">

      <motion.div className="landing-bg" style={{ scale: bgScale }}>
        <img src={marvelBg} alt="Marvel Avengers" draggable={false} loading="eager" />
      </motion.div>

      <div className="landing-grad-bottom" />
      <div className="landing-grad-top"    />
      <div className="landing-grad-left"   />

      <motion.div className="landing-foreground" style={{ opacity }}>

        <motion.div
          className="landing-title-block"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <span className="landing-eyebrow">Marvel Cinematic Universe</span>
          <h1 className="landing-h1">
            <span className="landing-h1-main">AVENGERS</span>
            <span className="landing-h1-sub">Earth's Mightiest Heroes</span>
          </h1>
          <div className="landing-rule" />
          <p className="landing-tagline">
            Across timelines. Across the multiverse.<br />
            The saga begins here.
          </p>
        </motion.div>

        <motion.div className="landing-scroll-cue" style={{ opacity: cueOpacity }}>
          <div className="landing-scroll-line" />
          <span>Scroll to explore</span>
        </motion.div>

      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   PAGE ROOT
   Sections: Landing → Act One → Act Two → Act Three → Multiverse Saga
   (ActThree poster removed; only ONE Multiverse Saga section)
───────────────────────────────────────────────── */
export default function HeroCinematic() {
  return (
    <div className="cinematic-root">
      {/* Navbar slides in after landing screen is scrolled past */}
      <MarvelNavbar />

      {/* Full-screen landing image */}
      <LandingScreen />

      {/* Story sections */}
      <div className="acts-stack">
        <div id="act-one">
          <ActOne />
        </div>
        <div id="act-two">
          <ActTwo />
        </div>
        <div id="act-three">
          <ActThree />
        </div>
        {/* Single Multiverse Saga section — ActThree no longer has a duplicate poster */}
        <div id="multiverse">
          <ActMultiverse />
        </div>
      </div>
    </div>
  );
}
