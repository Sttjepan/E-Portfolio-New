import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center font-sans">
      
      {/* Section Title */}
      <div className="bg-card px-6 py-4 rounded-lg mb-10 shadow-soft">
        <h2 className="text-3xl font-bold text-center">Get in Touch</h2>
      </div>

      {/* Form Container */}
      <div className="bg-card px-8 py-6 rounded-lg w-full max-w-xl shadow-soft space-y-6">
        
        {/* Links */}
        <div className="flex flex-col items-start space-y-2">
          <a 
            href="https://linkedin.com/in/semren-stephen" 
            className="text-primary hover:underline transition duration-200"
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:stephensemren1011@gmail.com" 
            className="text-primary hover:underline transition duration-200"
          >
            Email
          </a>
        </div>

        {/* Form */}
        <form
          action="https://formspree.io/f/mblkgkyn"
          method="POST"
          className="space-y-4"
        >
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            required
            className="w-full p-3 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            required
            className="w-full p-3 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea 
            name="message"
            rows="4" 
            placeholder="Your Message" 
            required
            className="w-full p-3 bg-background border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <button 
            type="submit" 
            className="w-full bg-primary text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
