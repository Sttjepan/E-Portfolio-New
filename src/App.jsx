import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import PaintApp from "./pages/PaintApp";
import PongGame from "./pages/projects/PongGame";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-28 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="/projects/paint" element={<PaintApp />} />
          <Route path="/projects/pong" element={<PongGame />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
