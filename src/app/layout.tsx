import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CJ Clark — Cybersecurity Engineer",
  description:
    "Portfolio of CJ Clark — Cybersecurity Engineer specializing in internal tools, automation, and AI-driven security workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-fg font-body">
        <Nav />
        {children}
      </body>
    </html>
  );
}
