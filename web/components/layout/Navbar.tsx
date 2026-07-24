'use client';

import React from 'react';
import { Satellite, FileText, AlertTriangle, UserCheck, Building2, Users, LogIn, Map, Sliders, Camera, BarChart3 } from 'lucide-react';
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
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Chap tomonda: Logo va Samarqand Pill Badge */}
          <div className="flex items-center space-x-3.5 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-[#82C91E] flex items-center justify-center shadow-md shadow-[#82C91E]/30 transition-transform hover:scale-105">
              <Satellite className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                  SKD<span className="text-[#82C91E]">qurilish</span>
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#95E616] text-[#0F172A] rounded-full tracking-wider shadow-sm">
                  Samarqand
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Samarkand GovTech & AI Satellite Platform
              </p>
            </div>
          </div>

          {/* 2. Markazda: 4 ta modul uchun toza navigatsiya havolalari */}
          <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>GIS Xarita</span>
            </button>

            <button
              onClick={() => setActiveTab('slider')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Yo'ldosh Slider</span>
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Fuqarolar Nazorati</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-[#ffffff] shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analitika</span>
            </button>
          </nav>

          {/* 3. O'ng tomonda: Rol Almashtirgich Pill, Action Button & Login */}
          <div className="flex items-center space-x-2.5">
            
            {/* Compact Role Switcher Pill */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                title="Hokimiyat & Inspeksiya"
                className={`p-2 rounded-full text-xs font-extrabold transition-all ${
                  activeRole === 'hokimiyat'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                title="Fuqarolar Portali"
                className={`p-2 rounded-full text-xs font-extrabold transition-all ${
                  activeRole === 'fuqaro'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                title="Pudratchi Kabineti"
                className={`p-2 rounded-full text-xs font-extrabold transition-all ${
                  activeRole === 'pudratchi'
                    ? 'bg-[#82C91E] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onOpenReportModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden md:inline">Muammo Bildirish</span>
            </button>

            <button
              onClick={onOpenPdfModal}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI PDF Hisobot</span>
            </button>

            <button
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#82C91E]" />
              <span>Kirish</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
