// src/components/PokerSkills.jsx
import React, { useState } from "react";
import "../index.css";
import refreshIcon from "../assets/refresh-button.png";

// Card image imports
import back1 from "../assets/card-back-1.png";
import back2 from "../assets/card-back-2.png";
import back3 from "../assets/card-back-3.png";
import back4 from "../assets/card-back-4.png";
import back5 from "../assets/card-back-5.png";
import back6 from "../assets/card-back-6.png";
import back7 from "../assets/card-back-7.png";
import back8 from "../assets/card-back-8.png";
import back9 from "../assets/card-back-9.png";
import back10 from "../assets/card-back-10.png";
import back11 from "../assets/card-back-11.png";
import back12 from "../assets/card-back-12.png";
import back13 from "../assets/card-back-13.png";
import back14 from "../assets/card-back-14.png";
import back15 from "../assets/card-back-15.png";

import front2 from "../assets/card-front-2.png";
import front3 from "../assets/card-front-3.png";
import front4 from "../assets/card-front-4.png";
import front5 from "../assets/card-front-5.png";
import front6 from "../assets/card-front-6.png";
import front7 from "../assets/card-front-7.png";
import front8 from "../assets/card-front-8.png";
import front9 from "../assets/card-front-9.png";
import front10 from "../assets/card-front-10.png";
import front11 from "../assets/card-front-11.png";
import front12 from "../assets/card-front-12.png";
import front13 from "../assets/card-front-13.png";
import front14 from "../assets/card-front-14.png";
import front15 from "../assets/card-front-15.png";

const FRONTS = [
  front2, front3, front4, front5, front6,
  front7, front8, front9, front10, front11,
  front12, front13, front14, front15,
];

const BACKS = [
  back1, back2, back3, back4, back5,
  back6, back7, back8, back9, back10,
  back11, back12, back13, back14, back15
];

const ALL_SKILLS = [
  "Storytelling", "Technical Thinker", "Empathetic", "Problem Solver",
  "Honest", "Explorer", "Negotiator", "Strategic",
  "Engineer (Creative)", "Methodical", "Researcher", "Expressive",
  "Numerate", "Team Player"
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const decks = Array.from({ length: 3 }, () =>
  shuffle(ALL_SKILLS.map((skill, i) => ({
    skill,
    front: FRONTS[i % FRONTS.length],
    back: BACKS[i % BACKS.length],
  })))
);

export default function PokerSkills() {
  const [deckIdx, setDeckIdx] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const currentDeck = decks[deckIdx].slice(0, 5);

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* 🃏 Card Deck */}
      <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
        <div className="flex justify-center flex-wrap gap-4">
          {currentDeck.map((card, i) => (
            <div
              key={i}
              className="card w-32 h-48 relative group"
              style={{ perspective: 1000 }}
            >
              <div className="card-inner w-full h-full relative transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="card-back absolute w-full h-full backface-hidden rounded-lg shadow-md overflow-hidden">
                  <img
                    src={card.back}
                    alt="Card Back"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="card-front absolute w-full h-full backface-hidden rotate-y-180 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={card.front}
                    alt="Card Front"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-sm font-bold text-white text-center bg-black/40">
                    {card.skill}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔁 Refresh + Social */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl w-full flex flex-col items-center space-y-4">
        <button
          disabled={refreshCount >= 2}
          onClick={() => {
            if (refreshCount < 2) {
              setDeckIdx((deckIdx + 1) % decks.length);
              setRefreshCount(refreshCount + 1);
            }
          }}
          className={`flex items-center space-x-2 px-6 py-2 rounded-md text-white font-semibold ${
            refreshCount < 2
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-600 cursor-not-allowed opacity-50"
          } transition`}
        >
          <img src={refreshIcon} alt="Refresh" className="w-10 h-10 object-contain" />
          <span>{refreshCount < 2 ? "Refresh Cards" : "No More Refreshes"}</span>
        </button>

        {/* 🌐 Social Links */}
        <div className="text-center text-white space-y-1">
          <div className="flex justify-center gap-6 text-purple-300">
            <a href="https://x.com/5tjepann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">X</a>
            <a href="https://github.com/Sttjepan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
            <a href="https://www.linkedin.com/in/semren-stephen" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
