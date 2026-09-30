import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1d30] text-slate-300 pt-16 pb-12 border-t border-sky-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Bathurst Legacy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-md">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 8 .5 1.5 1 3 1.5 5 1 .5 2 .5 2 0 .5-2 1-3.5 1.5-5 1-3 2.5-5 2.5-8 0-3.5-2.5-6-6-6z" />
                  <path d="M9 10c1.5 1.5 4.5 1.5 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Creating Great Smiles
                </h3>
                <p className="text-xs font-semibold text-sky-400">
                  Bathurst Orthodontics & Dental • Est. 1956
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bathurst’s only full-time specialist orthodontic and dental practice, serving the Central West since 1956. Led by Dr. Emma Bowman, delivering exceptional orthodontic transformations and gentle family dentistry.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>111 Bentinck Street, Bathurst NSW 2795</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={CLINIC_INFO.phoneHref} className="hover:text-white font-semibold">
                  (02) 6331 2788
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Clinical Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Services & Treatments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Invisalign® Clear Aligners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Metal & Clear Ceramic Braces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Early Interceptive Orthodontics (Ages 7–11)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Comprehensive Exam & Ultrasonic Clean
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Orthodontic Retainers & Relapse Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sports Mouthguards & Night Guards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('triage')}
                  className="text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer text-left"
                >
                  Emergency Dental & Ortho Relief
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Practice
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Dr. Emma Bowman
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Our Dental Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Health Fund Fees
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cases')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Before & After Cases
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technology')} className="hover:text-white transition-colors cursor-pointer text-left">
                  3D Scanner Tech
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Patient Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours & Emergency (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Bathurst Clinic Hours
            </h4>
            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Monday – Friday:</span>
                <span className="font-semibold text-white">7:30 AM – 5:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span>Saturday – Sunday:</span>
                <span className="text-amber-400 font-semibold">Closed (On-Call)</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Emergency On-Call:
              </span>
              <a
                href={CLINIC_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (02) 6331 2788 for Urgent Care</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Indigenous Land Acknowledgment */}
        <div className="py-6 border-b border-slate-800 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-amber-300/90 font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Acknowledgment of Country</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Creating Great Smiles acknowledges the <strong>Wiradjuri people</strong>, the Traditional Custodians of the land on which our Bathurst practice stands. We pay our deep respects to Elders past, present, and emerging, and celebrate the enduring contributions of Aboriginal and Torres Strait Islander peoples to the Central West region.
          </p>
        </div>

        {/* Copyright and Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Creating Great Smiles Bathurst. All rights reserved. Operating since 1956.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400">AS/NZS 4815 Infection Control Certified</span>
            <span>•</span>
            <span className="text-slate-400">HICAPS Electronic Claims</span>
            <span>•</span>
            <span className="text-slate-400">ADA & ASO Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
