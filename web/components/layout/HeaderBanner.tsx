'use client';

import React from 'react';
import { Satellite, Cpu, Keyboard, Building2 } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm overflow-x-hidden">

      {/* 1. TOP ACCENT STRIP — 4px Lime Gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-[#82C91E] via-[#95E616] to-[#65A30D]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">

          {/* LEFT — Badges + Hero Title + Description */}
          <div className="space-y-4 flex-1 min-w-0">

            {/* 2. BADGE ROW */}
            <div className="flex flex-wrap items-center gap-2.5">

              {/* Badge 1 — Sentinel Live (animated pulse) */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 text-xs font-extrabold text-[#82C91E] shadow-xs">
                <Satellite className="w-4 h-4 text-[#82C91E] shrink-0" />
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82C91E]"></span>
                </span>
                <span>Sentinel-2 Live Synchronized</span>
              </div>

              {/* Badge 2 — AI Confidence */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-extrabold text-[#0F172A] shadow-xs">
                <Cpu className="w-4 h-4 text-[#82C91E] shrink-0" />
                <span>94.2% AI Model Confidence</span>
              </div>

              {/* Badge 3 — Hotkeys (sm+ only) */}
              <div className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold shadow-sm">
                <Keyboard className="w-4 h-4 text-[#82C91E] shrink-0" />
                <span>
                  <span className="text-[#82C91E] font-black">M</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">S</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">C</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">A</span>
                  <span className="text-slate-400 ml-1.5">modul almashtirgich</span>
                </span>
              </div>

            </div>

            {/* 3. HERO TITLE BLOCK */}
            <div className="space-y-2">

              {/* Breadcrumb */}
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Samarqand Shahri &bull; Qurilish Nazorat Tizimi
              </p>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                SAMARQAND QURILISH MONITORINGI{' '}
                <span className="inline-block bg-[#95E616] text-[#0F172A] px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-xl text-lg sm:text-2xl lg:text-3xl shadow-xs transform -rotate-1 hover:rotate-0 transition-transform">
                  SINGLE DIGITAL PLATFORM
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                <span className="font-bold text-[#0F172A]">Sentinel-1/2</span> sun'iy yo'ldosh,{' '}
                <span className="font-bold text-[#0F172A]">InSAR</span> radar va{' '}
                <span className="font-bold text-[#82C91E]">AI Computer Vision</span> orqali
                Samarqand shahridagi{' '}
                <span className="font-bold text-[#0F172A]">42+ ta</span> qurilish va infratuzilma
                loyihalarining real-vaqt shaffof nazorati.
              </p>

            </div>
          </div>

          {/* 4. RIGHT — KPI CARD (lg:w-72) */}
          <div className="w-full lg:w-72 shrink-0 bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Card Header */}
            <div className="flex items-center space-x-2.5 px-5 py-3.5 border-b border-slate-200 bg-white">
              <Building2 className="w-4 h-4 text-[#82C91E] shrink-0" />
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Jonli Ko'rsatkichlar
              </span>
            </div>

            {/* KPI Grid — 3 columns with dividers */}
            <div className="grid grid-cols-3 divide-x divide-slate-200 px-0">

              <div className="flex flex-col items-center justify-center py-5 px-3 text-center">
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">AI Aniqligi</p>
                <p className="text-2xl font-extrabold text-[#82C91E] mt-1.5 leading-none">94.2%</p>
              </div>

              <div className="flex flex-col items-center justify-center py-5 px-3 text-center">
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">Faol Ob'ektlar</p>
                <p className="text-2xl font-extrabold text-[#0F172A] mt-1.5 leading-none">42+</p>
              </div>

              <div className="flex flex-col items-center justify-center py-5 px-3 text-center">
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">Sentinel Pass</p>
                <p className="text-2xl font-extrabold text-[#82C91E] mt-1.5 leading-none">154+</p>
              </div>

            </div>

            {/* Card Footer — Live update indicator */}
            <div className="flex items-center justify-center space-x-2 px-5 py-3 bg-[#F7FEE7] border-t border-[#82C91E]/20">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82C91E]"></span>
              </span>
              <span className="text-[10px] font-bold text-[#82C91E] tracking-wide">
                Real-vaqt rejimida yangilanmoqda
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
