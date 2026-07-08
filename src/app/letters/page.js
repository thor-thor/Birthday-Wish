"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, X, Heart, Smile, Sun, Flame, MessageCircleHeart } from "lucide-react";

const LETTERS = [
  {
    id: "happy",
    trigger: "Open when you're happy",
    title: "Double the Sunshine! ☀️",
    icon: Sun,
    bgColor: "from-amber-100 to-yellow-200 dark:from-amber-950/45 dark:to-yellow-900/30",
    envelopeColor: "bg-amber-400 dark:bg-amber-600",
    message: "I am absolutely thrilled that you are happy right now! Keep this beautiful smile on your face forever. Take a moment to capture this feeling—you deserve all the joy in the world. Remember this moment the next time you face a rainy day, and please call me so we can double the happiness together! ❤️",
  },
  {
    id: "sad",
    trigger: "Open when you're sad",
    title: "A Big Warm Hug 🫂",
    icon: Heart,
    bgColor: "from-rose-100 to-pink-200 dark:from-rose-950/45 dark:to-pink-900/30",
    envelopeColor: "bg-rose-400 dark:bg-rose-600",
    message: "I'm so sorry things are tough right now. Take a slow, deep breath. You are incredibly strong, but it's completely okay to feel down too. Remember that bad days are always temporary. I am always just a phone call away, ready to listen, cry, make silly jokes, or just sit with you in silence. You're never alone. ❤️",
  },
  {
    id: "miss-me",
    trigger: "Open when you miss me",
    title: "Hearts Side-by-Side 🔗",
    icon: MessageCircleHeart,
    bgColor: "from-purple-100 to-violet-200 dark:from-purple-950/45 dark:to-violet-900/30",
    envelopeColor: "bg-purple-400 dark:bg-purple-600",
    message: "I miss you too! Here is a reminder that no matter how many miles separate us, our hearts are connected. Close your eyes, think of our funniest kitchen dance or family trips, and know that I am sending you a massive hug right this second. Pick up your phone and call me now! 📞",
  },
  {
    id: "motivation",
    trigger: "Open when you need motivation",
    title: "You Are a Force of Nature! ⚡",
    icon: Flame,
    bgColor: "from-orange-100 to-red-200 dark:from-orange-950/45 dark:to-red-900/30",
    envelopeColor: "bg-orange-400 dark:bg-orange-600",
    message: "You are brilliant, hardworking, and capable of achieving anything you set your mind to. Don't let doubt slow you down. Look at how much you've already conquered! Stand tall, take the step, and show the world what you are made of. I believe in you 100%, always. 🚀",
  },
  {
    id: "smile",
    trigger: "Open when you want to smile",
    title: "Goofy Sibling Therapy 🤪",
    icon: Smile,
    bgColor: "from-teal-100 to-cyan-200 dark:from-teal-950/45 dark:to-cyan-900/30",
    envelopeColor: "bg-teal-400 dark:bg-teal-600",
    message: "Need a giggle? Here is a reminder of the time we tried to cook together and ended up ordering pizza, or when you wore your shirt backward all day. Remember, you have the best laugh in the world, and I am sending you this note to trigger it right now. Keep shining, you goof! 😂",
  },
];

export default function Letters() {
  const [openLetterId, setOpenLetterId] = useState(null);

  const activeLetter = LETTERS.find((l) => l.id === openLetterId);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-16"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          Open When...
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          Digital Open-When Letters
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          A bundle of letters written for specific moments. Tap any envelope to read its letter.
        </p>
      </motion.div>

      {/* Grid of Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center">
        {LETTERS.map((letter) => {
          const IconComp = letter.icon;
          return (
            <motion.div
              key={letter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenLetterId(letter.id)}
              className="glass-panel p-6 rounded-3xl w-full max-w-[320px] flex flex-col items-center shadow-lg cursor-pointer border border-rose-200/30 group relative overflow-hidden"
            >
              {/* Envelope visual container */}
              <div className="h-32 w-48 relative flex items-center justify-center mb-6 mt-2">
                {/* Back of Envelope */}
                <div className={`absolute inset-0 rounded-xl shadow-md ${letter.envelopeColor} opacity-90`} />

                {/* Envelope Flap Animation representation */}
                <div className="absolute top-0 inset-x-0 h-16 bg-white/10 rounded-t-xl clip-triangle group-hover:scale-y-110 transition-transform origin-top duration-300" />

                {/* Heart Lock seal */}
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md z-10 transition-transform group-hover:rotate-12 duration-300">
                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                </div>

                <div className="absolute bottom-3 text-[10px] font-bold tracking-widest text-white/80 uppercase">
                  Seal of Love
                </div>
              </div>

              {/* Title Text */}
              <h3 className="font-extrabold text-center text-rose-950 dark:text-pink-50 text-base md:text-lg mb-2">
                {letter.trigger}
              </h3>

              <div className="flex items-center space-x-1.5 text-xs text-rose-500 font-bold bg-rose-50/60 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-100 dark:border-rose-900/60">
                <IconComp className="h-3.5 w-3.5" />
                <span>Read Message</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Popup with Hand-written Letter Paper */}
      <AnimatePresence>
        {openLetterId && activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpenLetterId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-rose-200/30`}
            >
              {/* Top Accent Gradient Header */}
              <div className={`p-6 bg-gradient-to-r ${activeLetter.bgColor} text-rose-950 flex justify-between items-center border-b border-rose-200/30`}>
                <div className="flex items-center space-x-2.5">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-rose-500 shadow-sm">
                    {<activeLetter.icon className="h-5 w-5" />}
                  </div>
                  <h3 className="font-black text-lg">
                    {activeLetter.title}
                  </h3>
                </div>
                <button
                  onClick={() => setOpenLetterId(null)}
                  className="h-9 w-9 bg-white/50 hover:bg-white text-rose-950 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Letter"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Ruled Notebook Paper Content Area */}
              <div className="paper-lines p-8 md:p-10 text-stone-800 font-medium text-sm md:text-base selection:bg-rose-200/40 relative">
                {/* Ruled margins */}
                <div className="absolute top-0 left-6 bottom-0 w-0.5 bg-red-300 opacity-60 border-l border-red-200" />
                
                {/* Main letter body */}
                <div className="pl-6 pt-2 italic leading-8">
                  <span className="font-bold text-rose-700 block mb-4">Dearest Sister,</span>
                  <p className="indent-4 whitespace-pre-wrap">{activeLetter.message}</p>
                  <span className="font-bold text-rose-700 block mt-6 text-right">
                    With all my love & hugs, <br />
                    Forever Yours ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .clip-triangle {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
        }
      `}</style>
    </div>
  );
}
