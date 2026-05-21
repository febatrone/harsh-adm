import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award, FileText, Briefcase, ArrowRight } from "lucide-react";
import { useCMSCollection } from "@/lib/cms-hooks";

export const defaultCertificateCategories = [
  {
    id: "recommendations",
    label: "Letters of Recommendation",
    icon: <FileText className="w-5 h-5" />,
    items: [
      {
        title: "Recommendation Letter",
        issuer: "Exago Chemical",
        signer: "Jimil Pandit (Senior Manager International Business)",
        date: "Nov 2025",
        desc: "Commended for exceptional analytical ability, professionalism, and cross-functional team collaboration during the Business Operations internship.",
      },
      {
        title: "Recommendation Letter",
        issuer: "Cibos Techno Solutions",
        signer: "Aditya Dave (Founder & CEO)",
        date: "Jan 2025",
        desc: "Endorsed for significant contributions to battery-operated innovative solutions and expertise in technology and operations.",
      },
    ],
  },
  {
    id: "internships",
    label: "Internship Certificates",
    icon: <Briefcase className="w-5 h-5" />,
    items: [
      {
        title: "ANPR Project Certificate",
        issuer: "Indian Railways",
        signer: "Swayam Deep Singh (DY CMM)",
        date: "Feb 2026",
        desc: "Certified completion of the ANPR & GPS project, demonstrating leadership and technical skills at the Sabarmati division.",
      },
      {
        title: "Business Ops Internship",
        issuer: "Exago",
        signer: "Management Team",
        date: "Nov 2025",
        desc: "Certified tenure as Business Operations & Strategy Intern, focusing on global outreach and process optimization.",
      },
      {
        title: "Technology Internship",
        issuer: "Cibos Techno Solutions",
        signer: "Aditya Dave (Founder & CEO)",
        date: "Jan 2025",
        desc: "Certified development of an Automatic Water Vending Machine project as a Technology Intern.",
      },
    ],
  },
  {
    id: "skills",
    label: "Skill Certificates",
    icon: <Award className="w-5 h-5" />,
    items: [
      {
        title: "Advanced Data Analysis",
        issuer: "Professional Certification",
        signer: "Global Educators",
        date: "2025",
        desc: "Certified proficiency in PowerBI and Advanced Excel for business intelligence and data-driven decision making.",
      },
    ],
  },
];

export function Certificates() {
  const [activeTab, setActiveTab] = useState("recommendations");
  
  const { data: customCerts } = useCMSCollection<any>("certificates");

  // Rebuild categories with dynamic data, or use default if empty
  const displayCategories = customCerts && customCerts.length > 0 
    ? defaultCertificateCategories.map(cat => ({
        ...cat,
        items: customCerts.filter(c => c.category === cat.id)
      }))
    : defaultCertificateCategories;

  return (
    <section id="certificates" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
            <span className="font-mono text-xs text-secondary-fixed mb-2 block tracking-widest uppercase text-center">
              05 // Credentials
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-center">
              Certifications <span className="text-primary-container">&amp;</span> Recommendations
            </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
            A testament to my commitment to professional excellence and continuous skill acquisition
            across engineering and management domains.
          </p>
        </motion.div>

        {/* Categories Navbar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {displayCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-headline text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-primary-container text-on-primary shadow-lg scale-105"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Area - Horizontal Scrolling Track */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex gap-6 overflow-x-auto pb-12 pt-4 px-2 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            >
              {displayCategories
                .find((c) => c.id === activeTab)
                ?.items.map((item, idx) => (
                  <motion.div
                    key={item.title + idx}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex-shrink-0 w-[300px] md:w-[380px] p-8 bg-surface-container/60 backdrop-blur-md rounded-3xl border border-outline-variant/30 hover:border-primary/50 transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_var(--primary)] hover:-translate-y-2 group snap-center cursor-grab active:cursor-grabbing relative overflow-hidden will-change-[transform,box-shadow]"
                  >
                    {/* Hover Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl blur-xl" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-sm">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-2 block group-hover:text-primary transition-colors duration-300">
                        {item.date} // {item.issuer}
                      </span>
                      <h3 className="font-headline text-xl font-bold uppercase mb-4 text-on-surface group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed mb-6 h-20 overflow-hidden line-clamp-3 group-hover:text-on-surface transition-colors duration-300">
                        {item.desc}
                      </p>
                      <div className="pt-4 border-t border-outline-variant/20 group-hover:border-primary/20 transition-colors duration-300">
                        <p className="font-mono text-[10px] text-on-surface-variant/70 uppercase">
                          Signed By:
                        </p>
                        <p className="font-headline text-xs font-bold text-on-surface uppercase mt-1">
                          {item.signer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>

          {/* Indicator Label */}
          <div className="absolute bottom-0 right-0 font-mono text-[10px] uppercase tracking-widest text-primary/40 flex items-center gap-2">
            Horizontal Scroll <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
