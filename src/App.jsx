import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroCinematic from "./pages/HeroCinematic";
import TimelinePage from "./components/timeline/timeline";
import MarvelApp from "./components/hero/characters/char"; // your supersoldier page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroCinematic />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/supersoldier" element={<MarvelApp />} />
      </Routes>
    </Router>
  );
}

export default App;