export type ServiceCategory = 'orthodontics' | 'general' | 'emergency' | 'cosmetic' | 'kids';

export interface DentalService {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  durationMinutes: number;
  guidePrice: number;
  itemCode?: string;
  popular?: boolean;
  rebateNote: string;
  features: string[];
}

export interface Clinician {
  id: string;
  name: string;
  title: string;
  role: 'Specialist Orthodontist' | 'General Dentist' | 'Oral Health Therapist';
  degrees: string;
  experienceYears: number;
  image: string;
  bio: string;
  specialInterests: string[];
  education: string;
  bathurstConnection: string;
}

export interface Appointment {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceName: string;
  clinicianId: string;
  clinicianName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  patientType: 'new' | 'existing';
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDob: string;
  healthFund: string;
  anxietyLevel: 'relaxed' | 'mild' | 'high';
  notes?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface TriageItem {
  id: string;
  title: string;
  severity: 'Immediate Emergency' | 'Same-Day Priority' | 'Urgent 24-48h' | 'Routine Consult';
  severityColor: string;
  badgeBg: string;
  symptoms: string[];
  whatItMeans: string;
  whatToDoNow: string[];
  recommendedServiceId: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  treatment: string;
  quote: string;
  verified: boolean;
}

export interface HealthFund {
  id: string;
  name: string;
  tier: string;
  averageRebatePct: number;
  note: string;
}
