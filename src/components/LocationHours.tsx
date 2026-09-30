import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Car, Shield, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationHours: React.FC = () => {
  // Check if currently open in AEST/AEDT (Sydney/Bathurst time)
  const isCurrentlyOpen = (): { open: boolean; statusText: string } => {
    try {
      const now = new Date();
      // Format to Australian Eastern timezone
      const dayStr = now.toLocaleDateString('en-US', { timeZone: 'Australia/Sydney', weekday: 'short' });
      const hourStr = now.toLocaleTimeString('en-US', { timeZone: 'Australia/Sydney', hour12: false, hour: '2-digit', minute: '2-digit' });
      
      const isWeekend = dayStr === 'Sat' || dayStr === 'Sun';
      if (isWeekend) {
        return { open: false, statusText: 'Closed Now (Emergency On-Call) • Opens Monday 7:30 AM' };
      }

      const [hours, minutes] = hourStr.split(':').map((n) => parseInt(n, 10));
      const currentMin = hours * 60 + minutes;
      const openMin = 7 * 60 + 30; // 7:30 AM
      const closeMin = 17 * 60 + 30; // 5:30 PM

      if (currentMin >= openMin && currentMin < closeMin) {
        return { open: true, statusText: 'Open Today until 5:30 PM' };
      }
      return { open: false, statusText: 'Currently Closed • Opens Tomorrow 7:30 AM' };
    } catch {
      return { open: true, statusText: 'Mon–Fri: 7:30 AM – 5:30 PM' };
    }
  };

  const status = isCurrentlyOpen();

  return (
    <section id="location" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>Visit Us in Bathurst</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Location, Parking & Opening Hours
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Conveniently situated in central Bathurst with hassle-free on-street parking directly outside our practice doors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact & Hours Table (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      status.open ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      status.open ? 'bg-emerald-600' : 'bg-amber-600'
                    }`}
                  ></span>
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-900">
                  {status.statusText}
                </span>
              </div>
            </div>

            {/* Address & Parking Details */}
            <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-[#0f2b48]">Practice Address</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Central Bathurst, NSW (Near Machattie Park & Keppel Street intersection)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Car className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-[#0f2b48]">Patient Parking</h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                    {CLINIC_INFO.parking}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-[#0f2b48]">Phone & Inquiries</h3>
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="text-xs sm:text-sm font-bold text-sky-700 hover:underline block"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${CLINIC_INFO.email}`}
                    className="text-xs text-slate-600 hover:text-slate-900 block mt-0.5"
                  >
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Weekly Hours Table */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-sm text-[#0f2b48]">Weekly Clinic Schedule</h3>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {CLINIC_INFO.openingHours.map((item) => (
                  <div key={item.day} className="py-2.5 flex items-center justify-between">
                    <span className="font-medium text-slate-700">{item.day}</span>
                    <span
                      className={`font-semibold ${
                        item.open ? 'text-[#0f2b48]' : 'text-slate-400 italic'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Schematic Map & Directions (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl relative min-h-[480px] flex flex-col justify-between">
            {/* Visual Schematic Map Canvas */}
            <div className="relative w-full h-80 sm:h-96 bg-slate-800 overflow-hidden flex items-center justify-center p-4">
              {/* Street Grid pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              {/* Road overlays */}
              <div className="absolute w-full h-12 bg-slate-700/60 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase select-none">
                  Bentinck Street
                </span>
              </div>
              <div className="absolute h-full w-12 bg-slate-700/60 left-1/3 flex items-center justify-center">
                <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase rotate-90 select-none">
                  Keppel Street
                </span>
              </div>

              {/* Nearby Landmarks */}
              <div className="absolute top-6 right-6 p-2 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-300 font-semibold">
                🌳 Machattie Park
              </div>
              <div className="absolute bottom-6 left-6 p-2 rounded bg-sky-950/80 border border-sky-500/40 text-[10px] text-sky-300 font-semibold">
                🏛️ Bathurst CBD & Court House
              </div>

              {/* Clinic Pin */}
              <div className="relative z-10 text-center animate-bounce duration-1000">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0f2b48] to-sky-600 text-white flex items-center justify-center shadow-2xl ring-4 ring-white/30 mx-auto">
                  <MapPin className="w-7 h-7 text-amber-300" />
                </div>
                <div className="mt-2 bg-[#0f2b48] text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-sky-400 whitespace-nowrap">
                  Creating Great Smiles • 111 Bentinck St
                </div>
              </div>
            </div>

            {/* Bottom details & Google Maps trigger */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-sky-300">
                  GPS Coordinates: 33°25'14.2"S 149°34'38.1"E
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  111 Bentinck Street, Bathurst NSW 2795 Australia
                </p>
              </div>

              <a
                href={CLINIC_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
