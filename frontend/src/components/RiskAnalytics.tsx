"use client";

import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  BarChart,
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  Bar,
  CartesianGrid 
} from "recharts";
import { Shield, TrendingDown, Percent, Skull, Sparkles } from "lucide-react";

interface VolatilityRegime {
  classification: string;
  pnl_std: number;
  pnl_mean: number;
  trade_count: number;
}

interface DrawdownPoint {
  timestamp: string;
  cumulative_pnl: number;
  drawdown: number;
}

interface SurvivorPoint {
  period: string;
  active_accounts: number;
  survival_rate_percent: number;
}

interface RiskAnalyticsProps {
  data: {
    max_drawdown: number;
    value_at_risk_95: number;
    average_drawdown: number;
    volatility_by_sentiment: VolatilityRegime[];
    drawdown_curve: DrawdownPoint[];
    survivorship_decay: SurvivorPoint[];
  };
}

export default function RiskAnalytics({ data }: RiskAnalyticsProps) {
  const { max_drawdown, value_at_risk_95, average_drawdown, volatility_by_sentiment, drawdown_curve, survivorship_decay } = data;

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* 1. Header Segment */}
      <div>
        <h2 className="text-3xl font-bold uppercase tracking-widest bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] bg-clip-text text-transparent font-serif-cinzel glow-text-pink">
          Horizon Risk Analytics
        </h2>
        <p className="text-xs text-gray-500 font-mono flex items-center gap-1.5 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb347]" />
          <span>CRYPTOQUANT: MONITORING PEAK-TO-TROUGH DRAWDOWN PROFILES AND LEVERAGE FLUSH FREQUENCIES</span>
        </p>
      </div>

      {/* 2. Top Row: Risk KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Maximum Drawdown */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/30 to-transparent"></div>
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/5">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Max Drawdown Decay</span>
            <TrendingDown className="w-4.5 h-4.5 text-[#fd6ea6]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#fd6ea6] tracking-tight glow-text-red">
              -${Math.abs(max_drawdown).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mt-1">PEAK EQUITY RETRACTION</span>
          </div>
        </div>

        {/* Value at Risk (95% Confidence) */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#88f3ff]/30 to-transparent"></div>
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/5">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Value At Risk (95% VaR)</span>
            <Shield className="w-4.5 h-4.5 text-[#88f3ff]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#88f3ff] tracking-tight glow-text-cyan">
              -${Math.abs(value_at_risk_95).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mt-1">95% worst-case loss limits</span>
          </div>
        </div>

        {/* Average Drawdown */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7a5cf2]/30 to-transparent"></div>
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/5">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Average drawdown decay</span>
            <Percent className="w-4.5 h-4.5 text-[#7a5cf2]" />
          </div>
          <div>
            <div className="text-3xl font-mono font-bold text-[#7a5cf2] tracking-tight glow-text-purple">
              -${Math.abs(average_drawdown).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mt-1">average drawdown expectation</span>
          </div>
        </div>

      </div>

      {/* 3. Middle Section: Drawdown Area Curves & Volatilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Drawdown Curve Chart */}
        <div className="glass-panel p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
          <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair mb-2">Drawdown Decay Profile</h3>
          <span className="text-[10px] font-mono text-gray-500 block mb-6">Chronological tracking of cumulative return deviations from local equity peaks.</span>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={drawdown_curve} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="shinkaiDrawGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fd6ea6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#fd6ea6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="rgba(255,255,255,0.15)" 
                  fontSize={8}
                  fontFamily="JetBrains Mono"
                  tick={false}
                />
                <YAxis 
                  stroke="#fd6ea6" 
                  fontSize={8}
                  fontFamily="JetBrains Mono"
                  tickLine={false}
                  tickFormatter={(v) => `-$${Math.abs(v / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ background: "#0d091e", borderColor: "rgba(253, 110, 166, 0.2)", borderRadius: "10px" }}
                  labelStyle={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#fd6ea6" }}
                  itemStyle={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="drawdown" 
                  name="Drawdown Value"
                  stroke="#fd6ea6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#shinkaiDrawGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volatility By Sentiment Regime Bar Chart */}
        <div className="glass-panel p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffb347]/20 to-transparent"></div>
          <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair mb-2">Volatility Deviation by Sentiment</h3>
          <span className="text-[10px] font-mono text-gray-500 block mb-6">Evaluating trading return volatility (standard deviation of returns) across psychological phases.</span>
          
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volatility_by_sentiment} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
                <XAxis 
                  dataKey="classification" 
                  stroke="rgba(255,255,255,0.15)" 
                  fontSize={8}
                  fontFamily="JetBrains Mono"
                />
                <YAxis 
                  stroke="#ffb347" 
                  fontSize={8}
                  fontFamily="JetBrains Mono"
                  tickLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip 
                  contentStyle={{ background: "#0d091e", borderColor: "rgba(255,179,71,0.2)", borderRadius: "10px" }}
                  itemStyle={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}
                />
                <Bar 
                  dataKey="pnl_std" 
                  name="PnL Std Dev (Volatility)"
                  fill="#ffb347" 
                  radius={[5, 5, 0, 0]}
                  maxBarSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Bottom Row: Survivorship Decay Cohort Grid */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <Skull className="w-5 h-5 text-[#fd6ea6] animate-pulse" />
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair">Hyperactive Trader Node Survivorship Decay</h3>
          </div>
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Leverage decay matrix</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 pb-3">
                <th className="py-2.5 px-4 font-bold">MONTHLY TRADING PERIOD</th>
                <th className="py-2.5 px-4 text-right font-bold">ACTIVE UNIQUE NODES</th>
                <th className="py-2.5 px-4 text-right font-bold">SURVIVAL COEFFICIENT RATE</th>
                <th className="py-2.5 px-4 text-right font-bold">DECAY FRACTION STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {survivorship_decay.map((row) => {
                const rate = row.survival_rate_percent;
                let statusColor = "text-[#88f3ff]";
                let badge = "STARDUST EQUILIBRIUM";

                if (rate < 40) {
                  statusColor = "text-[#fd6ea6] font-bold";
                  badge = "COSMIC FLUSH / MARGIN EXHAUST";
                } else if (rate < 65) {
                  statusColor = "text-[#ffb347]";
                  badge = "LEVERAGE ATTRITION";
                } else if (rate < 88) {
                  statusColor = "text-[#7a5cf2]";
                  badge = "COHORT DIVERGENCE";
                }

                return (
                  <tr key={row.period} className="hover:bg-[#fd6ea6]/2 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-300">{row.period}</td>
                    <td className="py-3 px-4 text-right text-white font-bold">{row.active_accounts} Accounts</td>
                    <td className={`py-3 px-4 text-right font-bold ${statusColor}`}>{rate.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`text-[8px] font-bold tracking-widest px-2 py-0.5 rounded border border-white/5 bg-black/40 uppercase ${statusColor}`}>
                        {badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
