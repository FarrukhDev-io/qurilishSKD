'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 px-4 py-6 sm:py-8 shadow-sm overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-5">
        
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            
            {/* Badges Row: Sentinel-2 Live Pulse & AI Model Confidence */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              {/* Sentinel-2 Live Pulse Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 text-xs font-extrabold text-[#82C91E] shadow-xs">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#82C91E]"></span>
                </span>
                <span>Sentinel-2 Live Synchronized</span>
              </div>

              {/* 94.2% AI Model Confidence Indicator */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-extrabold text-[#0F172A] shadow-xs">
                <Sparkles className="w-4 h-4 text-[#82C91E]" />
                <span>94.2% AI Model Confidence</span>
              </div>

              {/* Demo Keyboard Hotkeys Badge */}
              <div className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold shadow-sm">
                <span className="text-[#82C91E]">Hotkeys:</span>
                <span>[M] Xarita | [S] Slider | [C] Scanner | [A] Analytics</span>
              </div>

            </div>

            {/* Startup Base Hero Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              SAMARQAND QURILISH MONITORINGI{' '}
              <span className="inline-block bg-[#95E616] text-[#0F172A] px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-2xl shadow-sm transform -rotate-1 hover:rotate-0 transition-transform">
                SINGLE DIGITAL PLATFORM
              </span>
            </h2>

            <p className="text-xs sm:text-base text-[#64748B] font-medium leading-relaxed max-w-3xl">
              Sun'iy yo'ldosh (Sentinel-1/2), InSAR radar hamda AI Computer Vision orqali Samarqand shahri va tumanlaridagi 42+ ta qurilish va infratuzilma loyihalarining shaffof va zamonaviy nazorati.
            </p>
          </div>

          {/* Quick Executive Metrics Card */}
          <div className="w-full lg:w-auto bg-[#F8FAFC] p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-3 gap-2 sm:flex sm:items-center sm:space-x-5 text-center">
            <div className="px-1 sm:px-3">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">AI Aniqligi</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#82C91E] mt-0.5">94.2%</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-200"></div>
            <div className="px-1 sm:px-3">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Ob'ektlar Soni</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-0.5">42+ ta</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-slate-200"></div>
            <div className="px-1 sm:px-3">
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Sentinel Pass</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#82C91E] mt-0.5">154+</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
