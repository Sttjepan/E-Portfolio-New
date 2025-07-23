import React, { useRef, useEffect, useState } from "react";

export default function PongGame() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [difficulty, setDifficulty] = useState("Medium");
  const [lineFlash, setLineFlash] = useState(false);

  const nextServer = useRef(Math.random() < 0.5 ? "player" : "cpu");
  const isServing = useRef(false);

  // Prevent page scroll on arrow keys
  useEffect(() => {
    const preventScroll = (e) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", preventScroll, { passive: false });
    return () => window.removeEventListener("keydown", preventScroll);
  }, []);

  // Handle audio play/pause & volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    gameStarted && !isPaused ? audio.play() : audio.pause();
  }, [volume, muted, gameStarted, isPaused]);

  // Main game loop
  useEffect(() => {
    if (!gameStarted || isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const paddleW = 12,
      paddleH = 120,
      ballSize = 12,
      baseSpeed = 4;
    let leftY = (canvas.height - paddleH) / 2;
    let rightY = (canvas.height - paddleH) / 2;
    let ballX = canvas.width / 2,
      ballY = canvas.height / 2;
    let ballSpeedX = 0,
      ballSpeedY = 0;
    let up = false,
      down = false;
    let animationId,
      serveTimeout;

    const cpuSpeed = difficulty === "Easy" ? 2 : difficulty === "Hard" ? 5 : 3;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") up = true;
      if (e.key === "ArrowDown") down = true;
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") up = false;
      if (e.key === "ArrowDown") down = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const startServe = () => {
      isServing.current = true;
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = 0;
      ballSpeedY = 0;
      serveTimeout = setTimeout(() => {
        isServing.current = false;
        const dir = nextServer.current === "player" ? 1 : -1;
        ballSpeedX = baseSpeed * dir;
        ballSpeedY = baseSpeed * (Math.random() < 0.5 ? 1 : -1);
        nextServer.current =
          nextServer.current === "player" ? "cpu" : "player";
      }, 1000);
    };
    startServe();

    const gameLoop = () => {
      // Win condition
      if (
        (playerScore >= 11 || cpuScore >= 11) &&
        Math.abs(playerScore - cpuScore) >= 2
      ) {
        setWinner(playerScore > cpuScore ? "Player" : "CPU");
        setGameStarted(false);
        return;
      }

      // Player paddle
      if (up) leftY = Math.max(0, leftY - 5);
      if (down) leftY = Math.min(canvas.height - paddleH, leftY + 5);
      // CPU paddle
      rightY =
        ballY < rightY + paddleH / 2
          ? Math.max(0, rightY - cpuSpeed)
          : Math.min(canvas.height - paddleH, rightY + cpuSpeed);

      if (!isServing.current) {
        // Move ball
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        // Bounce top/bottom
        if (ballY <= 0 || ballY + ballSize >= canvas.height)
          ballSpeedY = -ballSpeedY;
        // Player paddle collision
        if (
          ballX <= paddleW &&
          ballY + ballSize >= leftY &&
          ballY <= leftY + paddleH
        ) {
          ballSpeedX = -ballSpeedX * 1.05;
          ballSpeedY =
            ballSpeedY * 1.05 + (up ? -1 : down ? 1 : 0);
        }
        // CPU paddle collision
        if (
          ballX + ballSize >= canvas.width - paddleW &&
          ballY + ballSize >= rightY &&
          ballY <= rightY + paddleH
        ) {
          ballSpeedX = -ballSpeedX * 1.05;
          ballSpeedY = ballSpeedY * 1.05;
        }
        // Score checks
        if (ballX < 0) {
          setCpuScore((s) => s + 1);
          setLineFlash(true);
          startServe();
        }
        if (ballX > canvas.width) {
          setPlayerScore((s) => s + 1);
          setLineFlash(true);
          startServe();
        }
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Flashing center line
      ctx.strokeStyle = lineFlash ? "#f0f" : "#fff";
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
      // Paddles & ball
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, leftY, paddleW, paddleH);
      ctx.fillRect(canvas.width - paddleW, rightY, paddleW, paddleH);
      ctx.fillRect(ballX, ballY, ballSize, ballSize);

      animationId = requestAnimationFrame(gameLoop);
    };
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationId);
      clearTimeout(serveTimeout);
    };
  }, [gameStarted, isPaused, playerScore, cpuScore, difficulty]);

  // Turn off line flash
  useEffect(() => {
    if (!lineFlash) return;
    const t = setTimeout(() => setLineFlash(false), 300);
    return () => clearTimeout(t);
  }, [lineFlash]);

  const handleStart = () => {
    setPlayerScore(0);
    setCpuScore(0);
    setWinner(null);
    nextServer.current = Math.random() < 0.5 ? "player" : "cpu";
    setGameStarted(true);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative px-4">
      {/* Control bar */}
      <div className="bg-gray-800 rounded-lg px-6 py-3 flex items-center gap-6 justify-center mb-4 flex-wrap">
        <label>Music Vol:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="cursor-pointer"
        />
        <button
          onClick={() => setMuted((m) => !m)}
          className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <div className="text-lg font-semibold bg-black px-4 py-1 rounded border border-white">
          {playerScore} : {cpuScore}
        </div>
        {gameStarted && (
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
      </div>

      {/* Game Area */}
      <div
        className="
          relative
          w-[1000px] h-[600px]
          border-4 border-purple-500
          rounded-xl shadow-lg
          overflow-hidden
          flex items-center justify-center
        "
      >
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Overlay */}
        {(!gameStarted || isPaused) && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center space-y-4 bg-black bg-opacity-60 rounded-xl">
            {winner && <p className="text-lg">{winner} wins! 🎉</p>}
            <p>Use ↑ ↓ to move</p>
            <div>
              <p>Difficulty:</p>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="text-black px-2 py-1 rounded"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-purple-500 text-white rounded"
            >
              {winner ? "Restart" : "Start"}
            </button>
          </div>
        )}
      </div>

      <audio ref={audioRef} src="/music/music1.ogg" loop />
    </div>
  );
}
