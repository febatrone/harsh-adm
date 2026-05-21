import { motion } from "framer-motion";
import { useCMSCollection } from "@/lib/cms-hooks";

const defaultHighlightItems = [
  {
    k: "01",
    t: "Case Studies",
    d: "Expertise in strategic analysis and professional strategy solving for industrial management bottlenecks and growth hurdles.",
    tag: "Strategy",
  },
  {
    k: "02",
    t: "WashWizard Startup",
    d: "Conceptualized and secured funding (SSIP) for a hardware startup focused on sustainable innovation in the laundry sector.",
    tag: "Entrepreneurship",
  },
  {
    k: "03",
    t: "Jagriti Yatra",
    d: "Shortlisted for the national enterprise journey to build India through social entrepreneurship and enterprise networking.",
    tag: "Social Impact",
  },
  {
    k: "04",
    t: "UPSC NDA Interview",
    d: "Successfully cleared the UPSC written examination and qualified for the SSB interview for officer selection.",
    tag: "Leadership",
  },
  {
    k: "05",
    t: "Industrial Vending Machine",
    d: "Developed a functional industrial vending machine integrating complex embedded systems and automated logic.",
    tag: "Engineering",
  },
];

export function Highlights() {
  const { data: highlightsFromCMS } = useCMSCollection<any>("highlights");
  const highlightItems = highlightsFromCMS.length > 0 ? highlightsFromCMS : defaultHighlightItems;

  return (
    <section id="highlights" className="py-24 md:py-32 bg-primary/5 relative overflow-hidden">
      {/* Massive Structural Background Text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <div className="font-headline text-[30rem] font-black uppercase leading-none whitespace-nowrap rotate-12 -translate-y-20">
          ACHIEVE
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 relative border-b border-outline-variant/10 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Key <br /> <span className="text-primary italic">Highlights</span>
            </h2>
          </motion.div>

          {/* Scrawl Note */}
          <motion.span
            initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: 15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute top-0 right-0 font-scrawl text-primary-container/40 text-3xl hidden md:block"
          >
            SSIP Funding Secured!
          </motion.span>
          
          <div className="text-right">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary block mb-2">
              Verified Professional Recognition
            </span>
            <div className="flex justify-end gap-2">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <div className="w-4 h-1 bg-primary/30 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightItems.map((h, i) => (
            <motion.div
              key={h.t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              className="group relative p-10 bg-white/60 backdrop-blur-md border-2 border-primary/10 rounded-[2rem] hover:border-primary/50 hover:bg-white hover:text-primary transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-10px_var(--primary)] hover:-translate-y-2 cursor-pointer will-change-[transform,box-shadow]"
            >
              {/* Massive Background Number */}
              <div className="absolute -bottom-6 -right-6 font-headline text-9xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                {h.k}
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_2s_infinite]" />

              <div className="relative z-10 flex flex-col h-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-8 border-b border-current pb-2 self-start group-hover:border-primary/50 transition-colors">
                  {h.tag}
                </span>

                <h3 className="font-headline text-3xl font-black uppercase leading-[0.9] mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                  {h.t}
                </h3>

                <p className="text-sm leading-relaxed text-on-surface-variant mt-auto min-h-[4rem] group-hover:text-on-surface">
                  {h.d}
                </p>

                <div className="mt-8 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all">
                  <span className="w-2 h-2 rounded-full bg-current" />
                  Credential Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const defaultEducationItems = [
  {
    level: "B.E. — Electronics & Communication",
    school: "LD College of Engineering",
    date: "2023 — 2027",
    specialization: "Hardware & Strategy Integration",
    note: "Pursuing excellence in embedded logic and industrial architecture.",
  },
  {
    level: "HSC — Science Stream",
    school: "The Mother's School",
    date: "2022 — 2023",
    specialization: "Physics & Mathematics",
    note: "Foundation in core engineering principles and technical analysis.",
  },
  {
    level: "SSC — Secondary School",
    school: "Shri Mirambika School",
    date: "2020 — 2022",
    specialization: "General Sciences",
    note: "Initial academic grounding with focus on logic and scientific method.",
  },
];

export function Education() {
  const { data: educationFromCMS } = useCMSCollection<any>("education");
  const educationItems = educationFromCMS.length > 0 ? educationFromCMS : defaultEducationItems;

  return (
    <section
      id="education"
      className="py-24 md:py-32 bg-background relative border-t border-outline-variant/10"
    >
        <div className="absolute inset-0 bg-grid-primary/[0.02] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-headline text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-4">
                Academic <span className="text-secondary-fixed italic">Milestone</span>
              </h2>
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="h-px w-12 bg-outline-variant" />
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-on-surface-variant">
                  Validated Credentials
                </span>
                <div className="h-px w-12 bg-outline-variant" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {educationItems.map((edu, idx) => (
              <motion.div
                key={edu.level}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Visual Line */}
                {idx !== 2 && (
                  <div className="absolute left-[23px] top-[100%] h-[32px] md:h-[48px] w-px bg-outline-variant/30" />
                )}

                <div className="flex flex-col md:flex-row gap-8 bg-surface-container/30 border-2 border-outline-variant/10 rounded-[2.5rem] p-8 md:p-12 hover:border-primary/30 transition-all duration-500 overflow-hidden relative hover:shadow-[0_20px_50px_-15px_var(--primary)] hover:-translate-y-1">
                  
                  {/* Background overlay for hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Phase 1: Identity */}
                  <div className="md:w-1/3 flex gap-6 items-start relative z-10">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center font-headline font-black text-xl text-primary flex-shrink-0 bg-white group-hover:scale-110 group-hover:bg-primary group-hover:shadow-[0_0_20px_0_var(--primary)] group-hover:text-white transition-all duration-500">
                      0{idx + 1}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary-container block mb-3 opacity-60">
                        Degree Registry
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl font-black uppercase leading-[0.95] group-hover:tracking-tight transition-all">
                        {edu.level}
                      </h3>
                    </div>
                  </div>

                  {/* Phase 2: Technical Specs */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 md:px-8 border-l-0 md:border-l border-outline-variant/10">
                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">
                          Institution
                        </span>
                        <p className="font-headline text-lg md:text-xl font-bold uppercase">
                          {edu.school}
                        </p>
                      </div>
                      <div className="mt-6">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">
                          Specialization
                        </span>
                        <p className="text-sm font-medium text-on-surface-variant">
                          {edu.specialization}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">
                          Timeline
                        </span>
                        <p className="font-mono text-lg md:text-xl font-black text-secondary-fixed">
                          {edu.date}
                        </p>
                      </div>
                      <div className="mt-6">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-on-surface-variant opacity-50 mb-1 block">
                          Specification Note
                        </span>
                        <p className="text-xs italic text-on-surface-variant/70 leading-relaxed">
                          {edu.note}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Background Detail */}
                  <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
}
