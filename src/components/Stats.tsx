"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Global Clients", prefix: "" },
  { value: 10000, suffix: "+", label: "Placements Made", prefix: "" },
  { value: 20, suffix: "+", label: "Countries Served", prefix: "" },
  { value: 15, suffix: "+", label: "Industries Covered", prefix: "" },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#23352b] py-20 border-t border-[#F5B301]/20">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-white/40 tracking-[0.22em] uppercase">
              Our Track Record
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Numbers That Speak For Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#F5B301]/40 transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-[#F5B301] mb-3 leading-none">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-semibold text-white/50 uppercase tracking-[0.18em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
