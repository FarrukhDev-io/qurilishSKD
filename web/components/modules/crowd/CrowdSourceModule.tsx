'use client';

import React, { useState } from 'react';
import {
  Camera, MapPin, CheckCircle2, AlertTriangle,
  Users, ShieldCheck, Construction, Trash2,
  Building2, AlertCircle, UploadCloud, Cpu, Zap
} from 'lucide-react';

interface CrowdSourceModuleProps {
  onOpenReportModal: () => void;
}

const SAMPLES = {
  fence: {
    title: "Xavfsizlik To'sig'i Yo'qligi",
    location: "Registon Bufer Zonasi · EXIF Match Verified",
    confidence: 96.8,
    violation: "Xavfsizlik to'sig'i va himoya to'ri o'rnatilmagan",
    status: "Yuqori Xavf (Red Flag)",
    severity: 'high' as const,
    icon: <Construction className="w-4 h-4 text-rose-500 shrink-0" />,
    tag: "Xavfsizlik",
  },
  waste: {
    title: "Noqonuniy Qurilish Chiqindisi",
    location: "Silk Road Samarkand 2-Zona · EXIF Match Verified",
    confidence: 93.4,
    violation: "Qurilish chiqindilari ruxsat etilmagan joyda to'plangan",
    status: "O'rta Xavf",
    severity: 'medium' as const,
    icon: <Trash2 className="w-4 h-4 text-amber-500 shrink-0" />,
    tag: "Chiqindi",
  },
  height: {
    title: "YUNESKO Balandlik Me'yori Buzilishi",
    location: "Tarixiy Markaz Bufer Zonasi · EXIF Match Verified",
    confidence: 98.9,
    violation: "Maksimal ruxsat berilgan 12m balandlikdan 2.8m oshib ketgan",
    status: "YUNESKO Qoidabuzarligi",
    severity: 'critical' as const,
    icon: <Building2 className="w-4 h-4 text-rose-500 shrink-0" />,
    tag: "UNESCO Zona",
  },
} as const;

type SampleKey = keyof typeof SAMPLES;

