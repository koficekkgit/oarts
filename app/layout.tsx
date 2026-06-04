import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oarts.vercel.app"),
  title: {
    default: "oarts — Kovaná kola & fitment",
    template: "%s — oarts",
  },
  description:
    "Prémiová kovaná kola, OEM+ styling a fitment na míru. Ostrava, doprava po celé ČR (PPL / GLS).",
  keywords: ["kovaná kola", "forged wheels", "BBS", "fitment", "Ostrava", "OEM+", "custom kola"],
  openGraph: {
    title: "oarts — Kovaná kola & fitment",
    description: "Prémiová kovaná kola a fitment na míru. Ostrava, doprava po celé ČR.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-bg text-fg flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
