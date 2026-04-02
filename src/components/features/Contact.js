"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, User, Sparkles } from "lucide-react";
export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#030712] py-24 md:py-32 overflow-hidden">
      {}
      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              <Sparkles size={16} /> <span>Neural Connection</span>
            </div>
            <h3 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
              Let’s build something <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                extraordinary
              </span>
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-slate-400">
              Ready to initialize your next project? Reach out and let's architect 
              the future of your digital realm together.
            </p>
            <div className="mt-10 space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400 transition-all group-hover:scale-110 group-hover:bg-violet-500/20">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Initialize Link</p>
                  <p className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">hello@lumina.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          {}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12 backdrop-blur-xl shadow-2xl"
          >
            <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Architect Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full rounded-xl border border-slate-800 bg-black/50 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 placeholder:text-slate-700" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Digital Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full rounded-xl border border-slate-800 bg-black/50 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 placeholder:text-slate-700" 
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">Project Specification</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-500" size={18} />
                  <textarea 
                    rows="4" 
                    placeholder="Describe your vision..." 
                    className="w-full rounded-xl border border-slate-800 bg-black/50 py-4 pl-12 pr-4 text-white outline-none transition-all focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 placeholder:text-slate-700 resize-none"
                  ></textarea>
                </div>
              </div>
              <button className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-violet-600 py-4 font-black uppercase tracking-widest text-white transition-all hover:bg-violet-500 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Transmit Signal 
                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}