import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import PokerSkills from "../components/PokerSkills";
import "../handwriting.css";

const NAME = "Stephen Semren";
const LINES = [
  NAME,
  "Sheridan College Business graduate with hands-on IT and customer service experience.",
  "Interested in technology, analytics, design, marketing, and advertising."
];

export default function Home() {
  const [phase, setPhase] = useState("writing");
  const [lineIndex, setLineIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(-1);
  const writingSound = useRef(null);

  const reset = () => {
    setLineIndex(0);
    setLetterIndex(-1);
    setPhase("writing");
  };

  // Keep the original letter-by-letter introduction and its timing.
  // Cleaning up timers also makes Replay safe to use repeatedly.
  useEffect(() => {
    if (phase !== "writing") return;
    const line = LINES[lineIndex];
    if (letterIndex < line.length - 1) {
      const timer = window.setTimeout(() => {
        const audio = writingSound.current;
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        }
        setLetterIndex((index) => index + 1);
      }, 50);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      if (lineIndex < LINES.length - 1) {
        setLineIndex((index) => index + 1);
        setLetterIndex(-1);
      } else {
        setPhase("revealName");
      }
    }, lineIndex < LINES.length - 1 ? 600 : 800);
    return () => window.clearTimeout(timer);
  }, [phase, lineIndex, letterIndex]);

  useEffect(() => {
    if (phase !== "revealName") return;
    const timer = window.setTimeout(() => setPhase("skills"), 1200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const nameRevealed = phase !== "writing";

  return (
    <div className="relative overflow-hidden min-h-screen bg-black text-white antialiased">
      <Particles
        id="particles-bg"
        init={async (engine) => await loadFull(engine)}
        options={{
          background: { color: "#000" },
          fpsLimit: 60,
          particles: {
            number: { value: 50 },
            color: "#8b5cf6",
            opacity: 0.2,
            size: { min: 1, max: 2 },
            move: { speed: 0.3 }
          }
        }}
        className="absolute inset-0 -z-10"
      />

      <audio ref={writingSound} preload="none">
        <source
          src="https://cdn.pixabay.com/download/audio/2022/02/23/audio_8e8b009199.mp3"
          type="audio/mpeg"
        />
      </audio>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col lg:flex-row gap-10 items-start">
        {/* The original typing + gradient reveal, now occupying ONE name heading. */}
        <div className="w-full lg:w-1/2 min-w-0 bg-white/10 p-5 sm:p-6 rounded-xl backdrop-blur-md">
          <div className="max-w-md space-y-6">
            {LINES.map((line, i) => {
              const visible = nameRevealed || i < lineIndex || (i === lineIndex && letterIndex >= 0);
              return (
                <div
                  key={i}
                  className={`${i === 0 ? "text-3xl sm:text-4xl xl:text-5xl font-extrabold" : "text-base sm:text-lg"} font-sans leading-relaxed tracking-normal break-words ${i === 0 && nameRevealed ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" : ""}`}
                  style={{ visibility: visible ? "visible" : "hidden" }}
                >
                  {i === 0 && nameRevealed ? (
                    <h1 aria-label={NAME}>
                      {NAME.split("").map((char, index) => (
                        <span
                          key={index}
                          aria-hidden="true"
                          className="letter reveal"
                          style={{ animationDelay: `${index * 80}ms` }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </h1>
                  ) : i < lineIndex ? (
                    i === 0 ? <h1>{line}</h1> : line
                  ) : i === lineIndex ? (
                    <>
                      {i === 0 ? <h1 className="inline">{line.slice(0, letterIndex + 1)}</h1> : line.slice(0, letterIndex + 1)}
                      <motion.span
                        className="inline-block text-gray-300"
                        style={{ marginLeft: "0.2em" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        aria-hidden="true"
                      >
                        |
                      </motion.span>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Original poker skills, refresh animation and social links. */}
        {phase === "skills" && (
          <div className="w-full lg:w-1/2 min-w-0">
            <PokerSkills />
          </div>
        )}
      </section>

      {phase === "skills" && (
        <button
          onClick={reset}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          Replay
        </button>
      )}
    </div>
  );
}
