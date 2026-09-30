import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Clock, Search } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenManageBooking: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenManageBooking, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top info strip */}
      <div className="bg-[#0f2b48] text-slate-200 text-xs hidden lg:block border-b border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sky-200">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              111 Bentinck Street, Bathurst NSW 2795 (Free Patient Parking)
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Mon – Fri: 7:30 AM – 5:30 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-amber-300 font-medium">★ 4.9/5.0 Rated in Bathurst</span>
            <button
              onClick={() => {
                onOpenManageBooking();
              }}
              className="text-sky-300 hover:text-white flex items-center gap-1 transition-colors underline cursor-pointer"
            >
              <Search className="w-3 h-3" />
              Manage / Reschedule Booking
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="cursor-pointer flex items-center gap-3.5 group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0f2b48] to-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-950/20 group-hover:scale-105 transition-transform duration-200">
              {/* Custom Dental Icon */}
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3 1.5 5 2.5 8 .5 1.5 1 3 1.5 5 1 .5 2 .5 2 0 .5-2 1-3.5 1.5-5 1-3 2.5-5 2.5-8 0-3.5-2.5-6-6-6z" />
                <path d="M9 10c1.5 1.5 4.5 1.5 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0f2b48]">
                  Creating Great Smiles
                </span>
              </div>
              <p className="text-xs font-semibold text-sky-700 tracking-wide uppercase">
                Bathurst Orthodontics & Dental • Est. 1956
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('services')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Our Team
            </button>
            <button
              onClick={() => handleNavClick('calculator')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Fees & Rebates
            </button>
            <button
              onClick={() => handleNavClick('triage')}
              className="hover:text-rose-600 transition-colors cursor-pointer py-1"
            >
              Emergency Triage
            </button>
            <button
              onClick={() => handleNavClick('cases')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Results
            </button>
            <button
              onClick={() => handleNavClick('technology')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Technology
            </button>
            <button
              onClick={() => handleNavClick('location')}
              className="hover:text-sky-700 transition-colors cursor-pointer py-1"
            >
              Contact & Hours
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={CLINIC_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm font-bold hover:bg-slate-50 transition-colors"
              title="Call Creating Great Smiles Bathurst"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>(02) 6331 2788</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white text-sm font-bold shadow-md shadow-sky-900/15 hover:shadow-lg hover:from-[#133659] hover:to-sky-800 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-sky-300" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={CLINIC_INFO.phoneHref}
              className="p-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200"
              aria-label="Call clinic"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#0f2b48] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-sky-300" />
                Book Online
              </button>
              <a
                href={CLINIC_INFO.phoneHref}
                className="w-full py-2.5 px-3 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                Call (02) 6331 2788
              </a>
            </div>

            <div className="flex flex-col space-y-1 text-base font-semibold text-slate-800">
              <button
                onClick={() => handleNavClick('services')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                Dental & Orthodontic Services
              </button>
              <button
                onClick={() => handleNavClick('team')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                Our Clinicians (Dr. Emma Bowman & Team)
              </button>
              <button
                onClick={() => handleNavClick('calculator')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                Fees & Health Fund Gap Calculator
              </button>
              <button
                onClick={() => handleNavClick('triage')}
                className="text-left px-3 py-2.5 rounded-md text-rose-700 hover:bg-rose-50 flex items-center justify-between"
              >
                <span>Emergency Symptom Triage</span>
                <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">Priority</span>
              </button>
              <button
                onClick={() => handleNavClick('cases')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                Smile Transformations (Before & After)
              </button>
              <button
                onClick={() => handleNavClick('technology')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                3D Scanner & Gentle Technology
              </button>
              <button
                onClick={() => handleNavClick('reviews')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                Patient Reviews (4.9★)
              </button>
              <button
                onClick={() => handleNavClick('location')}
                className="text-left px-3 py-2.5 rounded-md hover:bg-slate-100"
              >
                111 Bentinck Street, Hours & Parking
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenManageBooking();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-sky-800 bg-sky-50 rounded-md border border-sky-200"
              >
                Manage / Reschedule Existing Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
