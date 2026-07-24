'use client';

import React from 'react';
import { ProjectData, EXECUTIVE_STATS } from '../../../data/samarqandProjects';
import { Building2, DollarSign, AlertOctagon, Activity, FileText, PieChart, BarChart3, ShieldAlert } from 'lucide-react';

interface AnalyticsModuleProps {
  projects: ProjectData[];
  onOpenPdfModal: () => void;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ projects, onOpenPdfModal }) => {
  return (
    <div className="space-y-6 text-[#0F172A] overflow-x-hidden">
      
      {/* 1. CLEAN SECTION HEADER */}
      <div className="p-4 sm:p-6 card-3d space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center space-x-2.5">
              <span>IJRO ANALITIKASI VA DASHBOARD</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              Samarqand shahri qurilish ob'ektlari va Sentinel yo'ldosh monitoringi ko'rsatkichlari
            </p>
          </div>

          <button
            onClick={onOpenPdfModal}
            className="px-6 py-3 btn-3d-lime text-xs sm:text-sm font-extrabold text-white flex items-center justify-center space-x-2 cursor-pointer min-h-[44px] shrink-0"
          >
            <FileText className="w-4.5 h-4.5 text-white" />
            <span>AI PDF Hisobot</span>
          </button>
        </div>

        {/* 2. CLEAN KPI CARDS GRID (NO OVER-INFORMING SUBTEXTS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          
          {/* KPI 1 */}
          <div className="p-4.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-[#82C91E]" />
              <span>Jami Ob'ektlar</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{EXECUTIVE_STATS.totalProjects} ta</span>
              <span className="text-xs font-extrabold text-[#82C91E] bg-[#F7FEE7] px-2.5 py-0.5 rounded-full border border-[#82C91E]/30">
                +12%
              </span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-4.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2 text-rose-700">
            <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Kechikish (Red Flag)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-700">{EXECUTIVE_STATS.redFlagsCount} ta</span>
              <span className="text-xs font-extrabold text-rose-700 bg-white px-2.5 py-0.5 rounded-full border border-rose-200">
                Xavf
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-4.5 rounded-2xl bg-[#F7FEE7]/70 border border-[#82C91E]/30 space-y-2">
            <div className="flex items-center space-x-2 text-[#82C91E] text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#82C91E]" />
              <span>Jami Byudjet</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">{EXECUTIVE_STATS.monitoredBudget}</span>
              <span className="text-xs font-extrabold text-[#82C91E] bg-white px-2.5 py-0.5 rounded-full border border-[#82C91E]/30">
                Shaffof
              </span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-4.5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2 text-purple-700">
            <div className="flex items-center space-x-2 text-purple-600 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>AI Model Aniqligi</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-800">{EXECUTIVE_STATS.aiModelConfidence}</span>
              <span className="text-xs font-extrabold text-purple-700 bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                YOLOv8
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MAIN CHARTS & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Comparison */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-5">
          <div className="border-b border-slate-200/80 pb-3.5">
            <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-[#82C91E] shrink-0" />
              <span>Reja va AI Progress Solishtirmasi</span>
            </h3>
          </div>

          <div className="space-y-4">
            {projects.map((project) => {
              const diff = project.actualProgress - project.plannedProgress;
              return (
                <div key={project.id} className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-2">
                  
                  {/* Title & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      <span className="font-extrabold text-[#0F172A]">{project.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                        project.status === 'red_flag'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : project.status === 'unesco_warning'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/30'
                      }`}>
                        {project.statusText}
                      </span>
                    </div>

                    <div className="font-mono text-xs flex items-center space-x-2.5 font-extrabold justify-between sm:justify-end">
                      <span className="text-slate-500">Reja: <strong className="text-slate-800">{project.plannedProgress}%</strong></span>
                      <span className="text-[#82C91E]">AI: <strong>{project.actualProgress}%</strong></span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                        diff < 0 ? 'bg-rose-100 text-rose-700' : 'bg-[#F7FEE7] text-[#82C91E]'
                      }`}>
                        {diff > 0 ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  </div>

                  {/* Dual Progress Bar */}
                  <div className="space-y-1">
                    <div className="relative w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-0 bg-slate-400 rounded-full" style={{ width: `${project.plannedProgress}%` }} />
                      <div
                        className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${
                          diff < -5 ? 'bg-rose-500' : 'bg-[#82C91E]'
                        }`}
                        style={{ width: `${project.actualProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-0.5 font-bold">
                    <span>Pudratchi: {project.contractor}</span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Side Panel: 2 Clean Cards (No Duplicate Buttons or Over-information) */}
        <div className="space-y-5">
          
          {/* Card 1: UNESCO Ogohlantirish Paneli */}
          <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200/90 text-amber-900 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-extrabold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              <span>YUNESKO Bufer Zonasi</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed font-semibold">
              Registon va Tarixiy Markaz atrofidagi ob'ektlarda ruxsat berilgan 12m balandlik me'yori oshishi yo'ldosh orqali qayd etildi.
            </p>
            <div className="p-3 rounded-2xl bg-white border border-amber-200/90 text-xs font-mono font-black text-amber-900 flex items-center justify-between">
              <span>Registonda balandlik:</span>
              <span className="text-rose-700">14.8m (Limit: 12m)</span>
            </div>
          </div>

          {/* Card 2: Fuqarolar Murojaati & AI Klasterlar */}
          <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-[#82C91E] shrink-0" />
              <span>Fuqarolar Murojaati Tahlili</span>
            </h3>

            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-bold">Kelib tushgan murojaatlar:</span>
                <span className="font-extrabold text-[#0F172A] font-mono text-sm">{EXECUTIVE_STATS.totalCitizenReports} ta</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-bold">Hal qilingan:</span>
                <span className="font-extrabold text-[#82C91E] font-mono text-sm">{EXECUTIVE_STATS.resolvedIssues} ta (83.7%)</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/30 flex items-center justify-between text-xs">
                <span className="text-[#82C91E] font-extrabold">AI Klasterlar:</span>
                <span className="font-extrabold text-[#82C91E] font-mono text-sm">14 ta Klaster</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
