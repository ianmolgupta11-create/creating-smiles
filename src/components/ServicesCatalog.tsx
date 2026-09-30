import React, { useState } from 'react';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { ServiceCategory } from '../types/dental';

interface ServicesCatalogProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'orthodontics', label: 'Specialist Orthodontics' },
    { id: 'general', label: 'General & Preventative' },
    { id: 'emergency', label: 'Emergency Relief' },
    { id: 'kids', label: 'Kids & Sports Protection' },
    { id: 'cosmetic', label: 'Cosmetic & Whitening' }
  ];

  const filtered = SERVICES.filter((s) => {
    if (activeTab === 'all') return true;
    return s.category === (activeTab as ServiceCategory);
  });

  return (
    <section id="services" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Comprehensive Clinical Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Specialist Orthodontics & Family Dental Care
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            From modern Invisalign® aligners and ceramic braces to gentle preventative cleans and same-day emergency relief at 111 Bentinck Street, Bathurst.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-[#0f2b48] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded">
                    {service.categoryLabel}
                  </span>
                  {service.popular && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Popular Choice
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-lg sm:text-xl text-[#0f2b48] leading-snug">
                  {service.name}
                </h3>
                <p className="text-xs font-semibold text-sky-700 mt-1">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features checklist */}
                <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-200">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 stroke-[2.5]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom: Duration, Price & CTA */}
              <div className="pt-4 mt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~{service.durationMinutes} mins
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase">Guide Fee</span>
                    <div className="font-extrabold text-base text-[#0f2b48]">
                      ${service.guidePrice}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 hover:from-[#133659] hover:to-sky-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
