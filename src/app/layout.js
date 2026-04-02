import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/common/BackToTop";
import Providers from "./providers";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata = {
  title: "LUMINA | Neural Architecture",
  description: "High-performance AI ecosystem engineered by Batool Amina.",
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth" 
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col antialiased bg-[#030712] text-slate-200 selection:bg-violet-500/30 selection:text-violet-200">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}