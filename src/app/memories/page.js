"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Download, Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { jsPDF } from "jspdf";

const MEMORIES = [
  {
    id: 1,
    title: "Double Trouble",
    caption: "Our childhood days. Partners in crime since day one! You always let me have the bigger slice of cake.",
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[4/3]",
    category: "childhood",
  },
  {
    id: 2,
    title: "The Dreamer",
    caption: "School graduation. Watching you walk across that stage inspired me so much. My smart, talented sister!",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[3/4]",
    category: "school",
  },
  {
    id: 3,
    title: "Chasing Sunsets",
    caption: "Our special trip together. Exploring new places with you is my favorite thing. You make every travel a comedy show.",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[4/3]",
    category: "trips",
  },
  {
    id: 4,
    title: "Laughter is Therapy",
    caption: "That funny selfie when we couldn't stop laughing. I love that I can talk to you about absolutely anything.",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[1/1]",
    category: "funny",
  },
  {
    id: 5,
    title: "Celebrating Success",
    caption: "Your big milestone. You work harder than anyone I know, and you deserve all the happiness and success.",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[3/4]",
    category: "milestones",
  },
  {
    id: 6,
    title: "Sparkles & Cake",
    caption: "Last year's birthday bash! Another year older, wiser, and more beautiful. Forever my favorite celebrations.",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
    ratio: "aspect-[4/3]",
    category: "celebration",
  },
];

export default function Memories() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [likes, setLikes] = useState({});
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? MEMORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === MEMORIES.length - 1 ? 0 : prev + 1));
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const downloadScrapbook = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF();
      let yOffset = 20;

      // Header
      doc.setFillColor(253, 242, 248); // Soft pink background
      doc.rect(0, 0, 210, 297, "F");

      doc.setTextColor(76, 5, 25); // Deep pink text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Birthday Scrapbook for My Sister", 20, yOffset + 10);
      yOffset += 25;

      doc.setFontSize(14);
      doc.setFont("helvetica", "italic");
      doc.text("Every picture holds a thousand memories, and here are ours...", 20, yOffset);
      yOffset += 20;

      // Memories Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Our Favorite Captured Moments:", 20, yOffset);
      yOffset += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      MEMORIES.forEach((m) => {
        if (yOffset > 250) {
          doc.addPage();
          doc.setFillColor(253, 242, 248);
          doc.rect(0, 0, 210, 297, "F");
          yOffset = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.text(`* ${m.title}`, 20, yOffset);
        yOffset += 6;
        doc.setFont("helvetica", "normal");
        const splitText = doc.splitTextToSize(m.caption, 170);
        doc.text(splitText, 25, yOffset);
        yOffset += splitText.length * 6 + 4;
      });

      // Sweet letter page
      doc.addPage();
      doc.setFillColor(253, 242, 248);
      doc.rect(0, 0, 210, 297, "F");
      yOffset = 30;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(76, 5, 25);
      doc.text("A Message For You on 29th July", 20, yOffset);
      yOffset += 15;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      const letterBody = 
        "Thank you for always being there for me. No matter how old we become, " +
        "you'll always be my first friend and forever my sister. I wish you endless " +
        "happiness, success, and love. Happy Birthday! ❤️";
      
      const splitLetter = doc.splitTextToSize(letterBody, 170);
      doc.text(splitLetter, 20, yOffset);

      doc.save("Memory_Scrapbook.pdf");
    } catch (e) {
      console.error(e);
    }
    setIsGeneratingPdf(false);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          Memory Book
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2">
          Every picture holds a thousand memories
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          A collection of our laughs, adventures, and milestones together.
        </p>

        {/* PDF scrapbook button */}
        <button
          onClick={downloadScrapbook}
          disabled={isGeneratingPdf}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:bg-rose-600 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          {isGeneratingPdf ? "Generating Scrapbook..." : "Download Scrapbook PDF"}
        </button>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl">
        {["all", "childhood", "school", "trips", "funny", "milestones", "celebration"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm ${
              activeCategory === cat
                ? "bg-rose-500 text-white shadow-md scale-105"
                : "glass-panel text-rose-950/70 hover:text-rose-600 hover:bg-rose-50/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-Style Columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full space-y-6">
        <AnimatePresence mode="popLayout">
          {(activeCategory === "all" ? MEMORIES : MEMORIES.filter(m => m.category === activeCategory)).map((m) => {
            const idx = MEMORIES.findIndex((x) => x.id === m.id);
            return (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`break-inside-avoid w-full glass-panel rounded-2xl overflow-hidden shadow-lg hover:shadow-xl group cursor-pointer relative mb-6 border border-rose-200/30`}
                onClick={() => setSelectedIdx(idx)}
              >
            {/* Image Box */}
            <div className={`relative w-full ${m.ratio} overflow-hidden bg-rose-100/30`}>
              <img
                src={m.url}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-full">
                  <Maximize2 className="h-3 w-3" /> View Large
                </span>
                <button
                  onClick={(e) => toggleLike(m.id, e)}
                  className="h-9 w-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                >
                  <Heart
                    className={`h-4.5 w-4.5 ${likes[m.id] ? "text-rose-500 fill-rose-500" : "text-white"}`}
                  />
                </button>
              </div>
            </div>

            {/* Description Text */}
            <div className="p-5 flex flex-col bg-white/45 dark:bg-rose-950/20">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-rose-950 dark:text-pink-50">
                  {m.title}
                </h3>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-100/60 dark:bg-rose-900/40 px-2.5 py-0.5 rounded-full">
                  Memory #{m.id}
                </span>
              </div>
              <p className="text-xs md:text-sm text-rose-950/80 dark:text-pink-100/80 mt-2 leading-relaxed font-medium">
                {m.caption}
              </p>
            </div>
          </motion.div>
        )})}
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between w-full p-2 relative z-10">
              <span className="text-white/60 font-semibold text-xs md:text-sm">
                Memory {selectedIdx + 1} of {MEMORIES.length}
              </span>
              <button
                onClick={() => setSelectedIdx(null)}
                className="h-10 w-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Interactive Carousel Area */}
            <div className="flex-1 flex items-center justify-between max-w-6xl w-full mx-auto relative px-4">
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="h-12 w-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer mr-2 md:mr-6"
                title="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Picture view */}
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 max-h-[70vh] flex justify-center items-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={MEMORIES[selectedIdx].url}
                  alt={MEMORIES[selectedIdx].title}
                  className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="h-12 w-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer ml-2 md:ml-6"
                title="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div
              className="w-full max-w-3xl mx-auto text-center bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 mb-4 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-2">
                {MEMORIES[selectedIdx].title}
              </h2>
              <p className="text-sm text-pink-100/90 leading-relaxed max-w-2xl mx-auto">
                {MEMORIES[selectedIdx].caption}
              </p>
              <div className="flex justify-center mt-3">
                <button
                  onClick={(e) => toggleLike(MEMORIES[selectedIdx].id, e)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-semibold text-xs border border-rose-500/30 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${likes[MEMORIES[selectedIdx].id] ? "text-rose-500 fill-rose-500" : ""}`}
                  />
                  {likes[MEMORIES[selectedIdx].id] ? "Favorite Moment" : "Mark as Favorite"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
