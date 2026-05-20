"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ListOrdered, 
  FileText, 
  Settings, 
  ArrowRight, 
  Users, 
  Globe2, 
  ExternalLink,
  Award,
  PlusCircle,
  HelpCircle,
  Briefcase
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    requirementsCount: 0,
    activeRequirementsCount: 0,
    documentsCount: 0,
    ctaActive: false,
    ctaHeading: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [reqRes, docRes, ctaRes] = await Promise.all([
          fetch("/api/requirements"),
          fetch("/api/documents"),
          fetch("/api/cta")
        ]);

        const reqs = await reqRes.json();
        const docs = await docRes.json();
        const cta = await ctaRes.json();

        setStats({
          requirementsCount: reqs.length,
          activeRequirementsCount: reqs.filter((r: any) => r.status === "active").length,
          documentsCount: docs.length,
          ctaActive: cta.status === "active",
          ctaHeading: cta.heading || "No Active Heading"
        });
      } catch (err) {
        console.error("Failed to load dashboard statistics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const cards = [
    {
      title: "Recruitment Requirements",
      metric: loading ? "..." : `${stats.requirementsCount} Categories`,
      subText: loading ? "..." : `${stats.activeRequirementsCount} Active on Frontpage`,
      desc: "Add or modify professional sectors, eligibility requirements, and visa criteria.",
      href: "/admin/requirements",
      icon: ListOrdered,
      color: "bg-[#24342b]/5 text-[#24342b] border-[#24342b]/10",
      accent: "#24342b"
    },
    {
      title: "Verification Documents",
      metric: loading ? "..." : `${stats.documentsCount} Checklists`,
      subText: "Core compliance records",
      desc: "Manage the official mandatory list of eligibility documents required for deployments.",
      href: "/admin/documents",
      icon: FileText,
      color: "bg-amber-50 text-amber-700 border-amber-100",
      accent: "#F5B301"
    },
    {
      title: "Settings & Call-To-Action",
      metric: loading ? "..." : (stats.ctaActive ? "CTA Enabled" : "CTA Disabled"),
      subText: loading ? "..." : stats.ctaHeading.substring(0, 24) + "...",
      desc: "Modify the global banners, support text, and direct buttons displayed on your homepage.",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-purple-50 text-purple-700 border-purple-100",
      accent: "#7C3AED"
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up font-sans">
      
      {/* ── HEADER OVERVIEW ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#24342b] tracking-tight">Dashboard Hub</h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">Welcome back. Maintain and synchronize your recruitment platform.</p>
        </div>
        
        {/* Visit Frontsite Button */}
        <Link 
          href="/" 
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-white text-slate-700 hover:text-[#24342b] font-bold text-sm border border-slate-200/80 hover:border-slate-300 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-fit"
        >
          <ExternalLink size={15} className="text-[#F5B301]" />
          View Live Website
        </Link>
      </div>

      {/* ── PREMIUM WELCOME BANNER CARD ── */}
      <div className="relative overflow-hidden rounded-none bg-gradient-to-br from-[#24342b] to-[#14221c] p-8 md:p-10 text-white shadow-[0_12px_30px_rgba(36,52,43,0.15)] border border-white/5">
        {/* Visual geometric designs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B301] rounded-none mix-blend-multiply filter blur-[130px] opacity-10 -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#F5B301] rounded-none mix-blend-multiply filter blur-[120px] opacity-10 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#F5B301]/25 to-transparent rounded-none border border-[#F5B301]/30">
            <Award size={14} className="text-[#F5B301]" />
            <span className="text-[10px] font-black text-[#F5B301] uppercase tracking-[0.15em] leading-none">MEA License Certified</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Compliance & Global Recruitment <br className="hidden sm:inline" />
            <span className="text-[#F5B301]">Console</span>
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            Manage, update, and regulate your agency's job placements, criteria, and documentation checklists. 
            All modifications submitted through this dashboard update the live website databases instantly.
          </p>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-300 font-bold bg-white/5 border border-white/10 p-4 rounded-none w-fit">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-emerald-400 animate-ping"></span>
              Atlas Sync: Operational
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>License Ref: B-3393/HP/PER/100/5/11399/2026</span>
          </div>
        </div>
      </div>

      {/* ── METRICS WIDGET GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              className="bg-white rounded-none p-8 border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Icon & Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-none flex items-center justify-center border shadow-sm ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Live Count</span>
                    <span className="text-2xl font-black text-slate-800 leading-none">{card.metric}</span>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-[#24342b] mb-1.5">{card.title}</h3>
                <span className="text-xs font-bold text-[#F5B301] uppercase tracking-wider block mb-4">{card.subText}</span>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 font-medium">{card.desc}</p>
              </div>

              <Link 
                href={card.href}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-slate-50 text-xs font-extrabold text-[#24342b] hover:bg-[#24342b] hover:text-white hover:shadow-md transition-all w-fit"
              >
                Manage Panel
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ── ADMINISTRATIVE QUICK COMMANDS ── */}
      <div className="bg-white rounded-none p-8 border border-slate-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <h3 className="text-lg font-extrabold text-[#24342b] mb-6">Quick Actions Panel</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/admin/requirements?action=new"
            className="flex items-center gap-3 p-4 rounded-none bg-slate-50 hover:bg-[#24342b]/5 border border-slate-200/50 hover:border-[#24342b]/20 transition-all font-bold text-xs text-slate-700 hover:text-[#24342b]"
          >
            <PlusCircle size={18} className="text-[#F5B301]" />
            New Requirement
          </Link>
          
          <Link 
            href="/admin/documents?action=new"
            className="flex items-center gap-3 p-4 rounded-none bg-slate-50 hover:bg-[#24342b]/5 border border-slate-200/50 hover:border-[#24342b]/20 transition-all font-bold text-xs text-slate-700 hover:text-[#24342b]"
          >
            <PlusCircle size={18} className="text-[#F5B301]" />
            New Compliance Doc
          </Link>
          
          <Link 
            href="/admin/settings"
            className="flex items-center gap-3 p-4 rounded-none bg-slate-50 hover:bg-[#24342b]/5 border border-slate-200/50 hover:border-[#24342b]/20 transition-all font-bold text-xs text-slate-700 hover:text-[#24342b]"
          >
            <Settings size={18} className="text-[#F5B301]" />
            Modify CTA Setting
          </Link>

          <Link 
            href="/contact-info"
            target="_blank"
            className="flex items-center gap-3 p-4 rounded-none bg-slate-50 hover:bg-[#24342b]/5 border border-slate-200/50 hover:border-[#24342b]/20 transition-all font-bold text-xs text-slate-700 hover:text-[#24342b]"
          >
            <Globe2 size={18} className="text-[#F5B301]" />
            View Registration Page
          </Link>
        </div>
      </div>

    </div>
  );
}
