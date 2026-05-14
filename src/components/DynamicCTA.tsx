"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type CtaSetting = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
};

export default function DynamicCTA() {
  const [cta, setCta] = useState<CtaSetting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCta = async () => {
      try {
        const res = await fetch("/api/cta");
        const data = await res.json();
        if (data && data.status === "active") {
          setCta(data);
        }
      } catch (error) {
        console.error("Failed to fetch CTA");
      } finally {
        setLoading(false);
      }
    };
    fetchCta();
  }, []);

  if (loading || !cta) return null;

  return (
    <section className={`py-20 relative overflow-hidden ${cta.backgroundColor || 'bg-[#24342b]'}`}>
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {cta.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            {cta.description}
          </p>
          
          <Link
            href={cta.buttonLink}
            className="inline-flex items-center gap-2 bg-[#F5B301] text-[#24342b] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {cta.buttonText}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
