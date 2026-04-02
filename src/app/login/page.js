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

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/chatbot");
    }
  }, [status, router]);

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccessMsg("Identity Initialized. Please provide Access Key.");
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
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
    } catch (err) {
      setError("System Overload: Connection failed");
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#030712] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-violet-500" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Syncing Neural Core</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030712] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[450px]"
      >
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex flex-col items-center gap-4 group">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-2xl shadow-violet-500/20 transition-transform group-hover:scale-105">
              <Image 
                src="/favicon.jpg" 
                alt="Lumina Logo" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase">LUMINA</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400">Secure Neural Access</p>
            </div>
          </Link>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-3xl shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-[10px] font-black text-red-400 uppercase tracking-widest"
            >
              {error}
            </motion.div>
          )}
          
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-[10px] font-black text-emerald-400 uppercase tracking-widest"
            >
              {successMsg}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Identity UID</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="USER@NEURAL.LINK" 
                  className="w-full rounded-2xl border border-white/5 bg-black/40 py-4 pl-12 pr-4 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 placeholder:text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Key</label>
                <Link href="/forgot-password" size={18} className="text-[9px] font-black uppercase text-slate-600 hover:text-violet-400">Recover Key</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full rounded-2xl border border-white/5 bg-black/40 py-4 pl-12 pr-12 text-sm text-white outline-none transition-all focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 placeholder:text-slate-700" 
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
              className="group relative mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 font-black uppercase tracking-[0.2em] text-xs text-white transition-all hover:bg-violet-500 active:scale-95 shadow-xl shadow-violet-600/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Initialize Access"}
              {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#030712] px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Cross-Platform Sync</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => signIn("github", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10 hover:border-white/10 active:scale-95"
            >
              <FaGithub size={18} /> Github
            </button>
            <button 
              onClick={() => signIn("google", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all hover:bg-white/10 hover:border-white/10 active:scale-95"
            >
              <FcGoogle size={18} /> Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
          New Architect?{" "}
          <Link href="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-400/30 pb-0.5 ml-1">
            Register Identity
          </Link>
        </p>
      </motion.div>
    </div>
  );
}