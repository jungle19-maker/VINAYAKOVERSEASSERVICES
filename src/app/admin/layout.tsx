"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  ListOrdered, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Clock, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Format system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
        " | " +
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin") {
      router.push("/admin");
    }
  }, [status, pathname, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-3">
        <div className="w-10 h-10 border-4 border-[#24342b]/15 border-t-[#F5B301] rounded-none animate-spin"></div>
        <p className="text-slate-500 font-bold text-sm tracking-wider animate-pulse">Initializing Administrative Workspace...</p>
      </div>
    );
  }

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  if (!session) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Requirements", href: "/admin/requirements", icon: ListOrdered },
    { name: "Documents", href: "/admin/documents", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  // Get current route label for breadcrumbs
  const currentItem = navItems.find((item) => item.href === pathname);
  const sectionTitle = currentItem ? currentItem.name : "Admin Panel";

  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white">
      {/* Sidebar Brand Header */}
      <div className="p-6 bg-gradient-to-r from-[#24342b] to-[#1a251f] border-b border-white/5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-none border border-slate-700/30 flex-shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="VOS Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-black tracking-wider text-white">
              VOS ADMIN
            </h2>
            <span className="text-[9px] font-bold text-[#F5B301] uppercase tracking-[0.12em] leading-none mt-0.5">
              Console Panel
            </span>
          </div>
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-none w-fit border border-white/10">
          <ShieldCheck size={12} className="text-[#F5B301]" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Admin Console</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-5 space-y-1.5 mt-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-4 rounded-none font-bold transition-all duration-200 group text-sm relative ${
                isActive
                  ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/15"
                  : "text-slate-300/85 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-[#F5B301] rounded-none"></span>
              )}
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${
                  isActive 
                    ? "text-[#F5B301]" 
                    : "text-slate-400 group-hover:text-white"
                }`} 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / User Profile & Logout */}
      <div className="p-5 border-t border-white/5 bg-[#121c17]">
        <div className="flex items-center gap-3 mb-5 px-2">
          <div className="w-10 h-10 rounded-none bg-gradient-to-br from-[#F5B301] to-[#d9a000] text-[#24342b] flex items-center justify-center font-bold shadow-md">
            A
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">{session.user?.email || "Administrator"}</h4>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Security Role: Admin</span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-none text-rose-400 font-bold hover:bg-rose-500/10 hover:text-rose-300 ring-1 ring-transparent hover:ring-rose-500/20 transition-all duration-200 text-sm justify-center"
        >
          <LogOut size={16} />
          Logout Panel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans antialiased text-slate-800">
      
      {/* ── MOBILE HEADER (Toggles Drawer) ── */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#24342b] text-white shadow-md z-30 sticky top-0 border-b border-[#121c17]">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-0.5 rounded-none border border-slate-700/30 flex-shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="VOS Logo"
              className="h-7 w-auto object-contain"
            />
          </div>
          <h1 className="text-base font-black tracking-tight leading-none">
            VOS <span className="text-[#F5B301] text-xs tracking-widest font-semibold block mt-0.5">ADMIN</span>
          </h1>
        </div>
        
        <button 
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all focus:outline-none"
        >
          <Menu size={20} className="text-white" />
        </button>
      </header>

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop blur overlay */}
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
          />
          {/* Slider content */}
          <aside className="relative flex flex-col w-72 h-full bg-gradient-to-b from-[#24342b] to-[#121c17] shadow-2xl z-10 transition-transform duration-300 ease-out border-r border-white/5">
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-none bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-[#F5B301] transition-colors"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── DESKTOP PERMANENT SIDEBAR ── */}
      <aside className="hidden md:flex w-72 bg-gradient-to-b from-[#24342b] to-[#121c17] flex-shrink-0 z-20 sticky top-0 h-screen shadow-[4px_0_24px_rgba(0,0,0,0.05)] border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        
        {/* DESKTOP TOP BAR (With section title, time and profile info) */}
        <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white border-b border-slate-100 flex-shrink-0 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="text-slate-400 font-medium">Workspace</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-400 font-medium">Admin</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-[#24342b] font-bold">{sectionTitle}</span>
          </div>

          {/* Time & Clock details */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-50 px-3.5 py-2 rounded-none border border-slate-100">
              <Clock size={13} className="text-slate-400" />
              <span>{currentTime}</span>
            </div>
 
            {/* Profile Dropdown indicator */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-100">
              <div className="text-right">
                <h3 className="text-xs font-extrabold text-[#24342b] leading-tight">Admin User</h3>
                <span className="text-[9px] text-[#F5B301] uppercase tracking-wider font-extrabold">Active Status</span>
              </div>
              <div className="w-8 h-8 rounded-none bg-[#24342b] text-[#F5B301] flex items-center justify-center font-bold text-xs ring-2 ring-[#F5B301]/25">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace children */}
        <main className="flex-1 p-6 md:p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
