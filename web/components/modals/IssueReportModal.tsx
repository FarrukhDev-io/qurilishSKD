'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, MapPin, CheckCircle2, Sparkles, Camera, UploadCloud } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IssueReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IssueReportModal: React.FC<IssueReportModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('xavfsizlik');
  const [description, setDescription] = useState('');
  const [locationName] = useState('Registon Bufer Zonasi • GPS EXIF Match Verified');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiVerified, setAiVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiVerified(true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setAiVerified(false);
      setDescription('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      {/* 📱 MOBILE BOTTOM-SHEET DRAWER CONTAINER */}
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all text-[#0F172A] max-h-[92vh] flex flex-col">
        
        {/* Mobile Handle Bar */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto sm:hidden mt-2.5"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 shadow-xs">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A]">Qurilish Qoidabuzarligini Bildirish</h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">Smart Crowd-Sourcing & GPS Geofence Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 flex items-center justify-center text-[#82C91E] shadow-sm">
              <CheckCircle2 className="w-9 h-9 text-[#82C91E]" />
            </div>
            <h4 className="text-xl font-extrabold text-[#0F172A]">Murojaatingiz Qabul Qilindi!</h4>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              Murojaatingiz AI tomonidan tasdiqlandi va mas'ul Samarqand Qurilish Nazorati inspektoriga avtomatik yo'naltirildi.
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-extrabold text-[#82C91E]">
              Murojaat ID: #CLK-8821 (1 ta Klaster Murojaatga biriktirildi)
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-sm font-sans overflow-y-auto flex-1">
            
            {/* GPS Geofence & EXIF Badge */}
            <div className="bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/40 rounded-full px-4 py-2 text-xs font-extrabold flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#82C91E] shrink-0" />
                <span>{locationName}</span>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-slate-800 font-extrabold text-xs uppercase tracking-wider">Muammo Turi:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-[#82C91E] transition-colors text-xs sm:text-sm min-h-[44px]"
              >
                <option value="xavfsizlik">Xavfsizlik to'sig'i yoki kaska yo'qligi</option>
                <option value="chiqindi">Ruxsat etilmagan qurilish chiqindisi</option>
                <option value="balandlik">YUNESKO balandlik normasi buzilishi</option>
                <option value="shovqin">Shovqin yoki noqonuniy tungi ishlar</option>
              </select>
            </div>

            {/* Photo Upload / Scanner Dragzone (Min-H-[160px]) */}
            <div className="space-y-1.5">
              <label className="block text-slate-800 font-extrabold text-xs uppercase tracking-wider">Fotosurat Yuklash & AI Skaner:</label>
              
              <div className="relative p-5 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-[#82C91E] transition-all text-center space-y-3 min-h-[160px] flex flex-col justify-center items-center cursor-pointer">
                
                {aiVerified ? (
                  <div className="w-full p-4 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/40 text-left space-y-1.5">
                    <div className="flex items-center justify-between text-[#82C91E] font-extrabold">
                      <span className="flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-[#82C91E]" />
                        <span>AI YOLOv8 Skaner Natijasi:</span>
                      </span>
                      <span className="text-xs font-mono font-black text-[#82C91E]">96.8% Ishonch</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4 text-rose-500 inline mr-1.5 shrink-0" />
                      <span>Xavfsizlik to'sig'i mavjud emas (Registon Bufer Zonasi poligonida aniqlandi).</span>
                    </p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="py-5 space-y-2.5">
                    <Sparkles className="w-7 h-7 mx-auto text-[#82C91E] animate-spin" />
                    <p className="text-xs text-[#82C91E] font-extrabold">AI Computer Vision Rasm Tahlil Qilmoqda...</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-10 h-10 mx-auto text-[#82C91E]" />
                    <div>
                      <p className="text-slate-700 text-xs sm:text-sm font-extrabold">
                        Rasm yuklang yoki shu yerga bosing
                      </p>
                      <p className="text-slate-500 text-xs font-medium mt-0.5">
                        EXIF va GPS koordinatalar avtomatik tekshiriladi
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSimulateScan}
                      className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-[#F7FEE7] text-[#82C91E] border border-[#82C91E]/40 hover:bg-[#F7FEE7] transition-all cursor-pointer inline-flex items-center space-x-2 shadow-xs min-h-[44px]"
                    >
                      <Camera className="w-4 h-4 text-[#82C91E]" />
                      <span>Namuna Rasmni AI bilan Skaner Qilish</span>
                    </button>
                  </>
                )}

              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="block text-slate-800 font-extrabold text-xs uppercase tracking-wider">Tafsilotlar (Izoh):</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Muammo haqida qo'shimcha ma'lumot qoldiring..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:border-[#82C91E] transition-colors text-xs sm:text-sm"
              />
            </div>

            {/* 📍 STICKY BOTTOM SUBMIT BUTTON */}
            <div className="sticky bottom-0 bg-white pt-3 pb-2 border-t border-slate-100 mt-2 z-10">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-extrabold text-sm bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 active:scale-95 cursor-pointer flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <AlertTriangle className="w-5 h-5 text-white" />
                <span>Murojaatni Yuborish</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
