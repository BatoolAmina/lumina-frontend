"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ArrowRight, Zap, LogIn, 
  MessageSquare, User, ShieldCheck, LogOut 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const publicLinks = [
    { name: "About", href: "/#about" },
    { name: "Features", href: "/#features" },
  ];

  const authenticatedLinks = [
    { name: "Nexus Chat", href: "/chatbot", icon: <MessageSquare size={16} /> },
  ];

  return (
    <nav 
      className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
        scrolled 
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex flex-col items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform group-hover:rotate-12 overflow-hidden">
                <Image src="/favicon.jpg" alt="Lumina Logo" width={64} height={64} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:block">
                LUMINA
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hidden sm:block">IGNITE. INTEGRATE. INNOVATE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center mr-4 border-r border-white/10 pr-4">
              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {status === "authenticated" ? (
              <div className="flex items-center gap-2">
                {authenticatedLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                
                <div className="h-8 w-[1px] bg-white/10 mx-2" />
                
                <div className="flex items-center gap-3 pl-2">
                   <div className="flex flex-col items-end hidden lg:flex">
                      <span className="text-xs font-bold text-white leading-none">{session.user.name}</span>
                      <span className="text-[10px] text-cyan-500 font-medium uppercase tracking-widest">Architect</span>
                   </div>
                   <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                   >
                    <LogOut size={18} />
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/login">
                  <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95">
                    <Zap size={16} className="fill-white" />
                    Initialize Protocol
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-300 hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full md:hidden bg-[#030712] border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-1 px-6 pb-8 pt-4">
              
              {/* User Identity Section (Mobile) */}
              {status === "authenticated" && (
                <div className="flex items-center gap-4 p-4 mb-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-12 w-12 rounded-full bg-violet-600 flex items-center justify-center font-black text-white">
                    {session.user.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{session.user.name}</p>
                    <p className="text-xs text-cyan-500 font-medium tracking-widest uppercase">Verified Architect</p>
                  </div>
                </div>
              )}

              {publicLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-4 text-lg font-bold text-slate-400 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}

              {status === "authenticated" && authenticatedLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-4 text-lg font-bold text-violet-400 border-b border-white/5"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              <div className="pt-6">
                {status === "authenticated" ? (
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 py-4 font-bold text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={20} />
                    Terminate Link
                  </button>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 font-black text-white shadow-xl shadow-violet-500/20">
                      <Zap size={20} className="fill-white" />
                      GET STARTED
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}