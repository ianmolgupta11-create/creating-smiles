import React, { useState, useEffect } from 'react';
import { 
  Check, Calendar as CalendarIcon, Clock, User, Phone, Mail, 
  Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Download, 
  ExternalLink, Search, RefreshCw, XCircle, Copy, AlertTriangle, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLINIC_INFO, CLINICIANS, SERVICES, HEALTH_FUNDS } from '../data/clinicData';
import { Appointment, DentalService, ServiceCategory } from '../types/dental';
import { createGoogleCalendarUrl, downloadIcsFile, formatAppointmentDate, generateBookingReference } from '../utils/calendar';

const STORAGE_KEY = 'creating_great_smiles_appointments_v1';

interface BookingSchedulerProps {
  initialServiceId?: string | null;
  initialClinicianId?: string | null;
  activeTabDefault?: 'book' | 'manage';
}

export const BookingScheduler: React.FC<BookingSchedulerProps> = ({ 
  initialServiceId, 
  initialClinicianId,
  activeTabDefault = 'book'
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'manage'>(activeTabDefault);
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Step 1: Selected Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'invisalign-aligners');
  
  // Step 2: Selected Clinician
  const [selectedClinicianId, setSelectedClinicianId] = useState<string>(initialClinicianId || 'first-available');

  // Step 3: Date & Time Picker
  const [availableDates, setAvailableDates] = useState<{ dateStr: string; label: string; dayName: string; dayNum: number; monthName: string; slotsLeft: number }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('09:15 AM');

  // Step 4: Patient Intake Form
  const [patientType, setPatientType] = useState<'new' | 'existing'>('new');
  const [patientName, setPatientName] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientDob, setPatientDob] = useState<string>('');
  const [selectedHealthFund, setSelectedHealthFund] = useState<string>('Bupa Members First');
  const [anxietyLevel, setAnxietyLevel] = useState<'relaxed' | 'mild' | 'high'>('relaxed');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Step 5: Completed Booking
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // Manage Bookings State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleTime, setRescheduleTime] = useState<string>('10:00 AM');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Sync external initial props if provided
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      setActiveTab('book');
      setStep(2); // Jump directly to clinician step
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialClinicianId) {
      setSelectedClinicianId(initialClinicianId);
      setActiveTab('book');
    }
  }, [initialClinicianId]);

  useEffect(() => {
    if (activeTabDefault) {
      setActiveTab(activeTabDefault);
    }
  }, [activeTabDefault]);

  // Load and initialize appointments from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAppointmentsList(parsed);
      } else {
        // Pre-seed a sample appointment for demonstration
        const sampleDate = new Date();
        sampleDate.setDate(sampleDate.getDate() + 3);
        const yyyy = sampleDate.getFullYear();
        const mm = String(sampleDate.getMonth() + 1).padStart(2, '0');
        const dd = String(sampleDate.getDate()).padStart(2, '0');
        const sampleIso = `${yyyy}-${mm}-${dd}`;

        const sampleAppointment: Appointment = {
          id: 'demo-appt-1',
          referenceCode: 'CGS-98241',
          serviceId: 'invisalign-aligners',
          serviceName: 'Invisalign® Clear Aligners',
          clinicianId: 'emma-bowman',
          clinicianName: 'Dr. Emma Bowman (Specialist Orthodontist)',
          date: sampleIso,
          time: '10:00 AM',
          patientType: 'new',
          patientName: 'Jane Cooper',
          patientEmail: 'jane.cooper@example.com',
          patientPhone: '0412 345 678',
          patientDob: '1996-05-14',
          healthFund: 'Bupa Members First',
          anxietyLevel: 'relaxed',
          notes: 'Interested in orthodontic alignment for front teeth crowding.',
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleAppointment]));
        setAppointmentsList([sampleAppointment]);
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  // Generate next 14 business days (Mon–Fri)
  useEffect(() => {
    const dates = [];
    const now = new Date();
    let count = 0;
    let dayOffset = 1;

    while (count < 14) {
      const d = new Date(now);
      d.setDate(now.getDate() + dayOffset);
      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday

      // Creating Great Smiles is open Monday through Friday (1 to 5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const dayName = d.toLocaleDateString('en-AU', { weekday: 'short' });
        const monthName = d.toLocaleDateString('en-AU', { month: 'short' });
        const dayNum = d.getDate();

        // Simulated slots available
        const slotsLeft = Math.floor(Math.random() * 5) + 3;

        dates.push({
          dateStr,
          label: `${dayName}, ${dayNum} ${monthName}`,
          dayName,
          dayNum,
          monthName,
          slotsLeft
        });
        count++;
      }
      dayOffset++;
    }

    setAvailableDates(dates);
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  const saveAppointments = (updated: Appointment[]) => {
    setAppointmentsList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const getClinicianName = (id: string): string => {
    if (id === 'first-available') return 'First Available Clinician (Earliest)';
    const doctor = CLINICIANS.find((c) => c.id === id);
    return doctor ? `${doctor.name} (${doctor.role})` : 'Clinic Practitioner';
  };

  // Step 4 Validation
  const validateIntakeForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!patientName.trim()) errors.name = 'Full name is required';
    if (!patientPhone.trim()) errors.phone = 'Mobile phone number is required';
    if (!patientEmail.trim() || !patientEmail.includes('@')) errors.email = 'Valid email address is required';
    if (!patientDob) errors.dob = 'Date of birth is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!validateIntakeForm()) return;

    const newRef = generateBookingReference();
    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      referenceCode: newRef,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      clinicianId: selectedClinicianId,
      clinicianName: getClinicianName(selectedClinicianId),
      date: selectedDate,
      time: selectedTime,
      patientType,
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      patientPhone: patientPhone.trim(),
      patientDob,
      healthFund: selectedHealthFund,
      anxietyLevel,
      notes: notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointmentsList];
    saveAppointments(updated);
    setConfirmedBooking(newAppointment);
    setStep(5);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // graceful fallback
    }
  };

  const handleCopyRef = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  // Filter services by category
  const filteredServices = SERVICES.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === (selectedCategory as ServiceCategory);
  });

  // Reschedule handler
  const handleExecuteReschedule = (apptId: string) => {
    if (!rescheduleDate) return;
    const updated = appointmentsList.map((appt) => {
      if (appt.id === apptId) {
        return {
          ...appt,
          date: rescheduleDate,
          time: rescheduleTime,
          status: 'rescheduled' as const
        };
      }
      return appt;
    });
    saveAppointments(updated);
    setReschedulingId(null);
    setActionMessage('Appointment successfully rescheduled! Updated calendar file is available below.');
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleCancelAppointment = (apptId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updated = appointmentsList.map((appt) => {
        if (appt.id === apptId) {
          return {
            ...appt,
            status: 'cancelled' as const
          };
        }
        return appt;
      });
      saveAppointments(updated);
      setActionMessage('Your appointment has been marked as cancelled.');
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const morningSlots = ['07:45 AM', '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM'];
  const afternoonSlots = ['01:15 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'];

  // Filter for Manage Bookings
  const filteredAppointments = appointmentsList.filter((appt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      appt.referenceCode.toLowerCase().includes(q) ||
      appt.patientEmail.toLowerCase().includes(q) ||
      appt.patientName.toLowerCase().includes(q) ||
      appt.patientPhone.toLowerCase().includes(q)
    );
  });

  return (
    <section id="booking" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Online Patient Scheduling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2b48] tracking-tight">
            Book Your Appointment in Bathurst
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Choose your treatment, select your clinician, and secure your time at 111 Bentinck Street in under 2 minutes. Instant confirmation and zero wait times.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-xl shadow-inner border border-slate-300">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-white text-[#0f2b48] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book New Appointment
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'manage'
                  ? 'bg-white text-[#0f2b48] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Manage / Reschedule Existing
            </button>
          </div>
        </div>

        {/* Action alert toast */}
        {actionMessage && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* TAB 1: 5-STEP BOOKING WIZARD */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
            {/* Stepper Navigation Bar */}
            {step < 5 && (
              <div className="bg-[#0f2b48] px-4 sm:px-8 py-4 sm:py-5 border-b border-sky-950">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  {[
                    { num: 1, label: 'Treatment' },
                    { num: 2, label: 'Clinician' },
                    { num: 3, label: 'Date & Time' },
                    { num: 4, label: 'Patient Info' }
                  ].map((s, idx) => {
                    const isActive = step === s.num;
                    const isDone = step > s.num;
                    return (
                      <React.Fragment key={s.num}>
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <button
                            disabled={!isDone}
                            onClick={() => setStep(s.num)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                              isDone
                                ? 'bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600'
                                : isActive
                                ? 'bg-sky-500 text-white ring-4 ring-sky-400/30'
                                : 'bg-slate-700/80 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                          </button>
                          <span
                            className={`text-xs sm:text-sm font-semibold hidden md:inline ${
                              isActive ? 'text-white' : isDone ? 'text-sky-200' : 'text-slate-400'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                        {idx < 3 && (
                          <div
                            className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                              step > s.num ? 'bg-emerald-500' : 'bg-slate-700'
                            }`}
                          ></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-4 sm:p-8 lg:p-10">
              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                        Step 1: Choose Your Treatment
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Select an orthodontic or general dental service below:
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'all', label: 'All Services' },
                        { id: 'orthodontics', label: 'Orthodontics' },
                        { id: 'general', label: 'General & Cleans' },
                        { id: 'emergency', label: 'Emergency' },
                        { id: 'kids', label: 'Kids & Sports' },
                        { id: 'cosmetic', label: 'Cosmetic' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'bg-[#0f2b48] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredServices.map((service) => {
                      const isSelected = selectedServiceId === service.id;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'border-sky-600 bg-sky-50/70 shadow-md ring-2 ring-sky-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          {/* Checkmark badge */}
                          {isSelected && (
                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded">
                                {service.categoryLabel}
                              </span>
                              {service.popular && (
                                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                  Popular
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-base sm:text-lg text-slate-900 pr-8">
                              {service.name}
                            </h4>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {service.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-600">
                              <span className="flex items-center gap-1 font-medium">
                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                {service.durationMinutes} mins
                              </span>
                              {service.itemCode && (
                                <span className="text-slate-500 font-mono text-[11px]">
                                  {service.itemCode}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                            <div>
                              <span className="text-xs text-slate-500">Guide fee from</span>
                              <div className="font-extrabold text-lg text-[#0f2b48]">
                                ${service.guidePrice}
                              </div>
                            </div>
                            <span className="text-xs text-emerald-700 font-semibold max-w-[180px] text-right">
                              {service.rebateNote.split(';')[0]}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation footer */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white font-bold text-sm shadow-md hover:from-[#133659] hover:to-sky-800 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Clinician</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Clinician */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-slate-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                      Step 2: Choose Your Dental Clinician
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Select your preferred doctor or therapist, or choose earliest availability:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option 0: First Available Clinician */}
                    <div
                      onClick={() => setSelectedClinicianId('first-available')}
                      className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${
                        selectedClinicianId === 'first-available'
                          ? 'border-sky-600 bg-sky-50/70 shadow-md ring-2 ring-sky-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {selectedClinicianId === 'first-available' && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shrink-0">
                          ⚡
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                            Earliest Appointment
                          </span>
                          <h4 className="font-bold text-base sm:text-lg text-slate-900 mt-1">
                            First Available Clinician
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">
                            Recommended for quick booking or urgent consultations. We allocate your appointment to the next available practitioner.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Specific Clinicians */}
                    {CLINICIANS.map((clinician) => {
                      const isSelected = selectedClinicianId === clinician.id;
                      return (
                        <div
                          key={clinician.id}
                          onClick={() => setSelectedClinicianId(clinician.id)}
                          className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-sky-600 bg-sky-50/70 shadow-md ring-2 ring-sky-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}
                          <div className="flex items-start gap-3.5">
                            <img
                              src={clinician.image}
                              alt={clinician.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shrink-0"
                            />
                            <div>
                              <span className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                                {clinician.role}
                              </span>
                              <h4 className="font-bold text-base sm:text-lg text-slate-900 mt-1 pr-6">
                                {clinician.name}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                {clinician.degrees}
                              </p>
                              <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                                {clinician.bio}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white font-bold text-sm shadow-md hover:from-[#133659] hover:to-sky-800 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Date & Time</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Select Date & Time */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-slate-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                      Step 3: Select Date & Appointment Slot
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Clinic opening hours: Monday to Friday, 7:30 AM – 5:30 PM (111 Bentinck St, Bathurst)
                    </p>
                  </div>

                  {/* Horizontal Date Picker Carousel */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Available Weekdays (Next 14 Days)
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                      {availableDates.map((item) => {
                        const isSelected = selectedDate === item.dateStr;
                        return (
                          <button
                            key={item.dateStr}
                            onClick={() => setSelectedDate(item.dateStr)}
                            className={`min-w-[100px] p-3 rounded-xl border-2 text-center transition-all shrink-0 cursor-pointer ${
                              isSelected
                                ? 'border-[#0f2b48] bg-[#0f2b48] text-white shadow-md'
                                : 'border-slate-200 bg-white hover:border-sky-300 text-slate-800'
                            }`}
                          >
                            <div className="text-[11px] font-bold uppercase opacity-80">
                              {item.dayName}
                            </div>
                            <div className="text-xl font-extrabold my-0.5">
                              {item.dayNum}
                            </div>
                            <div className="text-xs opacity-90">
                              {item.monthName}
                            </div>
                            <div
                              className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded-full ${
                                isSelected ? 'bg-sky-500 text-white' : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {item.slotsLeft} slots
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Selection */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Clock className="w-4 h-4 text-sky-600" />
                        <h4 className="text-sm font-bold text-slate-900">
                          Morning Sessions (7:30 AM – 12:00 PM)
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {morningSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                                  : 'border-slate-200 bg-white hover:border-sky-400 text-slate-800 hover:bg-sky-50'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Clock className="w-4 h-4 text-sky-600" />
                        <h4 className="text-sm font-bold text-slate-900">
                          Afternoon Sessions (1:00 PM – 5:30 PM)
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                        {afternoonSlots.map((slot) => {
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                                isSelected
                                  ? 'border-sky-600 bg-sky-600 text-white shadow-xs'
                                  : 'border-slate-200 bg-white hover:border-sky-400 text-slate-800 hover:bg-sky-50'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Summary of selection */}
                  <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-sky-700" />
                      <span>
                        Selected: <strong>{formatAppointmentDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>
                      </span>
                    </div>
                    <span className="text-slate-600 font-medium">
                      Duration: ~{selectedService.durationMinutes} mins
                    </span>
                  </div>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0f2b48] to-sky-700 text-white font-bold text-sm shadow-md hover:from-[#133659] hover:to-sky-800 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue to Patient Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Patient Intake Form */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="pb-2 border-b border-slate-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                      Step 4: Patient Information
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Please enter the patient’s details for clinic registration and health fund claiming:
                    </p>
                  </div>

                  {/* Patient Type Switcher */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Patient Status
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                      <button
                        type="button"
                        onClick={() => setPatientType('new')}
                        className={`p-3 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
                          patientType === 'new'
                            ? 'border-sky-600 bg-sky-50 text-sky-950 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        New Patient
                      </button>
                      <button
                        type="button"
                        onClick={() => setPatientType('existing')}
                        className={`p-3 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
                          patientType === 'existing'
                            ? 'border-sky-600 bg-sky-50 text-sky-950 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Existing Patient
                      </button>
                    </div>
                  </div>

                  {/* Main Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Legal Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Charlotte Evans"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                            formErrors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="text-xs text-rose-600 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Phone <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="e.g. 0412 345 678"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                            formErrors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-xs text-rose-600 mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          placeholder="e.g. charlotte@example.com.au"
                          className={`w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                            formErrors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-xs text-rose-600 mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Date of Birth <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={patientDob}
                        onChange={(e) => setPatientDob(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                          formErrors.dob ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.dob && (
                        <p className="text-xs text-rose-600 mt-1">{formErrors.dob}</p>
                      )}
                    </div>
                  </div>

                  {/* Health Fund Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Private Health Insurance / Medicare
                    </label>
                    <select
                      value={selectedHealthFund}
                      onChange={(e) => setSelectedHealthFund(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                    >
                      {HEALTH_FUNDS.map((fund) => (
                        <option key={fund.id} value={fund.name}>
                          {fund.name} ({fund.tier})
                        </option>
                      ))}
                      <option value="Other Private Health Fund">Other Australian Health Fund (HICAPS on the spot)</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1">
                      We offer instant on-the-spot HICAPS electronic claims processing at our Bathurst clinic.
                    </p>
                  </div>

                  {/* Dental Anxiety / Comfort Level Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Dental Anxiety & Comfort Level
                    </label>
                    <p className="text-xs text-slate-500 mb-2">
                      Let us know how you feel so our clinicians (and ceiling TVs / happy gas) can make your visit comfortable:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'relaxed', label: 'Relaxed & Ready', sub: 'Standard comfortable visit' },
                        { id: 'mild', label: 'Mildly Nervous', sub: 'Extra step-by-step explanations' },
                        { id: 'high', label: 'High Anxiety', sub: 'Gentle touch, ceiling Netflix & happy gas' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setAnxietyLevel(item.id as any)}
                          className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            anxietyLevel === item.id
                              ? 'border-sky-600 bg-sky-50/70 shadow-xs'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-bold text-xs text-slate-900">{item.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tooth / Orthodontic Concern Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reason for Visit / Specific Concerns (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Crowding on bottom front teeth, poking wire, or interested in Invisalign pricing."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  {/* Navigation footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      onClick={handleConfirmBooking}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-sm shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                      <span>Confirm & Book Appointment</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Instant Booking Confirmation Screen */}
              {step === 5 && confirmedBooking && (
                <div className="max-w-2xl mx-auto py-4 text-center space-y-6">
                  {/* Success Icon */}
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce duration-1000">
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Appointment Confirmed
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b48] mt-3">
                      We Look Forward to Seeing You!
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                      Your booking has been registered at Creating Great Smiles, 111 Bentinck Street, Bathurst. An email confirmation has been prepared.
                    </p>
                  </div>

                  {/* Reference Code Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0f2b48] to-sky-900 text-white shadow-xl max-w-md mx-auto">
                    <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold">
                      Your Booking Reference Code
                    </span>
                    <div className="flex items-center justify-center gap-3 my-2">
                      <span className="font-mono text-2xl sm:text-3xl font-black tracking-wider text-amber-300">
                        {confirmedBooking.referenceCode}
                      </span>
                      <button
                        onClick={() => handleCopyRef(confirmedBooking.referenceCode)}
                        className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        title="Copy reference code"
                      >
                        {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[11px] text-sky-200">
                      Save this code to reschedule or manage your appointment anytime.
                    </span>
                  </div>

                  {/* Details Summary Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-md mx-auto">
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Patient:</span>
                      <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Treatment:</span>
                      <span className="font-bold text-slate-900">{confirmedBooking.serviceName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Clinician:</span>
                      <span className="font-bold text-slate-900">{confirmedBooking.clinicianName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Date & Time:</span>
                      <span className="font-bold text-sky-700">
                        {formatAppointmentDate(confirmedBooking.date)} at {confirmedBooking.time}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="font-semibold text-slate-800">111 Bentinck St, Bathurst NSW</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-medium">Health Fund:</span>
                      <span className="font-semibold text-slate-800">{confirmedBooking.healthFund}</span>
                    </div>
                  </div>

                  {/* Action Buttons: Add to Calendar & .ICS Download */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => downloadIcsFile(confirmedBooking)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-sky-600" />
                      <span>Download .ICS Calendar File</span>
                    </button>

                    <a
                      href={createGoogleCalendarUrl(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                      <span>Add to Google Calendar</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => {
                        setStep(1);
                        setConfirmedBooking(null);
                      }}
                      className="text-xs text-sky-700 font-semibold hover:underline cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => {
                        setActiveTab('manage');
                        setSearchQuery(confirmedBooking.referenceCode);
                      }}
                      className="text-xs text-sky-700 font-semibold hover:underline cursor-pointer"
                    >
                      Manage This Appointment in Portal →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE / RESCHEDULE EXISTING BOOKING */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 sm:p-10">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0f2b48]">
                  Manage Your Bathurst Appointments
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Enter your appointment reference code (e.g. <code>CGS-98241</code>) or your registered email address to check status, reschedule, or export calendar events:
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Reference Code (CGS-...), Patient Name, or Email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 shadow-xs"
                />
              </div>

              {/* Appointments List */}
              <div className="space-y-4 pt-2">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-slate-500 text-sm font-medium">
                      No matching appointments found for "{searchQuery}".
                    </p>
                    <button
                      onClick={() => setActiveTab('book')}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                    >
                      <span>Book a new appointment now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  filteredAppointments.map((appt) => {
                    const isRescheduling = reschedulingId === appt.id;
                    const isCancelled = appt.status === 'cancelled';

                    return (
                      <div
                        key={appt.id}
                        className={`p-5 sm:p-6 rounded-xl border-2 transition-all ${
                          isCancelled
                            ? 'border-slate-200 bg-slate-50/80 opacity-75'
                            : 'border-slate-200 bg-white hover:border-sky-300 shadow-xs'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs sm:text-sm font-black text-sky-800 bg-sky-100 px-2.5 py-1 rounded">
                                {appt.referenceCode}
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
                                  appt.status === 'confirmed'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : appt.status === 'rescheduled'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {appt.status}
                              </span>
                            </div>
                            <h4 className="font-bold text-base sm:text-lg text-[#0f2b48] mt-1.5">
                              {appt.serviceName}
                            </h4>
                          </div>

                          <div className="text-left sm:text-right">
                            <div className="text-xs sm:text-sm font-extrabold text-sky-800">
                              {formatAppointmentDate(appt.date)}
                            </div>
                            <div className="text-xs text-slate-500 font-semibold">
                              {appt.time} • 111 Bentinck St
                            </div>
                          </div>
                        </div>

                        {/* Details summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 text-xs text-slate-600">
                          <div>
                            <span className="text-slate-400">Patient:</span>{' '}
                            <strong className="text-slate-800">{appt.patientName}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400">Clinician:</span>{' '}
                            <strong className="text-slate-800">{appt.clinicianName}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400">Health Fund:</span>{' '}
                            <strong className="text-slate-800">{appt.healthFund}</strong>
                          </div>
                        </div>

                        {/* Reschedule inline editor */}
                        {isRescheduling && (
                          <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-3">
                            <div className="font-bold text-amber-900 flex items-center gap-1.5">
                              <RefreshCw className="w-4 h-4 text-amber-700 animate-spin" />
                              Select New Date & Time Slot:
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  New Date:
                                </label>
                                <select
                                  value={rescheduleDate}
                                  onChange={(e) => setRescheduleDate(e.target.value)}
                                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs"
                                >
                                  {availableDates.map((d) => (
                                    <option key={d.dateStr} value={d.dateStr}>
                                      {d.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                  New Time Slot:
                                </label>
                                <select
                                  value={rescheduleTime}
                                  onChange={(e) => setRescheduleTime(e.target.value)}
                                  className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-xs"
                                >
                                  {morningSlots.concat(afternoonSlots).map((slot) => (
                                    <option key={slot} value={slot}>
                                      {slot}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex gap-2 justify-end pt-1">
                              <button
                                onClick={() => setReschedulingId(null)}
                                className="px-3 py-1.5 rounded bg-white border border-slate-300 text-slate-700 font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleExecuteReschedule(appt.id)}
                                className="px-4 py-1.5 rounded bg-amber-700 hover:bg-amber-800 text-white font-bold cursor-pointer"
                              >
                                Confirm Reschedule
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Action buttons */}
                        {!isCancelled && !isRescheduling && (
                          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => downloadIcsFile(appt)}
                                className="inline-flex items-center gap-1 text-xs text-sky-700 font-bold hover:underline cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>.ICS File</span>
                              </button>
                              <span className="text-slate-300">|</span>
                              <a
                                href={createGoogleCalendarUrl(appt)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-sky-700 font-bold hover:underline cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Google Cal</span>
                              </a>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setReschedulingId(appt.id);
                                  setRescheduleDate(availableDates[0]?.dateStr || appt.date);
                                  setRescheduleTime(appt.time);
                                }}
                                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                                <span>Reschedule</span>
                              </button>

                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
