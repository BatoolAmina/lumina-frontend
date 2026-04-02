"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Terminal } from "lucide-react";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  return (
    <footer className="relative border-t border-white/5 bg-[#020617] pt-24 pb-12 text-slate-500 overflow-hidden">
      {}
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
      <motion.div 
        className="mx-auto max-w-7xl px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid gap-12 md:grid-cols-12">
          {}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <div className="flex items-center gap-3 text-white mb-2 group">
               <div className="flex h-16 w-16 items-center justify-center rounded-xl overflow-hidden">
                  <Image src="/favicon.jpg" alt="Lumina Logo" width={64} height={64} className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col">
                 <span className="text-2xl font-black tracking-tighter text-white">LUMINA</span>
                 <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-cyan-400">IGNITE. INTEGRATE. INNOVATE</span>
               </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              A high-performance ecosystem engineered for developers who demand 
              aesthetic precision and sub-second latency.
            </p>
          </motion.div>
          {}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white">Project</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-cyan-400 transition-colors">Architecture</Link></li>
            </ul>
          </motion.div>
          {}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <h3 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white">Support</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Privacy Layer</Link></li>
              <li><Link href="#" className="hover:text-violet-400 transition-colors">Legal Terms</Link></li>
              <li><Link href="#contact" className="hover:text-violet-400 transition-colors">Neural Link</Link></li>
            </ul>
          </motion.div>
          {}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <h3 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white">Network Status</h3>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                </div>
                <span className="text-sm font-bold text-slate-200">Mainnet Live: 99.99%</span>
              </div>
              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Master Architect</p>
                <div className="mt-2 flex items-center justify-between">
                   <p className="font-black text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text">
                     BATOOL AMINA
                   </p>
                   <Shield size={16} className="text-cyan-500/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {}
        <motion.div 
          variants={itemVariants}
          className="mt-24 flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row"
        >
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              © {currentYear} Lumina Digital Realm
            </p>
          </div>
          <div className="mt-4 flex items-center gap-6 text-[10px] font-mono text-slate-600 md:mt-0">
            <div className="flex items-center gap-2">
              <Terminal size={12} />
              <span>ENV: PRODUCTION_1.0.4</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-800" />
            <span>LATENCY: 8ms</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}