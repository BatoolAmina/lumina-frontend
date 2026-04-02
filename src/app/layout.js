import "./globals.css";
import Providers from "./providers";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata = {
  title: "LUMINA | Neural Architecture",
  description: "High-performance AI ecosystem engineered by Batool Amina.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "LUMINA | Neural Architecture",
    description: "High-performance AI ecosystem engineered by Batool Amina.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth" 
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#030712] font-sans antialiased text-slate-200 selection:bg-violet-500/30 selection:text-violet-200">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}