"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { 
  ArrowRight, 
  Settings, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Paintbrush, 
  Monitor, 
  Check, 
  ExternalLink,
  Laptop
} from "lucide-react";
import { motion } from "framer-motion";

type CtaSetting = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
};

const COLOR_PRESETS = [
  { name: "Forest Green (Primary)", class: "bg-[#24342b]", hex: "#24342b" },
  { name: "Deep Emerald", class: "bg-[#112217]", hex: "#112217" },
  { name: "Luxury Amber", class: "bg-[#9a6e00]", hex: "#9a6e00" },
  { name: "Slate Midnight", class: "bg-slate-900", hex: "#0f172a" },
  { name: "Classic Navy", class: "bg-blue-950", hex: "#172554" },
  { name: "Warm Charcoal", class: "bg-zinc-900", hex: "#18181b" },
];

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm<CtaSetting>({
    defaultValues: {
      heading: "Ready to Start Your Journey?",
      description: "Get in touch with Vinayak Overseas Services today to accelerate your career or study options abroad.",
      buttonText: "Get Free Consultation",
      buttonLink: "/contact",
      backgroundColor: "bg-[#24342b]",
      status: "active"
    }
  });

  const watchedCta = watch();

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/cta");
      const data = await res.json();
      if (Object.keys(data).length > 0) {
        reset(data);
      }
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data: CtaSetting) => {
    setSaving(true);
    try {
      const res = await fetch("/api/cta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Global settings published successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  // Helper to dynamically resolve color styles for live preview
  const getBgStyleAndClass = (bgInput: string) => {
    if (!bgInput) return { className: "bg-[#24342b]", style: {} };
    
    // Hex or standard color format
    if (bgInput.startsWith("#") || bgInput.startsWith("rgb") || bgInput.startsWith("hsl")) {
      return { className: "", style: { backgroundColor: bgInput } };
    }
    
    // Custom tailwind gradient or arbitrary color syntax
    if (bgInput.startsWith("bg-")) {
      const hexMatch = bgInput.match(/bg-\[([^\]]+)\]/);
      if (hexMatch && hexMatch[1]) {
        return { className: "", style: { backgroundColor: hexMatch[1] } };
      }
      return { className: bgInput, style: {} };
    }
    
    // Fallback if they write raw hex without '#'
    if (/^[0-9A-F]{6}$/i.test(bgInput)) {
      return { className: "", style: { backgroundColor: `#${bgInput}` } };
    }
    
    return { className: "bg-[#24342b]", style: {} };
  };

  const previewBg = getBgStyleAndClass(watchedCta.backgroundColor);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#24342b] tracking-tight flex items-center gap-3">
            <span className="p-2 bg-[#24342b]/5 rounded-none text-[#24342b]">
              <Settings size={26} className="animate-[spin_10s_linear_infinite]" />
            </span>
            System Settings
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Configure site-wide components, call-to-action blocks, and live homepage layouts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-none shadow-sm border border-slate-100 p-20 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-[#F5B301] rounded-none animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm tracking-widest animate-pulse">Synchronizing configurations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ──────── LEFT COLUMN: CONFIGURATION PANEL ──────── */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-none border border-slate-150/80 shadow-md p-6 md:p-8 relative overflow-hidden">
              {/* Luxury gold stripe */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#24342b] via-[#F5B301] to-[#24342b]"></div>
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 bg-[#24342b]/5 rounded-none flex items-center justify-center text-[#24342b]">
                  <Sparkles size={20} className="text-[#F5B301]" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#24342b]">Homepage CTA Banner</h2>
                  <p className="text-xs text-slate-400 font-semibold">Updates main call-to-action footer instantly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Heading */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2 flex justify-between">
                    <span>Banner Heading</span>
                    <span className="text-slate-400 font-semibold lowercase">Required</span>
                  </label>
                  <input 
                    {...register("heading", { required: true })} 
                    className="w-full p-3.5 bg-slate-50/50 border border-slate-200/80 rounded-none focus:ring-4 focus:ring-[#F5B301]/10 focus:border-[#F5B301] focus:bg-white outline-none transition-all text-sm font-bold text-slate-800 placeholder-slate-400" 
                    placeholder="e.g. Ready to start your journey?" 
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2 flex justify-between">
                    <span>Banner Description</span>
                    <span className="text-slate-400 font-semibold lowercase">Required</span>
                  </label>
                  <textarea 
                    {...register("description", { required: true })} 
                    className="w-full p-3.5 bg-slate-50/50 border border-slate-200/80 rounded-none focus:ring-4 focus:ring-[#F5B301]/10 focus:border-[#F5B301] focus:bg-white outline-none transition-all text-sm text-slate-600 placeholder-slate-400 resize-none font-medium leading-relaxed" 
                    rows={4} 
                    placeholder="Describe what services or consultations are offered..."
                  />
                </div>

                {/* Button Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2">Button Text</label>
                    <input 
                      {...register("buttonText", { required: true })} 
                      className="w-full p-3.5 bg-slate-50/50 border border-slate-200/80 rounded-none focus:ring-4 focus:ring-[#F5B301]/10 focus:border-[#F5B301] focus:bg-white outline-none transition-all text-sm font-bold text-slate-800" 
                      placeholder="Contact Us" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2 flex items-center justify-between">
                      <span>Button Redirect URL</span>
                    </label>
                    <input 
                      {...register("buttonLink", { required: true })} 
                      className="w-full p-3.5 bg-slate-50/50 border border-slate-200/80 rounded-none focus:ring-4 focus:ring-[#F5B301]/10 focus:border-[#F5B301] focus:bg-white outline-none transition-all text-sm font-semibold text-slate-700" 
                      placeholder="e.g. /contact" 
                    />
                  </div>
                </div>

                {/* Color and Status Settings Grid */}
                <div className="grid grid-cols-1 gap-6">
                  
                  {/* Preset Background Colors */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2.5 flex items-center gap-1.5">
                      <Paintbrush size={14} className="text-[#F5B301]" />
                      <span>Theme Background Color</span>
                    </label>
                    
                    {/* Visual Pills */}
                    <div className="flex flex-wrap gap-2.5 mb-4">
                      {COLOR_PRESETS.map((preset) => {
                        const isActive = watchedCta.backgroundColor === preset.class;
                        return (
                          <button
                            key={preset.class}
                            type="button"
                            onClick={() => setValue("backgroundColor", preset.class)}
                            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-none border text-xs font-bold transition-all active:scale-95 ${
                              isActive 
                                ? "bg-slate-900 border-slate-950 text-white shadow-md shadow-slate-950/15" 
                                : "bg-white border-slate-100 hover:border-slate-300 text-slate-700"
                            }`}
                          >
                            <span 
                              className={`w-4 h-4 rounded-none border border-white/20 shadow-sm flex items-center justify-center ${preset.class}`}
                            >
                              {isActive && <Check size={9} className="text-white" />}
                            </span>
                            {preset.name}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Hex Color Text Input */}
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm font-semibold">CSS:</span>
                        <input 
                          {...register("backgroundColor")} 
                          className="w-full p-3.5 pl-14 bg-slate-50/50 border border-slate-200/80 rounded-none focus:ring-4 focus:ring-[#F5B301]/10 focus:border-[#F5B301] focus:bg-white outline-none transition-all text-xs font-mono font-bold text-slate-700" 
                          placeholder="e.g. bg-[#24342b] or custom CSS hex color code" 
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1.5">Supports both custom hex codes (e.g. #24342b) and standard Tailwind background utility classes.</span>
                  </div>

                  {/* Status Toggle Selector */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#24342b] mb-2.5">Landing Page Visibility</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setValue("status", "active")}
                        className={`flex items-center justify-center gap-2.5 p-4 rounded-none border font-bold transition-all text-sm ${
                          watchedCta.status === "active"
                            ? "bg-[#24342b] border-[#24342b] text-white shadow-md shadow-[#24342b]/10"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <Eye size={16} />
                        Active (Visible)
                      </button>
                      <button
                        type="button"
                        onClick={() => setValue("status", "inactive")}
                        className={`flex items-center justify-center gap-2.5 p-4 rounded-none border font-bold transition-all text-sm ${
                          watchedCta.status === "inactive"
                            ? "bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-600/10"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <EyeOff size={16} />
                        Inactive (Hidden)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-100 mt-8 flex items-center justify-between gap-4">
                  <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <Laptop size={13} />
                    <span>Auto-saves locally</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={saving}
                    className="bg-[#24342b] hover:bg-[#1f2b24] text-white px-8 py-4 rounded-none font-bold text-sm shadow-lg shadow-[#24342b]/15 hover:shadow-xl active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2 ml-auto w-full md:w-auto"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-none animate-spin"></div>
                        Publishing Layout...
                      </>
                    ) : (
                      "Publish Global Settings"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ──────── RIGHT COLUMN: STICKY LIVE INTERACTIVE PREVIEW ──────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            
            {/* Live Indicator */}
            <div className="flex items-center justify-between bg-white px-5 py-3 rounded-none border border-slate-100 shadow-sm">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Interactive Sandbox Preview
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-[#F5B301] bg-[#F5B301]/10 px-2.5 py-1 rounded-none">
                Real-Time
              </span>
            </div>

            {/* Simulated Desktop Browser Frame */}
            <div className="bg-slate-900 rounded-none overflow-hidden shadow-2xl border border-slate-800">
              
              {/* Browser Window Controls Header */}
              <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between border-b border-slate-800/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-none bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-none bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-none bg-[#27c93f]"></div>
                </div>
                
                {/* Browser URL Input Bar */}
                <div className="bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-500 px-4 py-1 rounded-none w-1/2 text-center flex items-center justify-center gap-1">
                  <span>vinayakoverseasservices.com</span>
                  <ExternalLink size={10} className="text-slate-600" />
                </div>
                <div className="w-12"></div> {/* spacer */}
              </div>

              {/* Responsive Container Container simulating website window */}
              <div className="bg-slate-950 p-1 relative overflow-y-auto max-h-[380px] min-h-[300px] flex items-center justify-center">
                
                {/* Actual CTA Component Live Mockup */}
                <div 
                  className={`w-full py-16 px-6 relative overflow-hidden rounded-none transition-all duration-500 ${previewBg.className}`}
                  style={previewBg.style}
                >
                  {/* Grid Lines Pattern */}
                  <div className="absolute inset-0 z-0 opacity-[0.07]">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>

                  <div className="relative z-10 text-center max-w-lg mx-auto">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight leading-tight">
                      {watchedCta.heading || "Ready to Start Your Journey?"}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-200/90 mb-6 font-medium max-w-sm mx-auto leading-relaxed">
                      {watchedCta.description || "Get in touch with Vinayak Overseas Services today to accelerate your career or study options abroad."}
                    </p>
                    
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 bg-[#F5B301] text-[#24342b] px-5 py-2.5 rounded-none font-bold text-xs hover:scale-105 hover:bg-yellow-400 transition-all duration-300 shadow-md shadow-yellow-500/10 pointer-events-none"
                    >
                      {watchedCta.buttonText || "Get Free Consultation"}
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* INACTIVE / HIDDEN BANNER OVERLAY */}
                {watchedCta.status === "inactive" && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 z-20 text-center px-6">
                    <div className="w-11 h-11 bg-rose-600/10 rounded-none flex items-center justify-center text-rose-400 border border-rose-500/20 shadow-lg">
                      <EyeOff size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">Banner is Hidden</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
                        It will not display on the user landing page because visibility is currently set to inactive.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Layout Customization Tip */}
            <div className="bg-slate-100/50 rounded-none p-4 border border-slate-200/60 text-xs text-slate-500 font-semibold leading-relaxed">
              <span className="text-[#24342b] font-black uppercase tracking-wider block mb-1">💡 Custom Styling Secrets</span>
              Try typing <code className="bg-white px-1.5 py-0.5 rounded-none border border-slate-200 text-rose-600 font-mono text-[10px]">#F5B301</code> or <code className="bg-white px-1.5 py-0.5 rounded-none border border-slate-200 text-rose-600 font-mono text-[10px]">bg-gradient-to-r from-emerald-800 to-[#122217]</code> into the CSS background field to see the banner update instantly.
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

