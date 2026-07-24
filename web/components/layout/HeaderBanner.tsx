'use client';

import React from 'react';

export const HeaderBanner = React.memo(function HeaderBanner() {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs overflow-x-hidden">
      
      {/* Top 4px accent line */}
      <div className="h-1 w-full bg-[#82C91E]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* LEFT — Title & Subtitle */}
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#82C91E]" />
              <span className="text-sm font-black text-[#82C91E] uppercase tracking-wider">
                Raqamli Monitoring Platformasi
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Samarqand Shahri Qurilish Monitoringi
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
              Sun'iy yo'ldosh (Sentinel-1/2), InSAR radar va AI Computer Vision texnologiyalari yordamida Samarqand shahrining shaffof va real-vaqt rejimida shaharsozlik nazorati.
            </p>
          </div>

          {/* RIGHT — Clean Large Stats */}
          <div className="flex items-center space-x-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 shrink-0">
            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">Ob'ektlar</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">42+</p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">AI Aniqlik</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#82C91E] mt-1">94.2%</p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">Sentinel</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">154+</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});
