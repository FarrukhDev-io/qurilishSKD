'use client';

import React from 'react';
import { Satellite, FileText, AlertTriangle, UserCheck, Building2, Users, LogIn } from 'lucide-react';

export interface HeaderProps {
  activeRole: 'hokimiyat' | 'fuqaro' | 'pudratchi';
  setActiveRole: (role: 'hokimiyat' | 'fuqaro' | 'pudratchi') => void;
  onOpenReportModal: () => void;
  onOpenPdfModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  onOpenReportModal,
  onOpenPdfModal,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & GovTech Tagline */}
          <div className="flex items-center space-x-3.5">
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
                Powered by Samarkand GovTech & AI Satellite
              </p>
            </div>
          </div>

          {/* Role Navigation Tabs (Startup Base Capsule Pills) */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveRole('hokimiyat')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeRole === 'hokimiyat'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>🏛 Hokimiyat & Inspeksiya</span>
            </button>

            <button
              onClick={() => setActiveRole('fuqaro')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeRole === 'fuqaro'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>👥 Fuqarolar Portali</span>
            </button>

            <button
              onClick={() => setActiveRole('pudratchi')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeRole === 'pudratchi'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>🏗 Pudratchi Kabineti</span>
            </button>
          </div>

          {/* Quick Actions & Startup Base Login Button */}
          <div className="flex items-center space-x-3">

            <button
              onClick={onOpenReportModal}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-all shadow-sm active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Muammo Bildirish</span>
            </button>

            <button
              onClick={onOpenPdfModal}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">AI PDF Hisobot</span>
            </button>

            <button
              className="hidden md:flex items-center space-x-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#82C91E]" />
              <span>Tizimga kirish</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
