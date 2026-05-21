import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/portfolio/Hero";
import { Profile } from "@/components/portfolio/Profile";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Certificates } from "@/components/portfolio/Certificates";
import { Highlights, Education } from "@/components/portfolio/EducationHighlights";
import { CTA } from "@/components/portfolio/CTA";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { useReveal, useParallax, useTilt } from "@/hooks/useReveal";
import { useCMSDocument } from "@/lib/cms-hooks";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Harsh Thaker — Electronics, Management & Consulting Portfolio" },
      {
        name: "description",
        content:
          "Harsh Thaker — Electronics & Communication Engineer, Product Designer and Management Consultant specialist in optimizing operational workflows and business strategy.",
      },
      { property: "og:title", content: "Harsh Thaker — Management & Engineering" },
      {
        property: "og:description",
        content:
          "Strategic engineering, product development, and management consultancy — built at the intersection of hardware and strategy.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    // Switching to light theme (Pistachio Linen) as requested
    document.documentElement.classList.remove("dark");
  }, []);

  const { data: config } = useCMSDocument<any>("config", "main");
  const email = config?.email || "harshthaker84@gmail.com";

  return (
    <div
      id="top"
      className="min-h-screen bg-background text-on-surface selection:bg-primary/20 relative"
    >
      <CustomCursor />
      <Navbar />

      {/* 
        MAIN CONTENT AREA 
        We use a high z-index and solid background to cover 
        the CinematicFooter until it is revealed.
      */}
      <main className="relative z-10 w-full bg-background border-b border-outline-variant/30 rounded-b-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Certificates />
        <Highlights />
      </main>

      {/* The Cinematic Footer is revealed as the user scrolls past the main content */}
      <CinematicFooter />

      {/* Floating Contact FAB */}
      <a
        href={`mailto:${email}`}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 gradient-cta text-on-primary-fixed w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center shadow-2xl glow-primary hover:scale-110 transition-transform z-40 border-4 border-background"
        aria-label="Contact"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
        <span className="font-mono text-[8px] font-bold uppercase mt-1">Contact</span>
      </a>
    </div>
  );
}