export const CrowdSourceModule: React.FC<CrowdSourceModuleProps> = ({ onOpenReportModal }) => {
  const [selectedSample, setSelectedSample] = useState<SampleKey>('fence');
  const [isScanning, setIsScanning] = useState(false);

  const current = SAMPLES[selectedSample];

  const handleSelect = (key: SampleKey) => {
    setSelectedSample(key);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  const severityColors = {
    high: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700 border-rose-200' },
    medium: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
    critical: { bg: 'bg-rose-50', border: 'border-rose-300', text: 'text-rose-800', badge: 'bg-rose-100 text-rose-800 border-rose-300' },
  };

  const sc = severityColors[current.severity];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden text-[#0F172A]">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/30 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5 text-[#82C91E]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">SMART CROWD-SOURCING & FUQAROLIK NAZORATI</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">GPS Geofence · EXIF Match Verified · YOLOv8 Computer Vision</p>
          </div>
          <span className="hidden lg:block bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wide shrink-0">
            AI PHOTO SCANNER
          </span>
        </div>
        <button
          onClick={onOpenReportModal}
          className="px-6 py-3 rounded-xl text-sm font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer min-h-[44px] shrink-0"
        >
          <UploadCloud className="w-4 h-4" />
          Yangi Muammo Yuborish
        </button>
      </div>

      {/* ── CLUSTERING BANNER ─────────────────────────────────────── */}
      <div className="px-6 py-4 bg-[#F7FEE7] border-b border-[#82C91E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#82C91E] flex items-center justify-center shadow-md shadow-[#82C91E]/30 shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold uppercase bg-white text-[#82C91E] border border-[#82C91E]/30">
                AI Auto-Clustering Active
              </span>
              <span className="text-xs font-mono font-extrabold text-[#0F172A]">#CLK-8821</span>
            </div>
            <p className="text-xs font-bold text-[#0F172A] mt-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              5 ta fuqaro murojaati 1 ta klasterga biriktirildi
              <span className="text-slate-500 font-medium">· Registon Bufer Zonasi</span>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#82C91E] border border-[#82C91E]/30 text-xs font-extrabold shadow-xs shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          Inspeksiyaga Yuborilgan
        </span>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[500px]">

        {/* ── LEFT: Sample list ── */}
        <div className="p-6 border-r border-slate-100 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#82C91E]" />
            Namuna Foto Qoidabuzarliklar
          </h3>

          <div className="space-y-3">
            {(Object.entries(SAMPLES) as [SampleKey, typeof SAMPLES[SampleKey]][]).map(([key, data]) => {
              const isActive = selectedSample === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer min-h-[44px] ${
                    isActive
                      ? 'bg-[#F7FEE7] border-[#82C91E] shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A]">
                      {data.icon}
                      <span className="leading-tight">{data.title}</span>
                    </div>
                    <span className={`text-xs font-mono font-black shrink-0 ${
                      data.severity === 'critical' ? 'text-rose-600' :
                      data.severity === 'high' ? 'text-rose-500' : 'text-amber-600'
                    }`}>
                      {data.confidence}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-slate-500 font-medium">{data.tag}</p>
                    {/* confidence bar */}
                    <div className="flex-1 max-w-[80px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${data.severity === 'medium' ? 'bg-amber-400' : 'bg-rose-500'}`}
                        style={{ width: `${data.confidence}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* EXIF info box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 mt-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#82C91E]">
              <ShieldCheck className="w-4 h-4" />
              GPS Geofence & EXIF Verification
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Foto yuborilganda smartfon GPS koordinatalari va EXIF meta-ma'lumotlari avtomatik ravishda qurilish poligoni bilan solishtiriladi.
            </p>
          </div>
        </div>

        {/* ── RIGHT: AI Scanner canvas ── */}
        <div className="lg:col-span-2 flex flex-col">

          {/* Scanner header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-[#82C91E] animate-pulse' : 'bg-slate-300'}`} />
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                YOLOv8 Scanner {isScanning ? '— Scanning...' : '— Ready'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#82C91E]" />
              <span className="text-xs font-bold text-[#82C91E] truncate max-w-[240px]">{current.location}</span>
            </div>
          </div>

          {/* Main scanner area */}
          <div className="flex-1 relative bg-slate-50 p-6 flex flex-col gap-5">

            {/* Scanning line animation */}
            {isScanning && (
              <div
                className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#82C91E] to-transparent z-20 shadow-lg"
                style={{ animation: 'scanLine 0.8s ease-in-out', top: '50%' }}
              />
            )}

            {/* Detection box */}
            <div className={`relative rounded-2xl border-2 ${sc.border} ${sc.bg} p-6 shadow-sm`}>
              {/* Label chip */}
              <div className="absolute -top-4 left-5 flex items-center gap-2">
                <span className="px-3 py-1.5 bg-[#82C91E] text-white font-mono text-[11px] font-extrabold rounded-xl shadow-sm flex items-center gap-1.5">
                  <Cpu className="w-3 h-3" />
                  YOLOv8 Detection Box · {current.confidence}% AI Confidence
                </span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base font-extrabold text-[#0F172A]">{current.violation}</p>
                      <span className={`inline-block mt-1.5 px-3 py-1 rounded-lg text-xs font-black border ${sc.badge}`}>
                        Status: {current.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confidence circle */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div className={`w-20 h-20 rounded-full border-4 ${sc.border} flex flex-col items-center justify-center ${sc.bg}`}>
                    <span className={`text-2xl font-extrabold font-mono ${sc.text}`}>{current.confidence}%</span>
                    <span className="text-[10px] font-bold text-slate-500">AI Confidence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Model', value: 'YOLOv8x-Seg', icon: <Cpu className="w-3.5 h-3.5 text-[#82C91E]" /> },
                { label: 'GPS Match', value: 'EXIF Verified', icon: <MapPin className="w-3.5 h-3.5 text-emerald-500" /> },
                { label: 'Yo\'nalish', value: 'Inspeksiya API', icon: <Zap className="w-3.5 h-3.5 text-amber-500" /> },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-3.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-semibold mb-1.5">
                    {stat.icon}
                    {stat.label}
                  </div>
                  <p className="text-xs font-extrabold text-[#0F172A] font-mono">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Auto-forward note */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F7FEE7] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-[#0F172A]">AI Auto-Forward to Inspeksiya API</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Yuqori ishonch darajasidagi natijalar avtomatik inspeksiya tizimiga yuborildi</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
