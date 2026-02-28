import React, { useState, useEffect } from "react";
import Timeline from "./components/timeline/timeline";
import MultiversePage from "./components/multiverse/MultiversePage";

function App() {
  const [view, setView] = useState(
    () => (typeof window !== "undefined" && window.location.hash === "#multiverse" ? "multiverse" : "home")
  );

  useEffect(() => {
    const handler = () => setView(window.location.hash === "#multiverse" ? "multiverse" : "home");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0, boxSizing: "border-box" }}>
      {view === "multiverse" ? <MultiversePage /> : <Timeline />}
    </div>
  );
}

export default App;