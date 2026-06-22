import React from 'react';

export interface Department {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  category: 'clinical' | 'diagnostic' | 'support';
  featured?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  qualifications: string[];
  bio: string;
  status: 'Available' | 'On Duty' | 'In Surgery' | 'On Leave';
  rating: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export interface VitalRecord {
  day: string;
  value: number; // custom trend value e.g. blood pressure, glucose, heart rate
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  upcomingAppointment: {
    doctor: string;
    department: string;
    dateTime: string;
  };
  latestReport: {
    title: string;
    date: string;
    result: string;
    pdfUrl: string;
  };
  vitals: {
    label: string;
    data: VitalRecord[];
  }[];
}
