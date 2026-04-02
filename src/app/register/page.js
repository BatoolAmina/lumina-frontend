"use client";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

function RegisterContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Neural Check: Ensure password meets typical 8-character minimum before sending
    if (formData.password.length < 8) {
      setError("Security Protocol: Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/signup", formData);
      
      if (response.data.status === "success") {
        router.push("/login?registered=true");
      }
    } catch (err) {
      // Logic to catch the 422 validation message specifically
      const backendMessage = err.response?.data?.message || "Protocol Error: Registration failed";
      setError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 overflow-hidden shadow-xl shadow-cyan-500/10">
              <Image src="/favicon.jpg" alt="Lumina Logo" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">LUMINA</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">IGNITE. INTEGRATE. INNOVATE</p>
            </div>
          </Link>
          <p className="mt-4 text-slate-400 text-sm font-medium">Create your digital architect identity</p>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-[10px] font-bold text-red-400 uppercase tracking-widest"
            >
              {error}
            </motion.div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Architect Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name" 
                  className="w-full rounded-2xl border border-white/5 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Digital Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="name@domain.com" 
                  className="w-full rounded-2xl border border-white/5 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full rounded-2xl border border-white/5 bg-black/40 py-4 pl-12 pr-12 text-white outline-none transition-all focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 placeholder:text-slate-700" 
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
               <p className="text-[10px] font-bold leading-tight text-slate-500 uppercase tracking-tighter">
                 By initializing, I agree to the <span className="text-slate-300">Protocol Terms</span> and <span className="text-slate-300">Privacy Architecture</span>.
               </p>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 py-4 font-black uppercase tracking-widest text-xs text-white transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-cyan-500/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Initialize Identity"}
              {!isLoading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0b101d] px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Neural Sync</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-200 transition-all hover:bg-white/10"
            >
              <FaGithub size={18} /> Github
            </button>
            <button 
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/chatbot" })}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/5 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-200 transition-all hover:bg-white/10"
            >
              <FcGoogle size={18} /> Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors underline decoration-2 underline-offset-4">
            Access Key Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[#030712]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}