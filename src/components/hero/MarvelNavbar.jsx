import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import "./MarvelNavbar.css";

const NAV_LINKS = [
  { label: "Avengers",        href: "#act-one"       },
  { label: "Super Soldier",   href: "#act-two"       },
  { label: "New Era",         href: "#act-three"     },
  { label: "Multiverse Saga", href: "#multiverse"    },
];

export default function MarvelNavbar() {
  const [visible, setVisible]   = useState(false);   // appears after landing
  const [scrolled, setScrolled] = useState(false);   // bg darkens after small scroll
  const [menuOpen, setMenuOpen] = useState(false);   // mobile hamburger

  const { scrollY } = useScroll();

  useEffect(() => {
    // Show navbar only after user has scrolled past the landing screen (100vh)
    const landingHeight = window.innerHeight;

    const unsub = scrollY.on("change", (y) => {
      setVisible(y > landingHeight * 0.85);
      setScrolled(y > landingHeight + 40);
    });

    return () => unsub();
  }, [scrollY]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className={`marvel-nav ${scrolled ? "marvel-nav--scrolled" : ""}`}
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{    y: -72, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── LOGO ── */}
          <a href="#top" className="nav-logo" onClick={(e) => handleNav(e, ".cinematic-root")}>
            <span className="nav-logo-m">M</span>
            <span className="nav-logo-text">ARVEL</span>
            <span className="nav-logo-dot" />
          </a>

          {/* ── DESKTOP LINKS ── */}
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNav(e, link.href)}
                >
                  {link.label}
                  <span className="nav-link-bar" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA ── */}
          <a href="#multiverse" className="nav-cta" onClick={(e) => handleNav(e, "#multiverse")}>
            <span>Explore</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className={`nav-hamburger ${menuOpen ? "nav-hamburger--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          {/* ── MOBILE MENU ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="nav-mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-mobile-link"
                    onClick={(e) => handleNav(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
