'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { getLightModeBadgeStyle } from '../../../services/gisService';
import { Layers, Filter, Activity, Info, ChevronDown, ChevronUp, AlertCircle, ShieldAlert, CheckCircle2, Building2 } from 'lucide-react';

export interface MapModuleProps {
  projects: ProjectData[];
  selectedProject: ProjectData;
  onSelectProject: (proj: ProjectData) => void;
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
  const [activeLayer, setActiveLayer] = useState<'optical' | 'insar' | 'unesco'>('optical');
  const [isLegendOpen, setIsLegendOpen] = useState(true);

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
        // Initialize Map in Canvas Mode for 60 FPS performance
        const map = L.map(container, {
          center: [39.658, 66.98],
          zoom: 12,
          zoomControl: false,
          preferCanvas: true, // ⚡ Canvas Mode
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // CartoDB Positron Light Mode Tile Layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map);

        // Create dedicated LayerGroup for vector elements
        const layerGroup = L.layerGroup().addTo(map);
        layerGroupRef.current = layerGroup;

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;
      const layerGroup = layerGroupRef.current;
      if (!map || !layerGroup) return;

      // Clear existing markers and polygons in LayerGroup without re-creating map
      layerGroup.clearLayers();

      // Filter projects
      const filtered = projects.filter((p) => {
        if (filterStatus === 'all') return true;
        return p.status === filterStatus;
      });

      // Draw UNESCO Buffer Zone Overlay if active layer is unesco or optical
      if (activeLayer === 'unesco' || activeLayer === 'optical') {
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
      }

      // Plot projects with Canvas rendering & Light Mode styling
      filtered.forEach((project) => {
        let color = '#82C91E'; // Lime Green
        if (project.status === 'red_flag') {
          color = '#EF4444'; // Red
        } else if (project.status === 'unesco_warning') {
          color = '#F59E0B'; // Amber
        }

        // Custom Minimalist Pin Marker Icon
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div class="relative flex items-center justify-center">
              ${project.status === 'red_flag' ? `<span class="absolute inline-flex h-8 w-8 rounded-full opacity-75 animate-ping" style="background-color: ${color}"></span>` : ''}
              <div class="relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md border-2 border-white cursor-pointer hover:scale-125 transition-transform" style="background-color: ${color}">
              </div>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        // Add Marker
        const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(layerGroup);
        marker.on('click', () => {
          onSelectProject(project);
        });

        // Add Geofence Polygon
        if (project.polygon && project.polygon.length > 0) {
          const polyColor = activeLayer === 'insar' && project.insarDeformation.status === 'danger' ? '#EF4444' : color;
          const polygon = L.polygon(project.polygon, {
            renderer: L.canvas(), // Canvas Mode
            color: polyColor,
            fillColor: polyColor,
            fillOpacity: selectedProject.id === project.id ? 0.35 : 0.18,
            weight: selectedProject.id === project.id ? 2.5 : 1.5,
          }).addTo(layerGroup);

          polygon.on('click', () => {
            onSelectProject(project);
          });
        }
      });
    });
  }, [projects, filterStatus, activeLayer, selectedProject, onSelectProject]);

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      
      {/* Map Control Bar Overlay (Minimalist Light Mode) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Layer Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setActiveLayer('optical')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              activeLayer === 'optical'
                ? 'bg-[#82C91E] text-white shadow-sm shadow-[#82C91E]/30'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sentinel-2 Optik</span>
          </button>
          
          <button
            onClick={() => setActiveLayer('insar')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              activeLayer === 'insar'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Sentinel-1 InSAR Radar</span>
          </button>

          <button
            onClick={() => setActiveLayer('unesco')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              activeLayer === 'unesco'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>YUNESKO Bufer Zonasi</span>
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-bold flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                filterStatus === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Barchasi ({projects.length})
            </button>
            <button
              onClick={() => setFilterStatus('red_flag')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center space-x-1 transition-all ${
                filterStatus === 'red_flag'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Red Flag</span>
            </button>
            <button
              onClick={() => setFilterStatus('unesco_warning')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center space-x-1 transition-all ${
                filterStatus === 'unesco_warning'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'
                  : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>YUNESKO Ogoh.</span>
            </button>
            <button
              onClick={() => setFilterStatus('on_schedule')}
              className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center space-x-1 transition-all ${
                filterStatus === 'on_schedule'
                  ? 'bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 shadow-sm'
                  : 'text-slate-600 hover:text-[#65A30D]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#82C91E]" />
              <span>Rejada</span>
            </button>
          </div>
        </div>

      </div>

      {/* Map Legend (Minimalist Collapsible Panel - Top Right) */}
      <div className="absolute top-20 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-xs max-w-xs transition-all">
        <button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="w-full px-3.5 py-2.5 bg-slate-50 flex items-center justify-between font-extrabold text-slate-700 border-b border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <span className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>GIS Xarita Legendasi</span>
          </span>
          {isLegendOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isLegendOpen && (
          <div className="p-3 space-y-2 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>Red Flag: Kechikish Xavfi (&gt;10% orqada)</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>YUNESKO Ogohlantirish (Balandlik me'yori)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#82C91E] shrink-0" />
              <span>Reja bo'yicha ketayotgan ob'ekt</span>
            </div>
            <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
              <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>YUNESKO Tarixiy Bufer Chegarasi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>Sentinel-1 InSAR Radar Deformatsiya (&lt; -5mm)</span>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Selected Project Detail Drawer */}
      {selectedProject && (
        <div className="absolute bottom-4 left-4 right-4 z-20 md:right-auto md:w-96 bg-white/95 backdrop-blur-md p-4.5 rounded-2xl border border-slate-200 shadow-lg space-y-3">
          
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {selectedProject.category}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-1 line-clamp-1">{selectedProject.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{selectedProject.contractor}</p>
            </div>
            
            <div className={`px-2.5 py-1 rounded-xl text-xs ${getLightModeBadgeStyle(selectedProject.status).badgeClass}`}>
              <span>{selectedProject.statusText}</span>
            </div>
          </div>

          {/* InSAR Deformation Warning Card */}
          <div className={`p-3 rounded-xl border text-xs flex items-start space-x-2.5 ${
            selectedProject.insarDeformation.status === 'danger'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : selectedProject.insarDeformation.status === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <Activity className={`w-4 h-4 shrink-0 mt-0.5 ${
              selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-slate-500'
            }`} />
            <div>
              <div className="font-extrabold flex items-center justify-between">
                <span>Sentinel-1 InSAR Radar Poydevor:</span>
                <span className="font-mono text-sm ml-2 font-black text-rose-700">{selectedProject.insarDeformation.valueMm} mm</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 font-medium">{selectedProject.insarDeformation.details}</p>
            </div>
          </div>

          {/* UNESCO Height Check */}
          {selectedProject.unescoZone && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div className="flex items-center justify-between font-extrabold">
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>YUNESKO Balandlik Limiti: {selectedProject.maxAllowedHeight}m</span>
                </span>
                <span className="text-rose-600 font-mono">Joriy: {selectedProject.currentHeight}m</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-slate-500">Reja: <span className="text-slate-900">{selectedProject.plannedProgress}%</span></span>
              <span className="text-slate-500">AI Sentinel Amaldagi: <span className="text-[#65A30D]">{selectedProject.actualProgress}%</span></span>
            </div>
            <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="absolute top-0 bottom-0 left-0 bg-slate-300 rounded-full"
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

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-500 font-bold">Byudjet:</span>
              <span className="font-extrabold text-emerald-600">{selectedProject.budget}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex justify-between">
              <span className="text-slate-500 font-bold">AI O'sish Tezligi:</span>
              <span className="font-extrabold text-[#65A30D]">{selectedProject.aiVelocity}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
