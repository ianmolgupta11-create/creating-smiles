import React from 'react';
import { AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface EmergencyBannerProps {
  onTriageClick: () => void;
  onBookEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onTriageClick, onBookEmergency }) => {
  return (
    <div className="bg-amber-500 text-slate-950 font-medium border-b border-amber-600/20 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-slate-950">
            <AlertCircle className="w-4 h-4 text-slate-900 inline" />
            Bathurst Dental Emergency?
          </span>
          <span className="hidden md:inline text-slate-900">
            Poking archwire, severe toothache, or broken bracket? Same-day priority relief available.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTriageClick}
            className="hover:underline flex items-center gap-1 font-semibold text-slate-900 text-xs cursor-pointer"
          >
            Symptom Triage Guide
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <span className="text-amber-800 hidden sm:inline">|</span>

          <a
            href={CLINIC_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-2.5 py-1 rounded text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Call (02) 6331 2788</span>
          </a>
        </div>
      </div>
    </div>
  );
};
