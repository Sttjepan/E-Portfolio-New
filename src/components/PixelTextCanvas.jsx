import React, { useEffect, useRef } from "react";
import { renderPixels, fonts } from "js-pixel-fonts";

export default function PixelTextCanvas({ text, pixelSize = 4, color = "#f472b6", delay = 0 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pxArr = renderPixels(text, fonts.sevenPlus);
    const rows = pxArr.length, cols = pxArr[0].length;
    canvas.width = cols * pixelSize;
    canvas.height = rows * pixelSize;
    ctx.fillStyle = color;

    pxArr.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val) {
          const posX = x * pixelSize;
          const posY = y * pixelSize;
          setTimeout(() => {
            ctx.fillRect(posX, posY, pixelSize, pixelSize);
          }, delay + (y * cols + x) * 2); // progressive draw
        }
      });
    });
  }, [text, pixelSize, color, delay]);

  return <canvas ref={canvasRef} style={{ imageRendering: "pixelated", display: "block" }} />;
}
