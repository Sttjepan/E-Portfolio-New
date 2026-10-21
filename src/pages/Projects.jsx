import React from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Paint Application",
    description: "A simple canvas drawing tool with adjustable brush size, colours, and a clear option.",
    path: "/projects/paint",
    label: "Open Paint Application"
  },
  {
    title: "Pong Mini-Game",
    description: "An interactive take on classic Pong with an AI opponent, difficulty settings, and scoring.",
    path: "/projects/pong",
    label: "Play Pong"
  }
];

export default function Projects() {
  return (
    <section className="p-6 md:p-12 bg-black text-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card rounded-xl px-8 py-4 mb-4 inline-block shadow-soft">
          <h1 className="text-3xl font-bold">Projects</h1>
        </div>
        <p className="text-gray-300 mb-10 max-w-2xl leading-relaxed">
          A selection of interactive projects. Explore the applications below to try them out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.path}
              to={project.path}
              className="group block bg-card rounded-xl p-6 sm:p-8 transition-transform shadow-soft hover:-translate-y-1 hover:shadow-glow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400"
              aria-label={project.label}
            >
              <h2 className="font-semibold text-xl mb-3 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm min-h-[4.5em]">{project.description}</p>
              <p className="mt-5 text-sm text-purple-300 font-semibold">{project.label} →</p>
            </Link>
          ))}
          <div className="bg-card rounded-xl p-6 sm:p-8 shadow-soft border border-purple-500/30" aria-label="Facial Recognition Project, work in progress">
            <h2 className="font-semibold text-xl mb-3">Facial Recognition Project</h2>
            <p className="text-sm text-gray-300 leading-relaxed">A local computer-vision project currently in development.</p>
            <p className="mt-5 inline-block text-sm text-purple-200 font-semibold border border-purple-500/40 rounded-md px-3 py-1.5">Work in Progress</p>
          </div>
        </div>
      </div>
    </section>
  );
}
