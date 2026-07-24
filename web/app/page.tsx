'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

const VALID_TABS: TabType[] = ['map', 'slider', 'crowd', 'analytics'];

// ─── Inner Component (requires Suspense due to useSearchParams) ───────────────
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial tab from URL query param (?tab=slider)
  const tabParam = searchParams.get('tab') as TabType;
  const initialTab: TabType = VALID_TABS.includes(tabParam) ? tabParam : 'map';

  const [activeRole, setActiveRole] = useState<'hokimiyat' | 'fuqaro' | 'pudratchi'>('hokimiyat');
  const [selectedProject, setSelectedProject] = useState<ProjectData>(SAMARQAND_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Fix #4: Replace animate-bounce with smooth fade toast
  const [toastMessage, setToastMessage] = useState<string | null>(
    "Demo: Modullarni almashtirish uchun klaviatura tugmalari — M · S · C · A"
  );
  const [toastVisible, setToastVisible] = useState(true);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToastMessage(null), 300); // wait for fade-out
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Fix #2: Sync tab to URL without page reload
  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
    const labels: Record<TabType, string> = {
      map: "GIS Xarita & InSAR Radar — 42 ta ob'ekt, Canvas 60 FPS",
      slider: "Yo'ldosh Slider — 2026 Yanvar vs Iyul taqqoslovi",
      crowd: "Crowd-Sourcing Scanner — EXIF Match Verified, AI Auto-Clustering",
      analytics: "Executive Analytics — 94.2% AI Aniqligi, Rasmiy PDF Hisobot",
    };
    showToast(labels[tab]);
  }, [router, showToast]);

  // Keyboard shortcuts: M · S · C · A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;
      const map: Record<string, TabType> = { m: 'map', s: 'slider', c: 'crowd', a: 'analytics' };
      const tab = map[e.key.toLowerCase()];
      if (tab) switchTab(tab);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#82C91E] selection:text-white relative overflow-x-hidden">
      
      {/* Fix #4: Smooth fade toast — no more animate-bounce */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md bg-[#0F172A] text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 transition-all duration-300 ${
            toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="p-1.5 rounded-xl bg-[#82C91E] text-white shrink-0">
            <Info className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-medium font-sans">{toastMessage}</p>
        </div>
      )}

      <Navbar
        activeRole={activeRole}
        setActiveRole={(role) => {
          setActiveRole(role);
          const labels = { hokimiyat: 'Hokimiyat & Inspeksiya', fuqaro: 'Fuqarolar Portali', pudratchi: 'Pudratchi Kabineti' };
          showToast(`Rol: ${labels[role]}`);
        }}
        activeTab={activeTab}
        setActiveTab={switchTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
      />

      <HeaderBanner />

      <main
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8"
        aria-label="Asosiy kontent"
      >
        {activeTab === 'map' && (
          <MapModule
            projects={SAMARQAND_PROJECTS}
            selectedProject={selectedProject}
            onSelectProject={(proj) => {
              if (proj) {
                setSelectedProject(proj);
                showToast(`Ob'ekt: ${proj.name}`);
              }
            }}
            theme="light"
          />
        )}

        {activeTab === 'slider' && (
          <SatelliteSliderModule
            projects={SAMARQAND_PROJECTS}
            selectedProject={selectedProject}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              showToast(`Yo'ldosh tasviri: ${proj.name}`);
            }}
            theme="light"
          />
        )}

        {activeTab === 'crowd' && (
          <CrowdSourceModule
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsModule
            projects={SAMARQAND_PROJECTS}
            onOpenPdfModal={() => setIsPdfModalOpen(true)}
          />
        )}
      </main>

      <Footer />

      <ReportModal isOpen={isPdfModalOpen} onClose={() => setIsPdfModalOpen(false)} />
      <IssueReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
}

// ─── Page wrapper with Suspense (required for useSearchParams) ────────────────
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#82C91E] animate-pulse" />
          <p className="text-sm font-bold text-slate-500">Yuklanmoqda...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
