"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Tv, ListMusic, ImageIcon, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDESHOW_IMAGES = [
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80", // Birthday background
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80", // Happy laughs
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80", // Mountain travel
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80", // Sparkler party
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80", // Children playing
];

const LOCAL_PLAYLIST = [
  { title: "Sweet Acoustic", duration: "3:42" },
  { title: "Magical Piano", duration: "4:15" },
  { title: "Happy Birthday (Chime)", duration: "2:58" },
];

export default function Multimedia() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(true);
  const [videoLiked, setVideoLiked] = useState(false);
  const videoRef = useRef(null);

  // Slideshow interval handler
  useEffect(() => {
    if (!isPlayingSlideshow) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlayingSlideshow]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? SLIDESHOW_IMAGES.length - 1 : prev - 1));
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900">
          Media Station
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          Birthday Video & Music
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          Watch a special dedicated birthday loop video and play through our synchronized slideshow.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl items-start">
        {/* Left Column - Video Player (Cinema Box) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full glass-panel p-4 rounded-3xl shadow-xl flex flex-col border border-rose-200/30 overflow-hidden"
          >
            {/* Player Top Title Bar */}
            <div className="flex items-center justify-between pb-3 px-1 border-b border-rose-100 dark:border-rose-900/60 mb-4 text-xs font-bold text-rose-950/60 dark:text-pink-200/60">
              <span className="flex items-center gap-1.5">
                <Tv className="h-4 w-4 text-rose-500" /> Dedicated Birthday Movie
              </span>
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            </div>

            {/* Video Frame wrapper */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-rose-200/10">
              <video
                ref={videoRef}
                src="https://assets.mixkit.co/videos/preview/mixkit-flying-pink-heart-particles-background-40097-large.mp4"
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 text-[10px] font-bold text-white shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Streaming Live
              </div>
            </div>

            {/* Video description */}
            <div className="pt-4 px-1 flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-rose-950 dark:text-pink-50 text-base md:text-lg">
                  Magical Flying Hearts Compilation
                </h3>
                <p className="text-xs text-rose-950/70 dark:text-pink-200/70 font-semibold mt-1">
                  A beautiful visual loop dedicated to you. Replace this with a custom birthday compilation video!
                </p>
              </div>
              <button
                onClick={() => setVideoLiked(!videoLiked)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                  videoLiked
                    ? "bg-rose-500 border-rose-600 text-white"
                    : "bg-rose-50/70 dark:bg-rose-950/50 border-rose-200/60 dark:border-rose-900 text-rose-600 dark:text-rose-400"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${videoLiked ? "fill-white" : ""}`} />
                {videoLiked ? "Liked!" : "Like"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Playlist & Synchronized Slideshow */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Synchronized Slideshow Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full glass-panel p-5 rounded-3xl shadow-xl flex flex-col border border-rose-200/30 overflow-hidden"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-rose-900/60 mb-4 text-xs font-bold text-rose-950/60 dark:text-pink-200/60">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-purple-500" /> Live Slideshow
              </span>
              <button
                onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
                className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/50 text-[10px] text-purple-600 dark:text-purple-300 border border-purple-200/50"
              >
                {isPlayingSlideshow ? "Pause Slideshow" : "Resume"}
              </button>
            </div>

            {/* Slideshow Image frame */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-rose-50/50 shadow-inner group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={SLIDESHOW_IMAGES[activeSlide]}
                  alt={`Slideshow slide ${activeSlide + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Arrows on hover */}
              <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handlePrevSlide}
                  className="h-9 w-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                  title="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="h-9 w-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                  title="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                {SLIDESHOW_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeSlide ? "w-5 bg-white shadow-md" : "w-2 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sync Playlist Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full glass-panel p-5 rounded-3xl shadow-xl flex flex-col border border-rose-200/30"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-950/60 dark:text-pink-200/60 pb-3 border-b border-rose-100 dark:border-rose-900/60 mb-3">
              <ListMusic className="h-4 w-4 text-amber-500" />
              <span>Background Playlist Info</span>
            </div>

            <p className="text-[11px] font-semibold text-rose-950/70 dark:text-pink-200/70 mb-3 leading-relaxed">
              These tracks play globally from the persistent control widget in the bottom-right corner.
            </p>

            <div className="flex flex-col space-y-2">
              {LOCAL_PLAYLIST.map((track, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/40 text-xs font-semibold text-rose-950 dark:text-pink-100"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] text-rose-400 font-bold">0{i + 1}</span>
                    {track.title}
                  </span>
                  <span className="text-[10px] text-rose-950/55 dark:text-pink-200/55">{track.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
