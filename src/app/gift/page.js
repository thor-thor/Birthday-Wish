"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function VirtualGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [balloons, setBalloons] = useState([]);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Initial confetti burst
    confetti({
      particleCount: 180,
      spread: 90,
      origin: { y: 0.65 },
      colors: ["#ec4899", "#d946ef", "#f59e0b", "#10b981", "#3b82f6"],
    });

    // Side-burst confetti trigger
    const interval = setInterval(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ec4899", "#f59e0b"],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d946ef", "#3b82f6"],
      });
    }, 250);

    setTimeout(() => clearInterval(interval), 1500);

    // Spawn 18 rising balloon objects
    const balloonColors = ["#ec4899", "#f43f5e", "#d946ef", "#a855f7", "#3b82f6", "#eab308", "#10b981"];
    const items = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // in percent
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      delay: Math.random() * 0.8, // in seconds
      size: Math.random() * 25 + 40, // in pixels
      speed: Math.random() * 3 + 4, // in seconds
    }));
    setBalloons(items);
  };

  const handleReset = () => {
    setIsOpen(false);
    setBalloons([]);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-76px)] relative overflow-hidden">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12 relative z-10"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          The Gift Box
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          A Little Virtual Gift
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          {isOpen ? "A magical surprise just for you!" : "Tap the box to open and receive your special gift."}
        </p>
      </motion.div>

      {/* Floating balloons background layer */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {balloons.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full flex flex-col items-center"
            style={{
              left: `${b.left}%`,
              bottom: "-100px",
              width: `${b.size}px`,
              height: `${b.size * 1.25}px`,
              backgroundColor: b.color,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.speed}s`,
              animationTimingFunction: "ease-out",
              animationName: "balloon-float",
              animationFillMode: "both",
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
            }}
          >
            {/* Balloon basket/string */}
            <div className="w-0.5 h-12 bg-white/40 mt-[100%]" />
          </div>
        ))}
      </div>

      {/* Gift Box Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Box Scene */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center cursor-pointer group"
              onClick={handleOpenGift}
            >
              {/* Gift Wiggle Wrapper */}
              <div className="relative h-56 w-56 animate-wiggle group-hover:scale-105 duration-300">
                {/* Ribbon details */}
                {/* Horizontal belt */}
                <div className="absolute inset-y-0 left-1/2 w-8 bg-amber-400 dark:bg-amber-500 shadow-md -translate-x-1/2 z-10" />
                {/* Vertical belt */}
                <div className="absolute inset-x-0 top-1/2 h-8 bg-amber-400 dark:bg-amber-500 shadow-md -translate-y-1/2 z-10" />

                {/* Box Lid */}
                <div className="absolute top-0 inset-x-0 h-14 bg-rose-500 border border-rose-600 rounded-t-2xl shadow-lg z-20" />

                {/* Box Body */}
                <div className="absolute bottom-0 inset-x-2 h-44 bg-rose-600 border border-rose-700 rounded-b-2xl shadow-2xl flex items-center justify-center">
                  <div className="flex flex-col items-center text-white/95">
                    <Gift className="h-10 w-10 animate-bounce" />
                    <span className="text-xs font-bold uppercase tracking-wider mt-2">
                      Tap To Open
                    </span>
                  </div>
                </div>

                {/* Bow tie on top of lid */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 z-30">
                  <div className="h-8 w-12 rounded-full border-4 border-amber-400 bg-amber-500 shadow-inner rotate-[-30deg]" />
                  <div className="h-8 w-12 rounded-full border-4 border-amber-400 bg-amber-500 shadow-inner rotate-[30deg]" />
                </div>
              </div>
            </motion.div>
          ) : (
            /* Open Box Scene & Card Reveal */
            <motion.div
              key="open-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex flex-col items-center max-w-xl w-full"
            >
              {/* Glowing Card pop-up */}
              <div className="glass-panel p-8 sm:p-10 rounded-3xl text-center shadow-2xl border-2 border-amber-400/80 relative overflow-hidden bg-gradient-to-b from-amber-50/50 to-rose-50/50 dark:from-purple-950/20 dark:to-rose-950/20 max-w-md w-full">
                {/* Glowing Aura Accent */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600" />

                <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-500 mx-auto mb-6 shadow-md">
                  <Sparkles className="h-7 w-7 animate-spin-slow" />
                </div>

                <h3 className="text-2xl font-black text-rose-950 dark:text-pink-50 mb-4 text-glow-gold leading-tight">
                  Happy Birthday, Sis! ❤️
                </h3>

                <p className="text-base sm:text-lg font-bold text-rose-950/85 dark:text-pink-100/85 leading-relaxed italic">
                  "No gift in this world can match how important you are to me. You mean the entire world to me!"
                </p>

                {/* Reset button inside card */}
                <div className="mt-8 pt-6 border-t border-rose-200/50 dark:border-purple-900/50 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 shadow-md hover:shadow transition-all cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Wrap It Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        /* Balloon float upwards animations */
        @keyframes balloon-float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-120vh) rotate(${Math.floor(Math.random() * 40) - 20}deg);
            opacity: 0;
          }
        }

        /* Wiggle box keyframes */
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          15% { transform: rotate(-6deg); }
          30% { transform: rotate(5deg); }
          45% { transform: rotate(-4deg); }
          60% { transform: rotate(3deg); }
          75% { transform: rotate(-2deg); }
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
