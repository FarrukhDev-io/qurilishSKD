'use client';

import React from 'react';
import { Satellite, FileText, AlertTriangle, UserCheck, Building2, Users, Map, Sliders, Camera, BarChart3 } from 'lucide-react';
import { TabType } from '../../app/page';

export interface NavbarProps {
  activeRole: 'hokimiyat' | 'fuqaro' | 'pudratchi';
  setActiveRole: (role: 'hokimiyat' | 'fuqaro' | 'pudratchi') => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenReportModal: () => void;
  onOpenPdfModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenPdfModal,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================================================== */}
        {/* TIER 1: UPPER BRAND & PRIMARY ACTIONS HEADER         */}
        {/* ==================================================== */}
        <div className="flex items-center justify-between py-4 border-b border-slate-100">
          
          {/* Left: Yirik SKDqurilish Brendi va Samarqand Pill Badge */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-[#82C91E] flex items-center justify-center shadow-md shadow-[#82C91E]/30 transition-transform hover:scale-105">
              <Satellite className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A]">
                  SKD<span className="text-[#82C91E]">qurilish</span>
                </h1>
                <span className="px-3 py-1 text-xs font-black uppercase bg-[#95E616] text-[#0F172A] rounded-full tracking-wider shadow-xs">
                  Samarqand
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
                Samarkand GovTech & AI Satellite Monitoring Platform
              </p>
            </div>
          </div>

          {/* Right: Asosiy Action Tugmalari va Compact Rol Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Role Switcher Pill */}
            <div className="hidden xl:flex items-center bg-slate-100 p-1.5 rounded-full border border-slate-200">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeRole === 'hokimiyat'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Hokimiyat</span>
              </button>

              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeRole === 'fuqaro'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Fuqarolar</span>
              </button>

              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeRole === 'pudratchi'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Pudratchi</span>
              </button>
            </div>

            {/* Action Button 1: Muammo Bildirish */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span className="hidden sm:inline">Muammo Bildirish</span>
            </button>

            {/* Action Button 2: AI PDF Hisobot */}
            <button
              onClick={onOpenPdfModal}
              className="flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              <span>AI PDF Hisobot</span>
            </button>

          </div>

        </div>

        {/* ==================================================== */}
        {/* TIER 2: LOWER NAVIGATION BAR (Spacious Module Tabs)  */}
        {/* ==================================================== */}
        <div className="py-3 flex items-center justify-center sm:justify-start overflow-x-auto no-scrollbar">
          <nav className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner max-w-full">
            
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Map className="w-5 h-5" />
              <span>Modul 1: GIS Xarita & Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('slider')}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>Modul 2: Before/After Yo'ldosh Slider</span>
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>Modul 3: Fuqarolar Nazorati</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Modul 4: Executive Analitika</span>
            </button>

          </nav>
        </div>

      </div>
    </header>
  );
};
