import React from "react";
import profilePic from "../assets/profile.jpg";

export default function About() {
  return (
    <section className="font-sans text-white bg-[#0e1726] min-h-screen px-4 py-10 sm:px-6 md:px-12 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Original profile-and-content layout, updated to match the application resume. */}
        <div className="w-full lg:flex-1 min-w-0 space-y-6">
          <img
            src={profilePic}
            alt="Stephen Semren"
            className="w-full max-w-xs rounded-md border-2 border-purple-500 image-hover"
          />

          <div className="bg-gray-800 text-white p-5 rounded-md card-hover leading-relaxed">
            <h1 className="text-2xl font-bold mb-3">About Me</h1>
            <p className="text-gray-200">
              I graduated from Sheridan College with an Ontario College Diploma in Business
              in August 2026. My background combines hands-on IT workstation deployment,
              customer service, hospitality, and field operations. I enjoy solving practical
              problems, and learning new technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gray-800 p-5 rounded-md card-hover">
              <h2 className="text-lg font-semibold mb-3 text-purple-300">Education</h2>
              <p className="font-medium">Sheridan College</p>
              <p className="text-sm text-gray-200 mt-1">Ontario College Diploma, Business</p>
              <p className="text-sm text-gray-300 mt-2">September 2024 – August 2026</p>
              <p className="text-sm text-gray-300">GPA: 3.6</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-md card-hover">
              <h2 className="text-lg font-semibold mb-3 text-purple-300">Technical Skills</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-200">
                <li>Windows 10 setup and workstation deployment</li>
                <li>Microsoft Office and PowerPoint</li>
                <li>Python and basic API concepts</li>
                <li>Adobe Photoshop and graphic design</li>
                <li>SQL analysis coursework</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-5 rounded-md card-hover">
            <h2 className="text-lg font-semibold mb-3 text-purple-300">Experience Highlights</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-200 leading-relaxed">
              <li>
                <strong>iPipeline — IT High School Co-op:</strong> Helped configure and deploy
                more than 50 Windows 10 Dell laptops, including network access and
                department-specific setup.
              </li>
              <li>
                <strong>LCBO — Customer Service:</strong> Supported customers, POS transactions,
                and organized product displays.
              </li>
              <li>
                <strong>PIANO PIANO &amp; Efficient Pools:</strong> Worked in fast-paced hospitality
                and field operations teams.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full lg:flex-1 min-w-0 bg-gray-900 p-4 sm:p-5 rounded-md card-hover">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold">Resume</h2>
            <a
              href="/Stephen_Semren_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-purple-600 hover:bg-purple-700 rounded-md px-3 py-2 font-semibold transition"
            >
              View / Download PDF
            </a>
          </div>
          <div className="w-full aspect-[8.5/11] min-h-[380px] overflow-hidden rounded bg-white">
            <iframe
              src="/Stephen_Semren_Resume.pdf#view=FitH"
              title="Stephen Semren resume"
              className="w-full h-full"
            />
          </div>
          <p className="text-gray-400 text-xs mt-3">
            If the preview does not appear on your device, use the PDF link above.
          </p>
        </div>
      </div>
    </section>
  );
}
