"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
 
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      toast.error("Invalid email or password");
      setLoading(false);
    } else {
      toast.success("Logged in successfully");
      router.push("/admin/dashboard");
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#24342b] to-[#1a251f]">
        <div className="flex flex-col items-center gap-4 text-white">
          <div className="w-10 h-10 border-4 border-white/20 border-t-[#F5B301] rounded-none animate-spin"></div>
          <p className="font-semibold text-lg tracking-wide">Securing connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#24342b] to-[#1a251f] px-4 relative overflow-hidden font-sans">
      {/* Premium Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B301] rounded-none mix-blend-multiply filter blur-[140px] opacity-15 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5B301] rounded-none mix-blend-multiply filter blur-[140px] opacity-15 translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md p-10 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 border border-white/25">
        <div className="text-center mb-10">
          <div className="bg-white p-2 rounded-none border border-slate-200 shadow-inner w-24 h-24 flex items-center justify-center mx-auto mb-4">
            <img
              src="/images/logo.jpeg"
              alt="VOS Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-[#24342b] tracking-tight font-heading">Admin Portal</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">Sign in to manage VOS content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-sm"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200/80 rounded-none focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all font-medium text-slate-800 text-sm shadow-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#24342b] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#24342b] text-white py-4 rounded-none font-bold text-base hover:bg-[#1a251f] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_10px_25px_rgba(36,52,43,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#24342b]"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-none animate-spin" />
                Validating access...
              </div>
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
