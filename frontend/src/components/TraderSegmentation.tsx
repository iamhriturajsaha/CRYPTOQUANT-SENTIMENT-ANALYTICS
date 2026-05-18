"use client";

import React, { useState } from "react";
import { Info, Sparkles, TrendingUp, BarChart2, Star } from "lucide-react";

interface Node {
  account: string;
  total_pnl: number;
  win_rate: number;
  consistency: number;
  risk: number;
  pca_x: number;
  pca_y: number;
  cluster: number;
  archetype: string;
}

interface ArchetypeStat {
  archetype: string;
  total_pnl: number;
  win_rate: number;
  risk_score: number;
  trader_count: number;
}

interface TraderSegmentationProps {
  data: {
    nodes: Node[];
    archetypes: ArchetypeStat[];
  };
}

export default function TraderSegmentation({ data }: TraderSegmentationProps) {
  const { nodes, archetypes } = data;
  const [selectedNode, setSelectedNode] = useState<Node | null>(nodes[0] || null);

  // Min-Max values to scale coordinates dynamically into SVG viewBox
  const xCoords = nodes.map(n => n.pca_x);
  const yCoords = nodes.map(n => n.pca_y);
  
  const minX = Math.min(...xCoords, -2);
  const maxX = Math.max(...xCoords, 2);
  const minY = Math.min(...yCoords, -2);
  const maxY = Math.max(...yCoords, 2);

  // SVG coordinate projection helper
  const width = 500;
  const height = 350;
  const padding = 40;

  const projectX = (x: number) => {
    return padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding);
  };

  const projectY = (y: number) => {
    // Invert Y axis for mathematical representation (positive is up)
    return height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
  };

  // Node coloring helpers optimized for Shinkai twilight
  const getClusterColors = (cluster: number) => {
    switch (cluster) {
      case 0: return { color: "#7a5cf2", glow: "shadow-[#7a5cf2]/20", border: "border-[#7a5cf2]/30", fill: "fill-[#7a5cf2]" };
      case 1: return { color: "#88f3ff", glow: "shadow-[#88f3ff]/20", border: "border-[#88f3ff]/30", fill: "fill-[#88f3ff]" };
      case 2: return { color: "#ffb347", glow: "shadow-[#ffb347]/20", border: "border-[#ffb347]/30", fill: "fill-[#ffb347]" };
      case 3: return { color: "#fd6ea6", glow: "shadow-[#fd6ea6]/20", border: "border-[#fd6ea6]/30", fill: "fill-[#fd6ea6]" };
      default: return { color: "#9ca3af", glow: "shadow-gray-500/20", border: "border-gray-500/30", fill: "fill-gray-400" };
    }
  };

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* 1. Header Segment */}
      <div>
        <h2 className="text-3xl font-bold uppercase tracking-widest bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] bg-clip-text text-transparent font-serif-cinzel glow-text-pink">
          Cluster Stardust Analysis
        </h2>
        <p className="text-xs text-gray-500 font-mono flex items-center gap-1.5 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#ffb347]" />
          <span>CRYPTOQUANT: MAPPING BEHAVIORAL QUANT COHORTS VIA PRINCIPAL COMPONENT ANALYSIS (PCA)</span>
        </p>
      </div>

      {/* 2. Top Row: Interactive SVG Scatterplot & Inspector Terminal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Scatterplot Grid */}
        <div className="glass-panel p-5 lg:col-span-2 relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
          <div className="mb-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair">Principal Component Analysis Coordinates</h3>
            <span className="text-[10px] font-mono text-gray-500">Visual representation of aggregated wallet address risk coordinates.</span>
          </div>

          <div className="w-full bg-[#0a081a]/50 border border-white/5 rounded-xl p-2 flex items-center justify-center scanlines">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full max-w-[550px] aspect-[500/350] select-none"
            >
              {/* SVG Glowing Filter Definitions */}
              <defs>
                <filter id="neonPurple" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neonCyan" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neonGold" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="neonPink" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Background Coordinate Lines */}
              <line x1={padding} y1={height/2} x2={width-padding} y2={height/2} stroke="rgba(253,110,166,0.06)" strokeDasharray="3" />
              <line x1={width/2} y1={padding} x2={width/2} y2={height-padding} stroke="rgba(253,110,166,0.06)" strokeDasharray="3" />
              
              {/* Axes Labels */}
              <text x={width-padding} y={height/2 + 15} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="JetBrains Mono" textAnchor="end">PCA 1 (PnL & SIZE)</text>
              <text x={width/2 + 5} y={padding + 5} fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="JetBrains Mono">PCA 2 (CONSISTENCY)</text>

              {/* Nodes Plotting */}
              {nodes.map((node) => {
                const colors = getClusterColors(node.cluster);
                const isSelected = selectedNode?.account === node.account;
                
                // SVG filter assignment
                let filterId = "";
                if (node.cluster === 0) filterId = "url(#neonPurple)";
                else if (node.cluster === 1) filterId = "url(#neonCyan)";
                else if (node.cluster === 2) filterId = "url(#neonGold)";
                else if (node.cluster === 3) filterId = "url(#neonPink)";

                return (
                  <circle
                    key={node.account}
                    cx={projectX(node.pca_x)}
                    cy={projectY(node.pca_y)}
                    r={isSelected ? 9 : 5}
                    fill={colors.color}
                    filter={isSelected ? filterId : ""}
                    className={`cursor-pointer transition-all duration-300 ${colors.fill} hover:opacity-100 opacity-80`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <title>{node.account}</title>
                  </circle>
                );
              })}
            </svg>
          </div>

          {/* Color Code Legend */}
          <div className="flex flex-wrap items-center gap-3.5 mt-4 text-[10px] font-mono text-gray-400">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7a5cf2] block shadow-sm" />
              <span>STRATEGISTS (C0)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#88f3ff] block shadow-sm" />
              <span>METEOR RIDERS (C1)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb347] block shadow-sm" />
              <span>CONTRARIANS (C2)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fd6ea6] block shadow-sm" />
              <span>SPECULATORS (C3)</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Terminal Card */}
        <div className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffb347]/20 to-transparent"></div>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono font-bold text-[#ffb347] uppercase tracking-widest">Stardust Inspector</span>
              <Info className="w-4 h-4 text-[#ffb347]" />
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 block mb-1">ACCOUNT ADDRESS</span>
                  <div className="text-xs font-mono font-bold text-[#88f3ff] break-all select-all">{selectedNode.account}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">TOTAL PnL</span>
                    <span className={`text-base font-mono font-bold ${selectedNode.total_pnl >= 0 ? "text-[#88f3ff]" : "text-[#fd6ea6]"}`}>
                      ${selectedNode.total_pnl.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">WIN RATE</span>
                    <span className="text-base font-mono font-bold text-white">{selectedNode.win_rate.toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">CONSISTENCY</span>
                    <span className="text-base font-mono font-bold text-gray-300">{selectedNode.consistency.toFixed(4)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block">RISK EXPOSURE</span>
                    <span className="text-base font-mono font-bold text-[#fd6ea6]">${selectedNode.risk.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[9px] font-mono text-gray-500 block mb-1">COHORT CLASSIFICATION</span>
                  <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border uppercase inline-block ${getClusterColors(selectedNode.cluster).border} ${getClusterColors(selectedNode.cluster).color}`}>
                    {selectedNode.archetype}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-xs font-mono text-gray-500">
                Click a node inside the PCA graph to inspect account statistics.
              </div>
            )}
          </div>

          <div className="mt-6 text-[10px] font-mono text-gray-500 leading-relaxed border-t border-white/5 pt-2">
            The PCA projection aligns trader volume & profitability weights along the horizontal axis, mapping trading frequency along the vertical axis.
          </div>
        </div>

      </div>

      {/* 3. Cohort Performance Grid Table */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fd6ea6]/20 to-transparent"></div>
        <h3 className="text-base font-bold uppercase tracking-wider text-white font-serif-playfair mb-4 font-bold flex items-center gap-1.5">
          <Star className="w-4 h-4 text-[#ffb347]" />
          <span>Cohort Performance Roster Matrix</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 pb-3">
                <th className="py-3 px-4 font-bold">QUANTITATIVE COHORT</th>
                <th className="py-3 px-4 text-right font-bold">TRADERS COUNT</th>
                <th className="py-3 px-4 text-right font-bold">COHORT WIN RATE</th>
                <th className="py-3 px-4 text-right font-bold">AVG RISK SCORE</th>
                <th className="py-3 px-4 text-right font-bold">COMBINED NET PROFITS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {archetypes.map((row) => {
                const isProfitable = row.total_pnl >= 0;
                
                // Color mapping
                let styleColor = "text-gray-300";
                if (row.archetype === "Institutional Strategists") styleColor = "text-[#7a5cf2] font-bold";
                else if (row.archetype === "High-Risk Momentum Traders") styleColor = "text-[#88f3ff] font-bold";
                else if (row.archetype === "Contrarian Survivors") styleColor = "text-[#ffb347] font-bold";
                else if (row.archetype === "Overleveraged Speculators") styleColor = "text-[#fd6ea6] font-bold";

                return (
                  <tr key={row.archetype} className="hover:bg-[#fd6ea6]/2 transition-colors">
                    <td className={`py-3.5 px-4 font-sans font-bold ${styleColor}`}>{row.archetype.toUpperCase()}</td>
                    <td className="py-3.5 px-4 text-right text-white font-bold">{row.trader_count}</td>
                    <td className="py-3.5 px-4 text-right text-gray-300">{row.win_rate.toFixed(2)}%</td>
                    <td className="py-3.5 px-4 text-right text-rose-400">${row.risk_score.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                    <td className={`py-3.5 px-4 text-right font-bold ${isProfitable ? "text-[#88f3ff]" : "text-[#fd6ea6]"}`}>
                      {isProfitable ? "+" : ""}${row.total_pnl.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
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
