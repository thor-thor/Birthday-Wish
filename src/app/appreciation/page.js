"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Plus, Trash2, Heart } from "lucide-react";

const COLORS = [
  { name: "Yellow", bg: "bg-amber-100 text-amber-950 border-amber-200 dark:bg-yellow-950/70 dark:text-yellow-100" },
  { name: "Pink", bg: "bg-pink-100 text-pink-950 border-pink-200 dark:bg-pink-950/70 dark:text-pink-100" },
  { name: "Blue", bg: "bg-cyan-100 text-cyan-950 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-100" },
  { name: "Purple", bg: "bg-purple-100 text-purple-950 border-purple-200 dark:bg-purple-950/70 dark:text-purple-100" },
  { name: "Green", bg: "bg-emerald-100 text-emerald-950 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-100" },
];

const DEFAULT_NOTES = [
  {
    id: "default-1",
    author: "Your Sibling",
    message: "Thank you for always listening to my long, boring rants and never making me feel silly for sharing my feelings.",
    colorIdx: 0,
    rotate: -3,
    x: 0,
    y: 0,
  },
  {
    id: "default-2",
    author: "Mom & Dad",
    message: "Watching you grow into such a kind, wise, and successful woman is our life's greatest joy. We love you so much!",
    colorIdx: 1,
    rotate: 2,
    x: 0,
    y: 0,
  },
  {
    id: "default-3",
    author: "Your Sibling",
    message: "Life Lesson Learned: You taught me that patience and quiet kindness are the greatest strengths a person can carry.",
    colorIdx: 2,
    rotate: -1,
    x: 0,
    y: 0,
  },
  {
    id: "default-4",
    author: "Friend",
    message: "Favorite Moment: That late-night road trip when we stayed up singing old songs and got completely lost in the rain. Unforgettable!",
    colorIdx: 3,
    rotate: 4,
    x: 0,
    y: 0,
  },
];

export default function Appreciation() {
  const [notes, setNotes] = useState([]);
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const boardRef = useRef(null);

  useEffect(() => {
    // Load notes from localstorage, or fallback to defaults
    const savedNotes = localStorage.getItem("birthdayNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes(DEFAULT_NOTES);
      localStorage.setItem("birthdayNotes", JSON.stringify(DEFAULT_NOTES));
    }
  }, []);

  const saveNotes = (updated) => {
    setNotes(updated);
    localStorage.setItem("birthdayNotes", JSON.stringify(updated));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newText.trim() || !newAuthor.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      author: newAuthor.trim(),
      message: newText.trim(),
      colorIdx: colorIdx,
      rotate: Math.floor(Math.random() * 8) - 4, // random tilt between -4 and 4 degrees
      x: 0,
      y: 0,
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setNewText("");
    setNewAuthor("");
  };

  const handleDeleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12 animate-float-in"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          Appreciation Wall
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          Appreciation Board
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          Leave sticky wishes, thank yous, and favorite memories on the corkboard. Drag the notes around to rearrange!
        </p>
      </motion.div>

      {/* Interactive Form & Corkboard Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        {/* Left Side: Create a Sticky Form */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-3xl shadow-xl flex flex-col border border-rose-200/30"
          >
            <h3 className="font-extrabold text-lg text-rose-950 dark:text-pink-50 mb-4 flex items-center gap-1.5">
              <Plus className="h-5 w-5 text-rose-500" /> Stick a New Message
            </h3>

            <form onSubmit={handleAddNote} className="space-y-4">
              {/* Message box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose-950/70 dark:text-pink-200/70 mb-1.5">
                  Your Message
                </label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Type a nice wish, memory, or thank you note..."
                  rows={4}
                  maxLength={150}
                  className="w-full px-4 py-3 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-white/70 dark:bg-rose-950/30 text-rose-950 dark:text-pink-100 placeholder-rose-950/30 dark:placeholder-pink-100/30 outline-none focus:ring-2 focus:ring-rose-400 text-sm font-semibold leading-relaxed"
                  required
                />
              </div>

              {/* Author field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose-950/70 dark:text-pink-200/70 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Your Sibling, Mom, Friend"
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-white/70 dark:bg-rose-950/30 text-rose-950 dark:text-pink-100 placeholder-rose-950/30 dark:placeholder-pink-100/30 outline-none focus:ring-2 focus:ring-rose-400 text-sm font-semibold"
                  required
                />
              </div>

              {/* Color picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-rose-950/70 dark:text-pink-200/70 mb-2">
                  Choose Color
                </label>
                <div className="flex gap-2.5">
                  {COLORS.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setColorIdx(idx)}
                      className={`h-8 w-8 rounded-full border-2 transition-all cursor-pointer ${
                        COLORS[idx].bg.split(" ")[0]
                      } ${colorIdx === idx ? "border-rose-500 scale-110 shadow" : "border-transparent hover:scale-105"}`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Post Wish 🎉
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Corkboard Canvas area */}
        <div className="lg:col-span-8 flex flex-col">
          <div
            ref={boardRef}
            className="w-full min-h-[500px] bg-amber-50/20 dark:bg-indigo-950/10 border border-dashed border-rose-300/40 dark:border-purple-900/40 rounded-3xl p-6 relative overflow-hidden shadow-inner flex flex-wrap gap-6 justify-center items-start content-start"
          >
            {/* Background Cork pattern detail */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />

            <AnimatePresence>
              {notes.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-rose-950/40 dark:text-pink-100/30">
                  <Heart className="h-10 w-10 text-rose-300 dark:text-purple-900 mb-2 animate-bounce" />
                  <span className="font-bold text-sm">The wall is empty. Stick the first wish!</span>
                </div>
              ) : (
                notes.map((note) => {
                  const styleColor = COLORS[note.colorIdx] || COLORS[0];
                  return (
                    <motion.div
                      key={note.id}
                      drag
                      dragConstraints={boardRef}
                      dragElastic={0.15}
                      whileDrag={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                      initial={{ opacity: 0, scale: 0.8, rotate: note.rotate }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`w-64 glass-panel border rounded-2xl p-5 shadow-md flex flex-col justify-between cursor-move select-none relative group transition-colors duration-300 ${styleColor.bg}`}
                      style={{ rotate: `${note.rotate}deg` }}
                    >
                      {/* Thumbtack Pin visualization */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-rose-500 z-10 drop-shadow-md">
                        <Pin className="h-5 w-5 rotate-45 text-rose-600 fill-rose-500" />
                      </div>

                      {/* Delete sticky btn */}
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-rose-950/40 hover:text-rose-600 transition-colors cursor-pointer lg:opacity-0 lg:group-hover:opacity-100"
                        title="Remove Note"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      {/* Content Message */}
                      <p className="text-xs md:text-sm font-semibold leading-relaxed mb-4 text-center mt-2.5">
                        "{note.message}"
                      </p>

                      {/* Author */}
                      <div className="border-t border-black/5 dark:border-white/5 pt-2.5 flex items-center justify-between text-[10px] font-bold tracking-wider opacity-85">
                        <span className="uppercase">By: {note.author}</span>
                        <Heart className="h-3 w-3 fill-rose-500/20 text-rose-500" />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
