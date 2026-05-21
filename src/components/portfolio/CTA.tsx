import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent } from "react";
import { type CTAItem } from "@/types";
import { useCMSDocument, useCMSCollection } from "@/lib/cms-hooks";

const items: CTAItem[] = [
  { n: "01", l: "Leadership" },
  { n: "02", l: "R&D" },
  { n: "03", l: "Product" },
  { n: "04", l: "Execution" },
];

function CTACard({ it, index }: { it: CTAItem; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, type: "spring", bounce: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="p-6 rounded-2xl glass-strong border-2 border-transparent hover:border-primary-container/50 transition-colors"
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <span className="font-mono text-2xl block mb-2 text-primary-container font-bold">
            {it.n}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest font-bold">{it.l}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const { data: config } = useCMSDocument<any>("config", "main");
  const email = config?.email || "harshthaker84@gmail.com";

  const { data: ctaItemsList } = useCMSCollection<CTAItem>("ctaItems");
  const displayItems = ctaItemsList.length > 0 ? ctaItemsList : items;

  const yParallax = useTransform(scrollYProgress, [0, 1], [-200, 200]);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-surface-container-lowest border-t border-outline-variant/20 relative overflow-hidden"
    >
      <motion.div
        style={{ y: yParallax }}
        className="absolute -top-20 left-1/2 -translate-x-1/2 -z-0 opacity-[0.05] pointer-events-none"
      >
        <div className="font-scrawl text-[18rem] md:text-[25rem] leading-none whitespace-nowrap text-primary-container">
          Build
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.6 }}
          className="font-scrawl text-primary-container text-4xl md:text-5xl mb-12"
        >
          Let's build the future together
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-4xl mx-auto">
          {displayItems.map((it: CTAItem, i: number) => (
            <CTACard key={it.n || String(i)} it={it} index={i} />
          ))}
        </div>

        <div className="space-y-12">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter"
          >
            Ready for the next <br /> challenge.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
          >
            <a
              href={`mailto:${email}`}
              data-cursor="hover"
              className="inline-block gradient-cta text-on-primary-fixed px-10 md:px-16 py-5 md:py-6 rounded-full font-headline font-black uppercase text-lg md:text-2xl hover:scale-110 transition-transform shadow-2xl glow-primary relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10">Start a Conversation →</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
