import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import CursorHearts from "@/components/CursorHearts";
import Sparkles from "@/components/Sparkles";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Happy Birthday Sis! ❤️",
  description: "A beautiful, magical, and interactive digital scrapbook for the best sister in the universe.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Sparkles />
        <CursorHearts />
        <Navbar />
        <main className="flex-grow w-full relative z-10 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <MusicPlayer />
      </body>
    </html>
  );
}
