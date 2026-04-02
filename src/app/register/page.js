"use client";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative min-h-screen w-full bg-[#030712] flex items-center justify-center px-6 pt-32 pb-12 overflow-hidden">
      <div className="absolute top-0 right-1/2 -z-10 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-violet-600/5 blur-[100px]" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[480px]"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex flex-col items-center gap-3 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 overflow-hidden">
              <Image src="/favicon.jpg" alt="Lumina Logo" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase">LUMINA</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">IGNITE. INTEGRATE. INNOVATE</p>
            </div>
          </Link>
          <p className="mt-4 text-slate-400 text-sm font-medium">Create your digital architect identity</p>
        </div>
        <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Architect Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-3.5 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Digital Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  placeholder="name@domain.com" 
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-3.5 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••" 
                  className="w-full rounded-xl border border-white/5 bg-black/40 py-3.5 pl-12 pr-12 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
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
            <div className="flex items-start gap-3 px-1 py-2">
               <div className="mt-1 flex h-4 w-4 items-center justify-center rounded border border-white/10 bg-black/40 text-cyan-400">
                  <ShieldCheck size={12} />
               </div>
               <p className="text-[11px] leading-tight text-slate-500">
                  By initializing, I agree to the <span className="text-slate-300">Protocol Terms</span> and <span className="text-slate-300">Privacy Architecture</span>.
               </p>
            </div>
            <button className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-4 font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-cyan-500/20">
              Initialize Identity 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0b101d] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Sync with Neural Net</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => signIn("github", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-slate-200 transition-all hover:bg-white/10"
            >
              <FaGithub size={20} /> Github
            </button>
            <button 
              onClick={() => signIn("google", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-slate-200 transition-all hover:bg-white/10"
            >
              <FcGoogle size={20} /> Google
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="font-bold text-violet-400 hover:text-violet-300 transition-colors">
            Access Key Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}