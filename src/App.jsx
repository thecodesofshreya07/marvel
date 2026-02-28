import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HeroCinematic";   // your landing page
import MarvelApp from "./components/hero/characters/char";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supersoldier" element={<MarvelApp />} />
      </Routes>
    </Router>
  );
}

export default App;