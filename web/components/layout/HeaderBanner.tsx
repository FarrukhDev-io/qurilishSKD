'use client';

import React from 'react';

export interface HeaderBannerProps {
  activeRole?: 'hokimiyat' | 'fuqaro' | 'pudratchi';
}

export const HeaderBanner: React.FC<HeaderBannerProps> = React.memo(function HeaderBanner({
  activeRole = 'hokimiyat'
}) {
  const roleConfig = {
    hokimiyat: {
      badge: "Hokimiyat & Inspeksiya Portali",
      title: "Samarqand Shahri Qurilish Monitoringi",
      subtitle: "Sentinel-1/2 yo'ldosh, InSAR radar va AI Computer Vision texnologiyalari yordamida Samarqand shahrining shaffof va real-vaqt rejimida shaharsozlik nazorati.",
      stat1Label: "Ob'ektlar",
      stat1Val: "42+",
      stat2Label: "AI Aniqlik",
      stat2Val: "94.2%",
      stat3Label: "Sentinel",
      stat3Val: "154+",
    },
    fuqaro: {
      badge: "Fuqarolar Nazorati Portali",
      title: "Samarqand Shahri Fuqarolar Qurilish Nazorati",
      subtitle: "Har bir fuqaro shahar qurilish jarayonlarini real vaqt rejimida kuzatishi, foto-murojaatlar yuborishi hamda shaffof nazoratda qatnashishi mumkin.",
      stat1Label: "Murojaatlar",
      stat1Val: "142+",
      stat2Label: "Hal Qilingan",
      stat2Val: "83.7%",
      stat3Label: "AI Klaster",
      stat3Val: "14+",
    },
    pudratchi: {
      badge: "Pudratchi Tashkilotlar Kabineti",
      title: "Samarqand Pudratchi Monitoring Kabineti",
      subtitle: "Pudratchi tashkilotlar uchun rejadagi va amaldagi progressni Sentinel AI tahlillari bilan solishtirish hamda hisobot topshirish tizimi.",
      stat1Label: "Loyihalar",
      stat1Val: "42+",
      stat2Label: "Sur'at",
      stat2Val: "+2.4%/h",
      stat3Label: "Byudjet",
      stat3Val: "$38.5M",
    },
  };

  const current = roleConfig[activeRole] || roleConfig.hokimiyat;

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] overflow-x-hidden relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* LEFT — Title & Subtitle */}
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="pill-3d-active px-3 py-1 text-xs font-black uppercase tracking-wider">
                {current.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              {current.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
              {current.subtitle}
            </p>
          </div>

          {/* RIGHT — Clean Dynamic Stats */}
          <div className="flex items-center space-x-5 card-3d p-4 sm:p-5 shrink-0">
            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">{current.stat1Label}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">{current.stat1Val}</p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">{current.stat2Label}</p>
              <p className="text-[#65A30D] text-2xl sm:text-3xl font-extrabold mt-1">{current.stat2Val}</p>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="text-center px-3">
              <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-wider">{current.stat3Label}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">{current.stat3Val}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});
