'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeaderBanner } from '../components/layout/HeaderBanner';
import { Footer } from '../components/layout/Footer';
import { MapModule } from '../components/modules/map/MapModule';
import { SatelliteSliderModule } from '../components/modules/satellite/SatelliteSliderModule';
import { CrowdSourceModule } from '../components/modules/crowd/CrowdSourceModule';
import { AnalyticsModule } from '../components/modules/analytics/AnalyticsModule';
import { ReportModal } from '../components/modals/ReportModal';
import { IssueReportModal } from '../components/modals/IssueReportModal';
import { SAMARQAND_PROJECTS, ProjectData } from '../data/samarqandProjects';
import { Info } from 'lucide-react';

export type TabType = 'map' | 'slider' | 'crowd' | 'analytics';

export default function Home() {
  const [activeRole, setActiveRole] = useState<'hokimiyat' | 'fuqaro' | 'pudratchi'>('hokimiyat');
  const [selectedProject, setSelectedProject] = useState<ProjectData>(SAMARQAND_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Demo Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(
    "SKDqurilish Demo Active: Modullarni o'tkazish uchun [M], [S], [C], [A] tugmalarini bosing!"
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
        showToast("Modul 1: GIS Xarita & Radar Progress — 42 ta ob'ekt Canvas 60 FPS rejimi faol");
        break;
      case 'slider':
        showToast("Modul 2: Before/After Satellite Slider — 2026-Yanvar vs 2026-Iyul taqqoslovi");
        break;
      case 'crowd':
        showToast("Modul 3: Smart Crowd-Sourcing Scanner — EXIF Match Verified & AI Auto-Clustering");
        break;
      case 'analytics':
        showToast("Modul 4: Executive Analytics — 94.2% AI Model Aniqligi & Rasmiy PDF Hisobot");
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
      
      {/* FLOATING DEMO TOAST NOTIFICATION BANNER */}
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

      {/* Startup Base Modular Navbar */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          showToast(`Rol O'zgardi: ${role === 'hokimiyat' ? 'Hokimiyat & Inspeksiya' : role === 'fuqaro' ? 'Fuqarolar Portali' : 'Pudratchi Kabineti'}`);
        }}
        activeTab={activeTab}
        setActiveTab={(tab) => switchTab(tab)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      {/* Startup Base Modular Light Mode Hero Banner */}
      <HeaderBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Dynamic Tab Module Render */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <MapModule
              projects={SAMARQAND_PROJECTS}
              selectedProject={selectedProject}
              onSelectProject={(proj) => {
                setSelectedProject(proj);
                showToast(`Ob'ekt Tanlandi: ${proj.name}`);
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
                showToast(`Yo'ldosh Tasviri Tanlandi: ${proj.name}`);
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

      {/* Startup Base Modular Footer */}
      <Footer />

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
