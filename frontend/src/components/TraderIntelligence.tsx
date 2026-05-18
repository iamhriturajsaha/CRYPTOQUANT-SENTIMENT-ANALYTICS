"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown, Shield, Flame, Compass, Sparkles, HelpCircle } from "lucide-react";

interface Trader {
  account: string;
  total_pnl: number;
  avg_pnl: number;
  pnl_std: number;
  win_rate: number;
  avg_trade_size: number;
  consistency_score: number;
  risk_score: number;
  cluster: number;
  archetype: string;
}

interface TraderIntelProps {
  traders: Trader[];
}

export default function TraderIntelligence({ traders }: TraderIntelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Trader>("total_pnl");
  const [sortAsc, setSortAsc] = useState(false);

  // Poetic Makoto Shinkai archetype cards mapping
  const archetypeCards = [
    {
      title: "Institutional Strategists",
      cluster: 0,
      color: "border-[#7a5cf2]/30 bg-[#7a5cf2]/5 hover:bg-[#7a5cf2]/10 text-[#7a5cf2]",
      description: "Extremely high total PnL ($400k - $1.6M+), large average trade sizes, steady consistency, and moderate controlled risk exposures.",
      badge: "TWILIGHT STRATEGIST",
      metric: "Consistency > 0.8"
    },
    {
      title: "High-Risk Momentum Traders",
      cluster: 1,
      color: "border-[#fd6ea6]/30 bg-[#fd6ea6]/5 hover:bg-[#fd6ea6]/10 text-[#fd6ea6]",
      description: "Massive trade sizes ($17k - $28k) coupled with extremely high risk/volatility indicators. Riding meteor-sized market waves.",
      badge: "METEOR RIDER",
      metric: "Avg Size $20k+"
    },
    {
      title: "Contrarian Survivors",
      cluster: 2,
      color: "border-[#ffb347]/30 bg-[#ffb347]/5 hover:bg-[#ffb347]/10 text-[#ffb347]",
      description: "Outstanding win rates (up to 82%), smaller average trades, and high consistency, capitalizing heavily during Fear periods.",
      badge: "HORIZON SURVIVOR",
      metric: "Win Rate > 75%"
    },
    {
      title: "Overleveraged Speculators",
      cluster: 3,
      color: "border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400",
      description: "Negative total net returns, low win rates, highly reactive to daily sentiment swings, trading size beyond sustainable risk.",
      badge: "TWILIGHT SPECULATOR",
      metric: "Avg Return < 0"
    }
  ];

  // Sorting handler
  const handleSort = (field: keyof Trader) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Filter and Sort data
  const filteredTraders = traders
    .filter((t) => t.account.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle string vs number sorting
      if (typeof valA === "string" && typeof valB === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return sortAsc 
          ? (valA as number) - (valB as number) 
          : (valB as number) - (a[sortField] as number);
      }
    });

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* 1. Header Segment */}
      <div>
        <h2 className="text-3xl font-bold uppercase tracking-widest bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] bg-clip-text text-transparent font-serif-cinzel glow-text-pink">
          Trader Chronicle Records
        </h2>
        <p className="text-xs text-gray-500 font-mono flex items-center gap-1.5 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb347]" />
          <span>CRYPTOQUANT BEHAVIORAL PARADIGMS AND REAL-TIME WALLET CLUSTERING IN THE TWILIGHT SKY</span>
        </p>
      </div>

      {/* 2. Archetype Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {archetypeCards.map((card) => (
          <div key={card.title} className={`p-4 border rounded-xl flex flex-col justify-between transition-all duration-300 ${card.color}`}>
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border bg-black/40 uppercase">
                  {card.badge}
                </span>
                <span className="text-[9px] font-mono text-gray-500">CLUSTER {card.cluster}</span>
              </div>
              <h4 className="text-xs font-bold font-serif-cinzel uppercase text-white mb-2">{card.title}</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">{card.description}</p>
            </div>
            <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
              <span className="text-gray-500">Benchmark KPI:</span>
              <span className="text-white font-bold">{card.metric}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Search & Leaderboard Table */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
        
        {/* Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair">Quantum Accounts Leaderboard</h3>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search wallet account address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#09081a]/90 border border-white/10 hover:border-[#fd6ea6]/30 rounded-xl text-xs text-gray-300 font-mono focus:border-[#fd6ea6] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 pb-3">
                <th className="py-3 px-4 font-bold cursor-pointer hover:text-white" onClick={() => handleSort("account")}>
                  <div className="flex items-center space-x-1.5">
                    <span>ACCOUNT ADDRESS</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-white" onClick={() => handleSort("total_pnl")}>
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>TOTAL PnL</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-white" onClick={() => handleSort("win_rate")}>
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>WIN RATE</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-white" onClick={() => handleSort("avg_trade_size")}>
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>AVG SIZE</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-white" onClick={() => handleSort("consistency_score")}>
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>CONSISTENCY</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold cursor-pointer hover:text-white" onClick={() => handleSort("risk_score")}>
                  <div className="flex items-center justify-end space-x-1.5">
                    <span>RISK EXPOSURE</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold">ARCHETYPE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTraders.map((trader) => {
                const isProfitable = trader.total_pnl >= 0;
                
                // Archetype badge mapping
                let archetypeBadge = "border-gray-500 text-gray-400 bg-gray-500/5";
                if (trader.cluster === 0) archetypeBadge = "border-[#7a5cf2]/40 text-[#7a5cf2] bg-[#7a5cf2]/10";
                else if (trader.cluster === 1) archetypeBadge = "border-[#fd6ea6]/40 text-[#fd6ea6] bg-[#fd6ea6]/10";
                else if (trader.cluster === 2) archetypeBadge = "border-[#ffb347]/40 text-[#ffb347] bg-[#ffb347]/10";
                else if (trader.cluster === 3) archetypeBadge = "border-rose-500/40 text-rose-400 bg-rose-500/10";

                return (
                  <tr key={trader.account} className="hover:bg-[#fd6ea6]/2 hover:border-[#fd6ea6]/10 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#88f3ff] truncate max-w-xs select-all">
                      {trader.account}
                    </td>
                    <td className={`py-3 px-4 text-right font-bold ${isProfitable ? "text-[#88f3ff]" : "text-[#fd6ea6]"}`}>
                      {isProfitable ? "+" : ""}${trader.total_pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                    <td className="py-3 px-4 text-right text-white font-bold">
                      {(trader.win_rate * 100).toFixed(2)}%
                    </td>
                    <td className="py-3 px-4 text-right text-gray-400">
                      ${trader.avg_trade_size.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-300 font-bold">
                      {trader.consistency_score.toFixed(4)}
                    </td>
                    <td className="py-3 px-4 text-right text-rose-400 font-bold">
                      ${trader.risk_score.toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-[8px] font-bold tracking-wider px-2 py-0.5 rounded border uppercase ${archetypeBadge}`}>
                        {trader.archetype}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredTraders.length === 0 && (
            <div className="text-center py-8 text-xs font-mono text-gray-500">
              No trader accounts matching search query.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
