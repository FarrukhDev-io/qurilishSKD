'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { getLightModeBadgeStyle } from '../../../services/gisService';
import {
  Filter, Activity, Info, ChevronDown, ChevronUp,
  AlertCircle, ShieldAlert, CheckCircle2, Building2, X, Satellite, Radio, Map as MapIcon,
} from 'lucide-react';

export interface MapModuleProps {
  projects: ProjectData[];
  selectedProject: ProjectData | null;
  onSelectProject: (proj: ProjectData | null) => void;
  theme?: 'light' | 'dark';
}

export const MapModule: React.FC<MapModuleProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Fix #9: typed refs instead of any
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

  // ─── TILE URL HELPER ─────────────────────────────────────────────────────────
  const getTileConfig = useCallback((layer: 'optical' | 'insar' | 'standard') => {
    switch (layer) {
      case 'standard':
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: 'abc',
          attribution: '&copy; OpenStreetMap contributors',
        };
      case 'insar':
        // InSAR: dark basemap to make deformation overlay stand out
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

  // ─── EFFECT 1: MAP INITIALIZATION (runs once, cleans up on unmount) ──────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container || isInitializedRef.current) return;

    let mapInstance: any = null;

    import('leaflet').then((L) => {
      if (isInitializedRef.current || !container) return;

      // Fix default Leaflet marker assets
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

      // Initial tile layer
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

    // Fix #1: MEMORY LEAK — remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        layerGroupRef.current = null;
        tileLayerRef.current = null;
        isInitializedRef.current = false;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // runs once

  // ─── EFFECT 2: TILE LAYER UPDATE (runs when activeLayer changes) ─────────────
  // Fix #7: Tile layer double-add bug — only update tile after init
  useEffect(() => {
    if (!isInitializedRef.current || !mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      // Remove existing tile layer
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

  // ─── EFFECT 3: MARKERS & POLYGONS UPDATE ─────────────────────────────────────
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

        // For InSAR layer: tint dangerous projects red
        const isInsarDanger = activeLayer === 'insar' && project.insarDeformation.status === 'danger';
        const markerColor = isInsarDanger ? '#EF4444' : color;

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              ${project.status === 'red_flag' ? `<span class="absolute inline-flex h-8 w-8 rounded-full opacity-75 animate-ping" style="background-color:${markerColor}"></span>` : ''}
              <div class="relative w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white cursor-pointer hover:scale-125 transition-transform" style="background-color:${markerColor}"></div>
            </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(layerGroup);
        marker.on('click', () => onSelectProject(project));

        if (project.polygon && project.polygon.length > 0) {
          const isSelected = selectedProject && selectedProject.id === project.id;
          const polygon = L.polygon(project.polygon, {
            renderer: L.canvas(),
            color: markerColor,
            fillColor: markerColor,
            fillOpacity: isSelected ? 0.35 : 0.15,
            weight: 3,
          }).addTo(layerGroup);
          polygon.on('click', () => onSelectProject(project));
        }
      });
    });
  }, [projects, filterStatus, activeLayer, selectedProject, onSelectProject]);

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 sm:space-y-6 text-[#0F172A] overflow-x-hidden">

      {/* SECTION HEADER + FILTER COUNTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Samarqand GIS Xaritasi va Monitoringi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
            Qurilish ob'ektlarining aniq joylashuvi, bajarilish foizi va poydevor cho'kish ko'rsatkichlari
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 w-full md:w-auto" role="group" aria-label="Loyiha filtrlari">
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                  filterStatus === key
                    ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
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

      {/* MAP CONTAINER */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">

        {/* Fix #6: Layer Switcher with DISTINCT tile layers (Top Right) */}
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

        {/* InSAR Legend (Top Left, collapsible) */}
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

        {/* SELECTED PROJECT BOTTOM-SHEET */}
        {selectedProject && (
          <div
            role="dialog"
            aria-label={`Ob'ekt: ${selectedProject.name}`}
            className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-20 md:right-auto md:w-96 bg-white/98 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xl space-y-3.5 max-h-[75vh] overflow-y-auto animate-fadeIn"
          >
            {/* Mobile drag handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto md:hidden" />

            {/* 1. Ob'ekt nomi, ID, Status badge */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedProject.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/30">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mt-1.5 line-clamp-1">
                  {selectedProject.name}
                </h3>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <div className={`px-3 py-1 rounded-full text-xs ${getLightModeBadgeStyle(selectedProject.status).badgeClass}`}>
                  {selectedProject.statusText}
                </div>
                <button
                  onClick={() => onSelectProject(null)}
                  aria-label="Yopish"
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. AI Progress Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-600">Reja: <strong className="text-slate-900">{selectedProject.plannedProgress}%</strong></span>
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

            {/* 3. InSAR Cho'kish Ko'rsatkichi + Insoniy Izoh */}
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
                      <span>-5mm va undan ko'p: XAVFLI CHO'KISH (Red Flag Alert)</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-[#82C91E]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>0mm dan -2mm gacha: Barqaror poydevor</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{selectedProject.insarDeformation.details}</p>
              </div>
            </div>

            {/* 4. Pudratchi + Byudjet */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold block text-[11px]">Pudratchi:</span>
                <span className="font-extrabold text-[#0F172A] truncate block mt-0.5">{selectedProject.contractor}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold block text-[11px]">Byudjet:</span>
                <span className="font-extrabold text-emerald-600 block mt-0.5">{selectedProject.budget}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
