import React from "react";
import profilePic from "../assets/profile.jpg";

export default function About() {
  return (
    <section className="font-sans text-white bg-[#0e1726] min-h-screen px-6 py-12 md:px-16 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-6">

          {/* PROFILE IMAGE */}
          <img
            src={profilePic}
            alt="Profile"
            className="w-full max-w-xs rounded-md border-2 border-purple-500 image-hover"
          />

          {/* INTRO TEXT */}
          <div className="bg-gray-800 text-white p-4 rounded-md card-hover leading-relaxed tracking-wide">
            Studying Marketing & Advertising at Sheridan College. I build custom keyboards,
            create databases for Team Fight Tactics, and code retro-style games in my free time.
          </div>

          {/* GOALS + SKILLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-4 rounded-md card-hover">
              <h3 className="text-lg font-semibold mb-2">Goals</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>End of Summer 2025: AI bot for Osu! 4k Mania</li>
                <li>Fall 2025: Train AI bot to speak via Vtuber or voice actor</li>
                <li>Jan 2026: Launch site showcasing AI across Osu! modes</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-4 rounded-md card-hover">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>UI/UX Design</li>
                <li>Webflow & Development</li>
                <li>Programming</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT RESUME */}
        <div className="flex-1 bg-gray-900 p-4 rounded-md card-hover w-full">
          <h3 className="text-xl font-bold mb-4">Resume</h3>
          <div className="w-full aspect-[8.5/11] overflow-hidden">
            <iframe
              src="/Stephen_Semren_Resume.pdf"
              className="w-full h-full"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
