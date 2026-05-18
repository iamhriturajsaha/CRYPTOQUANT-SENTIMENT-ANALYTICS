"use client";

import React from "react";
import { 
  Activity, 
  Users, 
  PieChart, 
  ShieldAlert, 
  Brain, 
  LogOut,
  Sparkles,
  Server
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExit: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onExit }: SidebarProps) {
  const menuItems = [
    { id: "sentiment", label: "Sentiment Twilight", icon: Activity, color: "text-[#fd6ea6]" },
    { id: "traders", label: "Trader Chronicles", icon: Users, color: "text-[#88f3ff]" },
    { id: "clusters", label: "Cluster Stardust", icon: PieChart, color: "text-[#ffb347]" },
    { id: "risk", label: "Horizon Risk", icon: ShieldAlert, color: "text-[#fd6ea6]" },
    { id: "simulator", label: "ML Forecast", icon: Brain, color: "text-[#88f3ff]" },
  ];

  return (
    <aside className="w-full lg:w-64 glass-panel border-r border-white/5 h-full flex flex-col justify-between p-4 z-20 select-none">
      
      {/* 1. Brand Logo Block */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fd6ea6] to-[#ffb347] flex items-center justify-center p-[1px] shadow-sm">
            <div className="w-full h-full bg-[#0d091e] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#fd6ea6]" />
            </div>
          </div>
          <span className="text-base font-bold tracking-widest bg-gradient-to-r from-[#fd6ea6] via-[#7a5cf2] to-[#ffb347] bg-clip-text text-transparent font-serif-cinzel uppercase">
            CRYPTOQUANT
          </span>
        </div>

        {/* 2. Menu Navigation */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "custom-tab-active border border-[#fd6ea6]/30 text-white shadow-inner" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#fd6ea6] animate-pulse" : "text-gray-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. Operational Node Status & Exit */}
      <div className="flex flex-col space-y-4 pt-4 border-t border-white/5">
        
        {/* Status Telemetry Deck */}
        <div className="p-3.5 rounded-xl bg-[#09081a]/90 border border-[#fd6ea6]/10 text-[10px] font-mono shadow-sm">
          <div className="flex items-center gap-1.5 mb-2 text-gray-400 uppercase tracking-widest border-b border-white/5 pb-1">
            <Server className="w-3 h-3 text-[#ffb347]" />
            <span>QUANT TELEMETRY</span>
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-gray-500">ENGINE PORT</span>
            <span className="text-[#88f3ff] font-bold">8000</span>
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-gray-500">MODEL ACCURACY</span>
            <span className="text-[#ffb347] font-bold">82.11%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">FEED SHIELD</span>
            <span className="text-[#88f3ff] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#88f3ff] animate-ping" />
              ONLINE
            </span>
          </div>
        </div>

        <button
          onClick={onExit}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-[#fd6ea6]/10 text-xs font-mono uppercase tracking-wider text-[#fd6ea6] hover:text-[#ffffff] hover:bg-[#fd6ea6]/10 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Console</span>
        </button>
      </div>
    </aside>
  );
}
