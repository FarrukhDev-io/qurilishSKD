'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, MapPin, CheckCircle2, Sparkles, Camera, Construction, Trash2, Building2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden transition-all text-[#0F172A]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A]">Qurilish Qoidabuzarligini Bildirish</h3>
              <p className="text-xs text-slate-500 font-medium">Smart Crowd-Sourcing & GPS Geofence Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 flex items-center justify-center text-[#65A30D] shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#82C91E] animate-bounce" />
            </div>
            <h4 className="text-lg font-extrabold text-[#0F172A]">Murojaatingiz Qabul Qilindi!</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Murojaatingiz AI tomonidan tasdiqlandi va mas'ul Samarqand Qurilish Nazorati inspektoriga avtomatik yo'naltirildi.
            </p>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-extrabold text-[#65A30D]">
              Murojaat ID: #CLK-8821 (1 ta Klaster Murojaatga biriktirildi)
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-sans">
            
            {/* GPS Geofence & EXIF Badge */}
            <div className="p-3 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/40 flex items-center justify-between text-[#65A30D] shadow-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#82C91E]" />
                <span className="font-extrabold">{locationName}</span>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-extrabold">Muammo Turi:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#82C91E] transition-colors"
              >
                <option value="xavfsizlik">Xavfsizlik to'sig'i yoki kaska yo'qligi</option>
                <option value="chiqindi">Ruxsat etilmagan qurilish chiqindisi</option>
                <option value="balandlik">YUNESKO balandlik normasi buzilishi</option>
                <option value="shovqin">Shovqin yoki noqonuniy tungi ishlar</option>
              </select>
            </div>

            {/* Photo Upload / Scanner Area */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-extrabold">Fotosurat Yuklash & AI Skaner:</label>
              
              <div className="relative p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 hover:border-[#82C91E] transition-all text-center space-y-2">
                
                {aiVerified ? (
                  <div className="p-3 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/40 text-left space-y-1">
                    <div className="flex items-center justify-between text-[#65A30D] font-extrabold">
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-[#82C91E]" />
                        <span>AI YOLOv8 Skaner Natijasi:</span>
                      </span>
                      <span className="text-xs font-mono font-extrabold text-[#65A30D]">96.8% Ishonch</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 inline mr-1" />
                      <span>Xavfsizlik to'sig'i mavjud emas (Registon Bufer Zonasi poligonida aniqlandi).</span>
                    </p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="py-4 space-y-2">
                    <Sparkles className="w-6 h-6 mx-auto text-[#82C91E] animate-spin" />
                    <p className="text-xs text-[#65A30D] font-extrabold">AI Computer Vision Rasm Tahlil Qilmoqda...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-8 h-8 mx-auto text-slate-400" />
                    <p className="text-slate-500 text-xs font-medium">
                      Rasm yuklang yoki kameradan oling (EXIF joylashuvi avtomatik tekshiriladi)
                    </p>
                    <button
                      type="button"
                      onClick={handleSimulateScan}
                      className="px-4 py-2 rounded-full text-xs font-extrabold bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 hover:bg-[#ECFCCB] transition-all cursor-pointer inline-flex items-center space-x-1.5"
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
              <label className="block text-slate-700 font-extrabold">Tafsilotlar (Izoh):</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Muammo haqida qo'shimcha ma'lumot qoldiring..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-[#82C91E] transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-full font-extrabold text-xs bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Murojaatni Yuborish</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
