'use client';

import React from 'react';
import { Building2, Activity, CheckCircle2 } from 'lucide-react';

export const HeaderBanner = React.memo(function HeaderBanner() {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs overflow-x-hidden">
      
      {/* Top 3px accent line */}
      <div className="h-1 w-full bg-[#82C91E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* LEFT — Title & Subtitle */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#82C91E]" />
              <span className="text-xs font-extrabold text-[#82C91E] uppercase tracking-wider">
                Raqamli Monitoring Platformasi
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Samarqand Shahri Qurilish Monitoringi
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Sun'iy yo'ldosh (Sentinel-1/2), InSAR radar va AI Computer Vision texnologiyalari yordamida Samarqand shahrining shaffof va real-vaqt rejimida shaharsozlik nazorati.
            </p>
          </div>

          {/* RIGHT — Clean Minimal Stats */}
          <div className="flex items-center space-x-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shrink-0">
            <div className="text-center px-3">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ob'ektlar</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#0F172A] mt-0.5">42+</p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Aniqlik</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#82C91E] mt-0.5">94.2%</p>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sentinel</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#0F172A] mt-0.5">154+</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});
