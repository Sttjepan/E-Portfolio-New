import { Link } from "react-router-dom";
import React from "react";

export default function Projects() {
  return (
    <section className="p-6 md:p-12 bg-black text-white min-h-screen font-sans">
      <div className="bg-card rounded-xl px-8 py-4 mb-10 inline-block mx-auto shadow-soft">
        <h2 className="text-3xl font-bold text-center">Projects</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/projects/paint">
          <div className="bg-card rounded-xl p-6 w-[280px] transition-transform shadow-soft hover:scale-105 hover:shadow-glow duration-300 text-center">
            <h3 className="font-semibold text-lg">Paint Application</h3>
          </div>
        </Link>

        <Link to="/projects/pong">
          <div className="bg-card rounded-xl p-6 w-[280px] transition-transform shadow-soft hover:scale-105 hover:shadow-glow duration-300 text-center">
            <h3 className="font-semibold text-lg">Pong Mini-Game</h3>
          </div>
        </Link>
      </div>
    </section>
  );
}
