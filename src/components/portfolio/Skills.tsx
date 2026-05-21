import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCMSCollection } from "@/lib/cms-hooks";

export const defaultGroups = [
  {
    title: "Analytical Tools",
    accent: "primary-container",
    bullet: "●",
    items: ["PowerBI", "Advanced Excel", "MATLAB", "Python", "C++", "C"],
  },
  {
    title: "Hardware & Design",
    accent: "secondary-fixed",
    bullet: "■",
    items: ["PCB Design", "Circuit Testing", "Fusion 360", "AutoCAD", "Blender"],
  },
  {
    title: "Strategic & Management",
    accent: "primary-container",
    bullet: "◆",
    items: [
      "Leadership",
      "Team Coordination",
      "Inside Sales",
      "Resource Management",
      "SEO",
      "Digital Marketing",
    ],
  },
  {
    title: "Languages",
    accent: "secondary-fixed",
    bullet: "◇",
    items: [
      "English (Expert)",
      "Hindi (Native)",
      "Gujarati (Native)",
      "Marathi (Native)",
      "German (Beginner)",
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const { data: customGroups } = useCMSCollection<any>("skills");
  const displayGroups = customGroups.length > 0 ? customGroups : defaultGroups;

  // Helper to split items into two columns
  const splitItems = (items: string[]) => {
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  return (
    <section
      ref={ref}
      id="skills"
      className="relative bg-surface-container-low py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none will-change-transform"
      >
        <span className="font-scrawl text-[16rem] md:text-[26rem] leading-none whitespace-nowrap">
          Management
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Header Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-[350px] shrink-0 will-change-transform"
          >
            <span className="font-mono text-xs text-secondary-fixed mb-2 block tracking-widest uppercase">
              03 // Toolstack
            </span>
            <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-on-surface">
              Skills
            </h2>
            <div className="mt-8 hidden lg:block">
              <span className="font-scrawl text-primary-container text-4xl md:text-5xl rotate-[-8deg] inline-block">
                Always learning!
              </span>
            </div>
            <div className="mt-6 lg:hidden">
              <span className="font-scrawl text-primary-container text-4xl rotate-[-8deg] inline-block">
                Always learning!
              </span>
            </div>
          </motion.div>

          {/* Grid Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-16">
            {displayGroups.map((g: any, i: number) => {
              const [col1, col2] = splitItems(g.items || []);
              return (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="space-y-6 will-change-[opacity,transform]"
                >
                  <h4
                    className="font-mono text-xs font-bold uppercase tracking-widest border-b-[1.5px] pb-3 inline-block pr-8"
                    style={{ borderColor: `var(--${g.accent})`, color: `var(--${g.accent})` }}
                  >
                    {g.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex flex-col gap-4">
                      {col1.map((s: string, j: number) => (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.02, x: 3 }}
                          key={s}
                          data-cursor="hover"
                          className="text-on-surface-variant font-mono text-[10px] sm:text-xs uppercase flex items-start sm:items-center gap-2 hover:text-primary transition-colors cursor-default"
                        >
                          <span className="text-[10px] md:text-xs mt-[2px] sm:mt-0" style={{ color: "var(--on-surface-variant)" }}>
                            {g.bullet || "●"}
                          </span>{" "}
                          <span className="text-left w-full block sm:inline">{s}</span>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-4">
                      {col2.map((s: string, j: number) => (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + (col1.length + j) * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.02, x: 3 }}
                          key={s}
                          data-cursor="hover"
                          className="text-on-surface-variant font-mono text-[10px] sm:text-xs uppercase flex items-start sm:items-center gap-2 hover:text-primary transition-colors cursor-default"
                        >
                          <span className="text-[10px] md:text-xs mt-[2px] sm:mt-0" style={{ color: "var(--on-surface-variant)" }}>
                            {g.bullet || "●"}
                          </span>{" "}
                          <span className="text-left w-full block sm:inline">{s}</span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
