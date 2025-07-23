import React from "react";

export default function PixelArt() {
  return (
    <section className="p-6 text-white min-h-screen bg-background">
      <h2 className="text-3xl font-bold mb-4">Pixel Art Showcase</h2>
      <p className="text-gray-400 mb-6">[Interactive tool will go here]</p>
      <div className="w-full h-96 border border-dashed border-gray-600 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Embed/iframe your tool here</p>
      </div>
    </section>
  );
}