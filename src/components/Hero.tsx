import React from 'react';
import { Calendar, Shield, Award, Sparkles, Clock, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onSelectServiceAndBook: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectServiceAndBook, onOpenBooking }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -mr-20"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Pitch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs sm:text-sm font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
              <span>Bathurst’s Specialist Practice • Serving Families Since 1956</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2b48] tracking-tight leading-[1.15]">
              Confidence Begins with a <span className="text-sky-600 underline decoration-sky-300 decoration-wavy decoration-2">Great Smile</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              Welcome to <strong>Creating Great Smiles</strong>, Bathurst’s premier specialist orthodontic and comprehensive dental practice. Led by <strong>Dr. Emma Bowman</strong> and our experienced clinical team at 111 Bentinck Street, we combine cutting-edge 3D digital technology with gentle, patient-focused care for kids, teens, and adults across the Central West.
            </p>

            {/* Key Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Referral Required</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3D Digital Scans (No Putty)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>All Health Funds & HICAPS</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Child Dental CDBS Welcome</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Only Full-Time Ortho in Bathurst</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Interest-Free Payment Plans</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white font-bold text-base shadow-lg shadow-sky-950/20 hover:from-[#133659] hover:to-sky-800 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-sky-300" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href={CLINIC_INFO.phoneHref}
                className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-base hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>(02) 6331 2788</span>
              </a>
            </div>

            {/* Social Proof Mini Bar */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center text-amber-400">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="text-base">★</span>
                ))}
              </div>
              <span className="font-bold text-slate-900">4.9 / 5.0 Star Rating</span>
              <span className="text-slate-400">•</span>
              <span>Central West NSW Patients & Families</span>
            </div>
          </div>

          {/* Right Column: Quick Visit Pre-Selector & Practice Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl shadow-slate-200/70 border border-slate-200 relative">
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Clinic Status
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Mon–Fri: 7:30 AM – 5:30 PM</span>
                </div>
              </div>

              {/* Widget Title */}
              <div className="mt-4 mb-3">
                <h2 className="text-lg font-bold text-[#0f2b48]">
                  Quick Visit Pre-Selector
                </h2>
                <p className="text-xs text-slate-600">
                  Select your appointment type to jump straight to available clinician slots in Bathurst:
                </p>
              </div>

              {/* Service Fast Buttons */}
              <div className="space-y-2.5 my-4">
                <button
                  onClick={() => onSelectServiceAndBook('invisalign-aligners')}
                  className="w-full p-3 rounded-xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100/70 hover:border-sky-300 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f2b48] group-hover:text-sky-700">
                        Invisalign® Clear Aligners Consult
                      </div>
                      <div className="text-xs text-slate-500">Includes 3D digital scan & outcome simulator</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectServiceAndBook('metal-ceramic-braces')}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-sky-300 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0f2b48] text-white flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f2b48] group-hover:text-sky-700">
                        Braces Assessment (Teens & Adults)
                      </div>
                      <div className="text-xs text-slate-500">Metal or discreet clear ceramic options</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectServiceAndBook('checkup-clean')}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-sky-300 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0f2b48] group-hover:text-sky-700">
                        Comprehensive Dental Exam & Clean
                      </div>
                      <div className="text-xs text-slate-500">Ultrasonic scaling, polish & low-dose X-rays</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectServiceAndBook('emergency-relief')}
                  className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0">
                      <span className="font-black text-xs">SOS</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-rose-900 group-hover:text-rose-950">
                        Emergency Dental or Orthodontic Pain
                      </div>
                      <div className="text-xs text-rose-700">Poking wire, broken bracket, severe toothache</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Bottom Address snippet */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>111 Bentinck St, Bathurst NSW</span>
                <span className="text-sky-700 font-semibold">Free on-street parking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
