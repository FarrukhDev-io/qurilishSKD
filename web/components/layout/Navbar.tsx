'use client';

import React, { useState } from 'react';
import { Satellite, FileText, AlertTriangle, Menu, X, Map, Sliders, Camera, BarChart3 } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* 1. Chap tomonda: Yirik QurilishSKD Logo va Samarqand Pill Badge */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#82C91E] flex items-center justify-center shadow-md shadow-[#82C91E]/30 transition-transform hover:scale-105">
              <Satellite className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F172A]" aria-label="Qurilish SKD - Samarqand Qurilish Monitoring Platformasi">
                Qurilish<span className="text-[#82C91E]"> SKD</span>
              </div>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase bg-[#95E616] text-[#0F172A] rounded-full tracking-wider shadow-xs">
                Samarqand
              </span>
            </div>
          </div>

          {/* 2. Markazda (Desktop >= lg): 4 ta toza, yirik navigatsiya havolasi */}
          <nav className="hidden lg:flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              GIS Xarita
            </button>

            <button
              onClick={() => setActiveTab('slider')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Yo'ldosh Slider
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Fuqarolar Nazorati
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              Analitika
            </button>
          </nav>

          {/* 3. O'ng tomonda: Actions & Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Compact Role Switcher (Desktop >= sm) */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'hokimiyat'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hokimiyat
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'fuqaro'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fuqaro
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer min-h-[36px] ${
                  activeRole === 'pudratchi'
                    ? 'bg-[#82C91E] text-white shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pudratchi
              </button>
            </div>

            {/* Muammo Bildirish Button (Hidden on very small mobile screens) */}
            <button
              onClick={onOpenReportModal}
              className="hidden md:flex items-center space-x-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-xs active:scale-95 cursor-pointer min-h-[44px]"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Muammo Bildirish</span>
            </button>

            {/* Yagona AI PDF Hisobot Button */}
            <button
              onClick={onOpenPdfModal}
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all active:scale-95 cursor-pointer min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>AI PDF Hisobot</span>
            </button>

            {/* 📱 MOBILE HAMBURGER MENU TOGGLE BUTTON (< lg) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full text-[#0F172A] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#0F172A]" /> : <Menu className="w-6 h-6 text-[#0F172A]" />}
            </button>

          </div>

        </div>
      </div>

      {/* 📱 MOBILE DRAWER MENU OVERLAY (< lg) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-5 space-y-4 animate-fadeIn shadow-xl">
          
          {/* Module Navigation Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-400 px-2 tracking-wider">Modullarga O'tish</span>
            
            <button
              onClick={() => { setActiveTab('map'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-extrabold min-h-[44px] transition-all cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-700 bg-slate-50 border border-slate-200'
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
                  : 'text-slate-700 bg-slate-50 border border-slate-200'
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
                  : 'text-slate-700 bg-slate-50 border border-slate-200'
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
                  : 'text-slate-700 bg-slate-50 border border-slate-200'
              }`}
            >
              <BarChart3 className="w-5 h-5 shrink-0" />
              <span>Modul 4: Executive Analitika</span>
            </button>
          </div>

          {/* Role Switcher Pills in Mobile Menu */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="text-[11px] font-black uppercase text-slate-400 px-2 tracking-wider">Foydalanuvchi Roli</span>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveRole('hokimiyat')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] ${
                  activeRole === 'hokimiyat' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Hokimiyat
              </button>
              <button
                onClick={() => setActiveRole('fuqaro')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] ${
                  activeRole === 'fuqaro' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Fuqaro
              </button>
              <button
                onClick={() => setActiveRole('pudratchi')}
                className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer min-h-[44px] ${
                  activeRole === 'pudratchi' ? 'bg-[#82C91E] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Pudratchi
              </button>
            </div>
          </div>

          {/* Action Buttons in Mobile Drawer */}
          <div className="flex flex-col space-y-2.5 pt-2 border-t border-slate-200">
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
