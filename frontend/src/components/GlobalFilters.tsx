"use client";

import React, { useState } from "react";
import { Filter, RefreshCw, Coins, HeartPulse, Compass, Users, Sparkles, SlidersHorizontal, Search } from "lucide-react";

interface GlobalFiltersProps {
  coin: string;
  setCoin: (val: string) => void;
  sentiment: string;
  setSentiment: (val: string) => void;
  side: string;
  setSide: (val: string) => void;
  archetype: string;
  setArchetype: (val: string) => void;
  coinsList: string[];
  onRefresh: () => void;
}

export default function GlobalFilters({
  coin,
  setCoin,
  sentiment,
  setSentiment,
  side,
  setSide,
  archetype,
  setArchetype,
  coinsList,
  onRefresh
}: GlobalFiltersProps) {
  const [minTradeSize, setMinTradeSize] = useState<number>(0);
  const [coinSearch, setCoinSearch] = useState<string>("");

  const sentimentRegimes = [
    { label: "ALL REGIMES", value: "ALL" },
    { label: "EXTREME FEAR", value: "Extreme Fear" },
    { label: "FEAR", value: "Fear" },
    { label: "NEUTRAL", value: "Neutral" },
    { label: "GREED", value: "Greed" },
    { label: "EXTREME GREED", value: "Extreme Greed" }
  ];

  const sides = [
    { label: "ALL DIRECTIONS", value: "ALL" },
    { label: "BUY / LONG", value: "BUY" },
    { label: "SELL / SHORT", value: "SELL" }
  ];

  const archetypes = [
    { label: "ALL ARCHETYPES", value: "ALL" },
    { label: "INSTITUTIONAL STRATEGISTS", value: "Institutional Strategists" },
    { label: "HIGH-RISK MOMENTUM TRADERS", value: "High-Risk Momentum Traders" },
    { label: "CONTRARIAN SURVIVORS", value: "Contrarian Survivors" },
    { label: "OVERLEVERAGED SPECULATORS", value: "Overleveraged Speculators" }
  ];

  // Filtered coins based on search input
  const filteredCoins = coinsList.filter(c => 
    c.toLowerCase().includes(coinSearch.toLowerCase())
  );

  // Friendly text helper for trade size slider
  const getSizeLabel = (val: number) => {
    if (val === 0) return "ALL SIZES (DEFAULT)";
    if (val === 1) return "> $5,000 (RETAIL)";
    if (val === 2) return "> $25,000 (PRO)";
    if (val === 3) return "> $100,000 (WHALE BLOCK)";
    return "ALL SIZES";
  };

  return (
    <div className="w-full glass-panel p-5 flex flex-col gap-5 z-10 select-none transition-all duration-300 relative overflow-hidden">
      {/* Decorative Shinkai Light Beam */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fd6ea6] to-[#ffb347] opacity-60"></div>
      
      {/* Header and Sync controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#fd6ea6]/20 to-[#7a5cf2]/20 border border-[#fd6ea6]/30">
            <Filter className="w-4 h-4 text-[#fd6ea6]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-[#f1f0f8] font-serif-cinzel uppercase flex items-center gap-1.5">
              <span>CRYPTOQUANT Intelligence Matrix</span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffb347] animate-pulse" />
            </h2>
            <p className="text-[10px] text-gray-500 tracking-wider font-mono">ADJUST COGNITIVE SLICING PARADIGMS</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-[#fd6ea6]/5 border border-[#fd6ea6]/20 hover:border-[#fd6ea6]/60 rounded-lg text-xs font-mono text-[#fd6ea6] hover:text-[#ffffff] hover:bg-[#fd6ea6]/10 transition-all cursor-pointer shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>SYNC NETWORK NODE</span>
        </button>
      </div>

      {/* Main Grid Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Asset/Coin Token Filter (with instant search suggestion) */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono text-[#ffb347] uppercase tracking-widest font-semibold flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" />
            <span>Asset Token</span>
          </label>
          
          <div className="relative">
            <select
              value={coin}
              onChange={(e) => {
                setCoin(e.target.value);
                setCoinSearch("");
              }}
              className="w-full px-3 py-2 bg-[#09081a]/80 border border-white/10 hover:border-[#fd6ea6]/30 rounded-lg text-sm text-gray-200 font-mono focus:border-[#fd6ea6] focus:outline-none transition-all cursor-pointer"
            >
              {filteredCoins.map((c) => (
                <option key={c} value={c} className="bg-[#0b081e] text-gray-200">
                  {c === "ALL" ? "✨ ALL TOKENS" : c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          
          {/* Quick search input */}
          <div className="relative mt-1">
            <input
              type="text"
              placeholder="Search Token..."
              value={coinSearch}
              onChange={(e) => setCoinSearch(e.target.value)}
              className="w-full px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[11px] text-gray-400 font-mono focus:outline-none focus:border-[#fd6ea6]/40 placeholder:text-gray-600 pl-7"
            />
            <Search className="w-3 h-3 text-gray-600 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* 2. Sentiment Regime Selector */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono text-[#fd6ea6] uppercase tracking-widest font-semibold flex items-center gap-1">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Sentiment Regime</span>
          </label>
          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            className="w-full px-3 py-2 bg-[#09081a]/80 border border-white/10 hover:border-[#fd6ea6]/30 rounded-lg text-sm text-gray-200 font-mono focus:border-[#fd6ea6] focus:outline-none transition-all cursor-pointer"
          >
            {sentimentRegimes.map((reg) => (
              <option key={reg.value} value={reg.value} className="bg-[#0b081e]">
                {reg.label}
              </option>
            ))}
          </select>
          <div className="text-[9px] font-mono text-gray-500 tracking-wider">
            Current Filter: <span className="text-[#fd6ea6]">{sentiment.toUpperCase()}</span>
          </div>
        </div>

        {/* 3. Trade Side Segmented Direction Toggles (Highly Interactive) */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono text-[#88f3ff] uppercase tracking-widest font-semibold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Order Direction</span>
          </label>
          <div className="grid grid-cols-3 bg-[#09081a]/95 border border-white/10 rounded-lg p-1">
            {sides.map((s) => {
              const isActive = side === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => setSide(s.value)}
                  className={`py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                    isActive 
                      ? s.value === "BUY" 
                        ? "bg-[#88f3ff]/15 text-[#88f3ff] border border-[#88f3ff]/30 shadow-inner" 
                        : s.value === "SELL" 
                          ? "bg-[#fd6ea6]/15 text-[#fd6ea6] border border-[#fd6ea6]/30 shadow-inner" 
                          : "bg-white/10 text-white border border-white/15"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {s.label.split(" ")[0]}
                </button>
              );
            })}
          </div>
          <div className="text-[9px] font-mono text-gray-500 tracking-wider">
            Directional Bias: <span className={side === "BUY" ? "text-[#88f3ff]" : side === "SELL" ? "text-[#fd6ea6]" : "text-gray-400"}>{side}</span>
          </div>
        </div>

        {/* 4. Trader Archetype Filter */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-mono text-[#ffb347] uppercase tracking-widest font-semibold flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>Trader Archetype</span>
          </label>
          <select
            value={archetype}
            onChange={(e) => setArchetype(e.target.value)}
            className="w-full px-3 py-2 bg-[#09081a]/80 border border-white/10 hover:border-[#fd6ea6]/30 rounded-lg text-sm text-gray-200 font-mono focus:border-[#fd6ea6] focus:outline-none transition-all cursor-pointer"
          >
            {archetypes.map((arch) => (
              <option key={arch.value} value={arch.value} className="bg-[#0b081e]">
                {arch.label}
              </option>
            ))}
          </select>
          <div className="text-[9px] font-mono text-gray-500 tracking-wider truncate">
            Cluster: <span className="text-[#ffb347]">{archetype}</span>
          </div>
        </div>

      </div>

      {/* Extended Feature Panel: Min Trade Size threshold slider */}
      <div className="w-full bg-[#09081a]/40 border border-white/5 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-1 rounded-md bg-[#ffb347]/10 border border-[#ffb347]/20">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#ffb347]" />
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wider text-gray-300 font-mono uppercase">Liquidity Block filter</h4>
            <p className="text-[9px] text-gray-500 font-mono">FILTER TRADING VOLUMES BY SIZE THRESHOLD</p>
          </div>
        </div>

        {/* Interactive Slider Input */}
        <div className="flex-1 max-w-md flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={minTradeSize}
            onChange={(e) => setMinTradeSize(Number(e.target.value))}
            className="flex-1 accent-[#fd6ea6] bg-[#0c0a1e] h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="w-48 text-right font-mono text-xs font-bold text-[#fd6ea6] px-3 py-1 bg-[#fd6ea6]/5 border border-[#fd6ea6]/20 rounded-md tracking-wide">
            {getSizeLabel(minTradeSize)}
          </span>
        </div>
      </div>

    </div>
  );
}
