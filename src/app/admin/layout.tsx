"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, FileText, ListOrdered, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!session) return null;

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Requirements", href: "/admin/requirements", icon: ListOrdered },
    { name: "Documents", href: "/admin/documents", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-slate-800">
      <aside className="w-full md:w-72 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.05)] flex-shrink-0 z-20 sticky top-0 md:h-screen">
        <div className="p-6 bg-gradient-to-r from-[#24342b] to-[#1a251f] text-white">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-[#F5B301]">VOS</span> Admin
          </h2>
        </div>
        <nav className="p-4 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-50/80 text-[#24342b] shadow-sm ring-1 ring-green-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#24342b]"
                }`}
              >
                <Icon size={20} className={isActive ? "text-[#F5B301]" : "text-gray-400"} />
                {item.name}
              </Link>
            );
          })}
          
          <div className="pt-8 mt-8 border-t border-gray-100 px-2">
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 font-medium hover:bg-red-50 hover:ring-1 hover:ring-red-100 transition-all duration-200"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 md:h-screen md:overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
