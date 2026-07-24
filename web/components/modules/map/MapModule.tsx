'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { getLightModeBadgeStyle } from '../../../services/gisService';
import {
  Filter, Activity, Info, ChevronDown, ChevronUp,
  AlertCircle, ShieldAlert, CheckCircle2, Building2,
  X, Satellite, Radio, Map as MapIcon, TrendingDown,
  CalendarDays, DollarSign, Layers
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
  const mapInstanceRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);

  const [filterStatus, setFilterStatus] = useState<'all' | 'red_flag' | 'unesco_warning' | 'on_schedule'>('all');
  const [activeLayer, setActiveLayer] = useState<'optical' | 'insar' | 'standard'>('optical');
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const totalCount = projects.length;
  const redFlagCount = projects.filter((p) => p.status === 'red_flag').length;
  const unescoCount = projects.filter((p) => p.status === 'unesco_warning').length;
  const onScheduleCount = projects.filter((p) => p.status === 'on_schedule').length;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container) return;

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstanceRef.current && container) {
        const map = L.map(container, {
          center: [39.658, 66.98],
          zoom: 12,
          zoomControl: false,
          preferCanvas: true,
          touchZoom: true,
          dragging: true,
          bounceAtZoomLimits: true,
        });

        L.control.zoom({ position: 'bottomleft' }).addTo(map);

        const tileUrl = activeLayer === 'standard'
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

        const tileLayer = L.tileLayer(tileUrl, {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: activeLayer === 'standard' ? 'abc' : 'abcd',
          maxZoom: 19,
        }).addTo(map);

        const layerGroup = L.layerGroup().addTo(map);
        layerGroupRef.current = layerGroup;
        mapInstanceRef.current = map;
        (map as any)._tileLayerInstance = tileLayer;
      }

      const map = mapInstanceRef.current;
      const layerGroup = layerGroupRef.current;
      if (!map || !layerGroup) return;

      if ((map as any)._tileLayerInstance) {
        map.removeLayer((map as any)._tileLayerInstance);
      }
      const newTileUrl = activeLayer === 'standard'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      const newTileLayer = L.tileLayer(newTileUrl, {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: activeLayer === 'standard' ? 'abc' : 'abcd',
        maxZoom: 19,
      }).addTo(map);
      (map as any)._tileLayerInstance = newTileLayer;

      layerGroup.clearLayers();

      const filtered = projects.filter((p) => {
        if (filterStatus === 'all') return true;
        return p.status === filterStatus;
      });

      // UNESCO Buffer Zone
      const unescoPolygon = L.polygon([
        [39.6580, 66.9710],
        [39.6585, 66.9800],
        [39.6510, 66.9810],
        [39.6500, 66.9720]
      ], {
        renderer: L.canvas(),
        color: '#F59E0B',
        fillColor: '#F59E0B',
        fillOpacity: 0.12,
        dashArray: '5, 8',
        weight: 2
      }).addTo(layerGroup);
      unescoPolygon.bindTooltip('YUNESKO Tarixiy Markaz Bufer Zonasi', { permanent: false, direction: 'top' });

      filtered.forEach((project) => {
        let color = '#82C91E';
        if (project.status === 'red_flag') color = '#EF4444';
        else if (project.status === 'unesco_warning') color = '#F59E0B';

        const isSelected = selectedProject?.id === project.id;

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              ${project.status === 'red_flag' || isSelected ? `<span class="absolute inline-flex h-10 w-10 rounded-full opacity-60 animate-ping" style="background-color: ${color}"></span>` : ''}
              <div class="relative rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white cursor-pointer transition-all"
                style="width:${isSelected ? '36px' : '28px'}; height:${isSelected ? '36px' : '28px'}; background-color: ${color}; box-shadow: 0 0 0 ${isSelected ? '4px' : '0px'} ${color}40">
              </div>
            </div>
          `,
          iconSize: isSelected ? [36, 36] : [28, 28],
          iconAnchor: isSelected ? [18, 18] : [14, 14],
        });

        const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(layerGroup);
        marker.on('click', () => onSelectProject(project));

        if (project.polygon && project.polygon.length > 0) {
          const polyColor = activeLayer === 'insar' && project.insarDeformation.status === 'danger' ? '#EF4444' : color;
          const polygon = L.polygon(project.polygon, {
            renderer: L.canvas(),
            color: polyColor,
            fillColor: polyColor,
            fillOpacity: isSelected ? 0.35 : 0.12,
            weight: isSelected ? 3 : 2,
          }).addTo(layerGroup);
          polygon.on('click', () => onSelectProject(project));
        }
      });
    });
  }, [projects, filterStatus, activeLayer, selectedProject, onSelectProject]);

  const badgeStyle = selectedProject ? getLightModeBadgeStyle(selectedProject.status) : null;
  const progressDiff = selectedProject ? selectedProject.actualProgress - selectedProject.plannedProgress : 0;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">

      {/* ── HEADER BAR ─────────────────────────────────────────────── */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/30 flex items-center justify-center shrink-0">
              <MapIcon className="w-4.5 h-4.5 text-[#82C91E]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">SAMARQAND GIS MONITORINGI</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Sentinel-1/2 • InSAR • Canvas 60 FPS</p>
            </div>
          </div>
          <span className="bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide">
            SENTINEL-1/2 RADAR
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filtr:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {([
              { key: 'all', label: `Barchasi (${totalCount})`, icon: null, color: 'text-slate-600' },
              { key: 'red_flag', label: `Red Flag (${redFlagCount})`, icon: <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />, color: 'text-rose-600' },
              { key: 'unesco_warning', label: `UNESCO (${unescoCount})`, icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />, color: 'text-amber-600' },
              { key: 'on_schedule', label: `Rejada (${onScheduleCount})`, icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#82C91E] shrink-0" />, color: 'text-[#65A30D]' },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  filterStatus === f.key
                    ? 'bg-white text-[#0F172A] shadow-sm font-extrabold'
                    : `${f.color} hover:bg-white/60`
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN BODY: MAP + SIDEBAR ─────────────────────────────────── */}
      <div className={`flex flex-col lg:flex-row h-[calc(100vh-280px)] min-h-[440px]`}>

        {/* MAP AREA */}
        <div className="relative flex-1 min-h-[400px] lg:min-h-0">

          {/* Layer switcher — top right */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-md">
            {([
              { key: 'optical', label: 'Sentinel-2 Optik', icon: <Satellite className="w-3.5 h-3.5" /> },
              { key: 'insar', label: 'InSAR Radar', icon: <Radio className="w-3.5 h-3.5" /> },
              { key: 'standard', label: 'Standart', icon: <Layers className="w-3.5 h-3.5" /> },
            ] as const).map((l) => (
              <button
                key={l.key}
                onClick={() => setActiveLayer(l.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeLayer === l.key
                    ? 'bg-[#82C91E] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {l.icon}
                <span className="hidden sm:inline">{l.label}</span>
              </button>
            ))}
          </div>

          {/* Legend — top left */}
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs max-w-[220px]">
            <button
              onClick={() => setIsLegendOpen(!isLegendOpen)}
              className="w-full px-3 py-2 bg-slate-50 flex items-center justify-between font-bold text-slate-700 border-b border-slate-100 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#82C91E]" />
                InSAR Izoh
              </span>
              {isLegendOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {isLegendOpen && (
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#82C91E]" />
                  <span>0 → -2mm: Barqaror</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>-5mm+: Xavfli cho'kish</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 pt-1 border-t border-slate-100">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>UNESCO Bufer Zonasi</span>
                </div>
              </div>
            )}
          </div>

          {/* Leaflet canvas */}
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* ── RIGHT SIDEBAR PANEL ───────────────────────────────────── */}
        <div className={`lg:w-[380px] xl:w-[420px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col bg-[#FAFAFA] transition-all`}>

          {selectedProject ? (
            /* PROJECT DETAIL */
            <div className="flex flex-col h-full overflow-y-auto">

              {/* Panel header */}
              <div className="px-5 py-4 bg-white border-b border-slate-200 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {selectedProject.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-[#F7FEE7] text-[#82C91E]">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0F172A] leading-snug line-clamp-2">
                    {selectedProject.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {badgeStyle && (
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${badgeStyle.badgeClass}`}>
                      {selectedProject.statusText}
                    </span>
                  )}
                  <button
                    onClick={() => onSelectProject(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Panel body */}
              <div className="flex-1 p-5 space-y-4">

                {/* Progress section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5 text-[#82C91E]" />
                    Qurilish Progressi
                  </div>

                  <div className="space-y-2">
                    {/* Planned */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>Reja bo'yicha</span>
                        <span className="font-mono font-extrabold text-slate-700">{selectedProject.plannedProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${selectedProject.plannedProgress}%` }} />
                      </div>
                    </div>

                    {/* Actual */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#82C91E]">AI Sentinel Amaldagi</span>
                        <span className={`font-mono font-extrabold ${selectedProject.status === 'red_flag' ? 'text-rose-600' : 'text-[#82C91E]'}`}>
                          {selectedProject.actualProgress}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            selectedProject.status === 'red_flag' ? 'bg-rose-500' : 'bg-[#82C91E]'
                          }`}
                          style={{ width: `${selectedProject.actualProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Diff badge */}
                  <div className={`flex items-center justify-between text-xs font-extrabold p-2.5 rounded-xl ${
                    progressDiff < 0 ? 'bg-rose-50 text-rose-700' : 'bg-[#F7FEE7] text-[#82C91E]'
                  }`}>
                    <span>Farq (Reja vs Amal):</span>
                    <span className="font-mono font-black">{progressDiff > 0 ? `+${progressDiff}` : progressDiff}%</span>
                  </div>
                </div>

                {/* InSAR section */}
                <div className={`rounded-2xl border p-4 space-y-2 ${
                  selectedProject.insarDeformation.status === 'danger'
                    ? 'bg-rose-50 border-rose-200'
                    : selectedProject.insarDeformation.status === 'warning'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-[#F7FEE7] border-[#82C91E]/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                      InSAR Poydevor Cho'kish
                    </div>
                    <span className={`font-mono text-lg font-black ${
                      selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-[#65A30D]'
                    }`}>
                      {selectedProject.insarDeformation.valueMm} mm
                    </span>
                  </div>
                  <div className={`text-xs font-bold flex items-center gap-1.5 ${
                    selectedProject.insarDeformation.status === 'danger' ? 'text-rose-700' : 'text-[#65A30D]'
                  }`}>
                    {selectedProject.insarDeformation.status === 'danger'
                      ? <><AlertCircle className="w-3.5 h-3.5" /> XAVFLI CHO'KISH — Red Flag</>
                      : <><CheckCircle2 className="w-3.5 h-3.5" /> Barqaror poydevor</>
                    }
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedProject.insarDeformation.details}</p>
                </div>

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold mb-1.5">
                      <Building2 className="w-3 h-3" /> Pudratchi
                    </div>
                    <p className="text-xs font-extrabold text-[#0F172A] truncate">{selectedProject.contractor}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold mb-1.5">
                      <DollarSign className="w-3 h-3" /> Byudjet
                    </div>
                    <p className="text-xs font-extrabold text-emerald-600">{selectedProject.budget}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-3 col-span-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold mb-1.5">
                      <CalendarDays className="w-3 h-3" /> Muddat
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Boshlangan: <span className="text-[#0F172A] font-extrabold">{selectedProject.startDate}</span></span>
                      <span className="text-slate-400">→</span>
                      <span className="text-slate-600">Yakunlanish: <span className="text-[#82C91E] font-extrabold">{selectedProject.targetCompletion}</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          ) : (
            /* EMPTY STATE — project not selected */
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/20 flex items-center justify-center mb-4">
                <MapIcon className="w-7 h-7 text-[#82C91E]" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0F172A] mb-2">Ob'ekt Tanlang</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                Xaritadagi yashil, qizil yoki sariq markerlardan birini bosib loyiha ma'lumotlarini ko'ring
              </p>
              <div className="mt-6 space-y-2 w-full max-w-[220px] text-left">
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-[#82C91E] shrink-0" /> Rejada ({onScheduleCount} ta)
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" /> Red Flag ({redFlagCount} ta)
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" /> UNESCO Zonasi ({unescoCount} ta)
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
