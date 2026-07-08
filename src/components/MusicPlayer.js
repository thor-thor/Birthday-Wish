"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from "lucide-react";

const PLAYLIST = [
  {
    title: "Magical Piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Sweet Acoustic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Happy Birthday (Chime)",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay on first user interaction
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Autoplay blocked: ", err));
      }
      // Remove listeners once interacted
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[currentTrackIndex].url;
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Play failed: ", err));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play failed: ", err));
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="glass-panel flex items-center space-x-3 rounded-full p-2.5 shadow-xl transition-all duration-300 hover:scale-105">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md transition-all hover:brightness-110 active:scale-95 ${
            isPlaying ? "animate-pulse" : ""
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
        </button>

        {/* Info & Visualizer */}
        <div className="hidden sm:flex flex-col pr-2 pl-1 select-none">
          <span className="text-xs font-semibold text-rose-950/80 dark:text-pink-100/90 truncate max-w-[100px]">
            {PLAYLIST[currentTrackIndex].title}
          </span>
          <div className="flex items-center space-x-1 mt-0.5 h-3">
            {/* Visualizer bars */}
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="w-0.5 rounded-full bg-rose-500 dark:bg-rose-400"
                style={{
                  height: isPlaying ? `${Math.floor(Math.random() * 10) + 4}px` : "2px",
                  animation: isPlaying
                    ? `bar-jump-${i} 1.2s ease-in-out infinite alternate`
                    : "none",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={nextTrack}
          className="p-2 rounded-full hover:bg-rose-100/50 dark:hover:bg-rose-950/40 text-rose-950/70 dark:text-pink-100/70 transition-all"
          title="Next Track"
        >
          <SkipForward className="h-4 w-4" />
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-rose-100/50 dark:hover:bg-rose-950/40 text-rose-950/70 dark:text-pink-100/70 transition-all"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={PLAYLIST[currentTrackIndex].url}
          onEnded={nextTrack}
          loop={false}
        />
      </div>

      <style jsx global>{`
        @keyframes bar-jump-1 { 0% { height: 3px; } 100% { height: 12px; } }
        @keyframes bar-jump-2 { 0% { height: 2px; } 100% { height: 10px; } }
        @keyframes bar-jump-3 { 0% { height: 4px; } 100% { height: 14px; } }
        @keyframes bar-jump-4 { 0% { height: 2px; } 100% { height: 9px; } }
        @keyframes bar-jump-5 { 0% { height: 3px; } 100% { height: 11px; } }
      `}</style>
    </div>
  );
}
