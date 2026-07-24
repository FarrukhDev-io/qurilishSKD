'use client';

import React, { useState } from 'react';
import { Satellite, FileText, AlertTriangle, Menu, X, Map, Sliders, Camera, BarChart3, Shield, Users, HardHat } from 'lucide-react';
import { TabType } from '../../app/page';

export interface NavbarProps {
  activeRole: 'hokimiyat' | 'fuqaro' | 'pudratchi';
  setActiveRole: (role: 'hokimiyat' | 'fuqaro' | 'pudratchi') => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenReportModal: () => void;
  onOpenPdfModal: () => void;
}

export const Navbar = React.memo(function Navbar({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onOpenPdfModal,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* 1. Chap tomonda: Yirik QurilishSKD Logo va Samarqand Pill Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#82C91E] flex items-center justify-center border border-white/40 shadow-[0_6px_14px_rgba(130,201,30,0.35)] transition-all btn-3d-lime shrink-0">
              <Satellite className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-[#0F172A] whitespace-nowrap" aria-label="Qurilish SKD - Samarqand Qurilish Monitoring Platformasi">
                Qurilish<span className="text-[#82C91E]"> SKD</span>
              </div>
              <span className="hidden min-[420px]:inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-black uppercase bg-[#95E616] text-[#0F172A] rounded-full tracking-wider shadow-xs border border-white/50 shrink-0">
                Samarqand
              </span>
            </div>
          </div>

          {/* 2. Markazda (Desktop >= lg): 4 ta toza 3D navigatsiya havolasi */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 slot-3d-inset p-1 sm:p-1.5 shrink-0">
            {([
              { id: 'map' as const, label: 'GIS Xarita', shortLabel: 'Xarita' },
              { id: 'slider' as const, label: "Yo'ldosh Slider", shortLabel: 'Slider' },
              { id: 'crowd' as const, label: 'Fuqarolar Nazorati', shortLabel: 'Fuqaro Nazorati' },
              { id: 'analytics' as const, label: 'Analitika', shortLabel: 'Analitika' },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] ${
                  activeTab === tab.id
                    ? 'pill-3d-active'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <span className="hidden xl:inline">{tab.label}</span>
                <span className="xl:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>

          {/* 3. O'ng tomonda: Actions & Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* 3D Tactile Role Switcher (Desktop >= xl) */}
            <div className="hidden xl:flex items-center slot-3d-inset p-1 text-xs font-extrabold gap-0.5 shrink-0">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'hokimiyat'
                    ? 'pill-3d-active'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hokimiyat
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'fuqaro'
                    ? 'pill-3d-active'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fuqaro
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'pudratchi'
                    ? 'pill-3d-active'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pudratchi
              </button>
            </div>

            {/* 3D Muammo Bildirish Button (Desktop >= 2xl full, lg-xl icon only) */}
            <button
              onClick={onOpenReportModal}
              title="Muammo Bildirish"
              className="hidden lg:flex items-center space-x-1.5 px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs cursor-pointer min-h-[40px] shrink-0"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="hidden 2xl:inline">Muammo Bildirish</span>
            </button>

            {/* 3D Tactile AI PDF Hisobot Button (>= md) */}
            <button
              onClick={onOpenPdfModal}
              className="hidden md:flex items-center space-x-1.5 px-3.5 sm:px-4 xl:px-5 py-2 xl:py-2.5 btn-3d-lime text-xs xl:text-sm font-extrabold cursor-pointer min-h-[40px] shrink-0 whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-white shrink-0" />
              <span>AI PDF Hisobot</span>
            </button>

            {/* 📱 MOBILE & TABLET HAMBURGER MENU TOGGLE BUTTON (< lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#0F172A] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#0F172A]" /> : <Menu className="w-5 h-5 text-[#0F172A]" />}
            </button>

          </div>

        </div>
      </div>

      {/* 📱 MOBILE & TABLET DRAWER MENU OVERLAY (< lg) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-5 space-y-4 animate-fadeIn shadow-xl max-h-[85vh] overflow-y-auto custom-scrollbar">
          
          {/* Module Navigation Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs badge-micro font-black text-slate-400 px-2 tracking-wider">Modullarga O'tish</span>

            <button
              onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-extrabold min-h-[44px] transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Map className="w-5 h-5 shrink-0" />
              <span>Modul 1: GIS Xarita & Radar</span>
            </button>

            <button
              onClick={() => { setActiveTab('slider'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-extrabold min-h-[44px] transition-all cursor-pointer ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-5 h-5 shrink-0" />
              <span>Modul 2: Before/After Yo'ldosh Slider</span>
            </button>

            <button
              onClick={() => { setActiveTab('crowd'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-extrabold min-h-[44px] transition-all cursor-pointer ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Camera className="w-5 h-5 shrink-0" />
              <span>Modul 3: Fuqarolar Nazorati</span>
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-extrabold min-h-[44px] transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-5 h-5 shrink-0" />
              <span>Modul 4: Executive Analitika</span>
            </button>
          </div>

          {/* Role Switcher Pills in Mobile Menu */}
          <div className="space-y-2 pt-3 border-t border-slate-200">
            <span className="text-xs badge-micro font-black text-slate-400 px-2 tracking-wider">Foydalanuvchi Roli</span>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center space-x-1 ${
                  activeRole === 'hokimiyat' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span>Hokimiyat</span>
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center space-x-1 ${
                  activeRole === 'fuqaro' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>Fuqaro</span>
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center space-x-1 ${
                  activeRole === 'pudratchi' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <HardHat className="w-3.5 h-3.5 shrink-0" />
                <span>Pudratchi</span>
              </button>
            </div>
          </div>

          {/* Action Buttons in Mobile Drawer */}
          <div className="flex flex-col space-y-2.5 pt-3 border-t border-slate-200">
            <button
              onClick={() => { onOpenReportModal(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-full text-sm font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 min-h-[44px]"
            >
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Muammo Bildirish</span>
            </button>

            <button
              onClick={() => { onOpenPdfModal(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-full text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 min-h-[44px]"
            >
              <FileText className="w-5 h-5" />
              <span>AI PDF Hisobot Generatsiyasi</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
});

