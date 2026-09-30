import React, { useState } from 'react';
import { AlertCircle, Phone, ArrowRight, ShieldAlert, CheckCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { SYMPTOM_TRIAGE_ITEMS, CLINIC_INFO } from '../data/clinicData';

interface SymptomTriageProps {
  onBookEmergency: (serviceId: string) => void;
}

export const SymptomTriage: React.FC<SymptomTriageProps> = ({ onBookEmergency }) => {
  const [selectedIssueId, setSelectedIssueId] = useState<string>(SYMPTOM_TRIAGE_ITEMS[0].id);

  const activeIssue = SYMPTOM_TRIAGE_ITEMS.find((item) => item.id === selectedIssueId) || SYMPTOM_TRIAGE_ITEMS[0];

  return (
    <section id="triage" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency & Symptom Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Patient Symptom & Emergency Triage Guide
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Experiencing pain, a loose bracket, or sudden tooth damage? Select your symptom below to find clinical guidance, immediate at-home care steps, and prompt priority relief in Bathurst.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Symptom selector buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Your Current Dental Concern:
            </label>

            {SYMPTOM_TRIAGE_ITEMS.map((item) => {
              const isSelected = selectedIssueId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIssueId(item.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#0f2b48] bg-white shadow-md ring-2 ring-sky-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#0f2b48]">
                      {item.title}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white shrink-0 ${item.badgeBg}`}
                    >
                      {item.severity.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.symptoms.join(', ')}
                  </div>
                </button>
              );
            })}

            {/* Quick emergency call card */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 mt-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs uppercase tracking-wide text-rose-900">
                  Immediate Dental Advice
                </div>
                <div className="text-xs text-rose-700">
                  Call our Bathurst team directly at (02) 6331 2788
                </div>
              </div>
              <a
                href={CLINIC_INFO.phoneHref}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Clinical Guidance & At-Home Protocol (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span
                  className={`inline-block text-xs font-extrabold uppercase px-2.5 py-0.5 rounded text-white mb-2 ${activeIssue.badgeBg}`}
                >
                  Urgency: {activeIssue.severity}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                  {activeIssue.title}
                </h3>
              </div>
            </div>

            {/* What it means */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                What It Means
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {activeIssue.whatItMeans}
              </p>
            </div>

            {/* What to do right now at home */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Immediate Action Steps (What to do at Home):
              </h4>
              <ul className="space-y-2.5">
                {activeIssue.whatToDoNow.map((stepText, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-200/70 text-xs sm:text-sm text-slate-800"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{stepText}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <a
                href={CLINIC_INFO.phoneHref}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call (02) 6331 2788</span>
              </a>

              <button
                onClick={() => onBookEmergency(activeIssue.recommendedServiceId)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Book Priority Relief Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
