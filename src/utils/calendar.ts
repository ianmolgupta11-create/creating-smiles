import { Appointment } from '../types/dental';

export function generateBookingReference(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'CGS-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatAppointmentDate(dateStr: string): string {
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

export function createGoogleCalendarUrl(appointment: Appointment): string {
  // Appointment date: YYYY-MM-DD, time: e.g. "09:30 AM" or "02:00 PM"
  const title = encodeURIComponent(`Dental Appointment: ${appointment.serviceName} at Creating Great Smiles`);
  const details = encodeURIComponent(
    `Appointment Reference: ${appointment.referenceCode}\n` +
    `Clinician: ${appointment.clinicianName}\n` +
    `Patient: ${appointment.patientName}\n` +
    `Clinic: Creating Great Smiles Bathurst\n` +
    `Address: 111 Bentinck Street, Bathurst NSW 2795\n` +
    `Phone: (02) 6331 2788\n` +
    `Please arrive 10 minutes early with your Medicare / Private Health Fund Card.`
  );
  const location = encodeURIComponent('111 Bentinck Street, Bathurst NSW 2795');

  // Convert to ISO-like YYYYMMDDTHHMMSS
  const dateFormatted = appointment.date.replace(/-/g, '');
  
  // Parse time
  let hours = 9;
  let minutes = 0;
  const timeMatch = appointment.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
    if (timeMatch[3].toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    }
    if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  const startHourStr = String(hours).padStart(2, '0');
  const startMinStr = String(minutes).padStart(2, '0');
  
  // Duration approx 45 mins
  const endMinutesTotal = hours * 60 + minutes + 45;
  const endHour = Math.floor(endMinutesTotal / 60);
  const endMin = endMinutesTotal % 60;
  const endHourStr = String(endHour).padStart(2, '0');
  const endMinStr = String(endMin).padStart(2, '0');

  const startUtc = `${dateFormatted}T${startHourStr}${startMinStr}00`;
  const endUtc = `${dateFormatted}T${endHourStr}${endMinStr}00`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}`;
}

export function downloadIcsFile(appointment: Appointment): void {
  const dateFormatted = appointment.date.replace(/-/g, '');
  let hours = 9;
  let minutes = 0;
  const timeMatch = appointment.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
    if (timeMatch[3].toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    }
    if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  const startHourStr = String(hours).padStart(2, '0');
  const startMinStr = String(minutes).padStart(2, '0');
  const endMinutesTotal = hours * 60 + minutes + 45;
  const endHour = Math.floor(endMinutesTotal / 60);
  const endMin = endMinutesTotal % 60;
  const endHourStr = String(endHour).padStart(2, '0');
  const endMinStr = String(endMin).padStart(2, '0');

  const startUtc = `${dateFormatted}T${startHourStr}${startMinStr}00`;
  const endUtc = `${dateFormatted}T${endHourStr}${endMinStr}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Creating Great Smiles Bathurst//Dental Appointment Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${appointment.referenceCode}-${Date.now()}@creatinggreatsmiles.com.au`,
    `DTSTAMP:${dateFormatted}T000000Z`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:Dental Appointment: ${appointment.serviceName}`,
    `DESCRIPTION:Appointment Reference: ${appointment.referenceCode}\\nClinician: ${appointment.clinicianName}\\nPatient: ${appointment.patientName}\\nClinic: Creating Great Smiles Bathurst (02 6331 2788)`,
    'LOCATION:111 Bentinck Street\\, Bathurst NSW 2795',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `CreatingGreatSmiles-${appointment.referenceCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
