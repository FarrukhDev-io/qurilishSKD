'use client';

import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { EXECUTIVE_STATS, SAMARQAND_PROJECTS } from '../../data/samarqandProjects';
import confetti from 'canvas-confetti';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsDownloaded(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#0F172A]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-2xl bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 shadow-xs">
              <FileText className="w-6 h-6 text-[#82C91E]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">AI Avtomatik Hisobot Generatori</h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">Samarqand Viloyat Hokimligi va Qurilish Nazorati uchun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Preview Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs font-sans">
          
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-5">
            
            <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] uppercase tracking-wider">
                  O'ZBEKISTON RESPUBLIKASI SAMARQAND VILOYATI HOKIMLIGI
                </h4>
                <p className="text-xs text-[#65A30D] font-extrabold mt-1">
                  UrbanPulse Samarqand — AI & Satellite Progress Monitoring Platformasi
                </p>
              </div>
              <div className="text-right">
                <span className="px-3.5 py-1 rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-mono text-xs font-extrabold shadow-xs">
                  UP-2026/07-42
                </span>
                <p className="text-xs text-slate-500 font-bold mt-1">Sana: 2026-yil 24-iyul</p>
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-600 font-bold text-xs sm:text-sm">
                Ushbu hisobot Sentinel-2A/2B optik va Sentinel-1 InSAR radar yo'ldoshlarining so'nggi tasvirlari hamda YOLOv8 sun'iy intellekt modellarining avtomatik tahlili asosida shakllantirildi.
              </p>

              {/* Summary Stats Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-slate-500 text-xs font-bold">Ob'ektlar Soni:</span>
                  <p className="font-extrabold text-[#0F172A] text-base mt-0.5">{EXECUTIVE_STATS.totalProjects} ta</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs">
                  <span className="text-slate-500 text-xs font-bold">Jami Byudjet:</span>
                  <p className="font-extrabold text-[#65A30D] text-base mt-0.5">{EXECUTIVE_STATS.monitoredBudget}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 shadow-xs">
                  <span className="text-slate-500 text-xs font-bold">Red Flaglar:</span>
                  <p className="font-extrabold text-rose-700 text-base mt-0.5">{EXECUTIVE_STATS.redFlagsCount} ta</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 shadow-xs">
                  <span className="text-slate-500 text-xs font-bold">AI Aniqligi:</span>
                  <p className="font-extrabold text-purple-700 text-base mt-0.5">{EXECUTIVE_STATS.aiModelConfidence}</p>
                </div>
              </div>

              {/* Red Flag Details */}
              <div className="pt-3 space-y-2.5">
                <h5 className="font-extrabold text-[#0F172A] uppercase tracking-wide text-xs flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 mr-1" />
                  <span>Kechikayotgan va Ogohlantirish Olgan Ob'ektlar:</span>
                </h5>
                <div className="space-y-2">
                  {SAMARQAND_PROJECTS.filter(p => p.status !== 'on_schedule').map(p => (
                    <div key={p.id} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-extrabold text-rose-800 text-xs sm:text-sm">{p.name}</p>
                        <p className="text-xs text-slate-500 font-bold mt-0.5">Pudratchi: {p.contractor} | {p.insarDeformation.details}</p>
                      </div>
                      <span className="font-mono text-rose-700 font-black text-xs sm:text-sm shrink-0 ml-2">{p.actualProgress}% / {p.plannedProgress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Signature Badge */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
                <div className="flex items-center space-x-2 text-[#65A30D]">
                  <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
                  <span>Raqamli AI Shtamp: Hash #99A-481D-2026-SAMARQAND</span>
                </div>
                <span>Tizim tomonidan avtomatik tasdiqlangan</span>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Bekor Qilish
          </button>

          <div className="flex items-center space-x-3">
            {isDownloaded ? (
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#65A30D] font-extrabold px-6 py-3 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#82C91E]" />
                <span>PDF Muvaffaqiyatli Yuklab Olindi!</span>
              </div>
            ) : (
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 flex items-center space-x-2 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin text-white" />
                    <span>AI PDF Tayyorlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Rasmiy PDF Hisobotni Yuklab Olish</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
