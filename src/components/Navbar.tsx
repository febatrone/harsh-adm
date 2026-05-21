import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCMSDocument } from "@/lib/cms-hooks";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#certificates", label: "Certificates" },
  { href: "#highlights", label: "Highlights" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  const { data: config } = useCMSDocument<any>("config", "main");
  const email = config?.email || "harshthaker84@gmail.com";
  // The original text was "Harsh.Thaker"
  // We can extract parts of the name if available
  const fullName = config?.profileName || "Harsh Thaker";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "Harsh";
  const lastName = nameParts[1] || "Thaker";

  useEffect(() => {
    let sections: (HTMLElement | null)[] = [];
    
    // Cache sections to avoid querying DOM on every scroll
    const updateSections = () => {
      sections = links.map((l) => document.querySelector(l.href));
    };
    updateSections();
    
    let ticking = false;
    
    const onScroll = () => {
      const currentY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentY > 40);

          // Active section tracking without querying on every frame
          const y = currentY + window.innerHeight * 0.4; // Better threshold point
          for (let i = sections.length - 1; i >= 0; i--) {
            const s = sections[i];
            if (s && s.offsetTop <= y) {
              setActive(links[i].href);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    // Update sections if window resizes, since they might change
    window.addEventListener("resize", updateSections, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateSections);
    };
  }, []);

  // Scroll lock for mobile menu
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500 ease-out"
      style={{
        paddingTop: scrolled ? "1rem" : "1.5rem",
        paddingBottom: scrolled ? "1rem" : "1.5rem",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          animate={{
            padding: scrolled ? "0.75rem 1.5rem" : "1rem 1.5rem",
          }}
          transition={{ duration: 0.3 }}
          className="glass-extreme rounded-full flex items-center justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden ring-1 ring-black/5"
        >
          {/* Subtle Shimmer background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] animate-[shimmer_3s_infinite]" />

          <a
            href="#top"
            data-cursor="hover"
            className="relative z-10 font-headline font-black text-primary-container text-lg md:text-xl tracking-tighter uppercase jiggle-hover"
          >
            {firstName}<span className="text-secondary-fixed">.</span>{lastName}
          </a>

          <div className="hidden md:flex items-center gap-1 relative z-10">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  data-cursor="hover"
                  className={`relative font-headline text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-on-primary-fixed"
                      : "text-on-surface-variant hover:text-primary-container"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full gradient-cta -z-10 shadow-[0_0_15px_rgba(139,127,214,0.4)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              );
            })}
          </div>

          <a
            href={`mailto:${email}`}
            data-cursor="hover"
            className="relative z-10 hidden md:inline-flex font-headline font-black uppercase text-xs tracking-wider px-6 py-2.5 rounded-full gradient-cta text-on-primary-fixed hover:scale-105 transition-transform hover:shadow-[0_0_20px_rgba(139,127,214,0.5)]"
          >
            Contact
          </a>

          <button
            aria-label="Menu"
            data-cursor="hover"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-primary-container origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-primary-container"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-primary-container origin-center"
            />
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden glass-extreme rounded-3xl flex flex-col gap-2 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5 bg-white/90"
            >
              <div className="p-4 flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.a
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`font-headline uppercase text-sm font-bold px-4 py-3 rounded-xl transition-colors ${
                      active === l.href
                        ? "bg-primary-container/20 text-primary-container"
                        : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: links.length * 0.05 + 0.1 }}
                  href={`mailto:${email}`}
                  className="text-center font-headline font-black uppercase text-sm px-5 py-4 rounded-xl gradient-cta text-on-primary-fixed mt-2"
                >
                  Contact
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
