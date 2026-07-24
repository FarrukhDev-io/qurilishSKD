'use client';

import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle2, AlertTriangle, Users, ShieldCheck, Construction, Trash2, Building2, AlertCircle } from 'lucide-react';

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
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-[#0F172A] transition-all">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-[#0F172A] flex items-center space-x-2">
            <Camera className="w-5 h-5 text-[#82C91E]" />
            <span>Smart Crowd-Sourcing & AI Photo Scanner Simulator</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Fuqarolik nazorati, GPS Geofencing va YOLOv8 Computer Vision foto skaneri
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-[#82C91E] text-white hover:bg-[#65A30D] shadow-md shadow-[#82C91E]/30 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Yangi Muammo Yuborish</span>
        </button>
      </div>

      {/* Auto-Clustering Indicator Feed Card */}
      <div className="p-4 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-full bg-[#82C91E] text-white shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white text-[#65A30D] border border-[#82C91E]/30 shadow-xs">
                AI Auto-Clustering Active
              </span>
              <span className="text-xs font-mono font-extrabold text-[#0F172A]">#CLK-8821</span>
            </div>
            <p className="text-xs font-extrabold text-[#0F172A] mt-1 flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-1" />
              <span>5 ta fuqaro murojaati 1 ta Klaster Murojaatga biriktirildi (#CLK-8821)</span>
            </p>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">
              Joylashuv: Registon Bufer Zonasi • Bir xil geo-poligonda 5 marta foto signal tushgan
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#65A30D] border border-[#82C91E]/40 text-xs font-extrabold flex items-center space-x-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
            <span>Hokimiyatga Yuborilgan</span>
          </span>
        </div>
      </div>

      {/* Interactive AI Photo Scanner Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Sample Selector */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <Camera className="w-4 h-4 text-[#82C91E]" />
            <span>Namuna Foto Qoidabuzarliklar:</span>
          </h3>

          <div className="space-y-2">
            <button
              onClick={() => { setSelectedSample('fence'); handleScan(); }}
              className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                selectedSample === 'fence'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="flex items-center space-x-1.5">
                  <Construction className="w-4 h-4 text-rose-500" />
                  <span>Xavfsizlik To'sig'i Yo'qligi</span>
                </span>
                <span className="text-[10px] text-rose-600 font-mono font-bold">96.8%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Registon Bufer Zonasi, qurilish maydoni</p>
            </button>

            <button
              onClick={() => { setSelectedSample('waste'); handleScan(); }}
              className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                selectedSample === 'waste'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="flex items-center space-x-1.5">
                  <Trash2 className="w-4 h-4 text-amber-500" />
                  <span>Noqonuniy Qurilish Chiqindisi</span>
                </span>
                <span className="text-[10px] text-amber-600 font-mono font-bold">93.4%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Silk Road Samarkand, 2-Zona</p>
            </button>

            <button
              onClick={() => { setSelectedSample('height'); handleScan(); }}
              className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                selectedSample === 'height'
                  ? 'bg-[#F7FEE7] border-[#82C91E] text-[#0F172A] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-rose-500" />
                  <span>YUNESKO Balandlik Me'yori</span>
                </span>
                <span className="text-[10px] text-rose-600 font-mono font-bold">98.9%</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Tarixiy markaz, 12m limit oshilgan</p>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-[#65A30D] font-extrabold">
              <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
              <span>GPS Geofence & EXIF Verification</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Foto yuborilganda smartfon GPS koordinatalari va EXIF meta-ma'lumotlari avtomatik ravishda qurilish poligoni bilan solishtiriladi.
            </p>
          </div>
        </div>

        {/* Right: AI Scanner Canvas Frame */}
        <div className="lg:col-span-2 relative h-[390px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm flex flex-col justify-between p-6">
          
          {/* Top Status Bar & EXIF Verified Badge */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
            <span className="px-3.5 py-1 text-xs font-extrabold rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/30 shadow-xs inline-flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#82C91E]" />
              <span>{current.location}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-mono font-extrabold shadow-xs">
              YOLOv8 AI Scanner Active
            </span>
          </div>

          {/* Scanning Animation Line */}
          {isScanning && (
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#82C91E] to-transparent animate-pulse shadow-md z-20 top-1/2" />
          )}

          {/* AI Bounding Box Overlay */}
          <div className="relative z-10 my-auto text-center">
            <div
              className="relative mx-auto rounded-2xl border-2 border-[#82C91E] bg-white/95 p-5 shadow-lg transition-all duration-300"
              style={{ width: '88%', minHeight: '180px' }}
            >
              <div className="absolute -top-3 left-4 px-3 py-0.5 bg-[#82C91E] text-white font-mono text-[10px] font-extrabold rounded-full shadow-xs">
                YOLOv8 Detection Box • {current.confidence} AI Confidence
              </div>

              <div className="flex flex-col justify-center items-center h-full pt-3 space-y-2">
                <span className="text-sm font-extrabold text-[#0F172A] flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500 inline mr-1" />
                  <span>{current.violation}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-mono text-xs border border-rose-200 font-bold">
                  Status: {current.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 font-mono pt-2 border-t border-slate-200 font-bold">
            <span>Model: YOLOv8x-Seg Fine-tuned</span>
            <span className="text-[#65A30D] font-extrabold">Auto-Forwarded to Inspeksiya API</span>
          </div>

        </div>

      </div>

    </div>
  );
};
