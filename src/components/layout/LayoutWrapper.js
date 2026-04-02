"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";
export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isChatPage = pathname === "/chatbot";
  return (
    <>
      {!isChatPage && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isChatPage && <Footer />}
      {!isChatPage && <BackToTop />}
    </>
  );
}