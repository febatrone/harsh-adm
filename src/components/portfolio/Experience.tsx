import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { type ExperienceItem } from "@/types";
import { useCMSCollection } from "@/lib/cms-hooks";

export const defaultItems: ExperienceItem[] = [
  {
    period: "15 May 2024 — 14 January 2025",
    title: "CIBOS Tech",
    role: "Technology / R&D Intern",
    desc: "Conceptualized and prototyped innovative vending machine designs and IoT sensor integrations for modern retail environments. Focused on precision hardware integration and system reliability.",
    accent: "primary",
    icon: "▣",
  },
  {
    period: "May 2025 — November 2025",
    title: "Exago Chemicals",
    role: "Business Operations & Strategy Intern",
    desc: "Optimized operational workflows, supported supply chain planning, and conducted market research to improve business efficiency in a leading pharmaceutical firm. Developed data-driven reports and contributed to strategic decision-making.",
    accent: "secondary-fixed",
    icon: "◈",
  },
  {
    period: "December 2025 — February 2026",
    title: "Indian Railways",
    role: "Project Lead",
    desc: "Leading a cross-functional team of 5 to develop an AI-driven ANPR system integrated with GPS for real-time track monitoring. Instrumental in testing and implementing innovative IoT systems.",
    accent: "primary",
    icon: "▰",
  },
  {
    period: "Startup Phase",
    title: "WashWizard",
    role: "Co-founder",
    desc: "A compact Washing Machine startup, Funded by SSIP - to cater daily laundry hassles of Hostellers, PG dwellers and Bachelors. Done R&D about the machine and developed novelty machine using CFD techniques and sustainable development.",
    accent: "secondary-fixed",
    icon: "◈",
  },
];

export function Experience() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { data: customItems } = useCMSCollection<ExperienceItem>("experiences");
  const displayItems = customItems.length > 0 ? customItems : defaultItems;

  const it = displayItems[active] || displayItems[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalItems = displayItems.length;
    if (totalItems === 0) return;
    // Sharpened mapping for high-friction sequential reveal
    const progress = Math.min(Math.max((latest - 0.05) / 0.9, 0), 1);
    const index = Math.min(Math.floor(progress * totalItems), totalItems - 1);

    if (index >= 0 && index !== active) {
      setActive(index);
    }
  });

  useEffect(() => {
    if (timelineRef.current && window.innerWidth < 1024) {
      const activeElement = timelineRef.current.children[active] as HTMLElement;
      if (activeElement) {
        const containerWidth = timelineRef.current.offsetWidth;
        const centerPos = activeElement.offsetLeft - (containerWidth / 2) + (activeElement.offsetWidth / 2);
        timelineRef.current.scrollTo({
          left: Math.max(0, centerPos),
          behavior: 'smooth'
        });
      }
    }
  }, [active]);

  if (!it) return null;

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative min-h-[400vh] border-y border-outline-variant/20 bg-surface-container-lowest z-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Background Decor */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.02]"
        >
          <div className="font-headline text-[30rem] font-black uppercase leading-none whitespace-nowrap -rotate-12 translate-y-20 flex items-center justify-center">
            HISTORY HISTORY
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full flex-1 md:flex-initial flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12 relative"
          >
            <span className="font-mono text-xs text-primary mb-2 block tracking-widest uppercase">
              01 // The Professional Evolution
            </span>
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Strategic <span className="text-stroke italic">Timeline.</span>
            </h2>

            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 right-0 font-scrawl text-primary/40 text-3xl -rotate-6 hidden md:block origin-left"
            >
              Proven track record
            </motion.span>
          </motion.div>

          {/* Floating progress indicator for scroll-switching awareness */}
          <div className="relative h-1.5 w-full bg-outline-variant/20 rounded-full mb-8 md:mb-12 overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute top-0 left-0 h-full w-full bg-primary origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Timeline Navigation */}
            <div ref={timelineRef} className="lg:col-span-3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-[hidden] [&::-webkit-scrollbar]:hidden w-full scroll-smooth">
              {displayItems.map((item, idx) => (
                  <button
                  key={item.title + idx}
                  onClick={() => setActive(idx)}
                  data-cursor="hover"
                  className={`relative justify-start flex items-center gap-4 md:gap-6 p-4 rounded-[1.5rem] transition-all duration-500 group text-left min-w-[280px] w-auto lg:w-full sm:min-w-[320px] lg:min-w-0 will-change-[transform,box-shadow,border-color] ${
                    active === idx
                      ? "bg-primary-container text-white shadow-[0_10px_30px_-10px_var(--primary)] scale-100 lg:scale-[1.02] border border-primary/30"
                      : "bg-white/50 hover:bg-white text-on-surface-variant border border-transparent hover:border-outline-variant/30"
                  }`}
                >
                  <span
                    className={`font-headline text-4xl font-black transition-colors duration-500 ${
                      active === idx ? "text-primary" : "text-outline-variant opacity-40 group-hover:text-primary/50"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest font-black mb-1 transition-colors duration-500 ${
                        active === idx ? "text-white/90" : "text-primary-container group-hover:text-primary"
                      }`}
                    >
                      {item.period}
                    </span>
                    <span className="font-headline font-bold text-sm uppercase leading-tight truncate">
                      {item.title}
                    </span>
                  </div>
                  {active === idx && (
                    <motion.div
                      layoutId="activePointer"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rotate-45 hidden lg:block"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main Content Display */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-14 relative overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-outline-variant/10 will-change-[transform,opacity]"
                >
                  {/* Visual Flow Blocks */}
                  <div className="space-y-8 md:space-y-12">
                    {/* b) Company Name */}
                    <div style={{ transitionDelay: "100ms" }}>
                      <h3 className="font-headline text-4xl md:text-7xl font-black uppercase leading-none tracking-tighter">
                        {it.title}
                      </h3>
                    </div>

                    {/* c) Position */}
                    <div style={{ transitionDelay: "200ms" }}>
                      <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full border-2 border-primary text-primary font-headline font-bold uppercase tracking-widest text-xs md:text-base">
                        {it.role}
                      </div>
                    </div>

                    {/* d) Project Description */}
                    <div style={{ transitionDelay: "300ms" }}>
                      <p className="font-body text-lg md:text-2xl leading-relaxed text-on-surface-variant max-w-3xl">
                        {it.desc}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic Detail */}
                  <div className="absolute top-8 right-8 hidden md:block">
                    <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary text-center">
                        Verified // <br/> {it.role?.toLowerCase().includes('intern') ? 'Intern' : 'Exp'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
