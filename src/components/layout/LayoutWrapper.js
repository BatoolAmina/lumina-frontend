"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  const excludedPaths = ["/chatbot", "/login", "/register", "/signup"];
  const isExcluded = excludedPaths.some(path => pathname === path || pathname?.startsWith("/chatbot/"));

  return (
    <>
      {!isExcluded && <Navbar />}
      <main className={`flex-grow flex flex-col ${!isExcluded ? "min-h-screen" : ""}`}>
        {children}
      </main>
      {!isExcluded && (
        <>
          <Footer />
          <BackToTop />
        </>
      )}
    </>
  );
}