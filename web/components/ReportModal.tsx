'use client';

import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { EXECUTIVE_STATS, SAMARQAND_PROJECTS } from '../data/samarqandProjects';
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 shadow-xs">
              <FileText className="w-5 h-5 text-[#82C91E]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A]">AI Avtomatik Hisobot Generatori</h3>
              <p className="text-xs text-slate-500 font-medium">Samarqand Viloyat Hokimligi va Qurilish Nazorati uchun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Preview Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs font-sans">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            
            <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
              <div>
                <h4 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider">
                  O'ZBEKISTON RESPUBLIKASI SAMARQAND VILOYATI HOKIMLIGI
                </h4>
                <p className="text-[11px] text-[#65A30D] font-extrabold mt-0.5">
                  UrbanPulse Samarqand — AI & Satellite Progress Monitoring Platformasi
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-[#F7FEE7] text-[#65A30D] border border-[#82C91E]/40 font-mono text-[10px] font-extrabold shadow-xs">
                  UP-2026/07-42
                </span>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Sana: 2026-yil 24-iyul</p>
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-3">
              <p className="leading-relaxed text-slate-600 font-medium">
                Ushbu hisobot Sentinel-2A/2B optik va Sentinel-1 InSAR radar yo'ldoshlarining so'nggi tasvirlari hamda YOLOv8 sun'iy intellekt modellarining avtomatik tahlili asosida shakllantirildi.
              </p>

              {/* Summary Stats Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] font-bold">Ob'ektlar Soni:</span>
                  <p className="font-extrabold text-[#0F172A] text-sm mt-0.5">{EXECUTIVE_STATS.totalProjects} ta</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs">
                  <span className="text-slate-500 text-[10px] font-bold">Jami Byudjet:</span>
                  <p className="font-extrabold text-[#65A30D] text-sm mt-0.5">{EXECUTIVE_STATS.monitoredBudget}</p>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] font-bold">Red Flaglar:</span>
                  <p className="font-extrabold text-rose-700 text-sm mt-0.5">{EXECUTIVE_STATS.redFlagsCount} ta</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 shadow-xs">
                  <span className="text-slate-500 text-[10px] font-bold">AI Aniqligi:</span>
                  <p className="font-extrabold text-purple-700 text-sm mt-0.5">{EXECUTIVE_STATS.aiModelConfidence}</p>
                </div>
              </div>

              {/* Red Flag Details */}
              <div className="pt-3 space-y-2">
                <h5 className="font-extrabold text-[#0F172A] uppercase tracking-wide text-[11px] flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 mr-1" />
                  <span>Kechikayotgan va Ogohlantirish Olgan Ob'ektlar:</span>
                </h5>
                <div className="space-y-2">
                  {SAMARQAND_PROJECTS.filter(p => p.status !== 'on_schedule').map(p => (
                    <div key={p.id} className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-extrabold text-rose-800">{p.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">Pudratchi: {p.contractor} | {p.insarDeformation.details}</p>
                      </div>
                      <span className="font-mono text-rose-700 font-extrabold text-xs shrink-0 ml-2">{p.actualProgress}% / {p.plannedProgress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Signature Badge */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-bold">
                <div className="flex items-center space-x-1.5 text-[#65A30D]">
                  <ShieldCheck className="w-4 h-4 text-[#82C91E]" />
                  <span>Raqamli AI Shtamp: Hash #99A-481D-2026-SAMARQAND</span>
                </div>
                <span>Tizim tomonidan avtomatik tasdiqlangan</span>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Bekor Qilish
          </button>

          <div className="flex items-center space-x-3">
            {isDownloaded ? (
              <div className="flex items-center space-x-2 text-xs text-[#65A30D] font-extrabold px-5 py-2.5 rounded-full bg-[#F7FEE7] border border-[#82C91E]/40 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#82C91E]" />
                <span>PDF Muvaffaqiyatli Yuklab Olindi!</span>
              </div>
            ) : (
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="px-6 py-3 rounded-full text-xs font-extrabold bg-[#82C91E] hover:bg-[#65A30D] text-white transition-all shadow-md shadow-[#82C91E]/30 flex items-center space-x-2 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                    <span>AI PDF Tayyorlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
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
