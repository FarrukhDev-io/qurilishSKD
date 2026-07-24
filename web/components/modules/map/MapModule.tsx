'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { getLightModeBadgeStyle } from '../../../services/gisService';
import {
  Filter, Activity, Info, ChevronDown, ChevronUp,
  AlertCircle, ShieldAlert, CheckCircle2, Building2, X, Satellite, Radio, Map as MapIcon,
  Layers, ArrowRight, TrendingDown
} from 'lucide-react';

export interface MapModuleProps {
  projects: ProjectData[];
  selectedProject: ProjectData | null;
  onSelectProject: (proj: ProjectData | null) => void;
  activeRole?: 'hokimiyat' | 'fuqaro' | 'pudratchi';
  onOpenReportModal?: () => void;
  theme?: 'light' | 'dark';
}

export const MapModule: React.FC<MapModuleProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  activeRole = 'hokimiyat',
  onOpenReportModal,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null);
  const layerGroupRef = useRef<ReturnType<typeof import('leaflet')['layerGroup']> | null>(null);
  const tileLayerRef = useRef<ReturnType<typeof import('leaflet')['tileLayer']> | null>(null);
  const isInitializedRef = useRef(false);

  const [filterStatus, setFilterStatus] = useState<'all' | 'red_flag' | 'unesco_warning' | 'on_schedule'>('all');
  const [activeLayer, setActiveLayer] = useState<'optical' | 'insar' | 'standard'>('optical');
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  // Live filter counters
  const totalCount = projects.length;
  const redFlagCount = projects.filter((p) => p.status === 'red_flag').length;
  const unescoCount = projects.filter((p) => p.status === 'unesco_warning').length;
  const onScheduleCount = projects.filter((p) => p.status === 'on_schedule').length;

  // Tile URL Helper
  const getTileConfig = useCallback((layer: 'optical' | 'insar' | 'standard') => {
    switch (layer) {
      case 'standard':
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: 'abc',
          attribution: '&copy; OpenStreetMap contributors',
        };
      case 'insar':
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
          subdomains: 'abcd',
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        };
      case 'optical':
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
          subdomains: 'abcd',
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        };
    }
  }, []);

  // Map Initialization
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container || isInitializedRef.current) return;

    let mapInstance: any = null;

    import('leaflet').then((L) => {
      if (isInitializedRef.current || !container) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      mapInstance = L.map(container, {
        center: [39.658, 66.98],
        zoom: 12,
        zoomControl: false,
        preferCanvas: true,
        touchZoom: true,
        dragging: true,
        bounceAtZoomLimits: true,
      });

      L.control.zoom({ position: 'bottomleft' }).addTo(mapInstance);

      const tileConfig = getTileConfig('optical');
      const tl = L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        subdomains: tileConfig.subdomains as any,
        maxZoom: 19,
      }).addTo(mapInstance);

      const layerGroup = L.layerGroup().addTo(mapInstance);

      mapInstanceRef.current = mapInstance;
      tileLayerRef.current = tl;
      layerGroupRef.current = layerGroup;
      isInitializedRef.current = true;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
        tileLayerRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [getTileConfig]);

  // Tile Layer Update
  useEffect(() => {
    if (!isInitializedRef.current || !mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }

      const tileConfig = getTileConfig(activeLayer);
      const newTileLayer = L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        subdomains: tileConfig.subdomains as any,
        maxZoom: 19,
      }).addTo(map);

      tileLayerRef.current = newTileLayer;
    });
  }, [activeLayer, getTileConfig]);

  // Markers & Polygons Update
  useEffect(() => {
    if (!isInitializedRef.current) return;

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    import('leaflet').then((L) => {
      layerGroup.clearLayers();

      // UNESCO Buffer Zone Overlay
      const unescoPolygon = L.polygon([
        [39.6580, 66.9710],
        [39.6585, 66.9800],
        [39.6510, 66.9810],
        [39.6500, 66.9720],
      ], {
        renderer: L.canvas(),
        color: '#F59E0B',
        fillColor: '#F59E0B',
        fillOpacity: 0.12,
        dashArray: '5, 8',
        weight: 2,
      }).addTo(layerGroup);
      unescoPolygon.bindTooltip('YUNESKO Tarixiy Markaz Bufer Zonasi', { permanent: false, direction: 'top' });

      // Filter projects
      const filtered = projects.filter((p) =>
        filterStatus === 'all' ? true : p.status === filterStatus
      );

      filtered.forEach((project) => {
        let color = '#82C91E';
        if (project.status === 'red_flag') color = '#EF4444';
        else if (project.status === 'unesco_warning') color = '#F59E0B';

        const isInsarDanger = activeLayer === 'insar' && project.insarDeformation.status === 'danger';
        const markerColor = isInsarDanger ? '#EF4444' : color;
        const isSelected = selectedProject && selectedProject.id === project.id;

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              ${project.status === 'red_flag' || isSelected ? `<span class="absolute inline-flex h-9 w-9 rounded-full opacity-75 animate-ping" style="background-color:${markerColor}"></span>` : ''}
              <div class="relative rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition-all duration-200" style="width:${isSelected ? '32px' : '26px'}; height:${isSelected ? '32px' : '26px'}; background-color:${markerColor}"></div>
            </div>`,
          iconSize: isSelected ? [32, 32] : [26, 26],
          iconAnchor: isSelected ? [16, 16] : [13, 13],
        });

        const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(layerGroup);
        marker.on('click', () => onSelectProject(project));

        if (project.polygon && project.polygon.length > 0) {
          const polygon = L.polygon(project.polygon, {
            renderer: L.canvas(),
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: isSelected ? 0.38 : 0.15,
            weight: isSelected ? 4 : 2,
          }).addTo(layerGroup);
          polygon.on('click', () => onSelectProject(project));
        }
      });
    });
  }, [projects, filterStatus, activeLayer, selectedProject, onSelectProject]);

  return (
    <div className="p-3.5 sm:p-6 card-3d space-y-4 sm:space-y-6 text-[#0F172A] overflow-x-hidden max-w-full">

      {/* ── SECTION HEADER & FILTERS (100% RESPONSIVE) ────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 pb-3.5 sm:pb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Samarqand GIS Xaritasi va Monitoringi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5 sm:mt-1">
            Qurilish ob'ektlarining aniq joylashuvi, bajarilish foizi va poydevor cho'kish ko'rsatkichlari
          </p>
        </div>

        {/* Status Filter Pills (Touch-Friendly Horizontal Scroll) */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto no-scrollbar max-w-full py-0.5" role="group" aria-label="Loyiha filtrlari">
          <div className="flex items-center space-x-1.5 slot-3d-inset p-1 sm:p-1.5 overflow-x-auto no-scrollbar w-full md:w-auto shrink-0">
            {([
              { key: 'all' as const, label: `Barchasi (${totalCount})`, icon: null },
              { key: 'red_flag' as const, label: `Kechikayotgan (${redFlagCount})`, icon: <AlertCircle className="w-4 h-4 text-rose-500" /> },
              { key: 'unesco_warning' as const, label: `YUNESKO (${unescoCount})`, icon: <ShieldAlert className="w-4 h-4 text-amber-500" /> },
              { key: 'on_schedule' as const, label: `Rejada (${onScheduleCount})`, icon: <CheckCircle2 className="w-4 h-4 text-[#82C91E]" /> },
            ]).map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                aria-pressed={filterStatus === key}
                className={`px-3.5 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[44px] shrink-0 ${
                  filterStatus === key
                    ? 'pill-3d-active'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {icon && icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: MAP + DEDICATED SIDEBAR (100% MOBILE RESPONSIVE STACK) ─── */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

        {/* 1. CLEAN MAP CONTAINER */}
        <div className="flex-1 relative w-full h-[320px] sm:h-[480px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">

          {/* Layer Switcher (Top Right) */}
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-md" role="group" aria-label="Xarita qatlami">
            {([
              { key: 'optical', label: 'Sentinel-2 Optik', shortLabel: 'Optik', icon: <Satellite className="w-4 h-4" /> },
              { key: 'insar', label: 'InSAR Radar Heatmap', shortLabel: 'InSAR', icon: <Radio className="w-4 h-4" /> },
              { key: 'standard', label: 'Standard Xarita', shortLabel: 'Xarita', icon: <MapIcon className="w-4 h-4" /> },
            ] as const).map(({ key, label, shortLabel, icon }) => (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                aria-pressed={activeLayer === key}
                aria-label={label}
                className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
                  activeLayer === key
                    ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </button>
            ))}
          </div>

          {/* InSAR Legend (Top Left) */}
          <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs max-w-[200px] sm:max-w-xs">
            <button
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              aria-expanded={isLegendOpen}
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-50 flex items-center justify-between font-extrabold text-slate-800 border-b border-slate-200 hover:bg-slate-100 transition-colors min-h-[38px]"
            >
              <span className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-[#82C91E] shrink-0" />
                <span>InSAR Cho'kish Izohi</span>
              </span>
              {isLegendOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isLegendOpen && (
              <div className="p-3 space-y-2 text-[11px] sm:text-xs text-slate-700 font-bold">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#82C91E] shrink-0" />
                  <span>0mm dan -2mm: Barqaror poydevor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>-5mm va undan ko'p: XAVFLI CHO'KISH</span>
                </div>
                <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 text-slate-500">
                  <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>YUNESKO Tarixiy Bufer Zonasi</span>
                </div>
              </div>
            )}
          </div>

          {/* Leaflet Canvas Container */}
          <div
            ref={mapContainerRef}
            className="w-full h-full z-10"
            role="application"
            aria-label="Samarqand GIS xaritasi"
          />
        </div>

        {/* 2. DEDICATED PROJECT DETAILS SIDE PANEL (COMPLETELY OUTSIDE MAP) */}
        <div className="w-full lg:w-[380px] shrink-0 bg-slate-50/90 rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm flex flex-col justify-between min-h-[420px]">
          {selectedProject ? (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Header & Close Button */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-3.5">
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-black px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                      ID: {selectedProject.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/30">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mt-2 leading-snug">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  onClick={() => onSelectProject(null)}
                  aria-label="Loyihani yopish"
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer shrink-0 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Holat:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${getLightModeBadgeStyle(selectedProject.status).badgeClass}`}>
                  {selectedProject.statusText}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-extrabold">
                  <span className="text-slate-600">Rejadagi Progress: <strong className="text-slate-900">{selectedProject.plannedProgress}%</strong></span>
                  <span className="text-[#82C91E]">AI Sentinel: <strong>{selectedProject.actualProgress}%</strong></span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 bg-slate-400 rounded-full" style={{ width: `${selectedProject.plannedProgress}%` }} />
                  <div
                    className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${selectedProject.status === 'red_flag' ? 'bg-rose-500' : 'bg-[#82C91E]'}`}
                    style={{ width: `${selectedProject.actualProgress}%` }}
                  />
                </div>
              </div>

              {/* InSAR Poydevor Deformatsiyasi */}
              <div className={`p-3.5 rounded-2xl border text-xs flex items-start space-x-3 ${
                selectedProject.insarDeformation.status === 'danger'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : selectedProject.insarDeformation.status === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-[#F7FEE7] border-[#82C91E]/40 text-[#0F172A]'
              }`}>
                <Activity className={`w-5 h-5 shrink-0 mt-0.5 ${selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-[#82C91E]'}`} />
                <div className="space-y-1 w-full">
                  <div className="font-extrabold flex items-center justify-between">
                    <span>Sentinel-1 InSAR:</span>
                    <span className="font-mono text-sm font-black text-rose-700">{selectedProject.insarDeformation.valueMm} mm</span>
                  </div>
                  <div className="text-[11px] font-bold">
                    {selectedProject.insarDeformation.status === 'danger' ? (
                      <span className="flex items-center space-x-1 text-rose-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>-5mm va undan ko'p: XAVFLI CHO'KISH</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[#82C91E]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>0mm dan -2mm gacha: Barqaror poydevor</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">{selectedProject.insarDeformation.details}</p>
                </div>
              </div>

              {/* Pudratchi va Byudjet Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-3 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 font-bold block text-[11px]">Pudratchi:</span>
                  <span className="font-extrabold text-[#0F172A] truncate block mt-0.5">{selectedProject.contractor}</span>
                </div>
              </div>

              {/* Dynamic Role Action Button */}
              {activeRole === 'fuqaro' && onOpenReportModal && (
                <button
                  onClick={onOpenReportModal}
                  className="w-full py-3 rounded-full bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-extrabold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Ob'ektda Qoidabuzarlik Bildirish</span>
                </button>
              )}

              {activeRole === 'pudratchi' && (
                <div className="p-3 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/30 text-xs font-bold text-[#82C91E] flex items-center justify-between">
                  <span>AI O'sish Sur'ati:</span>
                  <span className="font-mono font-black text-sm">{selectedProject.aiVelocity}</span>
                </div>
              )}

            </div>
          ) : (
            /* Blank state when no project selected */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                <MapIcon className="w-6 h-6 text-[#82C91E]" />
              </div>
              <h4 className="text-sm font-extrabold text-[#0F172A]">Loyiha Ma'lumotlari</h4>
              <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                Xaritadagi istalgan ob'ekt markerini bosib, uning InSAR cho'kish ko'rsatkichi va AI progressini ushbu panelda ko'rishingiz mumkin.
              </p>
            </div>
          )}

          {/* Footer quick switcher / counter summary */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Jami Ob'ektlar: <strong className="text-[#0F172A]">{totalCount} ta</strong></span>
            <span className="text-[#82C91E] flex items-center">
              <span>Sentinel Live</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
