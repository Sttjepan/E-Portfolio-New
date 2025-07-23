import React, { useState } from "react";
import "../styles/PokerTable.css";
import cardBack from "../assets/card-back.png";
import cardFront from "../assets/card-front.png";
import refreshBtn from "../assets/refresh-button.png";

const SKILLS = [ /* your 13 skills */ ];

function sampleFive(seed = 0) {
  // Return five skills based on seed
  return SKILLS.slice(seed * 5, seed * 5 + 5);
}

export default function PokerTable() {
  const [dealCount, setDealCount] = useState(0);
  const [hand, setHand] = useState(sampleFive(0));

  const handleRefresh = () => {
    if (dealCount < 2) {
      const next = dealCount + 1;
      setHand(sampleFive(next));
      setDealCount(next);
    }
  };

  return (
    <div className="poker-wrapper">
      <div className="cards">
        {hand.map((skill, i) => (
          <div key={i} className="card">
            <div className="card-inner">
              <img src={cardBack} alt="card back" className="card-face back" />
              <div className="card-face front">
                <img src={cardFront} alt="card front" />
                <span className="skill-text">{skill}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="refresh-btn"
        disabled={dealCount >= 2}
        onClick={handleRefresh}
      >
        <img src={refreshBtn} alt="refresh" />
      </button>
    </div>
  );
}
