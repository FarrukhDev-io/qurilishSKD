'use client';

import React from 'react';

export const Footer = React.memo(function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#0F172A]">Qurilish SKD</span>
          <span className="text-slate-400">•</span>
          <span className="font-medium text-[#64748B]">Samarqand Digital Lab Hackathon Presentation Mode</span>
        </div>
        <p>© 2026 IdeaNova Jamoasi • School 21 Digital Lab Samarkand</p>
      </div>
    </footer>
  );
});
