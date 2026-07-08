"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Gift, Sparkles, Clock, ArrowRight, Edit3 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [sisterName, setSisterName] = useState("My Sweet Sister");
  const [isEditingName, setIsEditingName] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const typewriterText = "You are not just my sister, you are my first friend, my biggest supporter, and one of the greatest blessings in my life. ❤️";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + typewriterText.charAt(index));
      index++;
      if (index >= typewriterText.length) {
        clearInterval(interval);
      }
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // Confetti effect on load
  useEffect(() => {
    // Single burst on start
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#d946ef", "#a855f7", "#fbbf24"],
    });

    // Secondary delayed burst
    const timeout = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.8 },
        colors: ["#ec4899", "#d946ef", "#6366f1"],
      });
    }, 1500);

    // Load saved name if any
    const savedName = localStorage.getItem("sisterName");
    if (savedName) {
      setSisterName(savedName);
    }

    return () => clearTimeout(timeout);
  }, []);

  // Countdown timer calculations
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let targetDate = new Date(`July 29, ${targetYear} 00:00:00`);

      if (now > targetDate) {
        // If July 29th has already passed this year, countdown to next year
        targetYear += 1;
        targetDate = new Date(`July 29, ${targetYear} 00:00:00`);
      }

      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saveName = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setIsEditingName(false);
      localStorage.setItem("sisterName", sisterName.trim() || "My Sister");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-76px)] px-4 py-8 relative">
      {/* Decorative Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 text-rose-300 dark:text-rose-950 opacity-40 text-4xl"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-12 text-purple-300 dark:text-purple-950 opacity-30 text-5xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 right-1/4 text-yellow-300 dark:text-yellow-950 opacity-30 text-3xl"
        >
          ⭐
        </motion.div>
      </div>

      <div className="w-full max-w-4xl text-center z-10 flex flex-col items-center">
        {/* Main Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 max-w-3xl w-full flex flex-col items-center shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-400 via-purple-500 to-amber-400" />

          {/* Birthday Badge */}
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 mb-6 animate-pulse-slow">
            <Sparkles className="h-3.5 w-3.5" /> Special Dedication
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-rose-950 dark:text-pink-50 mb-4">
            Happy Birthday to the Best Sister in the World
          </h1>

          {/* Glow Typography Sister Name (Editable Easter Egg!) */}
          <div className="relative group mb-6 flex items-center justify-center">
            {isEditingName ? (
              <input
                type="text"
                value={sisterName}
                onChange={(e) => setSisterName(e.target.value)}
                onKeyDown={saveName}
                onBlur={saveName}
                className="text-4xl sm:text-6xl font-black bg-transparent border-b-2 border-rose-400 text-rose-600 dark:text-rose-400 text-center outline-none px-2 max-w-full"
                autoFocus
                maxLength={25}
              />
            ) : (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsEditingName(true)}>
                <span className="text-4xl sm:text-6xl font-black text-glow bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 bg-clip-text text-transparent pb-2">
                  {sisterName}
                </span>
                <Edit3 className="h-4 w-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
          </div>

          {/* Typewriter message */}
          <div className="min-h-[72px] sm:min-h-[60px] max-w-2xl mb-8 flex justify-center items-center">
            <p className="text-base sm:text-lg font-medium text-rose-950/80 dark:text-pink-100/80 leading-relaxed italic">
              {displayedText}
            </p>
          </div>

          {/* Countdown Clock Container */}
          <div className="w-full border-t border-rose-200/50 dark:border-purple-900/50 pt-8 flex flex-col items-center">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-4">
              <Clock className="h-5 w-5" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
                Countdown to July 29th
              </span>
            </div>

            <div className="relative p-1.5 rounded-3xl bg-gradient-to-r from-rose-400 via-purple-500 to-amber-400 shadow-xl max-w-md w-full animate-pulse-slow">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center w-full bg-white/95 dark:bg-[#160b29]/95 p-2.5 rounded-2.5xl">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.minutes },
                  { label: "Secs", val: timeLeft.seconds },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/40 rounded-xl p-1.5 sm:p-3 flex flex-col"
                  >
                    <span className="text-2xl sm:text-3.5xl font-black text-purple-700 dark:text-purple-300 text-glow">
                      {String(c.val).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] sm:text-xs font-bold text-rose-950/60 dark:text-pink-200/60 uppercase mt-0.5">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Journey Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10"
        >
          <Link href="/memories">
            <button className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2">
                Start the Journey <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
