import { motion, useScroll, useTransform } from "framer-motion";
import { type ProjectItem } from "@/types";
import { useCMSCollection } from "@/lib/cms-hooks";
import { useRef } from "react";

export const defaultProjects: ProjectItem[] = [
  {
    n: "01.",
    title: "WashWizard: Founding Venture",
    desc: "A compact washing machine startup funded by SSIP. Orchestrated the R&D, product development, and initial market strategy to cater to hostel and PG demographics using CFD techniques.",
    tags: ["Startup", "Market Strategy", "Sustainable R&D"],
    label: "Entrepreneurship",
    cta: "Pitch Deck",
    color: "primary-container",
  },
  {
    n: "02.",
    title: "ANPR + GPS Railway System",
    desc: "Led the implementation of an ANPR and GPS system for Western Railways. Integrated hardware and developed backend-frontend connectivity for real-time vehicle processing.",
    tags: ["Embedded Systems", "GPS Tracking", "ANPR"],
    label: "Infrastructure Tech",
    cta: "Project Details",
    color: "secondary-fixed",
  },
  {
    n: "03.",
    title: "Case Study & Strategy Solving",
    desc: "Specialized in solving complex business bottlenecks through data-driven analysis and optimized workflow strategies. Focused on scaling operational efficiency for industrial clients.",
    tags: ["Operations", "Market Research", "Consultancy"],
    label: "Management Strategy",
    cta: "Strategic Insights",
    color: "primary-container",
  },
  {
    n: "04.",
    title: "Industrial Vending Machine",
    desc: "Contributed to the design and development of an automated vending machine at CIBOS Tech, integrating embedded systems and complex dispensing logic.",
    tags: ["Product Design", "Automation", "Embedded C"],
    label: "Hardware R&D",
    cta: "System Specs",
    color: "secondary-fixed",
  },
];

function Card({ 
  p, 
  index, 
  total
}: { 
  key?: string;
  p: ProjectItem; 
  index: number; 
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track how far past the sticky point we have scrolled.
  // When the top of the card hits ~15vh, we start tracking until it's scrolled way past.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 15%", "start -150%"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.015]);
  const filterBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(2px)"]);
  const darkenOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.2]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center justify-start sticky will-change-transform origin-top"
      style={{
        top: `calc(15vh + ${index * 40}px)`,
        zIndex: index + 10,
        scale,
      }}
    >
      <motion.div 
        className="bg-white/90 backdrop-blur-xl rounded-[2rem] md:rounded-[3.5rem] p-6 sm:p-10 md:p-14 border border-outline-variant/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden w-full max-w-6xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] group dark:shadow-none"
        style={{ filter: filterBlur }}
      >
        {/* Darkening overlay for depth in the stack */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none z-50 rounded-[2rem] md:rounded-[3.5rem]" 
          style={{ opacity: darkenOverlay }} 
        />
        
        {/* Decorative index indicator */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 font-headline w-full text-6xl md:text-9xl font-black text-on-surface/5 select-none pointer-events-none transition-colors duration-500 group-hover:text-on-surface/10">
          {p.n}
        </div>

        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row items-start justify-between relative z-10 pt-16 md:pt-20 lg:pt-0">
          <div className="max-w-2xl flex-1 text-left">
            <div className="flex items-center gap-4 mb-6">
              <span
                className="font-mono text-2xl font-bold hidden lg:block"
                style={{ color: `var(--${p.color})` }}
              >
                {p.n}
              </span>
              <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] md:leading-[0.9] tracking-tighter mix-blend-multiply group-hover:text-primary transition-colors duration-500 dark:mix-blend-normal">
                {p.title}
              </h3>
            </div>
            <p className="text-on-surface-variant text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-body font-medium">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {p.tags?.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] sm:text-xs font-bold border-2 border-outline-variant/60 px-4 md:px-5 py-2 rounded-full uppercase tracking-widest bg-surface-container group-hover:border-primary/30 transition-colors duration-500 text-on-surface-variant dark:bg-surface-container-high"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end w-full lg:w-auto mt-6 lg:mt-0 lg:min-w-[280px]">
            <span className="font-scrawl text-3xl md:text-4xl rotate-[-4deg] lg:rotate-6 text-secondary-fixed mb-6 lg:mb-12 origin-left lg:origin-center group-hover:scale-105 transition-transform duration-500">
              {p.label}
            </span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="hover"
              className="font-headline font-black text-sm sm:text-base border-4 px-6 md:px-10 py-3 md:py-4 uppercase rounded-full transition-all shadow-xl w-full sm:w-max text-center relative overflow-hidden group/btn"
              style={{
                borderColor: `var(--${p.color})`,
                backgroundColor: `var(--${p.color})`,
                color: "#ffffff",
              }}
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-12 group-hover/btn:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">{p.cta} →</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const { data: customProjects } = useCMSCollection<ProjectItem>("projects");
  const displayProjects = customProjects.length > 0 ? customProjects : defaultProjects;

  return (
    <section 
      id="projects" 
      className="relative bg-surface-container-lowest border-t border-outline-variant/10 z-30 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full relative flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 shrink-0"
        >
          <span className="font-mono text-xs text-secondary-fixed mb-2 block tracking-widest uppercase text-center">
            02 // Portfolio Selective
          </span>
          <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">
            Selected <span className="scrawl-underline">Works</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-[20vh] w-full pb-32">
          {displayProjects.map((p, i) => (
            <Card key={p.n || p.title} p={p} index={i} total={displayProjects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
