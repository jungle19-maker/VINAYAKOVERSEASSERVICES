"use client";

import { ArrowRight, Briefcase, UserCheck, ShieldCheck, Globe, CheckCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const trustBadges = [
  { icon: <ShieldCheck className="w-4 h-4" />, text: "MEA Registered" },
  { icon: <CheckCircle className="w-4 h-4" />, text: "100% Legal Recruitment" },
  { icon: <Globe className="w-4 h-4" />, text: "Global Placements" },
];

const stats = [
  { value: "500+", label: "Global Clients" },
  { value: "10,000+", label: "Placements Made" },
  { value: "20+", label: "Countries Served" },
  { value: "15+", label: "Industries Covered" },
];

export default function Hero() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        id="home"
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ marginTop: "88px" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero_city_buildings.png')" }}
        />

        {/* Navy gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Gold accent bar — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F5B301] via-[#F5B301]/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6 animate-fade-in-up">
            <span className="h-px w-10 bg-[#F5B301]" />
            <span className="text-[#F5B301] text-xs font-bold tracking-[0.3em] uppercase">
              MEA Approved · Government of India Licensed
            </span>
            <span className="h-px w-10 bg-[#F5B301]" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 font-heading animate-fade-in-up delay-100">
            <span className="text-white">Expert Global </span>
            <span className="text-[#F5B301]">Manpower</span>
            <span className="text-white"> &<br />Overseas Hiring Solutions</span>
          </h1>

          

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300">
            <a
              href="#aboutus"
              id="hero-hire-talent"
              className="btn-primary text-base px-8 py-4"
            >
              <Briefcase className="w-5 h-5" />
              Explore more
              <ArrowRight className="w-4 h-4" />
            </a>
            
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-400">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 glass rounded-full text-white text-sm font-semibold"
              >
                <span className="text-[#F5B301]">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── Social Icons Sidebar ── */}
        <div className="absolute right-0 top-[45%] -translate-y-1/2 flex flex-col z-50">
          <a 
            href="https://facebook.com" 
            target="_blank" rel="noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#1877F2] flex items-center justify-center text-white rounded-l-lg hover:-translate-x-1 transition-transform mb-[2px]"
          >
            <Facebook className="w-5 h-5 md:w-6 md:h-6 fill-current stroke-none" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" rel="noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#1DA1F2] flex items-center justify-center text-white rounded-l-lg hover:-translate-x-1 transition-transform mb-[2px]"
          >
            <Twitter className="w-5 h-5 md:w-6 md:h-6 fill-current stroke-none" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" rel="noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white rounded-l-lg hover:-translate-x-1 transition-transform mb-[2px]"
          >
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" rel="noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#0A66C2] flex items-center justify-center text-white rounded-l-lg hover:-translate-x-1 transition-transform"
          >
            <Linkedin className="w-5 h-5 md:w-6 md:h-6 fill-current stroke-none" />
          </a>
        </div>

        
      </section>

      {/* ── STATS BAR ── */}
      <div
        id="stats"
        className="bg-white py-10 border-t border-[#E5E7EB]"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-extrabold text-[#F5B301] mb-2 group-hover:scale-110 transition-transform duration-300">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-[#0B1F3A]/60 tracking-[0.2em] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
