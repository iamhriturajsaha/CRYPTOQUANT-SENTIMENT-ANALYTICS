"use client";

import React from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Area, 
  Line, 
  CartesianGrid 
} from "recharts";
import { Info, HelpCircle, AlertCircle, Sparkles, TrendingUp } from "lucide-react";

interface SentimentIntelProps {
  data: {
    correlation: {
      pearson: { coeff: number; p_value: number; significant: boolean };
      spearman: { coeff: number; p_value: number; significant: boolean };
    };
    hypothesis_testing: {
      t_test: { statistic: number; p_value: number; significant: boolean };
      mann_whitey?: { statistic: number; p_value: number; significant: boolean };
      mann_whitney?: { statistic: number; p_value: number; significant: boolean };
      samples: { fear_count: number; greed_count: number; fear_mean_pnl: number; greed_mean_pnl: number };
    };
    psychology_matrix: Array<{
      regime: string;
      trade_count: number;
      win_rate: number;
      avg_pnl: number;
      avg_trade_size: number;
      total_pnl: number;
    }>;
    timeline: Array<{
      trade_date: string;
      net_pnl: number;
      sentiment_score: number;
      size_usd: number;
      cumulative_pnl: number;
    }>;
  };
}

export default function SentimentIntelligence({ data }: SentimentIntelProps) {
  const { correlation, hypothesis_testing, psychology_matrix, timeline } = data;
  const mwTest = hypothesis_testing.mann_whitney || hypothesis_testing.mann_whitey;

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* 1. Header Segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-widest bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] bg-clip-text text-transparent font-serif-cinzel glow-text-pink">
            Sentiment Twilight Intelligence
          </h2>
          <p className="text-xs text-gray-500 font-mono flex items-center gap-1.5 mt-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb347]" />
            <span>CRYPTOQUANT: CORRELATING BITCOIN BEHAVIORAL PANIC WITH REAL-TIME TRADER OUTCOMES</span>
          </p>
        </div>
      </div>

      {/* 2. Top Row: Statistical Correlations & Welch T-Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pearson / Spearman Correlations */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/30 to-transparent"></div>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#ffb347] uppercase tracking-widest">Sentiment Correlation Matrix</span>
              <Info className="w-4 h-4 text-[#ffb347]" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-1">
                  <span>Pearson Linear Coefficient</span>
                  <span className={correlation.pearson.significant ? "text-[#88f3ff] text-[10px] font-bold" : "text-gray-600 text-[10px]"}>
                    {correlation.pearson.significant ? "SIGNIFICANT" : "NOT SIG."}
                  </span>
                </div>
                <div className="text-3xl font-mono font-bold text-white tracking-tight glow-text-cyan">
                  {correlation.pearson.coeff.toFixed(5)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 mb-1">
                  <span>Spearman Rank Coefficient</span>
                  <span className={correlation.spearman.significant ? "text-[#88f3ff] text-[10px] font-bold" : "text-gray-600 text-[10px]"}>
                    {correlation.spearman.significant ? "SIGNIFICANT" : "NOT SIG."}
                  </span>
                </div>
                <div className="text-3xl font-mono font-bold text-white tracking-tight glow-text-purple">
                  {correlation.spearman.coeff.toFixed(5)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-[10px] font-mono text-gray-500 leading-relaxed pt-2 border-t border-white/5">
            Coefficient scores near <span className="text-[#88f3ff]">0.000</span> confirm trader execution operates independent of ambient market greed.
          </div>
        </div>

        {/* Welch's T-Test */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7a5cf2]/30 to-transparent"></div>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#88f3ff] uppercase tracking-widest">Welch's T-Test Telemetry</span>
              <HelpCircle className="w-4 h-4 text-[#88f3ff]" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>T-Statistic Coefficient</span>
                <span className="text-white font-bold">{hypothesis_testing.t_test.statistic.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>Statistical P-Value</span>
                <span className="text-[#fd6ea6] font-bold font-mono">{hypothesis_testing.t_test.p_value.toExponential(3)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>Hypothesis Classification</span>
                <span className="text-[#88f3ff] font-bold glow-text-cyan">
                  {hypothesis_testing.t_test.significant ? "DISTINCT BIAS" : "EQUIVALENT RETURNS"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-[10px] font-mono text-gray-500 leading-relaxed border-t border-white/5 pt-2">
            P-Value &lt; 0.05 indicates strong mathematical backing that Fear and Greed periods yield statistically distinct returns.
          </div>
        </div>

        {/* Distribution Samples comparison */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffb347]/30 to-transparent"></div>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#fd6ea6] uppercase tracking-widest">Regime Samples Deck</span>
              <AlertCircle className="w-4 h-4 text-[#fd6ea6]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">FEAR PERIODS</span>
                <div className="text-lg font-mono font-bold text-[#88f3ff]">{hypothesis_testing.samples.fear_count.toLocaleString()}</div>
                <span className="text-[9px] font-mono text-gray-400">Trades</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">GREED PERIODS</span>
                <div className="text-lg font-mono font-bold text-[#fd6ea6]">{hypothesis_testing.samples.greed_count.toLocaleString()}</div>
                <span className="text-[9px] font-mono text-gray-400">Trades</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">FEAR MEAN PnL</span>
                <div className="text-sm font-mono font-bold text-[#88f3ff]">${hypothesis_testing.samples.fear_mean_pnl?.toFixed(2) || "0.00"}</div>
              </div>
              <div>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block mb-1">GREED MEAN PnL</span>
                <div className="text-sm font-mono font-bold text-[#fd6ea6]">${hypothesis_testing.samples.greed_mean_pnl?.toFixed(2) || "0.00"}</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-[10px] font-mono text-gray-500 leading-relaxed border-t border-white/5 pt-2">
            Non-parametric Mann-Whitney U test p-value: <span className="text-white font-mono">{mwTest?.p_value.toExponential(3) || "0.00"}</span>.
          </div>
        </div>

      </div>

      {/* 3. Composed Timeline Area Chart */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#fd6ea6]" />
              <span>Rolling Cumulative Returns vs Sentiment Chronology</span>
            </h3>
            <p className="text-[10px] text-gray-500 font-mono">Mapping dual-axis cumulative PnL curve over chronological Fear & Greed metrics.</p>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeline} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="shinkaiAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#88f3ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#88f3ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.02)" vertical={false} />
              <XAxis 
                dataKey="trade_date" 
                stroke="rgba(255,255,255,0.2)" 
                fontSize={9}
                fontFamily="JetBrains Mono"
                tickLine={false}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#88f3ff" 
                fontSize={9}
                fontFamily="JetBrains Mono"
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#fd6ea6" 
                fontSize={9}
                fontFamily="JetBrains Mono"
                tickLine={false}
                domain={[0, 4]}
                tickFormatter={(v) => `${(v * 25).toFixed(0)}`}
              />
              <Tooltip 
                contentStyle={{ background: "#0d091e", borderColor: "rgba(253, 110, 166, 0.2)", borderRadius: "10px" }}
                labelClassName="text-[10px] font-mono text-[#ffb347] uppercase"
                itemStyle={{ fontFamily: "JetBrains Mono", fontSize: "11px" }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="cumulative_pnl" 
                name="Cumulative PnL"
                stroke="#88f3ff" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#shinkaiAreaGrad)" 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sentiment_score" 
                name="Fear & Greed Index"
                stroke="#fd6ea6" 
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Regime Psychology Matrix Grid */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7a5cf2]/20 to-transparent"></div>
        <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair mb-4">Market Psychology Regime Statistics Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 pb-3">
                <th className="py-3 px-4 font-bold">SENTIMENT REGIME</th>
                <th className="py-3 px-4 text-right">TOTAL TRADES</th>
                <th className="py-3 px-4 text-right">WIN RATE</th>
                <th className="py-3 px-4 text-right">AVERAGE TRADE SIZE</th>
                <th className="py-3 px-4 text-right font-bold">AVG PnL</th>
                <th className="py-3 px-4 text-right font-bold">CUMULATIVE PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {psychology_matrix.map((row) => {
                const isProfitable = row.total_pnl >= 0;
                
                // Color formatting helpers
                let regimeColor = "text-gray-300";
                if (row.regime.includes("Extreme Fear")) regimeColor = "text-[#88f3ff] font-bold";
                else if (row.regime.includes("Fear")) regimeColor = "text-[#88f3ff]/80";
                else if (row.regime.includes("Extreme Greed")) regimeColor = "text-[#fd6ea6] font-bold glow-text-pink";
                else if (row.regime.includes("Greed")) regimeColor = "text-[#fd6ea6]/80";
                
                return (
                  <tr key={row.regime} className="hover:bg-[#fd6ea6]/2 hover:border-[#fd6ea6]/10 transition-colors">
                    <td className={`py-3.5 px-4 font-sans font-bold ${regimeColor}`}>{row.regime.toUpperCase()}</td>
                    <td className="py-3.5 px-4 text-right text-white">{row.trade_count.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right text-gray-300 font-bold">{row.win_rate.toFixed(2)}%</td>
                    <td className="py-3.5 px-4 text-right text-gray-400">${row.avg_trade_size.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td className={`py-3.5 px-4 text-right font-bold ${isProfitable ? "text-[#88f3ff]" : "text-[#fd6ea6]"}`}>
                      {isProfitable ? "+" : ""}${row.avg_pnl.toFixed(2)}
                    </td>
                    <td className={`py-3.5 px-4 text-right font-bold ${isProfitable ? "text-[#88f3ff] glow-text-cyan" : "text-[#fd6ea6] glow-text-pink"}`}>
                      {isProfitable ? "+" : ""}${row.total_pnl.toLocaleString(undefined, {minimumFractionDigits: 2})}
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
