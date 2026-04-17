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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CJ Clark — Cybersecurity Engineer",
  description:
    "CJ Clark — Cybersecurity Engineer. Internal security tools, automation, and AI projects.",
  openGraph: {
    title: "CJ Clark — Cybersecurity Engineer",
    description:
      "Internal security tools, automation, and AI projects — plus 5 interactive demos.",
    url: "/",
    siteName: "CJ Clark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CJ Clark — Cybersecurity Engineer",
    description:
      "Internal security tools, automation, and AI projects — plus 5 interactive demos.",
  },
  robots: { index: true, follow: true },
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
