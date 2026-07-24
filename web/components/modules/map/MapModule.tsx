'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { getLightModeBadgeStyle } from '../../../services/gisService';
import { Filter, Activity, Info, ChevronDown, ChevronUp, AlertCircle, ShieldAlert, CheckCircle2, Building2, X, Satellite, Radio, Map as MapIcon } from 'lucide-react';

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

  // Dynamic filter counters
  const totalCount = projects.length;
  const redFlagCount = projects.filter((p) => p.status === 'red_flag').length;
  const unescoCount = projects.filter((p) => p.status === 'unesco_warning').length;
  const onScheduleCount = projects.filter((p) => p.status === 'on_schedule').length;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = mapContainerRef.current;
    if (!container) return;

    import('leaflet').then((L) => {
      // Fix default Leaflet marker assets
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapInstanceRef.current && container) {
        // Initialize Map in Canvas Mode & Full Mobile Touch Support
        const map = L.map(container, {
          center: [39.658, 66.98],
          zoom: 12,
          zoomControl: false,
          preferCanvas: true, // ⚡ Canvas Mode
          touchZoom: true,
          dragging: true,
          bounceAtZoomLimits: true,
        });

        L.control.zoom({ position: 'bottomleft' }).addTo(map);

        // Base Tile Layer according to activeLayer state
        const tileUrl = activeLayer === 'standard'
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

        const tileLayer = L.tileLayer(tileUrl, {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: activeLayer === 'standard' ? 'abc' : 'abcd',
          maxZoom: 19,
        }).addTo(map);

        // Create dedicated LayerGroup for vector elements
        const layerGroup = L.layerGroup().addTo(map);
        layerGroupRef.current = layerGroup;

        mapInstanceRef.current = map;
        (map as any)._tileLayerInstance = tileLayer;
      }

      const map = mapInstanceRef.current;
      const layerGroup = layerGroupRef.current;
      if (!map || !layerGroup) return;

      // Update Tile Layer if changed
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

      // Clear existing markers and polygons in LayerGroup
      layerGroup.clearLayers();

      // Filter projects
      const filtered = projects.filter((p) => {
        if (filterStatus === 'all') return true;
        return p.status === filterStatus;
      });

      // Draw UNESCO Buffer Zone Overlay if active layer is unesco/optical/insar
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
      unescoPolygon.bindTooltip("YUNESKO Tarixiy Markaz Bufer Zonasi", { permanent: false, direction: "top" });

      // Plot projects with Canvas rendering & Clean Light Mode styling
      filtered.forEach((project) => {
        let color = '#82C91E'; // Lime Green
        if (project.status === 'red_flag') {
          color = '#EF4444'; // Red
        } else if (project.status === 'unesco_warning') {
          color = '#F59E0B'; // Amber
        }

        // Custom Pin Marker Icon
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              ${project.status === 'red_flag' ? `<span class="absolute inline-flex h-8 w-8 rounded-full opacity-75 animate-ping" style="background-color: ${color}"></span>` : ''}
              <div class="relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white cursor-pointer hover:scale-125 transition-transform" style="background-color: ${color}">
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        // Add Marker
        const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(layerGroup);
        marker.on('click', () => {
          onSelectProject(project);
        });

        // Add Geofence Polygon (Weight: 3, FillOpacity: 0.15)
        if (project.polygon && project.polygon.length > 0) {
          const polyColor = activeLayer === 'insar' && project.insarDeformation.status === 'danger' ? '#EF4444' : color;
          const polygon = L.polygon(project.polygon, {
            renderer: L.canvas(), // Canvas Mode
            color: polyColor,
            fillColor: polyColor,
            fillOpacity: selectedProject && selectedProject.id === project.id ? 0.35 : 0.15,
            weight: 3, // Clean boundary line weight
          }).addTo(layerGroup);

          polygon.on('click', () => {
            onSelectProject(project);
          });
        }
      });
    });
  }, [projects, filterStatus, activeLayer, selectedProject, onSelectProject]);

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 sm:space-y-6 text-[#0F172A] overflow-x-hidden">
      
      {/* 1. SECTION HEADER VA LIVE FILTER COUNTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center space-x-2.5 flex-wrap gap-1">
            <span>SAMARQAND GIS MONITORINGI</span>
            <span className="bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs">
              SENTINEL-1/2 RADAR
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">
            Canvas Mode 60 FPS GIS xarita va Sentinel InSAR radar poydevor cho'kish monitoringi
          </p>
        </div>

        {/* Status Filter Capsule Pills (Live Counters) */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-bold hidden sm:flex items-center space-x-1 shrink-0">
            <Filter className="w-4 h-4 text-[#82C91E]" />
            <span>Filter:</span>
          </span>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200 text-sm overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap min-h-[44px] flex items-center ${
                filterStatus === 'all'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Barchasi ({totalCount})
            </button>
            <button
              onClick={() => setFilterStatus('red_flag')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                filterStatus === 'red_flag'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Red Flag Kechikish ({redFlagCount})</span>
            </button>
            <button
              onClick={() => setFilterStatus('unesco_warning')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                filterStatus === 'unesco_warning'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>YUNESKO Zonasi ({unescoCount})</span>
            </button>
            <button
              onClick={() => setFilterStatus('on_schedule')}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                filterStatus === 'on_schedule'
                  ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                  : 'text-slate-600 hover:text-[#65A30D]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
              <span>Rejada ({onScheduleCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. LEAFLET MAP CONTAINER */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
        
        {/* 🗺 MAP LAYER SWITCHER (QATLAM ALMASHTIRGICH - Top Right) */}
        <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-md">
          <button
            onClick={() => setActiveLayer('optical')}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
              activeLayer === 'optical'
                ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Satellite className="w-4 h-4" />
            <span className="hidden sm:inline">Sentinel-2 Optik</span>
            <span className="sm:hidden">Optik</span>
          </button>
          
          <button
            onClick={() => setActiveLayer('insar')}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
              activeLayer === 'insar'
                ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span className="hidden sm:inline">InSAR Radar Heatmap</span>
            <span className="sm:hidden">InSAR</span>
          </button>

          <button
            onClick={() => setActiveLayer('standard')}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
              activeLayer === 'standard'
                ? 'bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Standard Xarita</span>
            <span className="sm:hidden">Xarita</span>
          </button>
        </div>

        {/* 3. INSAR RADAR CHO'KISH INDIKATORI IZOHI (Top Left Legend Overlay) */}
        <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs max-w-[200px] sm:max-w-xs transition-all">
          <button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
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
                <span>0mm dan -2mm gacha: Barqaror poydevor</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>-5mm va undan ko'p: XAVFLI CHO'KISH (Red Flag)</span>
              </div>
              <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 text-slate-500">
                <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>YUNESKO Tarixiy Bufer Zonasi</span>
              </div>
            </div>
          )}
        </div>

        {/* Leaflet Map Canvas Container */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* 📱 REFACTORED POPUP & BOTTOM-SHEET DRAWER */}
        {selectedProject && (
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-20 md:right-auto md:w-96 bg-white/98 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xl space-y-3.5 max-h-[75vh] overflow-y-auto animate-fadeIn">
            
            {/* Mobile Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto md:hidden mb-1"></div>

            {/* 1. Ob'ekt Nomi, ID (#SAM-001) va Status Badge */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    ID: {selectedProject.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/30">
                    {selectedProject.category}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] mt-1.5 line-clamp-1">{selectedProject.name}</h3>
              </div>
              
              <div className="flex items-center space-x-2 shrink-0">
                <div className={`px-3 py-1 rounded-full text-xs ${getLightModeBadgeStyle(selectedProject.status).badgeClass}`}>
                  <span>{selectedProject.statusText}</span>
                </div>
                <button
                  onClick={() => onSelectProject(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. AI Progress Bar (Reja vs AI Sentinel foizlari) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-600">Rejadagi Progress: <strong className="text-slate-900">{selectedProject.plannedProgress}%</strong></span>
                <span className="text-[#65A30D]">AI Sentinel Amaldagi: <strong className="text-[#65A30D]">{selectedProject.actualProgress}%</strong></span>
              </div>
              <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-slate-400 rounded-full"
                  style={{ width: `${selectedProject.plannedProgress}%` }}
                />
                <div
                  className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500 ${
                    selectedProject.status === 'red_flag'
                      ? 'bg-rose-500 shadow-sm'
                      : 'bg-[#82C91E] shadow-sm'
                  }`}
                  style={{ width: `${selectedProject.actualProgress}%` }}
                />
              </div>
            </div>

            {/* 3. InSAR Poydevor Cho'kish Ko'rsatkichi va Insoniy Vizual Izoh */}
            <div className={`p-3.5 rounded-2xl border text-xs flex items-start space-x-3 shadow-xs ${
              selectedProject.insarDeformation.status === 'danger'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : selectedProject.insarDeformation.status === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-[#F7FEE7] border-[#82C91E]/40 text-[#0F172A]'
            }`}>
              <Activity className={`w-5 h-5 shrink-0 mt-0.5 ${
                selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-[#82C91E]'
              }`} />
              <div className="space-y-1 w-full">
                <div className="font-extrabold flex items-center justify-between">
                  <span>Sentinel-1 InSAR Poydevor:</span>
                  <span className="font-mono text-sm font-black text-rose-700">{selectedProject.insarDeformation.valueMm} mm</span>
                </div>
                <div className="text-[11px] font-bold flex items-center space-x-1">
                  {selectedProject.insarDeformation.status === 'danger' ? (
                    <span className="text-rose-700 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-rose-600" />
                      <span>-5mm va undan ko'p: XAVFLI CHO'KISH (Red Flag Alert)</span>
                    </span>
                  ) : (
                    <span className="text-[#65A30D] flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-[#82C91E]" />
                      <span>0mm dan -2mm gacha: Barqaror poydevor</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed pt-0.5">{selectedProject.insarDeformation.details}</p>
              </div>
            </div>

            {/* 4. Pudratchi Nomi va Byudjet Ko'rsatkichi */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold block text-[11px]">Pudratchi Tashkilot:</span>
                <span className="font-extrabold text-[#0F172A] truncate block mt-0.5">{selectedProject.contractor}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold block text-[11px]">Ajratilgan Byudjet:</span>
                <span className="font-extrabold text-emerald-600 block mt-0.5">{selectedProject.budget}</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
