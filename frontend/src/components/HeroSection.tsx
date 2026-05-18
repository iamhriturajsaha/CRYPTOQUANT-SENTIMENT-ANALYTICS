"use client";

import React from "react";
import { Shield, Cpu, Activity, TrendingUp, ChevronRight, Sparkles, Star } from "lucide-react";

interface HeroSectionProps {
  onLaunch: () => void;
  kpis: {
    total_trades: number;
    total_pnl: number;
    win_rate: number;
    sentiment_volatility: number;
  };
}

export default function HeroSection({ onLaunch, kpis }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 overflow-hidden select-none bg-transparent w-full">

      {/* Atmospheric Dawn Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#fd6ea6]/8 pulse-circle rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#88f3ff]/8 pulse-circle rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#7a5cf2]/6 pulse-circle rounded-full" />

      {/* 3. Hero Main Messaging Terminal */}
      <main className="flex-1 flex flex-col justify-center items-center text-center max-w-6xl z-10 py-16">
        
        {/* Large Cinematic Header resembling Your Name logo style */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest mb-8 font-serif-cinzel leading-none uppercase relative">
          <span className="block text-4xl sm:text-5xl tracking-[0.2em] text-[#ffb347] mb-4 font-mono glow-text-gold font-light">WELCOME TO</span>
          <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">CRYPTOQUANT</span>
        </h1>

        {/* Cinematic Subheadline */}
        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-4xl mb-12 leading-relaxed font-sans font-light">
          Advanced behavioral analytics, sentiment-driven trading insights, and institutional-grade quantitative intelligence modeling Bitcoin panic and Hyperliquid order logs under painterly twilight grids.
        </p>

        {/* Glowing Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 max-w-md sm:max-w-none">
          <button
            onClick={onLaunch}
            className="w-full sm:w-auto px-14 py-5 rounded-xl font-mono font-bold tracking-[0.15em] text-sm sm:text-base text-[#05040d] bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] hover:brightness-110 transition-all duration-300 transform hover:scale-[1.03] shadow-lg flex items-center justify-center space-x-3 cursor-pointer"
          >
            <span>LAUNCH CONSOLE</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* 4. Live Metrics Count Ticker Section */}
      <section className="w-full max-w-7xl z-10 py-6 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          {/* Card 1 */}
          <div className="glass-panel p-4 flex flex-col md:flex-row items-center md:space-x-4 border-l-2 border-l-[#ffb347]/50">
            <div className="p-3 rounded-lg bg-[#ffb347]/10 text-[#ffb347] mb-2 md:mb-0">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tracking-tight text-white glow-text-gold">
                {kpis.total_trades ? kpis.total_trades.toLocaleString() : "79,214"}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Trades Analyzed</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-4 flex flex-col md:flex-row items-center md:space-x-4 border-l-2 border-l-[#88f3ff]/50">
            <div className="p-3 rounded-lg bg-[#88f3ff]/10 text-[#88f3ff] mb-2 md:mb-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tracking-tight text-[#88f3ff] glow-text-cyan">
                ${kpis.total_pnl ? kpis.total_pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "3,254,980.20"}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Total Net Profit</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-4 flex flex-col md:flex-row items-center md:space-x-4 border-l-2 border-l-[#7a5cf2]/50">
            <div className="p-3 rounded-lg bg-[#7a5cf2]/10 text-[#7a5cf2] mb-2 md:mb-0">
              <Star className="w-6 h-6 text-[#7a5cf2] animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tracking-tight text-[#7a5cf2] glow-text-purple">
                {kpis.win_rate ? `${kpis.win_rate}%` : "43.55%"}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Average Win Rate</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-4 flex flex-col md:flex-row items-center md:space-x-4 border-l-2 border-l-[#fd6ea6]/50">
            <div className="p-3 rounded-lg bg-[#fd6ea6]/10 text-[#fd6ea6] mb-2 md:mb-0">
              <Cpu className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono tracking-tight text-[#fd6ea6] glow-text-pink">
                {kpis.sentiment_volatility ? kpis.sentiment_volatility.toFixed(3) : "1.125"}
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Sentiment Volatility</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
