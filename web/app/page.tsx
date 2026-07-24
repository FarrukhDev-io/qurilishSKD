'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MapModule } from '../components/MapModule';
import { SatelliteSliderModule } from '../components/SatelliteSliderModule';
import { CrowdSourceModule } from '../components/CrowdSourceModule';
import { AnalyticsModule } from '../components/AnalyticsModule';
import { ReportModal } from '../components/ReportModal';
import { IssueReportModal } from '../components/IssueReportModal';
import { SAMARQAND_PROJECTS, ProjectData } from '../data/samarqandProjects';
import { Map, Sliders, Camera, BarChart3, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeRole, setActiveRole] = useState<'hokimiyat' | 'fuqaro' | 'pudratchi'>('hokimiyat');
  const [selectedProject, setSelectedProject] = useState<ProjectData>(SAMARQAND_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'slider' | 'crowd' | 'analytics'>('map');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header Bar */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Hero Notification Banner */}
      <div className="bg-gradient-to-r from-cyan-950/70 via-[#0F172A] to-emerald-950/70 border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-bold text-cyan-300">School 21 Samarkand Digital Lab Hakaton Loyihasi</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Samarqand shahri va tumanlaridagi 42 ta qurilish ob'ekti Sentinel-1/2 yo'ldoshlari orqali kuzatilmoqda
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[11px] text-cyan-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI YOLOv8 + InSAR Radar Synchronized</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0E1526] p-2 rounded-2xl border border-slate-800 shadow-xl">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'map'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Modul 1: GIS Xarita & Radar Progress</span>
            </button>

            <button
              onClick={() => setActiveTab('slider')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'slider'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Modul 2: Before/After Satellite Slider</span>
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'crowd'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Modul 3: Smart Crowd-Sourcing Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Modul 4: Executive Dashboard & Analytics</span>
            </button>
          </div>

          {/* Current Active Role Badge Info */}
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-400 flex items-center space-x-1.5">
            <span className="text-cyan-400">Joriy Rol:</span>
            <span className="text-white capitalize">
              {activeRole === 'hokimiyat' ? '🏛 Hokimiyat & Inspeksiya' : activeRole === 'fuqaro' ? '👥 Fuqarolar Portali' : '🏗 Pudratchi Kabineti'}
            </span>
          </div>

        </div>

        {/* Dynamic Tab Module Render */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <MapModule
              projects={SAMARQAND_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={(proj) => setSelectedProject(proj)}
            />
          </div>
        )}

        {activeTab === 'slider' && (
          <div className="space-y-6">
            <SatelliteSliderModule
              projects={SAMARQAND_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={(proj) => setSelectedProject(proj)}
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

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#0B0F19] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">SKDqurilish (UrbanPulse Samarqand)</span>
            <span>— AI va Sun'iy Yo'ldosh Monitoringi Platformasi</span>
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
