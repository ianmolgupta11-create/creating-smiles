import React from 'react';
import { Scan, Radio, Sparkles, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CLINIC_TECHNOLOGY } from '../data/clinicData';

export const ClinicTechnology: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scan':
        return <Scan className="w-6 h-6 text-sky-600" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-sky-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default:
        return <HeartHandshake className="w-6 h-6 text-rose-500" />;
    }
  };

  return (
    <section id="technology" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Scan className="w-3.5 h-3.5 text-sky-600" />
            <span>Digital Precision & Pain-Free Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Gentle Clinic Technology & Patient Comfort
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            We have invested in the highest standard of regional healthcare equipment at 111 Bentinck Street—ensuring your visits are remarkably comfortable, fast, and clinically accurate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINIC_TECHNOLOGY.map((tech) => (
            <div
              key={tech.id}
              className="bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-4">
                  {getIcon(tech.icon)}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0f2b48]">
                  {tech.title}
                </h3>
                <p className="text-xs font-semibold text-sky-700 mt-1">
                  {tech.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 space-y-1.5">
                {tech.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
