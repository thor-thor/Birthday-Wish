"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RotateCcw, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function HeartfeltLetter() {
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const letterText = 
    "Dear Sister,\n\n" +
    "I wanted to take a moment on your birthday to tell you how incredibly grateful I am to have you in my life. " +
    "You have been my partner in crime since our childhood days, taking the blame for my mischief, dry-sweeping my tears, " +
    "and celebrating my smallest wins like they were world championships.\n\n" +
    "No matter how busy life gets, or how many miles stand between us, you are the first person I want to call when things " +
    "go right, and the only person I need when things go wrong. Your strength, kindness, and beautiful soul inspire me every single day.\n\n" +
    "Thank you for always being there for me. No matter how old we become, you'll always be my first friend and forever my sister. " +
    "I wish you endless happiness, success, and love. Happy Birthday! ❤️";

  // Typewriter handwriting animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + letterText.charAt(index));
      index++;
      if (index >= letterText.length) {
        clearInterval(interval);
        setTypingComplete(true);
      }
    }, 40); // 40ms per character for natural typing speed

    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    setIsCelebrating(true);

    // Continuous fireworks loop using canvas-confetti
    const duration = 12 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Fireworks explosions at random screen coordinates
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleResetCelebration = () => {
    setIsCelebrating(false);
  };

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12 relative z-10"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          The Final Page
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          A Handwritten Letter
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          A final, emotional note from my heart directly to yours. Read to the bottom...
        </p>
      </motion.div>

      {/* Parchment Ruled Lined Notepad */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-amber-200/40 z-10 mb-10"
      >
        {/* Binder Ring details on top */}
        <div className="h-6 bg-stone-200/80 dark:bg-stone-800/80 flex justify-around items-center px-6 border-b border-stone-300">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-stone-400 dark:bg-stone-600 border border-stone-500 shadow-inner" />
          ))}
        </div>

        {/* Paper Notepad Content Area */}
        <div className="paper-lines p-8 md:p-12 text-stone-800 font-semibold text-sm md:text-base leading-8 select-none relative min-h-[450px]">
          {/* Vertical red margin line */}
          <div className="absolute top-0 left-8 md:left-12 bottom-0 w-0.5 bg-red-400 opacity-60 border-l border-red-200" />

          {/* Letter Body typing simulation */}
          <div className="pl-6 md:pl-10 pt-2 italic whitespace-pre-wrap font-serif">
            {displayedText}
            {/* Blinking pen indicator */}
            {!typingComplete && (
              <span className="inline-block w-1.5 h-4 bg-rose-500 animate-blink ml-1" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Unlock Final Celebration Button */}
      <AnimatePresence>
        {typingComplete && !isCelebrating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center z-10"
          >
            <button
              onClick={triggerCelebration}
              className="relative group overflow-hidden px-10 py-5 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 animate-bounce"
            >
              <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
              <span>Unlock Final Celebration 🎉</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Massive Celebration Overlay Modal */}
      <AnimatePresence>
        {isCelebrating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Sparkle decorative icons in overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 text-6xl text-yellow-300 animate-ping opacity-60">⭐</div>
              <div className="absolute bottom-1/4 right-1/4 text-7xl text-pink-500 animate-bounce opacity-50">❤️</div>
              <div className="absolute top-1/3 right-1/4 text-5xl text-purple-400 animate-pulse opacity-60">✨</div>
            </div>

            {/* Glowing Big celebration text */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="max-w-3xl flex flex-col items-center z-10 relative"
            >
              <Heart className="h-20 w-20 text-rose-500 fill-rose-500 animate-pulse mb-6 drop-shadow-lg" />
              
              <h2 className="text-4xl sm:text-6xl font-black text-glow bg-gradient-to-r from-rose-400 via-pink-500 via-purple-500 via-amber-400 to-rose-400 bg-clip-text text-transparent leading-tight pb-3">
                Happy Birthday, My Dear Sister.
              </h2>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white text-glow-gold mt-2">
                You Mean the World to Me ❤️
              </h3>

              <p className="text-sm sm:text-base text-pink-200/80 font-medium italic mt-6 max-w-xl">
                "No matter how far we wander or how old we grow, you will forever be my first friend, my biggest cheer squad, and the absolute best sister in the universe."
              </p>
            </motion.div>

            {/* Reset button to let her return to normal layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 z-10"
            >
              <button
                onClick={handleResetCelebration}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/25 transition-all cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" /> Reset Ceremony
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Blink pen animation */
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </div>
  );
}
