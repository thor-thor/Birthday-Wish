"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Memories", path: "/memories" },
    { name: "Reasons", path: "/reasons" },
    { name: "Timeline", path: "/timeline" },
    { name: "Letters", path: "/letters" },
    { name: "Multimedia", path: "/multimedia" },
    { name: "Appreciation", path: "/appreciation" },
    { name: "Gift Box", path: "/gift" },
    { name: "Letter", path: "/letter" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full px-4 py-3 md:px-8">
      <div className="mx-auto max-w-7xl glass-panel rounded-2xl px-4 py-3 md:px-6 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Heart className="h-6 w-6 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform duration-300" />
          <span className="font-bold text-lg bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
            Sis's Day ✨
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-rose-600 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-950/40"
                    : "text-rose-950/70 dark:text-pink-100/70 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-950/20"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions (Theme toggle & Mobile menu btn) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-rose-100/50 dark:hover:bg-rose-950/40 text-rose-950/80 dark:text-pink-100/80 transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-purple-600" />
            ) : (
              <Sun className="h-5 w-5 text-amber-400" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-rose-100/50 dark:hover:bg-rose-950/40 text-rose-950/80 dark:text-pink-100/80 transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 z-50 glass-panel rounded-2xl p-4 shadow-xl animate-float-in">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/50"
                      : "text-rose-950/70 dark:text-pink-100/70 hover:text-rose-600 hover:bg-rose-50/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
