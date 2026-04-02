"use client";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chatbot");
    }
  }, [status, router]);

  // Handle registration success message
  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccessMsg("Identity Initialized. Please provide Access Key.");
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg(""); // Clear success msg on new login attempt

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError("Neural Protocol Denied: Invalid Credentials");
      setIsLoading(false);
    } else {
      router.push("/chatbot");
    }
  };

  // Prevent UI flickering while checking session
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#030712]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030712] flex items-center justify-center px-6 overflow-hidden">
      {/* Neural Background Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[450px]"
      >
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex flex-col items-center gap-3 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 overflow-hidden">
              <Image src="/favicon.jpg" alt="Lumina Logo" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase">LUMINA</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">IGNITE. INTEGRATE. INNOVATE</p>
            </div>
          </Link>
          <p className="mt-4 text-slate-400 text-sm font-medium">Access your digital architecture</p>
        </div>

        <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
          {/* Status Notifications */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs font-bold text-red-400 uppercase tracking-widest">
              {error}
            </div>
          )}
          
          {successMsg && (
            <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs font-bold text-emerald-400 uppercase tracking-widest">
              {successMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Digital Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@domain.com" 
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 placeholder:text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Access Key</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-4 pl-12 pr-12 text-white outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 placeholder:text-slate-700" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="group relative mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-violet-500 active:scale-95 shadow-xl shadow-violet-600/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Initialize Access"}
              {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0b101d] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Sync with Neural Net</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-3.5 text-sm font-bold text-slate-200 transition-all hover:bg-white/10"
            >
              <FaGithub size={20} /> Github
            </button>
            <button 
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-3.5 text-sm font-bold text-slate-200 transition-all hover:bg-white/10"
            >
              <FcGoogle size={20} /> Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          New architect?{" "}
          <Link href="/register" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            Register Identity
          </Link>
        </p>
      </motion.div>
    </div>
  );
}