'use client';

import React from 'react';
import { ProjectData, EXECUTIVE_STATS } from '../../../data/samarqandProjects';
import { Building2, DollarSign, AlertOctagon, Activity, FileText, PieChart, BarChart3, ShieldCheck, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface AnalyticsModuleProps {
  projects: ProjectData[];
  onOpenPdfModal: () => void;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ projects, onOpenPdfModal }) => {
  return (
    <div className="space-y-6 text-[#0F172A]">
      
      {/* 1. SECTION HEADER VA SPACIOUS UI */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center space-x-2.5">
              <span>IJRO DASHBOARD & ANALITIKA</span>
              <span className="bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs">
                EXECUTIVE KPI & REPORT
              </span>
            </h2>
            <p className="text-sm text-slate-500 font-bold mt-1">
              Asosiy hokimiyat KPI ko'rsatkichlari, Sentinel progress solishtirmasi hamda YUNESKO bufer zonasi ogohlantirish paneli
            </p>
          </div>

          <button
            onClick={onOpenPdfModal}
            className="px-6 py-3 rounded-full text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
          >
            <FileText className="w-5 h-5 text-white" />
            <span>AI PDF Hisobot Generatsiyasi</span>
          </button>
        </div>

        {/* 2. EXECUTIVE KPI CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          {/* KPI 1: Ob'ektlar Soni */}
          <div className="relative p-5 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#82C91E]" />
              <span>Jami Ob'ektlar</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{EXECUTIVE_STATS.totalProjects} ta</span>
              <span className="text-xs font-extrabold text-[#65A30D] bg-[#F7FEE7] border border-[#82C91E]/30 px-2.5 py-0.5 rounded-full flex items-center shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% bu chorak
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-bold">Samarqand shahri va tumanlari bo'yicha</p>
          </div>

          {/* KPI 2: Red Flag Kechikish */}
          <div className="relative p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-700 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Red Flag (Kechikish)</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-700 tracking-tight">{EXECUTIVE_STATS.redFlagsCount} ta</span>
              <span className="text-xs font-extrabold text-rose-700 bg-white border border-rose-200 px-2.5 py-0.5 rounded-full shadow-xs">
                Kechikish Xavfi
              </span>
            </div>
            <p className="text-xs text-rose-600/90 mt-2 font-bold">AI Sentinel-2 tomondan aniqlangan</p>
          </div>

          {/* KPI 3: Kuzatilayotgan Byudjet */}
          <div className="relative p-5 rounded-3xl bg-[#F7FEE7] border border-[#82C91E]/40 text-[#65A30D] shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-2 text-[#65A30D] text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#82C91E]" />
              <span>Kuzatilayotgan Byudjet</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{EXECUTIVE_STATS.monitoredBudget}</span>
              <span className="text-xs font-extrabold text-[#65A30D] bg-white border border-[#82C91E]/30 px-2.5 py-0.5 rounded-full shadow-xs">
                100% Shaffof
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 font-bold">Davlat va investitsion loyihalar summasi</p>
          </div>

          {/* KPI 4: AI Model Aniqligi */}
          <div className="relative p-5 rounded-3xl bg-purple-50 border border-purple-200 text-purple-700 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center space-x-2 text-purple-600 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>AI Model Aniqligi</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-purple-800 tracking-tight">{EXECUTIVE_STATS.aiModelConfidence}</span>
              <span className="text-xs font-extrabold text-purple-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-full shadow-xs">
                YOLOv8 + InSAR
              </span>
            </div>
            <p className="text-xs text-purple-600/90 mt-2 font-bold">154 marta Sentinel yo'ldosh o'tishlari tahlili</p>
          </div>

        </div>
      </div>

      {/* 3. MAIN CHARTS & ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Planned vs AI Sentinel Progress Bars */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center space-x-2.5">
                <BarChart3 className="w-5 h-5 text-[#82C91E]" />
                <span>Rejadagi Progress va AI Sentinel Amaldagi Tahlil Solishtirmasi</span>
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Asosiy yirik qurilish ob'ektlari kesimida</p>
            </div>
            
            <button
              onClick={onOpenPdfModal}
              className="px-4 py-2 rounded-full text-xs font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Hisobot Olish</span>
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {projects.map((project) => {
              const diff = project.actualProgress - project.plannedProgress;
              return (
                <div key={project.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-extrabold text-[#0F172A]">{project.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        project.status === 'red_flag'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : project.status === 'unesco_warning'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40'
                      }`}>
                        {project.statusText}
                      </span>
                    </div>

                    <div className="font-mono text-xs sm:text-sm flex items-center space-x-3 font-extrabold">
                      <span className="text-slate-500">Reja: <strong className="text-slate-800">{project.plannedProgress}%</strong></span>
                      <span className="text-[#65A30D]">AI Amal: <strong className="text-[#65A30D]">{project.actualProgress}%</strong></span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                        diff < 0 ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40'
                      }`}>
                        {diff > 0 ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  </div>

                  {/* High Contrast Visual Dual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="relative w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 left-0 bg-slate-400 rounded-full"
                        style={{ width: `${project.plannedProgress}%` }}
                      />
                    </div>
                    <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-700 ${
                          diff < -5
                            ? 'bg-rose-500 shadow-sm'
                            : 'bg-[#82C91E] shadow-sm'
                        }`}
                        style={{ width: `${project.actualProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-0.5 font-bold">
                    <span>Pudratchi: {project.contractor}</span>
                    <span>AI Sur'at: {project.aiVelocity}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          
          {/* YUNESKO Bufer Zonasi Ogohlantirish Kartasi (Och sariq bg-amber-50 border-amber-200) */}
          <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>YUNESKO Bufer Zonasi Ogohlantirish Paneli</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed font-bold">
              Registon va Tarixiy Markaz atrofidagi 3 ta ob'ektda ruxsat berilgan 12m balandlik me'yori buzilishi Sentinel-2A yo'ldosh 3D modellashtirish orqali qayd etildi.
            </p>
            <div className="p-3 rounded-2xl bg-white border border-amber-200 text-xs font-mono font-black text-amber-900">
              Registonda joriy balandlik: 14.8m (Maksimal limit: 12m)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-[#82C91E]" />
              <span>Fuqarolar Murojaati va AI Klaster Tahlili</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-bold">Kelib tushgan murojaatlar:</span>
                <span className="text-sm font-extrabold text-[#0F172A] font-mono">{EXECUTIVE_STATS.totalCitizenReports} ta</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-bold">Hal qilingan murojaatlar:</span>
                <span className="text-sm font-extrabold text-[#65A30D] font-mono">{EXECUTIVE_STATS.resolvedIssues} ta (83.7%)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/40 flex items-center justify-between">
                <span className="text-xs text-[#65A30D] font-extrabold">AI Birlashtirgan Klasterlar:</span>
                <span className="text-sm font-extrabold text-[#65A30D] font-mono">14 ta Klaster</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-[#65A30D]">
                <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
                <span>Smart Geofence & EXIF Proof</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-bold">
                Tizim barcha foto signallarni GPS va EXIF vaqt tamg'asi bilan solishtirib, soxta fayllarni bloklaydi.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-3.5">
            <h4 className="text-base font-extrabold text-[#0F172A]">Shahar Hokimligi Rasmiy Hisobotini Yuklash</h4>
            <p className="text-xs text-slate-500 font-bold">
              Sentinel-2, InSAR Radar va Crowd-Sourcing ma'lumotlari asosida tayyorlangan rasmiy PDF hisoboti.
            </p>
            <button
              onClick={onOpenPdfModal}
              className="w-full py-3.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 cursor-pointer active:scale-95 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>AI PDF Hisobot Generatsiya Qilish</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
