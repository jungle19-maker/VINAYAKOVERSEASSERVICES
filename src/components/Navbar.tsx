"use client";

import { useState, useEffect } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Process", href: "/process" },
  { name: "Industries", href: "/industries" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Info", href: "/contact-info" },
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
      <div className="bg-black text-white text-[13px] md:text-sm px-4 md:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 font-medium">
        <div className="flex items-center gap-6">
          <a
            href="mailto:vinayakoverseas90@gmail.com"
            className="flex items-center gap-2 hover:text-[#F5B301] transition-colors"
          >
            <Mail className="w-4 h-4 text-white" />
            vinayakoverseas90@gmail.com
          </a>
          <a
            href="tel:+918894412776"
            className="flex items-center gap-2 hover:text-[#F5B301] transition-colors"
          >
            <Phone className="w-4 h-4 text-white" />
            +91-8894412776
          </a>
        </div>
        <div className="flex flex-col items-center md:items-end md:text-right gap-0.5">
          <span className="font-bold tracking-wide text-white md:text-[15px]">
            VINAYAK OVERSEAS SERVICES
          </span>
          <span className="text-white/90 text-[11px] font-semibold tracking-wide">
            RA License No: B-3393/HP/PER/100/5/11399/2026
          </span>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav
        className={`bg-white transition-all duration-300 border-b border-[#E5E7EB] ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-[100rem] flex items-center justify-between h-[85px]">

          {/* Left: Logos */}
          <div className="flex items-center h-full py-4 gap-2 lg:gap-4">
             <a href="/" className="flex flex-shrink-0 items-center justify-center p-1 border border-gray-200">
               <Image
                 src="/images/logo.jpeg"
                 alt="VCS"
                 width={100}
                 height={44}
                 className="object-contain h-12 w-auto"
                 priority
               />
             </a>
             <div className="w-[1px] h-10 bg-gray-200 hidden sm:block mx-1" />
             <div className="hidden sm:flex items-center flex-shrink-0 gap-2">
               <img
                 src="/images/mea_logo.png"
                 alt="Ministry of External Affairs"
                 className="object-contain h-10 w-auto"
               />
               <div className="flex flex-col">
                 <span className="text-[#1e3a8a] font-black text-[14px] leading-tight">
                   Ministry of External Affairs
                 </span>
                 <span className="text-[#4B5563] text-[12px] leading-tight">
                   Government of India
                 </span>
               </div>
             </div>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden xl:flex items-center justify-center flex-1 gap-6 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-semibold text-[#374151] hover:text-[#0B1F3A] transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Language Dropdown */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Toggle */}
            <button
              className="xl:hidden p-2 text-[#374151] hover:text-[#0B1F3A] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-[#E5E7EB] px-6 py-5 flex flex-col gap-4 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-[#374151] hover:text-[#F5B301] transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="w-full flex justify-center">
                 <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
