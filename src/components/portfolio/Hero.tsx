import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import ShaderBackground from "@/components/ui/shader-background";
import { useCMSDocument } from "@/lib/cms-hooks";

const defaultHeroConfig = {
  heroTitleLine1: "Electronics,",
  heroTitleLine2: "Management &",
  heroTitleLine3: "Consulting.",
  heroDescription: "Electronics & Communication Engineer with a strong foundation in strategy, operations, and analytical problem-solving. Adept at integrating technical expertise with business acumen to optimize processes, manage projects, and drive sustainable growth. Committed to delivering impactful solutions at the intersection of engineering and management.",
  linkedin: "https://www.linkedin.com/in/harsh-thaker-a9b664230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  email: "harshthaker84@gmail.com",
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { data: customConfig } = useCMSDocument<any>("config", "main");
  const config = { ...defaultHeroConfig, ...customConfig };

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax for blueprint
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const blueprintX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const blueprintY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  return (
    <section
      ref={ref}
      id="about"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-multiply">
        <ShaderBackground />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left Column: Core Identity */}
          <div className="lg:col-span-8 flex flex-col justify-center mt-16 md:mt-24 lg:mt-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <h1 className="font-headline text-5xl sm:text-6xl md:text-6xl lg:text-[5rem] font-black leading-[1.1] md:leading-[1.05] tracking-tighter uppercase mb-6 md:mb-8 relative text-wrap">
                <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } } }} className="inline-block">
                  {config.heroTitleLine1 || "Electronics,"}
                </motion.span><br />
                <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } } }} className="inline-block">
                  {config.heroTitleLine2 || "Management &"}
                </motion.span><br />
                <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } } }} className="inline-block">
                  <span className="text-stroke italic text-[1.1em] md:text-inherit">{config.heroTitleLine3 || "Consulting."}</span>
                </motion.span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-xl relative w-full"
            >
              <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-headline font-medium leading-relaxed md:leading-tight mb-8">
                {config.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 pt-4">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={config.linkedin}
                  className="bg-primary text-white px-8 py-4 rounded-full font-headline font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl hover:shadow-[0_0_40px_-10px_var(--primary)] transition-all text-center w-full sm:w-auto relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">View Profile</span>
                </motion.a>
                <motion.a
                  whileHover={{ x: 10, color: "var(--primary)" }}
                  href={`mailto:${config.email}`}
                  className="w-full sm:w-auto text-center flex items-center justify-center sm:justify-start gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest border-b-2 border-outline-variant pb-2 hover:border-primary transition-all self-center py-2 sm:py-0"
                >
                  Inquiry // {config.email}
                </motion.a>
              </div>
            </motion.div>
          </div>

        {/* Right Column: Dynamic Structure (Professional Geometric Interaction) */}
        <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-center relative">
          <motion.div style={{ x: blueprintX, y: blueprintY }} className="relative will-change-transform transform-gpu">
            {/* Massive floating numbers signaling "The Year/The Era" */}
            <div className="font-headline text-[15rem] font-black opacity-[0.03] select-none pointer-events-none leading-none">
              26
            </div>

            {/* Structural SVG that feels like a "Blueprint" */}
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
            >
              <motion.rect
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                x="100"
                y="100"
                width="200"
                height="200"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <motion.circle
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                cx="200"
                cy="200"
                r="140"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.5"
                strokeDasharray="10 10"
              />
              <motion.path
                d="M50 200 L350 200 M200 50 L200 350"
                stroke="var(--primary)"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <motion.circle
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                cx="200"
                cy="200"
                r="4"
                fill="var(--primary)"
              />
            </svg>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.8em] text-primary opacity-60">
              Operations
            </span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Hero Foot: Professional Stat/Rail */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-0 w-full px-8 hidden md:flex justify-between items-end z-10"
      >
        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">
          <div className="flex flex-col gap-1">
            <span>Strategy</span>
            <span>Enabled.</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Hardware</span>
            <span>Optimized.</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block font-headline font-black text-xl leading-none">EST. 2026</span>
            <span className="font-mono text-[10px] uppercase opacity-40">
              Portfolio Release V3.0
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center animate-spin-slow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M12 2v20M2 12h20M5 5l14 14M5 19l14-14" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
