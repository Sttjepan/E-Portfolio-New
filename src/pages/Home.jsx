import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import PokerSkills from "../components/PokerSkills";
import "../handwriting.css";

const NAME = "Stephen Semren";
const LINES = [
  NAME,
  "Currently enrolled in college. Interested in analytics, design, and retro game creation.",
  "Looking for new and innovative ways to use my skills to make a positive impact!"
];

export default function Home() {
  const [phase, setPhase] = useState("writing");
  const [lineIndex, setLineIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(-1);
  const writingSound = useRef();
  const nameRef = useRef();

  const reset = () => {
    setPhase("writing");
    setLineIndex(0);
    setLetterIndex(-1);
  };

  useEffect(() => {
    if (phase !== "writing") return;

    const line = LINES[lineIndex];
    if (letterIndex < line.length - 1) {
      const timer = setTimeout(() => {
        writingSound.current?.play();
        setLetterIndex(letterIndex + 1);
      }, 50);
      return () => clearTimeout(timer);
    }

    if (letterIndex === line.length - 1) {
      if (lineIndex < LINES.length - 1) {
        setTimeout(() => {
          setLineIndex(lineIndex + 1);
          setLetterIndex(-1);
        }, 600);
      } else {
        setTimeout(() => setPhase("revealName"), 800);
      }
    }
  }, [phase, lineIndex, letterIndex]);

  useEffect(() => {
    if (phase !== "revealName") return;

    const letters = nameRef.current.querySelectorAll(".letter");
    letters.forEach((el, i) =>
      setTimeout(() => el.classList.add("reveal"), i * 80)
    );
    setTimeout(() => setPhase("skills"), 1200);
  }, [phase]);

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

      <audio ref={writingSound}>
        <source
          src="https://cdn.pixabay.com/download/audio/2022/02/23/audio_8e8b009199.mp3"
          type="audio/mpeg"
        />
      </audio>

      <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-10 items-start">
        {/* Intro Text */}
        <div className="lg:w-1/2 bg-white/10 p-6 rounded-xl backdrop-blur-md">
          <div className="max-w-md space-y-6">
            {LINES.map((line, i) => (
              <div
                key={i}
                className={`${i === 0 ? "text-5xl font-extrabold" : "text-base"} font-sans leading-relaxed tracking-normal`}
                style={{
                  visibility:
                    i < lineIndex || (i === lineIndex && letterIndex >= 0)
                      ? "visible"
                      : "hidden"
                }}
              >
                {i < lineIndex
                  ? line
                  : i === lineIndex
                  ? (
                    <>
                      {line.slice(0, letterIndex + 1)}
                      <motion.span
                        className="inline-block text-gray-300"
                        style={{ marginLeft: "0.2em" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >
                        |
                      </motion.span>
                    </>
                  )
                  : ""}
              </div>
            ))}

            {phase !== "writing" && (
              <div
                ref={nameRef}
                className="mt-10 flex flex-wrap font-extrabold text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {NAME.split("").map((char, i) => (
                  <span key={i} className="letter inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
        {phase === "skills" && (
          <div className="lg:w-1/2">
            <PokerSkills />
          </div>
        )}
      </section>

      {/* Replay */}
      {phase === "skills" && (
        <button
          onClick={reset}
          className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 transition"
        >
          Replay
        </button>
      )}
    </div>
  );
}
