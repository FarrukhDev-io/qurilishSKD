'use client';

import React from 'react';
import { Satellite, FileText, AlertTriangle } from 'lucide-react';
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
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* 1. Chap tomonda: Yirik SKDqurilish Logo va Samarqand Pill Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-[#82C91E] flex items-center justify-center shadow-md shadow-[#82C91E]/30 transition-transform hover:scale-105">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
                SKD<span className="text-[#82C91E]">qurilish</span>
              </h1>
              <span className="px-3 py-1 text-xs font-black uppercase bg-[#95E616] text-[#0F172A] rounded-full tracking-wider shadow-xs">
                Samarqand
              </span>
            </div>
          </div>

          {/* 2. Markazda: 4 ta toza, yirik va o'qilishi oson navigatsiya havolasi */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              GIS Xarita
            </button>

            <button
              onClick={() => setActiveTab('slider')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Yo'ldosh Slider
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Fuqarolar Nazorati
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Analitika
            </button>
          </nav>

          {/* 3. O'ng tomonda: Ixcham rol almashtirgich va AI PDF Hisobot tugmasi */}
          <div className="flex items-center space-x-3 shrink-0">
            
            {/* Compact Role Switcher Capsule Pill */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeRole === 'hokimiyat'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hokimiyat
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeRole === 'fuqaro'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fuqaro
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeRole === 'pudratchi'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pudratchi
              </button>
            </div>

            {/* Muammo Bildirish Button */}
            <button
              onClick={onOpenReportModal}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Muammo Bildirish</span>
            </button>

            {/* Yagona AI PDF Hisobot Button */}
            <button
              onClick={onOpenPdfModal}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>AI PDF Hisobot</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
