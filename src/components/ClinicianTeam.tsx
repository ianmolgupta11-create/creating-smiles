import React from 'react';
import { Award, GraduationCap, MapPin, Calendar, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CLINICIANS } from '../data/clinicData';

interface ClinicianTeamProps {
  onBookWithDoctor: (doctorClinicianId: string) => void;
}

export const ClinicianTeam: React.FC<ClinicianTeamProps> = ({ onBookWithDoctor }) => {
  return (
    <section id="team" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            <span>Dedicated Central West Practitioners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Meet Our Specialist Clinicians & Dental Team
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Our team brings together decades of specialist orthodontic precision, university valedictorians, and compassionate regional practitioners dedicated to Bathurst families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLINICIANS.map((clinician) => (
            <div
              key={clinician.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={clinician.image}
                    alt={clinician.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b48]/90 via-[#0f2b48]/30 to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#0f2b48] text-xs font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                    {clinician.experienceYears}+ Yrs Exp
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/70 px-2 py-0.5 rounded">
                      {clinician.role}
                    </span>
                    <h3 className="text-xl font-bold mt-1 text-white leading-snug">
                      {clinician.name}
                    </h3>
                    <p className="text-xs text-sky-200 font-mono mt-0.5">
                      {clinician.degrees}
                    </p>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-white p-2.5 rounded-lg border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>{clinician.bathurstConnection}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {clinician.bio}
                  </p>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Clinical Focus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {clinician.specialInterests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-sky-900 bg-sky-100/70 border border-sky-200 px-2 py-0.5 rounded-md"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-200/60 mt-4">
                <button
                  onClick={() => onBookWithDoctor(clinician.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 hover:from-[#133659] hover:to-sky-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-sky-300" />
                  <span>Book with {clinician.name.split(' ')[1] || clinician.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
