"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Smile, Sun, Award, Gift, ShieldAlert, Coffee, Compass, HelpCircle, Key, Eye, CheckCircle2, MessageCircle, Star, Music, HelpCircle as Help } from "lucide-react";
import confetti from "canvas-confetti";

const REASONS = [
  {
    id: 1,
    title: "Always Supportive",
    icon: Sun,
    message: "You've been my rock through every storm, always believing in me when I couldn't believe in myself.",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: 2,
    title: "Infectious Laugh",
    icon: Smile,
    message: "Your laugh is genuinely infectious and can brighten up the darkest room in an instant.",
    color: "from-pink-400 to-purple-500",
  },
  {
    id: 3,
    title: "Unparalleled Kindness",
    icon: Heart,
    message: "You show so much empathy and care for everyone around you, inspiring me to be a better person.",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 4,
    title: "My First Friend",
    icon: Compass,
    message: "From childhood toys to adult life problems, you've shared every step of my journey.",
    color: "from-indigo-400 to-blue-500",
  },
  {
    id: 5,
    title: "Incredibly Patient",
    icon: Coffee,
    message: "You listen to my endless rants and guide me with wisdom without any judgment.",
    color: "from-blue-400 to-teal-500",
  },
  {
    id: 6,
    title: "A True Protector",
    icon: Award,
    message: "No matter what happens, I know you've got my back and will defend me to the very end.",
    color: "from-teal-400 to-emerald-500",
  },
  {
    id: 7,
    title: "Cooking Wizard",
    icon: Gift,
    message: "Your cooking isn't just delicious; it feels like a warm, comforting hug on a cold day!",
    color: "from-emerald-400 to-green-500",
  },
  {
    id: 8,
    title: "Utterly Resilient",
    icon: Star,
    message: "Your strength in handling life's difficulties teaches me how to stand tall against odds.",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 9,
    title: "Greatest Blessing",
    icon: Sparkles,
    message: "I count my blessings twice when I think of you. I am so lucky to be your sibling.",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 10,
    title: "Generous Heart",
    icon: Key,
    message: "You always give to others without expecting a single thing in return. Your heart is gold.",
    color: "from-red-400 to-rose-500",
  },
  {
    id: 11,
    title: "Wise Advisor",
    icon: Help,
    message: "Your advice is always spot on, helping me navigate life's trickiest decisions.",
    color: "from-rose-400 to-amber-500",
  },
  {
    id: 12,
    title: "Blame Taker",
    icon: CheckCircle2,
    message: "You saved me from scoldings and took the blame more times than I can count!",
    color: "from-amber-400 to-lime-500",
  },
  {
    id: 13,
    title: "Always Upbeat",
    icon: Eye,
    message: "Even in tough times, you find a spark of hope and spread positive vibes to everyone.",
    color: "from-lime-400 to-emerald-500",
  },
  {
    id: 14,
    title: "Secret Keeper",
    icon: Key,
    message: "You know all my embarrassing stories and deepest secrets, and they are forever safe with you.",
    color: "from-emerald-400 to-cyan-500",
  },
  {
    id: 15,
    title: "Hilariously Funny",
    icon: Smile,
    message: "Your quirky humor and inside jokes make our family dinners unforgettable.",
    color: "from-cyan-400 to-sky-500",
  },
  {
    id: 16,
    title: "Beautiful Soul",
    icon: Heart,
    message: "You carry yourself with a grace and light that touches and inspires everyone you meet.",
    color: "from-sky-400 to-violet-500",
  },
  {
    id: 17,
    title: "Inspirational Drive",
    icon: Award,
    message: "Your ambition and hard work motivate me to chase my own dreams relentlessly.",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    id: 18,
    title: "Unconditional Love",
    icon: MessageCircle,
    message: "You accept me exactly as I am, with all my weird flaws and silly quirks.",
    color: "from-fuchsia-400 to-rose-500",
  },
  {
    id: 19,
    title: "The Best Listener",
    icon: Music,
    message: "You don't just hear words; you truly understand my feelings and thoughts behind them.",
    color: "from-rose-400 to-purple-500",
  },
  {
    id: 20,
    title: "Simply Irreplaceable",
    icon: Sparkles,
    message: "There is absolutely no one like you in this entire world. You are my one-in-a-million!",
    color: "from-purple-400 to-rose-500",
  },
];

function FlipCard({ item, index, forcedFlip, onToggleFlip }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = item.icon;
  const isFlipped = forcedFlip || isHovered;

  return (
    <motion.div
      id={`reason-card-${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="perspective-1000 w-full h-56 cursor-pointer"
      onClick={onToggleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-md border border-rose-200/30">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
              <IconComponent className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-lg text-rose-950 dark:text-pink-50">
              {item.title}
            </h3>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">
            Reason #{item.id}
          </span>
        </div>

        {/* Back Side */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br ${item.color} text-white rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-lg`}
        >
          <div className="flex-1 flex flex-col justify-center items-center">
            <Heart className="h-6 w-6 text-white/40 mb-3 fill-white/10" />
            <p className="text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
              {item.message}
            </p>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
            With Love ❤️
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reasons() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const pickRandom = () => {
    const randomCard = RECOGNIZED_REASONS_OR_FALLBACK();
    
    // Smooth scroll to element
    const cardEl = document.getElementById(`reason-card-${randomCard.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "center" });

      // Highlight flip effect
      setFlippedCards({ [randomCard.id]: true });

      // Fire confetti near card
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#fbbf24", "#a855f7"],
        });
      }, 350);
    }
  };

  // Helper for random selection
  const RECOGNIZED_REASONS_OR_FALLBACK = () => {
    return REASONS[Math.floor(Math.random() * REASONS.length)];
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-8"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900">
          Appreciation Notes
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          20 Reasons Why You're Amazing
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          Hover or tap on any card below to flip it, or use our magic selector for a surprise.
        </p>
      </motion.div>

      {/* Pick Random Button */}
      <div className="mb-10">
        <button
          onClick={pickRandom}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-purple-600 to-amber-500 text-white font-extrabold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 animate-pulse-slow"
        >
          <span>🎲 Pick a Random Reason</span>
        </button>
      </div>

      {/* Grid of 20 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {REASONS.map((r, i) => (
          <FlipCard
            key={r.id}
            item={r}
            index={i}
            forcedFlip={!!flippedCards[r.id]}
            onToggleFlip={() => toggleFlip(r.id)}
          />
        ))}
      </div>
    </div>
  );
}
