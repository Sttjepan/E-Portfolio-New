import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import PaintApp from "./pages/PaintApp";
import PongGame from "./pages/projects/PongGame"; // ✅ ADD THIS

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-28 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/paint" element={<PaintApp />} />
          <Route path="/projects/pong" element={<PongGame />} /> {/* ✅ NEW */}
        </Routes>
      </div>
    </Router>
  );
}
