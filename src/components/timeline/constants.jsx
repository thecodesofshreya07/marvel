import drstrangeMom from '../../assets/images_bhumi/drstrange_mom.jpg';
import endgame from '../../assets/images_bhumi/endgame.jpg';
import infinityMovie from '../../assets/images_bhumi/infinity_movie.jpg';
import nowayhome from '../../assets/images_bhumi/nowayhome.jpg';
import wandaVision from '../../assets/images_bhumi/wanda_vision.jpg';
import thor from '../../assets/images_bhumi/image.png'

export const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap');
`;

export const CHARACTERS = {
    strange: {
        name: "DR. STEPHEN STRANGE", alter: "Doctor Strange // Sorcerer Supreme",
        avatar: "⬡", stats: { int: 92, pow: 88, com: 80, mys: 97 },
        abilities: ["Sling Rings", "Time Stone", "Astral Projection", "Dimensional Magic"],
        classification: "AVENGER — SORCERER SUPREME", reality: "Earth-616", threat: "OMEGA CLASS",
        color: "#7b2fbe", scanColor: "#00d4ff", glow: "rgba(123,47,190,0.35)", type: "strange",
        image: drstrangeMom,
        quote: "We never lose our demons. We only learn to live above them.",
        firstAppearance: "Doctor Strange (2016)",
    },
    wanda: {
        name: "WANDA MAXIMOFF", alter: "Scarlet Witch // Nexus Being",
        avatar: "✦", stats: { int: 85, pow: 100, com: 75, mys: 99 },
        abilities: ["Chaos Magic", "Reality Warp", "Telekinesis", "Mind Control"],
        classification: "NEXUS BEING — SCARLET WITCH", reality: "Earth-838 / 616", threat: "CELESTIAL CLASS",
        color: "#e63946", scanColor: "#ff2244", glow: "rgba(230,57,70,0.4)", type: "wanda",
        image: wandaVision,
        quote: "I can't control their fear, only my own.",
        firstAppearance: "Avengers: Age of Ultron (2015)",
    },
    ironman: {
        name: "TONY STARK", alter: "Iron Man // Man In The Machine",
        avatar: "◈", stats: { int: 99, pow: 82, com: 85, mys: 10 },
        abilities: ["Arc Reactor", "J.A.R.V.I.S.", "Extremis", "Quantum Tunnel"],
        classification: "AVENGER — GENIUS / BILLIONAIRE", reality: "Earth-616", threat: "ALPHA CLASS",
        color: "#0066ff", scanColor: "#00aaff", glow: "rgba(0,100,255,0.3)", type: "ironman",
        image: endgame,
        quote: "I am Iron Man.",
        firstAppearance: "Iron Man (2008)",
    },
    thor: {
        name: "THOR ODINSON", alter: "God of Thunder // Avenger",
        avatar: "⚡", stats: { int: 72, pow: 95, com: 90, mys: 70 },
        abilities: ["Mjolnir", "Stormbreaker", "Lightning", "Asgardian Strength"],
        classification: "ASGARDIAN — GOD OF THUNDER", reality: "Asgard-616", threat: "ALPHA CLASS",
        color: "#ffd700", scanColor: "#ffd700", glow: "rgba(255,215,0,0.25)", type: "thor",
        image: thor,
        quote: "I am not a queen or a monster. I am the Goddess of Death.",
        firstAppearance: "Thor (2011)",
    },
    spiderman: {
        name: "PETER PARKER", alter: "Spider-Man // Friendly Neighborhood",
        avatar: "◉", stats: { int: 88, pow: 70, com: 78, mys: 5 },
        abilities: ["Spider-Sense", "Web-Slingers", "Wall Crawling", "Enhanced Reflexes"],
        classification: "AVENGER — ENHANCED HUMAN", reality: "Earth-616", threat: "BETA CLASS",
        color: "#e63946", scanColor: "#e63946", glow: "rgba(230,57,70,0.3)", type: "spiderman",
        image: nowayhome,
        quote: "With great power comes great responsibility.",
        firstAppearance: "Captain America: Civil War (2016)",
    },
};

export const TIMELINE_IMAGES = {
    'mm1': drstrangeMom,  // Dr Strange MoM
    'eg1': endgame,       // Endgame
    'iw1': infinityMovie, // Infinity War
    'nw1': nowayhome,     // No Way Home
    'wv1': wandaVision,   // WandaVision
};

export const TIMELINE = [
    { id: "im1", phase: "Phase 1", year: "2008", title: "Iron Man", chars: ["iron-man"], description: "When billionaire industrialist Tony Stark is held captive in an Afghan cave, he builds a high-tech suit of armor to escape. He then refines the suit and uses it to protect the world as Iron Man.", director: "Jon Favreau", runtime: "126 min", poster: "https://images.unsplash.com/photo-1633113089634-1581928757614?auto=format&fit=crop&q=90&w=400&h=600", tagline: "Heroes aren't born. They're built.", boxOffice: "$585.2M" },
    { id: "th1", phase: "Phase 1", year: "2011", title: "Thor", chars: ["thor"], description: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans. When a dark force threatens his world, he must prove himself worthy to wield his hammer once more.", director: "Kenneth Branagh", runtime: "115 min", poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=90&w=400&h=600", tagline: "Two worlds. One hero.", boxOffice: "$449.3M" },
    { id: "av1", phase: "Phase 1", year: "2012", title: "The Avengers", chars: ["iron-man", "thor"], description: "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity. The Avengers assemble for the first time.", director: "Joss Whedon", runtime: "143 min", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=90&w=400&h=600", tagline: "Some assembly required.", boxOffice: "$1.518B" },
    { id: "cw1", phase: "Phase 3", year: "2016", title: "Civil War", chars: ["iron-man", "spiderman"], description: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage. The team splits into two factions—one led by Captain America and one by Iron Man.", director: "Russo Bros", runtime: "147 min", poster: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&q=90&w=400&h=600", tagline: "Divided we fall.", boxOffice: "$1.153B" },
    { id: "iw1", phase: "Phase 3", year: "2018", title: "Infinity War", chars: ["iron-man", "thor", "strange", "wanda"], description: "The Avengers and their allies must be willing to sacrifice everything in an attempt to defeat the powerful Thanos before his blitz of devastation puts an end to the universe.", director: "Russo Bros", runtime: "149 min", poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=90&w=400&h=600", tagline: "An entire universe. Once and for all.", boxOffice: "$2.048B" },
    { id: "eg1", phase: "Phase 3", year: "2019", title: "Endgame", chars: ["iron-man", "thor", "strange"], description: "After the devastating events of Infinity War, the universe is in ruins. The remaining Avengers assemble once more to reverse Thanos's actions and restore balance.", director: "Russo Bros", runtime: "181 min", poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&q=90&w=400&h=600", tagline: "Whatever it takes.", boxOffice: "$2.798B" },
    { id: "wv1", phase: "Phase 4", year: "2021", title: "WandaVision", chars: ["wanda"], description: "Wanda Maximoff and Vision live an idyllic suburban life in the town of Westview, but the reality is not what it seems. A blend of classic sitcom and the MCU.", director: "Matt Shakman", runtime: "350m", poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&q=90&w=400&h=600", tagline: "The world is changing. It's time we do too.", boxOffice: "Disney+" },
    { id: "nw1", phase: "Phase 4", year: "2021", title: "No Way Home", chars: ["spiderman", "strange"], description: "When Peter Parker asks Doctor Strange to make the world forget he is Spider-Man, the spell goes wrong and opens the multiverse, bringing in villains from other realities.", director: "Jon Watts", runtime: "148 min", poster: "https://images.unsplash.com/photo-1440404653325-ab127d2abc1b?auto=format&fit=crop&q=90&w=400&h=600", tagline: "The multiverse is open.", boxOffice: "$1.921B" },
    { id: "mm1", phase: "Phase 4", year: "2022", title: "Dr Strange MoM", chars: ["strange", "wanda"], description: "Doctor Strange travels into the multiverse to confront a mysterious new adversary. He teams up with alternate versions of himself and faces the Scarlet Witch.", director: "Sam Raimi", runtime: "126 min", poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=90&w=400&h=600", tagline: "The multiverse is a concept about which we know frighteningly little.", boxOffice: "$955.8M" }
];

export function getMoviesForCharacter(charKey) {
    const key = charKey.replace("-", "");
    return TIMELINE.filter((item) => item.chars.some((c) => c.replace("-", "") === key));
}

export const CHAR_FILTERS = [
    { label: "ALL BRANCHES", value: "all" },
    { label: "IRON MAN", value: "iron-man" },
    { label: "THOR", value: "thor" },
    { label: "SCARLET WITCH", value: "wanda" },
    { label: "SPIDER-MAN", value: "spiderman" },
    { label: "DOCTOR STRANGE", value: "strange" },
];

export const GLOBAL_CSS = `
${FONTS}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; width:100%; }
body { background:#030308; color:#fff; font-family:'Rajdhani',sans-serif; overflow-x:hidden; cursor:none; transition: background 0.3s ease; width:100%; min-height:100vh; }
#root { width:100%; min-height:100vh; display:block; }
body.timeline-modal-open { cursor:default !important; }
.timeline-modal-overlay { cursor:pointer !important; }
.timeline-modal-content { cursor:default !important; }
.timeline-modal-close-btn { cursor:pointer !important; }
a, button { transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }
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
.timeline-node-card.highlighted { opacity:1; filter:brightness(1.1); }
.timeline-node-card.dimmed { opacity:0.45; filter:grayscale(0.6); pointer-events:auto; }

@media (max-width: 900px) {
  .timeline-hero-gap { gap: 24px !important; }
  .timeline-nav-wrap { flex-wrap: wrap; padding: 12px 20px !important; gap: 12px; }
  .timeline-nav-links { gap: 16px !important; }
  .timeline-nav-time { font-size: 0.55rem !important; }
}
@media (max-width: 768px) {
  body { cursor: auto; }
  .timeline-section-pad { padding: 80px 20px 60px !important; }
  .timeline-timeline-pad { padding: 24px 16px 40px !important; }
  .timeline-character-pad { padding: 80px 20px 60px !important; }
  .timeline-character-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .timeline-char-selector { grid-template-columns: repeat(2, 1fr) !important; }
  .timeline-modal-grid { grid-template-columns: 1fr !important; }
  .timeline-modal-poster { height: 220px !important; }
}
@media (max-width: 768px) {
  .timeline-nav-links { display: none !important; }
  .timeline-nav-burger { display: block !important; }
}
@media (max-width: 480px) {
  .timeline-node-card-width { width: 180px !important; min-width: 180px; padding: 14px !important; }
  .timeline-passive-strip { display: none !important; }
}
@media (hover: none) {
  body { cursor: auto; }
}
`;
