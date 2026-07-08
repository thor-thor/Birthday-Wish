"use client";

import { useEffect, useState } from "react";

export default function Sparkles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles on client side to avoid SSR hydrations mismatch
    const items = Array.from({ length: 30 }).map((_, i) => {
      const type = ["heart", "star", "dot"][Math.floor(Math.random() * 3)];
      const size = Math.random() * 15 + 8;
      const left = Math.random() * 100; // in percent
      const delay = Math.random() * 10; // in seconds
      const duration = Math.random() * 15 + 10; // in seconds
      const opacity = Math.random() * 0.4 + 0.1;

      return { id: i, type, size, left, delay, duration, opacity };
    });
    setParticles(items);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((p) => {
        let symbol = "✨";
        if (p.type === "heart") symbol = "❤️";
        if (p.type === "star") symbol = "⭐";
        if (p.type === "dot") symbol = "🌸";

        return (
          <div
            key={p.id}
            className="absolute text-center select-none"
            style={{
              left: `${p.left}%`,
              bottom: `-50px`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationName: "float-up",
            }}
          >
            {symbol}
          </div>
        );
      })}
      <style jsx global>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--op, 0.4);
          }
          90% {
            opacity: var(--op, 0.4);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
