"use client";

import { motion, useScroll } from "framer-motion";
import { Baby, BookOpen, Compass, Laugh, Award, Heart, Milestone } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    id: 1,
    period: "Childhood Days (1998 - 2008)",
    title: "Partners in Pillow Castles",
    description: "Building blanket forts, sharing toys, drawing on living room walls, and staying up late whisper-talking. You were my very first friend, saving me from scoldings and filling my early years with absolute magic.",
    icon: Baby,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    period: "School Days (2008 - 2016)",
    title: "Late Night Homework & Secret-Sharing",
    description: "Sharing the lunch boxes, stressing over math tests, and keeping each other's crushes secret. Watching you excel in school made me so proud and gave me a role model I could copy every day.",
    icon: BookOpen,
    color: "from-rose-500 to-purple-500",
  },
  {
    id: 3,
    period: "Family Trips (2016 - 2020)",
    title: "Getting Lost in New Horizons",
    description: "Whether it was trekking up misty hills or walking along sandy shores, travel became an absolute comedy show with you. We always managed to miss the train or take the wrong turn, creating the best inside jokes.",
    icon: Compass,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    period: "Funny Moments (Ongoing)",
    title: "The Kitchen Dance & Inside Jokes",
    description: "Midnight snack raids, terrible karaoke duets, and doing goofy dances to make each other laugh when stressed. We have a private language of facial expressions that can crack us up instantly.",
    icon: Laugh,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 5,
    period: "Special Achievements (2020 - 2025)",
    title: "Celebrating Your Grand Milestones",
    description: "Watching you walk across the college stage and landing your first job. I was cheering the loudest because I know how tirelessly you worked behind the scenes to achieve every single dream.",
    icon: Award,
    color: "from-blue-500 to-amber-500",
  },
  {
    id: 6,
    period: "Present Day & Beyond (2026+)",
    title: "Two Grown Dreamers, Side-by-Side",
    description: "Here we are today—older, busier, but closer than ever. Navigating adult life is so much easier knowing I have you to call whenever I need a boost of inspiration, logic, or just a good laugh.",
    icon: Heart,
    color: "from-amber-500 to-rose-500",
  },
];

export default function Timeline() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-16"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-950/60 px-3 py-1 rounded-full border border-pink-200 dark:border-pink-900">
          Our Journey
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-rose-950 dark:text-pink-50 mt-3 mb-2 text-glow">
          Our Memory Timeline
        </h1>
        <p className="text-sm md:text-base text-rose-950/70 dark:text-pink-200/70 font-medium">
          A scroll through the years, tracking our bond from kids playing games to standing side-by-side today.
        </p>
      </motion.div>

      {/* Vertical Timeline container */}
      <div className="relative w-full max-w-4xl mt-4">
        {/* Timeline Center Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 dark:bg-purple-900/50 -translate-x-1/2 pointer-events-none" />

        {/* Timeline Nodes */}
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isEven = idx % 2 === 0;
            const IconComponent = event.icon;

            return (
              <div
                key={event.id}
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                } relative`}
              >
                {/* Visual Icon Node on Timeline Stem */}
                <div className="absolute left-6 md:left-1/2 h-10 w-10 rounded-full bg-gradient-to-r from-rose-400 to-purple-500 border-4 border-white dark:border-purple-950 flex items-center justify-center text-white shadow-md z-20 -translate-x-1/2">
                  <IconComponent className="h-4 w-4" />
                </div>

                {/* Left/Right Container */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8">
                  {/* Sliding Motion Wrapper */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel p-6 rounded-3xl shadow-lg relative border border-rose-200/30 dark:border-purple-900/30 hover:scale-[1.02] transition-transform duration-300"
                  >
                    {/* Visual Card Accent Line */}
                    <div className={`absolute top-0 inset-x-0 h-1 rounded-t-3xl bg-gradient-to-r ${event.color}`} />

                    {/* Timeline Date Header */}
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                      {event.period}
                    </span>

                    {/* Event Title */}
                    <h3 className="text-lg md:text-xl font-bold text-rose-950 dark:text-pink-50 mt-1 mb-2">
                      {event.title}
                    </h3>

                    {/* Description Text */}
                    <p className="text-xs md:text-sm text-rose-950/80 dark:text-pink-100/80 leading-relaxed font-medium">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty block for layout grid alignment on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
