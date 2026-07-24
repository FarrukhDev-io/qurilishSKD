'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { MapModule } from '../components/MapModule';
import { SatelliteSliderModule } from '../components/SatelliteSliderModule';
import { CrowdSourceModule } from '../components/CrowdSourceModule';
import { AnalyticsModule } from '../components/AnalyticsModule';
import { ReportModal } from '../components/ReportModal';
import { IssueReportModal } from '../components/IssueReportModal';
import { SAMARQAND_PROJECTS, ProjectData } from '../data/samarqandProjects';
import { Map, Sliders, Camera, BarChart3, Sparkles, CheckCircle2, Info } from 'lucide-react';

export type TabType = 'map' | 'slider' | 'crowd' | 'analytics';

export default function Home() {
  const [activeRole, setActiveRole] = useState<'hokimiyat' | 'fuqaro' | 'pudratchi'>('hokimiyat');
  const [selectedProject, setSelectedProject] = useState<ProjectData>(SAMARQAND_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Demo Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(
    "🚀 SKDqurilish Demo Active: Modullarni o'tkazish uchun [M], [S], [C], [A] tugmalarini bosing!"
  );

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Dismiss toast after 3.5 seconds
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
    switch (tab) {
      case 'map':
        showToast("🗺 Modul 1: GIS Xarita & Radar Progress — 42 ta ob'ekt Canvas 60 FPS rejimi faol");
        break;
      case 'slider':
        showToast("🔍 Modul 2: Before/After Satellite Slider — 2026-Yanvar vs 2026-Iyul taqqoslovi");
        break;
      case 'crowd':
        showToast("📸 Modul 3: Smart Crowd-Sourcing Scanner — EXIF Match Verified & AI Auto-Clustering");
        break;
      case 'analytics':
        showToast("📊 Modul 4: Executive Analytics — 94.2% AI Model Aniqligi & Rasmiy PDF Hisobot");
        break;
    }
  }, [showToast]);

  // ⚡ DEMO SHORTCUTS KEYBOARD EVENT LISTENERS ([M], [S], [C], [A])
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keydowns inside input or textarea elements
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'm') {
        switchTab('map');
      } else if (key === 's') {
        switchTab('slider');
      } else if (key === 'c') {
        switchTab('crowd');
      } else if (key === 'a') {
        switchTab('analytics');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#82C91E] selection:text-white relative">
      
      {/* ⚡ FLOATING DEMO TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0F172A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-bounce">
          <div className="p-2 rounded-xl bg-[#82C91E] text-white shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold font-sans">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Startup Base Header Bar */}
      <Header
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          showToast(`👤 Rol O'zgardi: ${role === 'hokimiyat' ? 'Hokimiyat & Inspeksiya' : role === 'fuqaro' ? 'Fuqarolar Portali' : 'Pudratchi Kabineti'}`);
        }}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Startup Base Light Mode Hero Banner */}
      <div className="bg-white border-b border-slate-200 px-4 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              
              {/* Badges Row: Sentinel-2 Live Pulse & AI Model Confidence */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Sentinel-2 Live Pulse Badge */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 text-xs font-extrabold text-[#65A30D] shadow-xs">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#82C91E]"></span>
                  </span>
                  <span>Sentinel-2 Live Synchronized</span>
                </div>

                {/* 94.2% AI Model Confidence Indicator */}
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-extrabold text-[#0F172A] shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#82C91E]" />
                  <span>94.2% AI Model Confidence (YOLOv8 + InSAR)</span>
                </div>

                {/* Demo Keyboard Hotkeys Badge */}
                <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold shadow-sm">
                  <span className="text-[#82C91E]">Hotkeys:</span>
                  <span>[M] Xarita | [S] Slider | [C] Scanner | [A] Analytics</span>
                </div>

              </div>

              {/* Startup Base Hero Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                SAMARQAND QURILISH MONITORINGI{' '}
                <span className="inline-block bg-[#95E616] text-[#0F172A] px-3.5 py-1 rounded-2xl shadow-sm transform -rotate-1 hover:rotate-0 transition-transform">
                  SINGLE DIGITAL PLATFORM
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] font-medium leading-relaxed max-w-3xl">
                Sun'iy yo'ldosh (Sentinel-1/2), InSAR radar hamda AI Computer Vision orqali Samarqand shahri va tumanlaridagi 42+ ta qurilish va infratuzilma loyihalarining shaffof va zamonaviy nazorati.
              </p>
            </div>

            {/* Quick Executive Metrics Card */}
            <div className="bg-[#F8FAFC] p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-5">
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">AI Aniqligi</p>
                <p className="text-2xl font-extrabold text-[#82C91E] mt-0.5">94.2%</p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Ob'ektlar Soni</p>
                <p className="text-2xl font-extrabold text-[#0F172A] mt-0.5">42+ ta</p>
              </div>
              <div className="h-10 w-px bg-slate-200"></div>
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-500 font-extrabold uppercase tracking-wider">Sentinel Pass</p>
                <p className="text-2xl font-extrabold text-[#65A30D] mt-0.5">154+</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Startup Base Navigation Tabs Bar (Capsule Pills with Keyboard Shortcuts) */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-2 rounded-full border border-slate-200 shadow-sm">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => switchTab('map')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'map'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Modul 1: GIS Xarita & Radar Progress</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/30 text-white font-extrabold ml-1">M</kbd>
            </button>

            <button
              onClick={() => switchTab('slider')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'slider'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Modul 2: Before/After Satellite Slider</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/30 text-white font-extrabold ml-1">S</kbd>
            </button>

            <button
              onClick={() => switchTab('crowd')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'crowd'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Modul 3: Smart Crowd-Sourcing Scanner</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/30 text-white font-extrabold ml-1">C</kbd>
            </button>

            <button
              onClick={() => switchTab('analytics')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-extrabold transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Modul 4: Executive Dashboard & Analytics</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/30 text-white font-extrabold ml-1">A</kbd>
            </button>
          </div>

          {/* Active Role Indicator Badge Pill */}
          <div className="px-4 py-2 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 text-xs font-extrabold text-[#0F172A] flex items-center space-x-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
            <span>
              Joriy Rol: <strong className="text-[#65A30D]">{activeRole === 'hokimiyat' ? '🏛 Hokimiyat & Inspeksiya' : activeRole === 'fuqaro' ? '👥 Fuqarolar Portali' : '🏗 Pudratchi Kabineti'}</strong>
            </span>
          </div>

        </div>

        {/* Dynamic Tab Module Render */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <MapModule
              projects={SAMARQAND_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={(proj) => {
                setSelectedProject(proj);
                showToast(`📍 Ob'ekt Tanlandi: ${proj.name}`);
              }}
              theme="light"
            />
          </div>
        )}

        {activeTab === 'slider' && (
          <div className="space-y-6">
            <SatelliteSliderModule
              projects={SAMARQAND_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={(proj) => {
                setSelectedProject(proj);
                showToast(`🛰 Yo'ldosh Tasviri Tanlandi: ${proj.name}`);
              }}
              theme="light"
            />
          </div>
        )}

        {activeTab === 'crowd' && (
          <div className="space-y-6">
            <CrowdSourceModule
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <AnalyticsModule
              projects={SAMARQAND_PROJECTS}
              onOpenPdfModal={() => setIsPdfModalOpen(true)}
            />
          </div>
        )}

      </main>

      {/* Startup Base Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#0F172A]">SKDqurilish (UrbanPulse Samarqand)</span>
            <span className="text-slate-400">•</span>
            <span className="font-medium text-[#64748B]">School 21 Samarkand Digital Lab Hackathon Presentation Mode</span>
          </div>
          <p>© 2026 IdeaNova Jamoasi • School 21 Digital Lab Samarkand</p>
        </div>
      </footer>

      {/* Modals */}
      <ReportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      <IssueReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

    </div>
  );
}
