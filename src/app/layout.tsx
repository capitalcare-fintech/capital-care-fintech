import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { FooterShell } from "@/components/layout/FooterShell";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SidebarProvider } from "@/context/SidebarProvider";
import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capital Care Fintech | Personal Loans & Insurance Services in India",
  description: "Capital Care Fintech offers personal loan services with instant approval, low interest rates, and minimal documentation for salaried and self-employed individuals, plus life, health, vehicle, and family protection insurance services.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph:{
    title: "CapitalCare | Fintech",
    description: "Personal loan and insurance services in India with fast approvals, low interest rates, minimal documentation, and secure transparent support.",
    url: "https://www.capitalcarefintech.com",
    siteName: "CapitalCare Fintech",
  }
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('capitalcare-theme');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <SidebarProvider>
            <div className="min-h-screen bg-sky-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
              <div className="pointer-events-none fixed inset-0 -z-10 opacity-90 transition-opacity duration-300 dark:opacity-40 [background:radial-gradient(1100px_circle_at_20%_10%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(1000px_circle_at_80%_20%,rgba(99,102,241,0.10),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(14,165,233,0.10),transparent_55%)]" />
              <Navbar />
              <main>{children}</main>
              <FooterShell />
              <Sidebar />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
