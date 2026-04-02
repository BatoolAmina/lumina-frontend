"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Shield, Cpu, Star, ArrowRight, MousePointerClick, Code2, Rocket, Globe, BarChart3, Fingerprint, Layers, MessageSquare, LogIn } from "lucide-react";
import Contact from "@/components/features/Contact";
import { useRef, useEffect, useState } from "react";
import Link from "next/link"; 

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.2 } }
};

export default function LandingPage() {
  const targetRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <div 
      ref={targetRef} 
      className="relative bg-[#030712] text-slate-100 selection:bg-violet-500/30 selection:text-violet-200"
    >

      {}
      <motion.section 
        style={isMounted ? { opacity, scale } : {}}
        className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-40 md:pb-48"
      >
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px] md:h-[800px] md:w-[800px]" />

        <div className="mx-auto max-w-7xl text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300 backdrop-blur-xl"
          >
            <Rocket size={16} className="text-cyan-400" /> <span>System v1.0 Live</span>
          </motion.div>

          <motion.h1 
            className="text-balance text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-9xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Your <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Realm
            </span>
          </motion.h1>

          <motion.p 
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Lumina is the high-performance AI ecosystem engineered for developers. 
            Engage with our neural engine to architect the future.
          </motion.p>

          <motion.p 
            className="mx-auto mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            IGNITE. INTEGRATE. INNOVATE
          </motion.p>

          <motion.div 
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {}
            <Link href="/chatbot" className="w-full sm:w-auto">
                <button className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-violet-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-violet-500 active:scale-95 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                    <MessageSquare size={20} /> Open Chatbot <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
            </Link>

            {}
            <Link href="/login" className="w-full sm:w-auto">
                <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 px-8 py-4 text-lg font-bold text-slate-200 transition-all hover:bg-slate-800 backdrop-blur-sm">
                    <LogIn size={20} className="text-cyan-400" /> Member Access
                </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {}
      <section className="border-y border-slate-900 bg-black/50 py-12 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Latency", val: "<12ms" },
              { label: "Uptime", val: "99.99%" },
              { label: "Security", val: "AES-256" },
              { label: "Throughput", val: "1.2GB/s" }
            ].map((stat, i) => (
              <motion.div key={i} {...fadeInUp} className="text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-black text-cyan-400">{stat.val}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="about" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeInUp} className="max-w-xl text-center lg:text-left">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">Core Intelligence</h2>
              <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Synthetic Web <br /> Framework
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Lumina transcends standard development. It is a synthetic framework utilizing AI-driven primitives to deliver seamless, reactive digital interfaces that adapt to user behavior in real-time.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start gap-4 border-l-2 border-violet-500 pl-6 italic text-violet-300/80">
                "We don't just write code; we architect the future of interaction through neural design."
              </div>
            </motion.div>

            <motion.div 
              initial={{ rotateY: 20, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-video overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 group-hover:opacity-100 transition-opacity" />
              <Code2 size={280} strokeWidth={0.5} className="text-white/5 group-hover:text-white/10 transition-colors" />
              <div className="relative z-10 rounded-2xl bg-black/60 p-8 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <div className="flex gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                 </div>
                 <p className="font-mono text-sm text-cyan-300 flex items-center gap-3">
                   <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                   EXECUTING_LUMINA_CORE_DEPLOY
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section id="features" className="py-24 md:py-32 bg-[#020617]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div {...fadeInUp} className="flex flex-col items-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-violet-400 mb-4">Neural Grid</h2>
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">Unrivaled Power</h2>
            <p className="mt-4 text-slate-500 max-w-xl">Optimized for high-density applications and scalable neural networks with integrated security.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: <Zap />, title: "Quantum Speed", desc: "Sub-atomic latency for data processing and visual rendering cycles.", color: "text-amber-400", bg: "bg-amber-400/10" },
              { icon: <Shield />, title: "Bio-Metric Security", desc: "Military-grade encryption layers fused into the core component logic.", color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { icon: <Cpu />, title: "Neural Sync", desc: "Self-learning UI components that adapt to user interaction entropy.", color: "text-violet-400", bg: "bg-violet-400/10" },
              { icon: <Layers />, title: "Multi-Cloud", desc: "Native support for hybrid cloud environments and edge computing.", color: "text-fuchsia-400", bg: "bg-fuchsia-400/10" },
              { icon: <BarChart3 />, title: "Live Insights", desc: "Real-time telemetry and advanced analytics delivered in milliseconds.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { icon: <Fingerprint />, title: "Smart Auth", desc: "Passwordless authentication using advanced biometric verification.", color: "text-blue-400", bg: "bg-blue-400/10" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-10 flex flex-col items-center text-center transition-all hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
              >
                <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} transition-all group-hover:scale-110 group-hover:rotate-6`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                <p className="mt-4 text-slate-400 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {}
      <section id="creator" className="relative py-24 md:py-48 overflow-hidden bg-black">
        <div className="mx-auto max-w-4xl px-6 text-center relative z-10 flex flex-col items-center">
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex flex-col items-center"
          >
            <div className="group relative mb-12 h-40 w-40 rounded-full border-2 border-violet-500/50 p-2 flex items-center justify-center">
               <div className="absolute inset-0 rounded-full bg-violet-600/30 blur-2xl group-hover:bg-violet-600/50 transition-all animate-pulse" />
               <div className="flex h-full w-full items-center justify-center rounded-full bg-[#030712] relative z-10 border border-violet-500/20">
                  <Star size={64} className="text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" />
               </div>
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-cyan-400 mb-6">Master Architect</h2>
            <h2 className="text-4xl font-black text-white md:text-7xl tracking-tighter">Batool Amina</h2>
            <p className="mt-10 text-xl leading-relaxed text-slate-400 max-w-2xl">
              Focusing on the intersection of human psychology and digital performance, Batool architects systems that define the next era of web interfaces.
            </p>
            <motion.div className="mt-12 flex gap-6" {...fadeInUp}>
              <button className="flex items-center gap-3 rounded-full bg-white px-10 py-4 text-sm font-bold text-black hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-cyan-400/20">
                <MousePointerClick size={18} /> Access Neural Link
              </button>
              <button className="flex items-center gap-3 rounded-full border border-slate-800 px-10 py-4 text-sm font-bold text-white hover:bg-slate-900 transition-all">
                <Globe size={18} /> Global Profile
              </button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 -z-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </section>

      {}
      <section className="relative py-24 bg-gradient-to-b from-black to-violet-950/20">
        <div className="mx-auto max-w-7xl px-6 text-center flex flex-col items-center">
            <motion.div {...fadeInUp} className="flex flex-col items-center">
                <h2 className="text-4xl font-black text-white md:text-6xl mb-8">Ready to evolve?</h2>

                {}
                <Link href="/register">
                  <button className="group flex items-center gap-4 rounded-2xl bg-cyan-400 px-12 py-6 text-xl font-black text-black transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                      Start Building Now <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </Link>
            </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}