'use client';

import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle2, AlertTriangle, Users, ShieldCheck, Construction, Trash2, Building2, AlertCircle, UploadCloud } from 'lucide-react';

interface CrowdSourceModuleProps {
  onOpenReportModal: () => void;
}

export const CrowdSourceModule: React.FC<CrowdSourceModuleProps> = ({ onOpenReportModal }) => {
  const [selectedSample, setSelectedSample] = useState<'fence' | 'waste' | 'height'>('fence');
  const [isScanning, setIsScanning] = useState(false);

  const sampleData = {
    fence: {
      title: "Xavfsizlik To'sig'i Yo'qligi",
      location: "Registon Bufer Zonasi • EXIF Match Verified",
      confidence: "96.8%",
      violation: "Xavfsizlik to'sig'i va himoya to'ri o'rnatilmagan",
      status: "Yuqori Xavf (Red Flag)"
    },
    waste: {
      title: "Noqonuniy Qurilish Chiqindisi",
      location: "Silk Road Samarkand 2-Zona • EXIF Match Verified",
      confidence: "93.4%",
      violation: "Qurilish chiqindilari ruxsat etilmagan joyda to'plangan",
      status: "O'rta Xavf"
    },
    height: {
      title: "YUNESKO Balandlik Me'yori Buzilishi",
      location: "Tarixiy Markaz Bufer Zonasi • EXIF Match Verified",
      confidence: "98.9%",
      violation: "Maksimal ruxsat berilgan 12m balandlikdan 2.8m oshib ketgan",
      status: "YUNESKO Qoidabuzarligi"
    }
  };

  const current = sampleData[selectedSample];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 900);
  };

  return (
    <div className="p-4 sm:p-6 card-3d space-y-6 text-[#0F172A] overflow-x-hidden">
      
      {/* 1. SECTION HEADER VA SPACIOUS UI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight flex items-center space-x-2.5 flex-wrap gap-1">
            <span>SMART CROWD-SOURCING & FUQAROLIK NAZORATI</span>
            <span className="pill-3d-active px-3 py-1 text-xs font-black uppercase tracking-wider">
              AI PHOTO SCANNER
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">
            Fuqarolik nazorati, GPS Geofence EXIF Match va YOLOv8 Computer Vision foto skaneri
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-6 py-3 btn-3d-lime text-xs sm:text-sm font-extrabold flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
        >
          <UploadCloud className="w-5 h-5 text-white" />
          <span>Yangi Muammo Yuborish</span>
        </button>
      </div>

      {/* 2. AUTO-CLUSTERING INDICATOR FEED CARD */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-[#82C91E] text-white shadow-md shadow-[#82C91E]/30 shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-white text-[#82C91E] border border-[#82C91E]/30 shadow-xs">
                AI Auto-Clustering Active
              </span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-[#0F172A]">#CLK-8821 • 5 ta biriktirilgan murojaat</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[#0F172A] mt-1 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-1 shrink-0" />
              <span>5 ta fuqaro murojaati 1 ta Klaster Murojaatga biriktirildi (#CLK-8821)</span>
            </p>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              Joylashuv: Registon Bufer Zonasi • Bir xil geo-poligonda 5 marta foto signal tushgan
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-4 py-2 rounded-full bg-white text-[#82C91E] border border-[#82C91E]/40 text-xs font-extrabold flex items-center space-x-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
            <span>Inspeksiyaga Yuborilgan</span>
          </span>
        </div>
      </div>

      {/* 3. INTERACTIVE AI PHOTO SCANNER AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Sample Selector */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <Camera className="w-4 h-4 text-[#82C91E]" />
            <span>Namuna Foto Qoidabuzarliklar:</span>
          </h3>

          <div className="space-y-2.5">
            <button
              onClick={() => { setSelectedSample('fence'); handleScan(); }}
              className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer min-h-[44px] ${
                selectedSample === 'fence'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold">
                <span className="flex items-center space-x-2">
                  <Construction className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Xavfsizlik To'sig'i Yo'qligi</span>
                </span>
                <span className="text-xs text-rose-600 font-mono font-black">96.8%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-bold">Registon Bufer Zonasi, qurilish maydoni</p>
            </button>

            <button
              onClick={() => { setSelectedSample('waste'); handleScan(); }}
              className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer min-h-[44px] ${
                selectedSample === 'waste'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold">
                <span className="flex items-center space-x-2">
                  <Trash2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Noqonuniy Qurilish Chiqindisi</span>
                </span>
                <span className="text-xs text-amber-600 font-mono font-black">93.4%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-bold">Silk Road Samarkand, 2-Zona</p>
            </button>

            <button
              onClick={() => { setSelectedSample('height'); handleScan(); }}
              className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer min-h-[44px] ${
                selectedSample === 'height'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs sm:text-sm font-extrabold">
                <span className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>YUNESKO Balandlik Me'yori</span>
                </span>
                <span className="text-xs text-rose-600 font-mono font-black">98.9%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-bold">Tarixiy markaz, 12m limit oshilgan</p>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-[#82C91E] font-extrabold">
              <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
              <span>GPS Geofence & EXIF Verification</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-bold">
              Foto yuborilganda smartfon GPS koordinatalari va EXIF meta-ma'lumotlari avtomatik ravishda qurilish poligoni bilan solishtiriladi.
            </p>
          </div>
        </div>

        {/* Right: AI Scanner Canvas Frame */}
        <div className="lg:col-span-2 relative h-[360px] sm:h-[410px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm flex flex-col justify-between p-4 sm:p-6">
          
          {/* Top Status Bar & EXIF Verified Badge */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
            <span className="bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/40 rounded-full px-3.5 py-1.5 text-xs font-extrabold flex items-center space-x-1.5 shadow-xs">
              <MapPin className="w-4 h-4 text-[#82C91E]" />
              <span>{current.location}</span>
            </span>

            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-mono font-extrabold shadow-xs">
              YOLOv8 AI Scanner Active
            </span>
          </div>

          {/* Animated Lime Scanning Line */}
          {isScanning && (
            <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#82C91E] to-transparent animate-pulse shadow-md z-20 top-1/2" />
          )}

          {/* AI Bounding Box Overlay */}
          <div className="relative z-10 my-auto text-center">
            <div
              className="relative mx-auto rounded-3xl border-2 border-[#82C91E] bg-white/95 backdrop-blur-md p-4 sm:p-6 shadow-xl transition-all duration-300 w-full sm:w-[88%] min-h-[170px]"
            >
              <div className="absolute -top-3.5 left-4 sm:left-5 px-3 sm:px-4 py-1 bg-[#82C91E] text-white font-mono text-xs font-black rounded-full shadow-sm flex items-center space-x-1">
                <Camera className="w-3.5 h-3.5 inline mr-1" />
                <span>YOLOv8 Detection Box • {current.confidence} AI Confidence</span>
              </div>

              <div className="flex flex-col justify-center items-center h-full pt-4 space-y-2.5 sm:space-y-3">
                <span className="text-sm sm:text-base font-extrabold text-[#0F172A] flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-rose-500 inline mr-1 shrink-0" />
                  <span>{current.violation}</span>
                </span>
                <span className="px-4 py-1 rounded-full bg-rose-50 text-rose-700 font-mono text-xs border border-rose-200 font-black">
                  Status: {current.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 font-mono pt-2.5 border-t border-slate-200 font-bold flex-wrap gap-1">
            <span>Model: YOLOv8x-Seg Fine-tuned</span>
            <span className="text-[#82C91E] font-extrabold">Auto-Forwarded to Inspeksiya API</span>
          </div>

        </div>

      </div>

    </div>
  );
};
