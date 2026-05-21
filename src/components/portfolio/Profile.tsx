import { motion, useScroll, useTransform } from "framer-motion";
import { User, Target, Zap, Layout, Terminal, BarChart } from "lucide-react";
import { useRef } from "react";
import { useCMSDocument } from "@/lib/cms-hooks";

export function Profile() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  const { data: aboutData } = useCMSDocument<any>("about", "main");

  const defaultQualities = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Objective Driven",
      desc: "Focusing on high-level strategy and measurable outcomes in every project.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Cross-Functional",
      desc: "Bridging the gap between engineering complexity and business execution.",
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Leadership",
      desc: "Proven ability to lead teams through complex technical and operational phases.",
    },
  ];

  const defaultTraits = [
    {
      label: "Electronics Eng",
      icon: <Terminal className="w-4 h-4" />,
      color: "bg-primary-container",
    },
    {
      label: "Product Design",
      icon: <Layout className="w-4 h-4" />,
      color: "bg-secondary-fixed",
    },
    { label: "Business Analysis", icon: <BarChart className="w-4 h-4" />, color: "bg-primary" },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Target: <Target className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    User: <User className="w-6 h-6" />,
    Terminal: <Terminal className="w-4 h-4" />,
    Layout: <Layout className="w-4 h-4" />,
    BarChart: <BarChart className="w-4 h-4" />,
  };

  const qualities = aboutData?.qualities
    ? aboutData.qualities.map((q: any) => ({
        icon: iconMap[q.icon] || <Target className="w-6 h-6" />,
        title: q.title,
        desc: q.desc,
      }))
    : defaultQualities;

  const traits = aboutData?.traits
    ? aboutData.traits.map((t: any) => ({
        label: t.label,
        icon: iconMap[t.icon] || <Terminal className="w-4 h-4" />,
        color: t.color,
      }))
    : defaultTraits;

  const aboutText = aboutData?.aboutText || "Electronics and Communication Engineering student with hands-on experience in embedded systems, product design, and digital marketing. Proven ability to bridge technical and creative domains through internships across R&D, testing, and operations management.";


  return (
    <section
      ref={ref}
      id="profile"
      className="py-24 md:py-32 bg-surface-container-low overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Typographic Intervention (Replaces Image Grid) */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            <motion.div
              style={{ rotate, scale }}
              className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/20 rounded-[4rem] absolute -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 md:w-60 md:h-60 border-2 border-secondary-fixed/30 border-dashed rounded-full absolute -z-10"
            />

            <div className="grid grid-cols-1 gap-4 relative">
              {traits.map((trait: any, idx: number) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white/60 dark:bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_var(--primary)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-default group will-change-[transform,box-shadow]"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${trait.color} flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    {trait.icon}
                  </div>
                  <span className="font-headline font-black uppercase text-xl md:text-2xl tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                    {trait.label}
                  </span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-primary-container/20 rounded-full blur-3xl -z-10 animate-pulse"
              />
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-secondary-fixed mb-2 block tracking-widest uppercase">
              00 // Personal Profile
            </span>
            <h2 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
              {traits[0]?.label || "Electronics Eng"} <span className="text-primary italic">&amp;</span>
              <br /> {traits[1]?.label || "Product Design"}
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10">
              {aboutText}
            </p>

            <div className="space-y-6">
              {qualities.map((q: any, i: number) => (
                <motion.div
                  key={q.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 items-start group p-4 rounded-2xl hover:bg-white/50 transition-colors duration-300 cursor-default border border-transparent hover:border-outline-variant/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0 border-2 border-outline-variant group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_0_20px_-5px_var(--primary)] group-hover:scale-110">
                    {q.icon}
                  </div>
                  <div>
                    <h4 className="font-headline font-extrabold uppercase text-lg text-on-surface group-hover:text-primary transition-colors">
                      {q.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm mt-1">{q.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
