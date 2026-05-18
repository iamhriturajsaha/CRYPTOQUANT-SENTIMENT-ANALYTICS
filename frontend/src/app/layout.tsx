import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRYPTOQUANT | Cinematic Sentiment Trading Intelligence",
  description: "Advanced institutional quantitative trading intelligence, behavioral analysis, and cryptocurrency sentiment modeling powered by Hyperliquid execution records and twilight indices.",
  keywords: ["CRYPTOQUANT", "Crypto Quant", "Hyperliquid", "Quantitative Trading", "Trader Behavior", "Fear & Greed Index", "Hedge Fund Platform"],
  authors: [{ name: "CRYPTOQUANT AI" }],
  openGraph: {
    title: "CRYPTOQUANT | Institutional Research Terminal",
    description: "Advanced quantitative trading intelligence modeling Bitcoin panic and Hyperliquid order logs.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased min-h-full bg-[#05040d] text-white selection:bg-[#fd6ea6] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
