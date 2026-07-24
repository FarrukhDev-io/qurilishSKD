'use client';

import React from 'react';
import { ProjectData } from '../../../data/samarqandProjects';
import { Sliders, Cpu, Grid2X2, RefreshCw, AlertCircle, Snowflake, Sun } from 'lucide-react';
import { useSatelliteData } from '../../../hooks/useSatelliteData';
import { BASELINE_SATELLITE_SVG, LATEST_SATELLITE_SVG } from '../../../services/satelliteService';

export interface SatelliteSliderModuleProps {
  projects?: ProjectData[];
  selectedProject: ProjectData;
  onSelectProject: (proj: ProjectData) => void;
  theme?: 'light' | 'dark';
}

export const SatelliteSliderModule: React.FC<SatelliteSliderModuleProps> = ({
  projects = [],
  selectedProject,
  onSelectProject,
}) => {
  const {
    sliderPosition,
    setSliderPosition,
    viewMode,
    setViewMode,
    showAiOverlay,
    setShowAiOverlay,
    satelliteData,
    containerRef,
    isLoadingBaseline,
    setIsLoadingBaseline,
    isLoadingLatest,
    setIsLoadingLatest,
    hasBaselineError,
    setHasBaselineError,
    hasLatestError,
    setHasLatestError,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSatelliteData({
    project: selectedProject,
    initialViewMode: 'slider',
    initialSliderPosition: 50,
  });

  return (
    <div className="p-4 sm:p-6 card-3d space-y-6 text-[#0F172A] overflow-x-hidden">
      
      {/* 1. SECTION HEADER VA SPACIOUS UI */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center space-x-2.5 flex-wrap gap-1">
            <span>SUN'IY YO'LDOSH TASVIRLARI TAHLILI</span>
            <span className="pill-3d-active px-3 py-1 text-xs font-black uppercase tracking-wider shrink-0">
              BEFORE / AFTER SLIDER
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1 truncate">
            {satelliteData.baselineDate} (Boshlang'ich Holat) vs {satelliteData.latestPassDate}
          </p>
        </div>

        {/* Controls & Mode Switcher */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 shrink-0">
          
          {/* Select Project Dropdown */}
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-full slot-3d-inset text-xs sm:text-sm min-h-[42px] max-w-full sm:max-w-[280px]">
            <span className="text-xs text-slate-500 font-bold shrink-0">Ob'ekt:</span>
            <select
              value={selectedProject.id}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className="bg-transparent text-xs font-extrabold text-[#65A30D] focus:outline-none cursor-pointer truncate w-full"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-white text-slate-900">
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* DUAL-VIEW MODE SWITCHER KAPSULA PILL */}
          <div className="flex items-center space-x-1 slot-3d-inset p-1 text-xs sm:text-sm">
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
                viewMode === 'slider'
                  ? 'pill-3d-active'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Slider</span>
            </button>

            <button
              onClick={() => setViewMode('side_by_side')}
              className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer whitespace-nowrap min-h-[38px] ${
                viewMode === 'side_by_side'
                  ? 'pill-3d-active'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid2X2 className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* AI Segmentation Toggle Pill */}
          <button
            onClick={() => setShowAiOverlay(!showAiOverlay)}
            className={`px-3.5 py-2 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all border cursor-pointer min-h-[38px] whitespace-nowrap ${
              showAiOverlay
                ? 'bg-[#F7FEE7] text-[#65A30D] border-[#82C91E]/40 shadow-xs'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#65A30D]" />
            <span>AI: {showAiOverlay ? 'ON' : 'OFF'}</span>
          </button>

        </div>
      </div>

      {/* 2. VIEW MODE 1: 60 FPS INTERACTIVE BEFORE / AFTER SLIDER */}
      {viewMode === 'slider' && (
        <div
          ref={containerRef}
          className="relative h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 select-none group touch-none"
        >
          {/* BASELINE IMAGE */}
          <div className="absolute inset-0 w-full h-full">
            {isLoadingBaseline && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs animate-pulse">
                <RefreshCw className="w-8 h-8 text-[#82C91E] animate-spin" />
              </div>
            )}
            
            <img
              src={hasBaselineError ? BASELINE_SATELLITE_SVG : satelliteData.baselineImageUrl}
              alt="Baseline Pass"
              onLoad={() => setIsLoadingBaseline(false)}
              onError={(e) => {
                setIsLoadingBaseline(false);
                setHasBaselineError(false);
                e.currentTarget.src = BASELINE_SATELLITE_SVG;
              }}
              className="w-full h-full object-cover filter brightness-95 contrast-105"
            />

            {/* Baseline Metadata Badge (Positioned at TOP-RIGHT so it is never covered by Latest Pass clip) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-extrabold shadow-md flex items-center space-x-1.5 backdrop-blur-md">
                <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 mr-1" />
                <span>BEFORE: {satelliteData.baselineDate} (Baseline)</span>
              </span>
            </div>
          </div>

          {/* LATEST PASS IMAGE */}
          <div
            className="absolute inset-0 h-full overflow-hidden z-10 transition-none"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            {isLoadingLatest && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50/80 backdrop-blur-xs animate-pulse">
                <RefreshCw className="w-8 h-8 text-[#82C91E] animate-spin" />
              </div>
            )}

            <img
              src={hasLatestError ? LATEST_SATELLITE_SVG : satelliteData.latestImageUrl}
              alt="Latest Pass"
              onLoad={() => setIsLoadingLatest(false)}
              onError={(e) => {
                setIsLoadingLatest(false);
                setHasLatestError(false);
                e.currentTarget.src = LATEST_SATELLITE_SVG;
              }}
              className="w-full h-full object-cover filter brightness-100 contrast-115"
            />

            {/* Latest Pass Metadata Badge (Positioned at TOP-LEFT) */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center space-x-2 flex-wrap gap-1">
              <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-mono text-xs font-extrabold shadow-md flex items-center space-x-1.5 backdrop-blur-md">
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mr-1" />
                <span>AFTER: {satelliteData.latestPassDate}</span>
              </span>
              <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-white/95 text-slate-700 border border-slate-200 font-mono text-xs font-bold shadow-md">
                Cloud: {satelliteData.cloudCover}%
              </span>
            </div>

            {/* AI COMPUTER VISION LIVE OVERLAY (YOLOv8 Segment Box) */}
            {showAiOverlay && (
              <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6 flex flex-col justify-center items-center">
                
                <div className="relative w-full sm:w-84 p-4 sm:p-5 border-2 border-[#82C91E] rounded-3xl bg-white/95 backdrop-blur-md shadow-xl">
                  <div className="absolute -top-3.5 left-4 sm:left-5 px-3 sm:px-3.5 py-1 bg-[#82C91E] text-white font-mono text-xs font-extrabold rounded-full uppercase tracking-wider shadow-sm flex items-center space-x-1">
                    <Cpu className="w-3.5 h-3.5 inline mr-1" />
                    <span>YOLOv8 + SAM Box ({satelliteData.aiModelConfidence}%)</span>
                  </div>

                  <div className="flex flex-col justify-center h-full space-y-2 sm:space-y-2.5 text-xs font-mono text-[#0F172A] pt-2">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 sm:pb-2">
                      <span className="text-slate-500 font-bold">Poydevor Hajm O'sishi:</span>
                      <strong className="text-[#65A30D] font-black text-xs sm:text-sm">+{satelliteData.volumeGrowthPct}%</strong>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 sm:pb-2">
                      <span className="text-slate-500 font-bold">Qurilish Maydoni:</span>
                      <strong className="text-[#0F172A] font-extrabold">{satelliteData.builtAreaSqM.toLocaleString()} m²</strong>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 sm:pb-2">
                      <span className="text-slate-500 font-bold">Kranlar Soni:</span>
                      <strong className="text-amber-600 font-black">{satelliteData.cranesDetected} ta active</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-bold">InSAR Poydevor:</span>
                      <strong className={selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600 font-black' : 'text-[#65A30D] font-black'}>
                        {selectedProject.insarDeformation.valueMm} mm
                      </strong>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* ⚡ 60 FPS SLIDER HANDLE CONTROLLER (Smartfon Touch-Friendly Handle) */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-[#82C91E] cursor-ew-resize flex items-center justify-center shadow-md"
            style={{
              transform: `translate3d(${containerRef.current ? (containerRef.current.clientWidth * sliderPosition) / 100 : 0}px, 0, 0)`,
              left: 0,
            }}
          >
            <div className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-[#82C91E] text-white border-2 border-white flex items-center justify-center shadow-2xl font-bold text-xs transition-transform ring-4 ring-[#82C91E]/30">
              <Sliders className="w-5 h-5 text-white rotate-90" />
            </div>
          </div>

          {/* Fallback Range Input for Accessibility & Touch Drag */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 z-40 cursor-ew-resize touch-none"
            aria-label="Satellite comparison slider position"
          />

        </div>
      )}

      {/* 3. VIEW MODE 2: DUAL-VIEW (SIDE-BY-SIDE GRID) */}
      {viewMode === 'side_by_side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          
          {/* Baseline Imagery Card */}
          <div className="relative h-[300px] sm:h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white flex flex-col justify-between p-4 sm:p-5">
            <img
              src={satelliteData.baselineImageUrl}
              alt="Baseline"
              onError={(e) => {
                e.currentTarget.src = BASELINE_SATELLITE_SVG;
              }}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105"
            />
            <div className="relative z-10 flex justify-between items-center">
              <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-extrabold shadow-sm flex items-center space-x-1.5 backdrop-blur-md">
                <Snowflake className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                <span>Baseline: {satelliteData.baselineDate}</span>
              </span>
              <span className="text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-900/80 text-white font-bold">
                Res: 10m/px
              </span>
            </div>

            <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 shadow-sm">
              <div className="flex justify-between text-slate-600 font-bold">
                <span>Dastlabki Maydon:</span>
                <span className="font-mono font-black text-[#0F172A]">11,380 m²</span>
              </div>
              <div className="flex justify-between text-slate-600 font-bold">
                <span>InSAR Indeksi:</span>
                <span className="font-mono text-[#65A30D] font-black">0.0 mm</span>
              </div>
            </div>
          </div>

          {/* Current Pass Imagery Card */}
          <div className="relative h-[300px] sm:h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white flex flex-col justify-between p-4 sm:p-5">
            <img
              src={satelliteData.latestImageUrl}
              alt="Latest Pass"
              onError={(e) => {
                e.currentTarget.src = LATEST_SATELLITE_SVG;
              }}
              className="absolute inset-0 w-full h-full object-cover filter brightness-100 contrast-115"
            />
            <div className="relative z-10 flex justify-between items-center">
              <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-mono text-xs font-extrabold shadow-sm flex items-center space-x-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-500 mr-1" />
                <span>Current: {satelliteData.latestPassDate}</span>
              </span>
              <span className="text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 text-slate-700 border border-slate-200 font-bold shadow-sm">
                Cloud: {satelliteData.cloudCover}%
              </span>
            </div>

            {/* AI Overlay inside Side-by-Side View */}
            {showAiOverlay && (
              <div className="relative z-10 my-auto p-3.5 sm:p-4 rounded-2xl border border-[#82C91E]/40 bg-white/95 backdrop-blur-md text-xs space-y-1.5 shadow-sm">
                <div className="text-xs font-extrabold text-[#65A30D] uppercase tracking-wider border-b border-slate-100 pb-1 mb-1 flex items-center space-x-1">
                  <Cpu className="w-3.5 h-3.5 mr-1" />
                  <span>AI Computer Vision Live Detection</span>
                </div>
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>Hajm O'sishi:</span>
                  <span className="font-mono text-[#65A30D] font-black">+{satelliteData.volumeGrowthPct}%</span>
                </div>
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>Poydevor Maydoni:</span>
                  <span className="font-mono text-[#0F172A] font-extrabold">{satelliteData.builtAreaSqM.toLocaleString()} m²</span>
                </div>
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>Kranlar Soni:</span>
                  <span className="font-mono text-amber-600 font-black">{satelliteData.cranesDetected} ta active</span>
                </div>
              </div>
            )}

            <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 shadow-sm">
              <div className="flex justify-between text-slate-600 font-bold">
                <span>InSAR Poydevor Deformatsiyasi:</span>
                <span className={`font-mono font-black ${
                  selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-[#65A30D]'
                }`}>
                  {selectedProject.insarDeformation.valueMm} mm
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 4. BOTTOM KEY METRICS SUMMARY BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2 text-xs">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-bold">Boshlang'ich Sana:</span>
          <p className="text-sm sm:text-base font-extrabold text-[#0F172A] mt-0.5">{satelliteData.baselineDate}</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-bold">So'nggi Yo'ldosh Tasviri:</span>
          <p className="text-sm sm:text-base font-extrabold text-[#65A30D] mt-0.5">{satelliteData.latestPassDate}</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-bold">AI Sur'at Bahosi:</span>
          <p className="text-sm sm:text-base font-extrabold text-[#65A30D] mt-0.5">{selectedProject.aiVelocity}</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs text-slate-500 font-bold">Radar InSAR Deformatsiya:</span>
          <p className={`text-sm sm:text-base font-extrabold mt-0.5 ${
            selectedProject.insarDeformation.status === 'danger' ? 'text-rose-600' : 'text-[#65A30D]'
          }`}>
            {selectedProject.insarDeformation.valueMm} mm
          </p>
        </div>
      </div>

    </div>
  );
};
