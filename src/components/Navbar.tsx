"use client";

import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone, Globe, ChevronDown, Briefcase, UserCheck } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "Process", href: "#process" },
  { name: "Why Us", href: "#whyus" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">

      {/* ── Top Info Bar ── */}
      <div className="bg-[#061428] text-white text-xs px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="mailto:vinayakoverseas90@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#F5B301] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            vinayakoverseas90@gmail.com
          </a>
          <a
            href="tel:+918894412776"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#F5B301] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +91-8894412776
          </a>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="font-bold tracking-wide uppercase text-white/80">
            VINAYAK OVERSEAS SERVICES
          </span>
          <span className="text-white/30">|</span>
          <span className="text-[#F5B301] font-medium">
            RA License: B-3393/HP/PER/100/5/11399/2026
          </span>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        className={`bg-[#23352b] transition-all duration-300 ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""
          }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#home" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.jpeg"
              alt="Vinayak Overseas Services"
              width={130}
              height={44}
              className="object-contain h-10 w-auto bg-white/10 rounded px-1"
              priority
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-[#F5B301] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5B301] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Right: Language + CTAs */}
          <div className="flex items-center gap-3">
            <button className="hidden xl:flex items-center gap-1.5 text-xs text-white/60 hover:text-[#F5B301] transition-colors border border-white/15 rounded-full px-3 py-1.5">
              <Globe className="w-3.5 h-3.5" />
              EN
              <ChevronDown className="w-3 h-3" />
            </button>



            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white/80 hover:text-[#F5B301] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#061428] border-t border-white/10 px-6 py-5 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white/75 hover:text-[#F5B301] transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <a
                href="#contact"
                className="text-center py-3 border border-[#F5B301]/60 text-[#F5B301] font-bold rounded-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Talent
              </a>
              <a
                href="#contact"
                className="text-center py-3 bg-[#F5B301] text-[#23352b] font-bold rounded-full text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply for Jobs
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
