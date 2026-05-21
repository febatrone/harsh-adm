import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useParallax() {
  useEffect(() => {
    let raf = 0;
    let els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let elData = els.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        speed: parseFloat(el.dataset.parallax || "0.2"),
        baseTop: rect.top + window.scrollY,
        height: rect.height
      };
    });

    const updateData = () => {
      els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      elData = els.map((el) => {
        el.style.transform = ''; // reset transform to get accurate rect
        const rect = el.getBoundingClientRect();
        return {
          el,
          speed: parseFloat(el.dataset.parallax || "0.2"),
          baseTop: rect.top + window.scrollY,
          height: rect.height
        };
      });
      update();
    };

    const update = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      elData.forEach((data) => {
        const topRelativeToViewport = data.baseTop - scrollY;
        const center = topRelativeToViewport + data.height / 2 - windowHeight / 2;
        data.el.style.transform = `translate3d(0, ${center * -data.speed}px, 0)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    updateData();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateData, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateData);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export function useTilt() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-tilt]");
    const cleanups: Array<() => void> = [];
    els.forEach((el) => {
      let rect: DOMRect | null = null;
      let rafId = 0;

      const onEnter = () => {
        rect = el.getBoundingClientRect();
      };

      const onMove = (e: MouseEvent) => {
        if (!rect) rect = el.getBoundingClientRect();
        
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const x = (e.clientX - rect!.left) / rect!.width - 0.5;
          const y = (e.clientY - rect!.top) / rect!.height - 0.5;
          // Reduced rotation from 8 to 5 for smoother feeling, use translate3d
          el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translate3d(0,0,0)`;
        });
      };

      const onLeave = () => {
        cancelAnimationFrame(rafId);
        rect = null;
        el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translate3d(0,0,0)";
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((c) => c());
  }, []);
}
