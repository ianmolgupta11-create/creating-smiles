import React, { useState } from 'react';
import { Phone, Calendar, ArrowUp } from 'lucide-react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesCatalog } from './components/ServicesCatalog';
import { ClinicianTeam } from './components/ClinicianTeam';
import { BookingScheduler } from './components/BookingScheduler';
import { GapCalculator } from './components/GapCalculator';
import { SymptomTriage } from './components/SymptomTriage';
import { SmileTransformation } from './components/SmileTransformation';
import { ClinicTechnology } from './components/ClinicTechnology';
import { PatientReviews } from './components/PatientReviews';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [schedulerServiceId, setSchedulerServiceId] = useState<string | null>(null);
  const [schedulerClinicianId, setSchedulerClinicianId] = useState<string | null>(null);
  const [schedulerTab, setSchedulerTab] = useState<'book' | 'manage'>('book');

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceAndBook = (serviceId: string) => {
    setSchedulerServiceId(serviceId);
    setSchedulerClinicianId(null);
    setSchedulerTab('book');
    scrollToSection('booking');
  };

  const handleBookWithDoctor = (clinicianId: string) => {
    setSchedulerClinicianId(clinicianId);
    setSchedulerTab('book');
    scrollToSection('booking');
  };

  const handleOpenBooking = () => {
    setSchedulerTab('book');
    scrollToSection('booking');
  };

  const handleOpenManageBooking = () => {
    setSchedulerTab('manage');
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col w-full max-w-full overflow-x-hidden">
      {/* Top Emergency Announcement Bar */}
      <EmergencyBanner
        onTriageClick={() => scrollToSection('triage')}
        onBookEmergency={() => handleSelectServiceAndBook('emergency-relief')}
      />

      {/* Main Header & Responsive Drawer Navigation */}
      <Header
        onNavigate={scrollToSection}
        onOpenManageBooking={handleOpenManageBooking}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Module 2: Hero Section & Quick Visit Pre-Selector */}
        <Hero
          onSelectServiceAndBook={handleSelectServiceAndBook}
          onOpenBooking={handleOpenBooking}
        />

        {/* Module 3 & 4: Interactive 5-Step Online Booking Scheduler + Manage Existing */}
        <BookingScheduler
          key={`${schedulerServiceId || 'default'}-${schedulerClinicianId || 'none'}-${schedulerTab}`}
          initialServiceId={schedulerServiceId}
          initialClinicianId={schedulerClinicianId}
          activeTabDefault={schedulerTab}
        />

        {/* Module 1 (Catalog): Complete Services Catalog */}
        <ServicesCatalog onSelectService={handleSelectServiceAndBook} />

        {/* Module 5: Treatment & Health Fund Gap Fee Calculator */}
        <GapCalculator onSelectAndBook={handleSelectServiceAndBook} />

        {/* Module 6: Patient Symptom & Emergency Triage Guide */}
        <SymptomTriage onBookEmergency={handleSelectServiceAndBook} />

        {/* Module 7: Meet the Clinicians & Dental Team */}
        <ClinicianTeam onBookWithDoctor={handleBookWithDoctor} />

        {/* Module 8: Smile Transformation / Case Studies Before & After Slider */}
        <SmileTransformation />

        {/* Module 9: Gentle Clinic Technology & Patient Comfort */}
        <ClinicTechnology />

        {/* Module 10: Verified Patient Reviews & Social Proof */}
        <PatientReviews />

        {/* Module 11: Location, Parking & Hours (111 Bentinck St) */}
        <LocationHours />
      </main>

      {/* Module 12: Comprehensive Footer & Land Acknowledgment */}
      <Footer onNavigate={scrollToSection} />

      {/* Sticky Mobile Floating Emergency Call & Book Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={CLINIC_INFO.phoneHref}
          className="flex-1 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300"
        >
          <Phone className="w-3.5 h-3.5 text-sky-600" />
          <span>Call (02) 6331 2788</span>
        </a>
        <button
          onClick={handleOpenBooking}
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <Calendar className="w-3.5 h-3.5 text-sky-300" />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
