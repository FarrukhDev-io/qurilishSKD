'use client';

import React from 'react';
import { Satellite, Cpu, Keyboard, Building2, TrendingUp, Radio } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 overflow-x-hidden">

      {/* Lime accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#82C91E] via-[#95E616] to-[#65A30D]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">

          {/* ── LEFT CONTENT ───────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Sentinel live */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/40 text-xs font-extrabold text-[#65A30D] shadow-xs">
                <Satellite className="w-3.5 h-3.5 shrink-0" />
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82C91E]" />
                </span>
                Sentinel-2 Live Synchronized
              </div>

              {/* AI confidence */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-extrabold text-[#0F172A]">
                <Cpu className="w-3.5 h-3.5 text-[#82C91E] shrink-0" />
                94.2% AI Model Confidence
              </div>

              {/* Hotkeys */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-mono font-bold">
                <Keyboard className="w-3.5 h-3.5 text-[#82C91E] shrink-0" />
                <span>
                  <span className="text-[#82C91E] font-black">M</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">S</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">C</span>
                  <span className="text-slate-500 mx-1">·</span>
                  <span className="text-[#82C91E] font-black">A</span>
                  <span className="text-slate-400 ml-2">modul almashtirgich</span>
                </span>
              </div>
            </div>

            {/* Hero title */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Samarqand Shahri · Qurilish Nazorat Tizimi
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                SAMARQAND
                <br />
                QURILISH MONITORINGI{' '}
                <span className="inline-block bg-[#95E616] text-[#0F172A] px-4 py-1 rounded-2xl text-2xl sm:text-3xl lg:text-4xl shadow-xs transform -rotate-1 hover:rotate-0 transition-transform mt-1">
                  SINGLE DIGITAL PLATFORM
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
                <span className="font-bold text-[#0F172A]">Sentinel-1/2</span> sun'iy yo'ldosh,{' '}
                <span className="font-bold text-[#0F172A]">InSAR</span> radar va{' '}
                <span className="font-bold text-[#82C91E]">AI Computer Vision</span> orqali
                Samarqand shahridagi{' '}
                <span className="font-bold text-[#0F172A]">42+ ta</span> qurilish va infratuzilma
                loyihalarining real-vaqt shaffof nazorati.
              </p>
            </div>

          </div>

          {/* ── RIGHT KPI PANEL ──────────────────────────────────────── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">

              {/* Card header */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 bg-slate-50">
                <div className="w-8 h-8 rounded-lg bg-[#F7FEE7] border border-[#82C91E]/30 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[#82C91E]" />
                </div>
                <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                  Jonli Ko'rsatkichlar
                </span>
              </div>

              {/* KPI grid */}
              <div className="grid grid-cols-3 divide-x divide-slate-100">

                <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">AI Aniqligi</p>
                  <p className="text-3xl font-extrabold text-[#82C91E] mt-2 leading-none">94.2%</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <TrendingUp className="w-3 h-3 text-[#82C91E]" />
                    <span className="text-[10px] font-bold text-[#82C91E]">+2.1%</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">Faol Ob'ektlar</p>
                  <p className="text-3xl font-extrabold text-[#0F172A] mt-2 leading-none">42+</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400">Samarqand</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider leading-tight">Sentinel Pass</p>
                  <p className="text-3xl font-extrabold text-[#82C91E] mt-2 leading-none">154+</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Radio className="w-3 h-3 text-[#82C91E]" />
                    <span className="text-[10px] font-bold text-[#82C91E]">InSAR</span>
                  </div>
                </div>

              </div>

              {/* Live indicator */}
              <div className="flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#F7FEE7] border-t border-[#82C91E]/15">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82C91E]" />
                </span>
                <span className="text-[11px] font-bold text-[#65A30D] tracking-wide">
                  Real-vaqt rejimida yangilanmoqda
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
