import React, { useRef, useState, useEffect } from "react";

export default function PaintApp() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [color, setColor] = useState("#6366f1");
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      // Size the actual drawing surface to the visible canvas area.
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      // Keep existing strokes when the window size changes.
      const previous = document.createElement("canvas");
      previous.width = canvas.width;
      previous.height = canvas.height;
      if (canvas.width && canvas.height) {
        previous.getContext("2d").drawImage(canvas, 0, 0);
      }
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = canvas.dataset.color || "#6366f1";
      ctx.lineWidth = Number(canvas.dataset.brushSize || 5);
      if (previous.width && previous.height) {
        ctx.drawImage(previous, 0, 0, canvas.width, canvas.height);
      }
      ctxRef.current = ctx;
    };
    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.dataset.color = color;
    canvas.dataset.brushSize = String(brushSize);
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const getCoordinates = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const startDrawing = (event) => {
    const { x, y } = getCoordinates(event);
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(x, y);
    isDrawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const draw = (event) => {
    if (!isDrawingRef.current || !ctxRef.current) return;
    const { x, y } = getCoordinates(event);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) ctxRef.current?.closePath();
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-4 p-4 mb-4 bg-gray-800 rounded-lg shadow-md max-w-xl">
        <label className="sr-only" htmlFor="paint-color">Brush colour</label>
        <input
          id="paint-color"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          className="w-10 h-10 rounded-full border-none cursor-pointer"
        />
        <label htmlFor="paint-size" className="text-sm">Brush size</label>
        <input
          id="paint-size"
          type="range"
          min="1"
          max="30"
          value={brushSize}
          onChange={(event) => setBrushSize(Number(event.target.value))}
          className="w-32"
        />
        <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
        onLostPointerCapture={stopDrawing}
        className="block w-full h-[65vh] min-h-[320px] max-h-[760px] cursor-crosshair rounded-lg border border-purple-500/50 bg-black"
        style={{ touchAction: "none" }}
        aria-label="Interactive drawing canvas"
      />
    </div>
  );
}
