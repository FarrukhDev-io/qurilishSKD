'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/layout/Navbar';
import { HeaderBanner } from '../components/layout/HeaderBanner';
import { Footer } from '../components/layout/Footer';
import { SAMARQAND_PROJECTS, ProjectData } from '../data/samarqandProjects';
import { Info } from 'lucide-react';

export type TabType = 'map' | 'slider' | 'crowd' | 'analytics';

const VALID_TABS: TabType[] = ['map', 'slider', 'crowd', 'analytics'];

// ─── MODULE SKELETON (shown during lazy load) ─────────────────────────────────
const ModuleSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl border border-slate-200 h-[480px] animate-pulse flex flex-col items-center justify-center space-y-3">
    <div className="w-10 h-10 rounded-2xl bg-slate-200 animate-pulse" />
    <div className="h-3 w-40 bg-slate-200 rounded-full" />
    <div className="h-2 w-24 bg-slate-100 rounded-full" />
  </div>
);

// ─── DYNAMIC IMPORTS — SSR disabled for all heavy map/chart modules ───────────
const MapModule = dynamic(
  () => import('../components/modules/map/MapModule').then((m) => m.MapModule),
  { ssr: false, loading: () => <ModuleSkeleton /> }
);

const SatelliteSliderModule = dynamic(
  () => import('../components/modules/satellite/SatelliteSliderModule').then((m) => m.SatelliteSliderModule),
  { ssr: false, loading: () => <ModuleSkeleton /> }
);

const CrowdSourceModule = dynamic(
  () => import('../components/modules/crowd/CrowdSourceModule').then((m) => m.CrowdSourceModule),
  { ssr: false, loading: () => <ModuleSkeleton /> }
);

const AnalyticsModule = dynamic(
  () => import('../components/modules/analytics/AnalyticsModule').then((m) => m.AnalyticsModule),
  { ssr: false, loading: () => <ModuleSkeleton /> }
);

// Modals — also lazy-loaded (mounted only when opened)
const ReportModal = dynamic(
  () => import('../components/modals/ReportModal').then((m) => m.ReportModal),
  { ssr: false }
);

const IssueReportModal = dynamic(
  () => import('../components/modals/IssueReportModal').then((m) => m.IssueReportModal),
  { ssr: false }
);

// ─── Inner Component (requires Suspense due to useSearchParams) ───────────────
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get('tab') as TabType;
  const initialTab: TabType = VALID_TABS.includes(tabParam) ? tabParam : 'map';

  const [activeRole, setActiveRole] = useState<'hokimiyat' | 'fuqaro' | 'pudratchi'>('hokimiyat');
  const [selectedProject, setSelectedProject] = useState<ProjectData>(SAMARQAND_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
      setTimeout(() => setToastMessage(null), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // ─── useCallback — tab, modal, project handlers ──────────────────────────
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

  const handleOpenPdfModal = useCallback(() => setIsPdfModalOpen(true), []);
  const handleClosePdfModal = useCallback(() => setIsPdfModalOpen(false), []);
  const handleOpenReportModal = useCallback(() => setIsReportModalOpen(true), []);
  const handleCloseReportModal = useCallback(() => setIsReportModalOpen(false), []);

  const handleSelectProject = useCallback((proj: ProjectData | null) => {
    if (proj) {
      setSelectedProject(proj);
      showToast(`Ob'ekt: ${proj.name}`);
    }
  }, [showToast]);

  const handleSelectProjectSlider = useCallback((proj: ProjectData) => {
    setSelectedProject(proj);
    showToast(`Yo'ldosh tasviri: ${proj.name}`);
  }, [showToast]);

  const handleSetActiveRole = useCallback((role: 'hokimiyat' | 'fuqaro' | 'pudratchi') => {
    setActiveRole(role);
    const labels = {
      hokimiyat: 'Hokimiyat & Inspeksiya',
      fuqaro: 'Fuqarolar Portali',
      pudratchi: 'Pudratchi Kabineti',
    };
    showToast(`Rol: ${labels[role]}`);
  }, [showToast]);

  // Keyboard shortcuts: M · S · C · A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;
      const keyMap: Record<string, TabType> = { m: 'map', s: 'slider', c: 'crowd', a: 'analytics' };
      const tab = keyMap[e.key.toLowerCase()];
      if (tab) switchTab(tab);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [switchTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#82C91E] selection:text-white relative overflow-x-hidden">

      {/* Smooth fade toast — no animate-bounce */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md bg-[#0F172A] text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 transition-all duration-300 ${
            toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="p-1.5 rounded-xl bg-[#82C91E] shrink-0">
            <Info className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}

      <Navbar
        activeRole={activeRole}
        setActiveRole={handleSetActiveRole}
        activeTab={activeTab}
        setActiveTab={switchTab}
        onOpenReportModal={handleOpenReportModal}
        onOpenPdfModal={handleOpenPdfModal}
      />

      <HeaderBanner />

      <main
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        aria-label="Asosiy kontent"
      >
        {/* Conditional rendering — only active tab mounts in DOM */}
        {activeTab === 'map' && (
          <MapModule
            projects={SAMARQAND_PROJECTS}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            theme="light"
          />
        )}

        {activeTab === 'slider' && (
          <SatelliteSliderModule
            projects={SAMARQAND_PROJECTS}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProjectSlider}
            theme="light"
          />
        )}

        {activeTab === 'crowd' && (
          <CrowdSourceModule onOpenReportModal={handleOpenReportModal} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsModule
            projects={SAMARQAND_PROJECTS}
            onOpenPdfModal={handleOpenPdfModal}
          />
        )}
      </main>

      <Footer />

      {/* Modal lazy mounting — only mount when opened */}
      {isPdfModalOpen && (
        <ReportModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />
      )}
      {isReportModalOpen && (
        <IssueReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
      )}
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
