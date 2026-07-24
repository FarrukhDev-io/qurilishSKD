'use client';

import React from 'react';
import { ProjectData, EXECUTIVE_STATS } from '../../../data/samarqandProjects';
import {
  Building2, DollarSign, AlertOctagon, Activity, FileText,
  ShieldCheck, ArrowUpRight, ShieldAlert, CheckCircle2,
  TrendingDown, TrendingUp, BarChart3, AlertCircle, PieChart
} from 'lucide-react';

interface AnalyticsModuleProps {
  projects: ProjectData[];
  onOpenPdfModal: () => void;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ projects, onOpenPdfModal }) => {
  const maxProgress = 100;

  return (
    <div className="space-y-6 text-[#0F172A]">

      {/* ── SECTION HEADER ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/30 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-[#82C91E]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] leading-tight">IJRO DASHBOARD & ANALITIKA</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">KPI ko'rsatkichlari · Sentinel progress · UNESCO ogohlantirishlari</p>
            </div>
            <span className="hidden sm:block bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide">
              EXECUTIVE KPI
            </span>
          </div>
          <button
            onClick={onOpenPdfModal}
            className="px-6 py-3 rounded-xl text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer min-h-[44px] shrink-0"
          >
            <FileText className="w-4 h-4" />
            AI PDF Hisobot
          </button>
        </div>

        {/* ── KPI CARDS ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">

          {/* KPI 1 */}
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-[#82C91E]" />
              </div>
              Jami Ob'ektlar
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight leading-none">
                {EXECUTIVE_STATS.totalProjects}
              </span>
              <span className="text-xs font-extrabold text-[#82C91E] bg-[#F7FEE7] border border-[#82C91E]/30 px-2.5 py-1 rounded-lg flex items-center gap-1 mb-0.5">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">Samarqand shahri va tumanlari bo'yicha</p>
          </div>

          {/* KPI 2 */}
          <div className="p-6 bg-rose-50/50">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-4">
              <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
              </div>
              Red Flag (Kechikish)
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-4xl font-extrabold text-rose-700 tracking-tight leading-none">
                {EXECUTIVE_STATS.redFlagsCount}
              </span>
              <span className="text-xs font-extrabold text-rose-700 bg-white border border-rose-200 px-2.5 py-1 rounded-lg mb-0.5">
                Xavf Darajasi
              </span>
            </div>
            <p className="text-xs text-rose-600/80 font-medium mt-2">AI Sentinel-2 tomondan aniqlangan</p>
          </div>

          {/* KPI 3 */}
          <div className="p-6 bg-[#F7FEE7]/50">
            <div className="flex items-center gap-2 text-xs font-bold text-[#65A30D] uppercase tracking-wider mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#F7FEE7] flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-[#82C91E]" />
              </div>
              Kuzatilayotgan Byudjet
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight leading-none">
                {EXECUTIVE_STATS.monitoredBudget}
              </span>
              <span className="text-xs font-extrabold text-[#82C91E] bg-white border border-[#82C91E]/30 px-2.5 py-1 rounded-lg mb-0.5">
                100% Shaffof
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">Davlat va investitsion loyihalar</p>
          </div>

          {/* KPI 4 */}
          <div className="p-6 bg-purple-50/50">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-4">
              <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-purple-600" />
              </div>
              AI Model Aniqligi
            </div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-4xl font-extrabold text-purple-800 tracking-tight leading-none">
                {EXECUTIVE_STATS.aiModelConfidence}
              </span>
              <span className="text-xs font-extrabold text-purple-700 bg-white border border-purple-200 px-2.5 py-1 rounded-lg mb-0.5">
                YOLOv8
              </span>
            </div>
            <p className="text-xs text-purple-600/80 font-medium mt-2">154 marta Sentinel o'tishi tahlili</p>
          </div>

        </div>
      </div>

      {/* ── MAIN GRID ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ── LEFT: Progress Chart (3/5 width on xl) ── */}
        <div className="xl:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2.5">
                <BarChart3 className="w-4.5 h-4.5 text-[#82C91E]" />
                Reja vs AI Sentinel Amaldagi Progress
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Asosiy yirik qurilish ob'ektlari kesimida</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold shrink-0">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-sm bg-slate-300 shrink-0" /> Reja
              </span>
              <span className="flex items-center gap-1.5 text-[#82C91E]">
                <span className="w-3 h-3 rounded-sm bg-[#82C91E] shrink-0" /> AI Amal
              </span>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {projects.slice(0, 8).map((project) => {
              const diff = project.actualProgress - project.plannedProgress;
              const isRed = project.status === 'red_flag';
              const isUNESCO = project.status === 'unesco_warning';
              return (
                <div key={project.id} className="space-y-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        isRed ? 'bg-rose-500' : isUNESCO ? 'bg-amber-400' : 'bg-[#82C91E]'
                      }`} />
                      <span className="text-sm font-bold text-[#0F172A] truncate">{project.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 font-mono">Reja: <strong className="text-slate-700">{project.plannedProgress}%</strong></span>
                      <span className={`text-xs font-mono font-extrabold ${isRed ? 'text-rose-600' : 'text-[#82C91E]'}`}>
                        AI: {project.actualProgress}%
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-black font-mono ${
                        diff < 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/30'
                      }`}>
                        {diff > 0 ? `+${diff}` : diff}%
                      </span>
                    </div>
                  </div>

                  {/* Dual bar */}
                  <div className="space-y-1.5 pl-4.5">
                    <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-slate-300 rounded-full transition-all duration-500"
                        style={{ width: `${project.plannedProgress}%` }}
                      />
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${
                          isRed ? 'bg-rose-500' : 'bg-[#82C91E]'
                        }`}
                        style={{ width: `${project.actualProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>Pudratchi: {project.contractor}</span>
                      <span>AI Sur'at: {project.aiVelocity}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN (2/5 width on xl) ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Status breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <PieChart className="w-4 h-4 text-[#82C91E]" />
              <h3 className="text-sm font-extrabold text-[#0F172A]">Status Taqsimoti</h3>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Rejada", count: projects.filter(p => p.status === 'on_schedule').length, total: projects.length, color: 'bg-[#82C91E]', textColor: 'text-[#65A30D]', bgColor: 'bg-[#F7FEE7]', icon: <CheckCircle2 className="w-4 h-4 text-[#82C91E]" /> },
                { label: "Red Flag", count: projects.filter(p => p.status === 'red_flag').length, total: projects.length, color: 'bg-rose-500', textColor: 'text-rose-700', bgColor: 'bg-rose-50', icon: <AlertCircle className="w-4 h-4 text-rose-500" /> },
                { label: "UNESCO Zona", count: projects.filter(p => p.status === 'unesco_warning').length, total: projects.length, color: 'bg-amber-400', textColor: 'text-amber-700', bgColor: 'bg-amber-50', icon: <ShieldAlert className="w-4 h-4 text-amber-500" /> },
              ].map((item) => {
                const pct = Math.round((item.count / item.total) * 100);
                return (
                  <div key={item.label} className={`p-3.5 rounded-2xl ${item.bgColor} space-y-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <span className={`text-sm font-extrabold font-mono ${item.textColor}`}>{item.count} ta ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UNESCO alert */}
          <div className="bg-amber-50 rounded-3xl border border-amber-200 overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-amber-200/60">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <h3 className="text-sm font-extrabold text-amber-900">UNESCO Bufer Zonasi Ogoh.</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                Registon va Tarixiy Markaz atrofidagi 3 ta ob'ektda ruxsat berilgan <strong>12m balandlik me'yori</strong> buzilishi Sentinel-2A orqali qayd etildi.
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-amber-200 font-mono text-xs font-extrabold text-amber-900 flex items-center justify-between">
                <span>Registon joriy balandligi:</span>
                <span className="text-rose-700">14.8m <span className="text-amber-600">(limit: 12m)</span></span>
              </div>
            </div>
          </div>

          {/* Citizen reports */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
              <h3 className="text-sm font-extrabold text-[#0F172A]">Fuqarolar Murojaati</h3>
            </div>
            <div className="p-5 space-y-2.5">
              {[
                { label: 'Kelib tushgan:', value: `${EXECUTIVE_STATS.totalCitizenReports} ta`, color: 'text-[#0F172A]' },
                { label: 'Hal qilingan:', value: `${EXECUTIVE_STATS.resolvedIssues} ta (83.7%)`, color: 'text-[#82C91E]' },
                { label: 'AI Klasterlar:', value: '14 ta Klaster', color: 'text-[#82C91E]' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-600 font-semibold">{row.label}</span>
                  <span className={`text-sm font-extrabold font-mono ${row.color}`}>{row.value}</span>
                </div>
              ))}
              <p className="text-xs text-slate-500 leading-relaxed pt-1 font-medium">
                Tizim barcha foto signallarni GPS va EXIF vaqt tamg'asi bilan solishtiradi.
              </p>
            </div>
          </div>

          {/* PDF button */}
          <div className="bg-[#F7FEE7] rounded-3xl border border-[#82C91E]/30 p-5 space-y-3.5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#82C91E] flex items-center justify-center mx-auto shadow-md shadow-[#82C91E]/30">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F172A]">Rasmiy Hisobot</h4>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                Sentinel-2, InSAR va Crowd-Sourcing ma'lumotlari asosida PDF hisobot
              </p>
            </div>
            <button
              onClick={onOpenPdfModal}
              className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 cursor-pointer active:scale-95 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              AI PDF Generatsiya Qilish
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
