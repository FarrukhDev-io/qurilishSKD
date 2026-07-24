'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/layout/Navbar';
import { HeaderBanner } from '../components/layout/HeaderBanner';
import { Footer } from '../components/layout/Footer';
import { SAMARQAND_PROJECTS, ProjectData } from '../data/samarqandProjects';
import {
  Info, Map, Sliders, Camera, BarChart3,
} from 'lucide-react';

export type TabType = 'map' | 'slider' | 'crowd' | 'analytics';
const VALID_TABS: TabType[] = ['map', 'slider', 'crowd', 'analytics'];

// ─── Skeleton ────────────────────────────────────────────────────────────────
const ModuleSkeleton: React.FC = () => (
  <div className="w-full h-full min-h-[480px] bg-white rounded-3xl border border-slate-200 animate-pulse flex flex-col items-center justify-center space-y-3">
    <div className="w-10 h-10 rounded-2xl bg-slate-200" />
    <div className="h-3 w-40 bg-slate-200 rounded-full" />
    <div className="h-2 w-24 bg-slate-100 rounded-full" />
  </div>
);

// ─── Dynamic Imports ─────────────────────────────────────────────────────────
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
const ReportModal = dynamic(
  () => import('../components/modals/ReportModal').then((m) => m.ReportModal),
  { ssr: false }
);
const IssueReportModal = dynamic(
  () => import('../components/modals/IssueReportModal').then((m) => m.IssueReportModal),
  { ssr: false }
);

// ─── Sidebar Tab config ───────────────────────────────────────────────────────
interface TabConfig {
  key: TabType;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}
const TABS: TabConfig[] = [
  { key: 'map',       label: 'GIS Xarita',       sublabel: 'Radar & InSAR',       icon: <Map       className="w-5 h-5 shrink-0" /> },
  { key: 'slider',    label: "Yo'ldosh Slider",   sublabel: 'Before / After',      icon: <Sliders   className="w-5 h-5 shrink-0" /> },
  { key: 'crowd',     label: 'Crowd Scanner',     sublabel: 'AI Kamera & EXIF',    icon: <Camera    className="w-5 h-5 shrink-0" /> },
  { key: 'analytics', label: 'Analytics',         sublabel: 'KPI & PDF Hisobot',   icon: <BarChart3 className="w-5 h-5 shrink-0" /> },
];

// ─── Inner Component ──────────────────────────────────────────────────────────
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
    'Demo: Modullarni almashtirish uchun — M · S · C · A klaviaturasi yoki yon paneldan bosing'
  );
  const [toastVisible, setToastVisible] = useState(true);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToastMessage(null), 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`, { scroll: false });
    const labels: Record<TabType, string> = {
      map:       "GIS Xarita & InSAR Radar — 42 ta ob'ekt",
      slider:    "Yo'ldosh Slider — 2026 Yanvar vs Iyul",
      crowd:     'Crowd-Sourcing Scanner — AI Auto-Clustering',
      analytics: 'Executive Analytics — 94.2% AI Aniqligi',
    };
    showToast(labels[tab]);
  }, [router, showToast]);

  const handleOpenPdfModal       = useCallback(() => setIsPdfModalOpen(true),     []);
  const handleClosePdfModal      = useCallback(() => setIsPdfModalOpen(false),    []);
  const handleOpenReportModal    = useCallback(() => setIsReportModalOpen(true),   []);
  const handleCloseReportModal   = useCallback(() => setIsReportModalOpen(false),  []);

  const handleSelectProject = useCallback((proj: ProjectData | null) => {
    if (proj) { setSelectedProject(proj); showToast(`Ob'ekt: ${proj.name}`); }
  }, [showToast]);

  const handleSelectProjectSlider = useCallback((proj: ProjectData) => {
    setSelectedProject(proj); showToast(`Yo'ldosh tasviri: ${proj.name}`);
  }, [showToast]);

  const handleSetActiveRole = useCallback((role: 'hokimiyat' | 'fuqaro' | 'pudratchi') => {
    setActiveRole(role);
    const labels = { hokimiyat: 'Hokimiyat & Inspeksiya', fuqaro: 'Fuqarolar Portali', pudratchi: 'Pudratchi Kabineti' };
    showToast(`Rol: ${labels[role]}`);
  }, [showToast]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT') return;
      const map: Record<string, TabType> = { m: 'map', s: 'slider', c: 'crowd', a: 'analytics' };
      const tab = map[e.key.toLowerCase()];
      if (tab) switchTab(tab);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [switchTab]);

  return (
    <div className="h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#82C91E] selection:text-white overflow-hidden">

      {/* ── Toast ─────────────────────────────────────────────────────── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md bg-[#0F172A] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 transition-all duration-300 ${
            toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="p-1.5 rounded-xl bg-[#82C91E] shrink-0">
            <Info className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}

      {/* ── Sticky Navbar ─────────────────────────────────────────────── */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={handleSetActiveRole}
        activeTab={activeTab}
        setActiveTab={switchTab}
        onOpenReportModal={handleOpenReportModal}
        onOpenPdfModal={handleOpenPdfModal}
      />

      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <HeaderBanner />

      {/* ── Mobile Horizontal Tab Pill Bar (< lg) ─────────────────────── */}
      <div
        className="lg:hidden flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 bg-white border-b border-slate-200 sticky z-30 shrink-0"
        style={{ top: '80px' }}
        role="tablist"
        aria-label="Modul navigatsiyasi"
      >
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => switchTab(key)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer min-h-[44px] shrink-0 ${
              activeTab === key
                ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Main Dashboard Layout ──────────────────────────────────────── */}
      <main className="flex flex-row flex-1 overflow-hidden" aria-label="Asosiy kontent">

        {/* ── LEFT: Vertical Tab Sidebar (lg+ only) ─────────────────── */}
        <aside
          className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200 shrink-0 p-4 gap-2 overflow-y-auto"
          role="navigation"
          aria-label="Modul navigatsiyasi"
        >
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-4 pt-2 pb-1">
            Modullar
          </p>
          {TABS.map(({ key, label, sublabel, icon }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => switchTab(key)}
              className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer text-left w-full ${
                activeTab === key
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0F172A]'
              }`}
            >
              {icon}
              <div className="text-left min-w-0">
                <p className="font-extrabold text-sm leading-tight">{label}</p>
                <p className={`text-[11px] font-medium leading-tight mt-0.5 ${activeTab === key ? 'text-white/70' : 'text-slate-400'}`}>
                  {sublabel}
                </p>
              </div>
            </button>
          ))}

          {/* Sidebar bottom info */}
          <div className="mt-auto pt-4 border-t border-slate-100 px-4 pb-2">
            <div className="flex items-center space-x-2 mb-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#82C91E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#82C91E]" />
              </span>
              <span className="text-[10px] font-bold text-[#82C91E]">Live — Sentinel-2 Faol</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              42+ ob'ekt · 94.2% AI Aniqligi · 154+ Sentinel pass
            </p>
          </div>
        </aside>

        {/* ── RIGHT: Full-width Content Area ────────────────────────── */}
        <section className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-[#F8FAFC]">

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

        </section>
      </main>

      <Footer />

      {isPdfModalOpen && (
        <ReportModal isOpen={isPdfModalOpen} onClose={handleClosePdfModal} />
      )}
      {isReportModalOpen && (
        <IssueReportModal isOpen={isReportModalOpen} onClose={handleCloseReportModal} />
      )}
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-[#F8FAFC] flex items-center justify-center">
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
