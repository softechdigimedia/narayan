import type{ Department, Doctor, PatientRecord } from './types';

export const DEPARTMENTS: Department[] = [
  { id: 'cardiology', name: 'Cardiology', icon: 'HeartPulse', description: 'Comprehensive heart care focusing on diagnostics, intervention, and rehabilitation with state-of-the-art facilities.', category: 'clinical', featured: true },
  { id: 'neurology', name: 'Neurology', icon: 'Brain', description: 'Expert diagnosis and treatment for disorders of the nervous system, brain, spine, and neurovascular diseases.', category: 'clinical', featured: true },
  { id: 'oncology', name: 'Oncology', icon: 'Activity', description: 'Integrated cancer care providing modern chemotherapy, immunotherapy, targeted therapeutics, and radiation options.', category: 'clinical', featured: true },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'ActivitySquare', description: 'Restoring mobility through advanced surgical and non-surgical treatments for bones, joints, and ligaments.', category: 'clinical', featured: true },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'Baby', description: 'Specialized care for infants, children, and adolescents focusing on growth, vaccination, and pediatric diseases.', category: 'clinical', featured: true },
  { id: 'gastroenterology', name: 'Gastroenterology', icon: 'Stethoscope', description: 'Digestive health and complex abdominal treatments specializing in liver, stomach, pancreatic, and intestinal systems.', category: 'clinical', featured: true },
  { id: 'dermatology', name: 'Dermatology', icon: 'Sparkles', description: 'Advanced solutions for skin, hair, and nail conditions. From medical treatments to clinical dermatology aesthetics.', category: 'clinical', featured: false },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: 'Eye', description: 'Expert eye surgery and vision correction services matching top-tier optical testing and surgical precision.', category: 'clinical', featured: false },
  { id: 'urology', name: 'Urology', icon: 'Droplet', description: 'Comprehensive urinary tract and male reproductive health services utilizing minimally invasive techniques.', category: 'clinical', featured: false },
  { id: 'gynecology', name: 'Gynecology', icon: 'UserRound', description: 'Women-centered health services from adolescence to maternal-fetal care, wellness checks, and clean deliveries.', category: 'clinical', featured: false },
  { id: 'pulmonology', name: 'Pulmonology', icon: 'Wind', description: 'Respiratory system care for chronic and acute lung conditions, asthma, COPD, and sleep-related breathing disorders.', category: 'clinical', featured: false },
  { id: 'endocrinology', name: 'Endocrinology', icon: 'Scale', description: 'Hormonal balance and diabetes management utilizing customized lifestyle coaching and hormone therapies.', category: 'clinical', featured: false },
  { id: 'ent', name: 'ENT', icon: 'Ear', description: 'Specialized treatment for ear, nose, throat disorders, speech impairments, allergy, and head-neck surgeries.', category: 'clinical', featured: false },
  { id: 'nephrology', name: 'Nephrology', icon: 'Award', description: 'Dedicated care for kidney health, renal replacement, clean dialysis suites, and hypertension management.', category: 'clinical', featured: false },
  { id: 'psychiatry', name: 'Psychiatry', icon: 'Smile', description: 'Compassionate mental health and behavioral medicine supporting holistic recovery and psychiatric wellness.', category: 'clinical', featured: false },
  { id: 'rheumatology', name: 'Rheumatology', icon: 'Flame', description: 'Management of autoimmune and inflammatory conditions such as rheumatoid arthritis, lupus, and chronic pain.', category: 'clinical', featured: false },
  { id: 'internal-medicine', name: 'Internal Medicine', icon: 'HeartHandshake', description: 'Primary care and complex diagnostic adult medicine managing chronic illnesses and multi-system conditions.', category: 'clinical', featured: false },
  { id: 'general-surgery', name: 'General Surgery', icon: 'Scissors', description: 'Precision surgical procedures with minimal invasion, post-op observation, and rapid recovery solutions.', category: 'clinical', featured: false },
  { id: 'hematology', name: 'Hematology', icon: 'Combine', description: 'Expert management of blood-related disorders, anemias, clotting disorders, and blood bank coordination.', category: 'clinical', featured: false },
  { id: 'critical-care', name: 'Critical Care', icon: 'Milestone', description: 'Life-saving intensive care and 24/7 monitoring with cutting-edge medical support in advanced ICU rooms.', category: 'clinical', featured: false },
  { id: 'radiology', name: 'Radiology', icon: 'Tv', description: 'Advanced diagnostic imaging and interventional radiology: high-speed CT, 3 Tesla MRI, digital X-Rays.', category: 'diagnostic', featured: false },
  { id: 'pathology', name: 'Pathology', icon: 'FlaskConical', description: 'Detailed laboratory analysis for accurate diagnosis, quick clinical biopsy, biochemistry, and hematology.', category: 'diagnostic', featured: false },
  { id: 'rehabilitation', name: 'Rehabilitation', icon: 'CheckSquare', description: 'Physiotherapy and recovery programs for all ages to restore function and physical mobility post-surgery.', category: 'support', featured: false },
  { id: 'dentistry', name: 'Dentistry', icon: 'ShieldAlert', description: 'Full-spectrum oral health and aesthetic dental care covering restorative, implantology, and cosmetic routines.', category: 'clinical', featured: false },
  { id: 'immunology', name: 'Immunology', icon: 'Shield', description: 'Fighting allergies and immune system deficiencies with modern testing and immunotherapy options.', category: 'clinical', featured: false },
  { id: 'anesthesiology', name: 'Anesthesiology', icon: 'Waves', description: 'Safe pain management and surgical sedation support monitoring patient vitals and post-surgery care.', category: 'support', featured: false },
  { id: 'vascular-surgery', name: 'Vascular Surgery', icon: 'Navigation', description: 'Treatment for arteries and veins circulation health using advanced bypass and endovascular procedures.', category: 'clinical', featured: false },
  { id: 'emergency', name: 'Emergency', icon: 'AlertOctagon', description: 'Rapid response medical care for urgent conditions, trauma, and accidents, available round-the-clock.', category: 'clinical', featured: false },
  { id: 'infectious-disease', name: 'Infectious Disease', icon: 'Biohazard', description: 'Management of viral, bacterial, and fungal infections, travel medicine advice, and vaccination campaigns.', category: 'clinical', featured: false },
  { id: 'geriatrics', name: 'Geriatrics', icon: 'Users', description: 'Focused care for the health needs of older adults, helping preserve independence and managing multiple conditions.', category: 'clinical', featured: false },
  { id: 'sports-medicine', name: 'Sports Medicine', icon: 'TrendingUp', description: 'Athletic injury prevention and performance recovery using personalized physical therapy regimens.', category: 'clinical', featured: false },
  { id: 'plastic-surgery', name: 'Plastic Surgery', icon: 'Contact', description: 'Reconstructive and aesthetic surgical improvements under the guidance of board-certified plastic surgeons.', category: 'clinical', featured: false }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-dhruba-bhattacharya',
    name: 'Dr. Dhruba Bhattacharya',
    role: 'Chief of Cardiology',
    department: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    qualifications: ['MBBS', 'MD', 'DM (Cardiology)'],
    bio: 'Expert in interventional cardiology with over 20 years of experience in complex coronary procedures, angioplasty, and pacemaker implantations.',
    status: 'Available',
    rating: 4.9
  },
  {
    id: 'dr-ahana-ghosh',
    name: 'Dr. Ahana Ghosh',
    role: 'Senior Neurosurgeon',
    department: 'Neurology',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    qualifications: ['MBBS', 'MCH (Neurosurgery)'],
    bio: 'Specializes in minimally invasive neurosurgery and advanced spine care with a focus on rapid patient recovery and microscopic tumor resection.',
    status: 'Available',
    rating: 4.8
  },
  {
    id: 'dr-raktim-guha',
    name: 'Dr. Raktim Guha',
    role: 'Director of Oncology',
    department: 'Oncology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    qualifications: ['MBBS', 'DNB (Medical Oncology)'],
    bio: 'Renowned oncologist dedicated to personalized cancer treatment plans and pioneering clinical trials with empathetic patient care.',
    status: 'Available',
    rating: 5.0
  },
  {
    id: 'dr-swati-sinha',
    name: 'Dr. Swati Sinha',
    role: 'Head of Pediatrics',
    department: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    qualifications: ['MBBS', 'MD (Pediatrics)'],
    bio: 'Dedicated pediatrician with 15+ years of experience in specialized pediatric infectious disease, development milestones tracking, and child healthcare.',
    status: 'In Surgery',
    rating: 4.7
  },
  {
    id: 'dr-anil-mukherjee',
    name: 'Dr. Anil Mukherjee',
    role: 'Chief Gastrointestinal Surgeon',
    department: 'Gastroenterology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    qualifications: ['MBBS', 'MS (Surgery)', 'Ex-Fellow of Royal College of Surgeons'],
    bio: 'Pioneer of keyhole laparoscopic surgeries for gastric resections and advanced liver, pancreas, and intestinal transplantation therapies.',
    status: 'On Duty',
    rating: 4.9
  },
  {
    id: 'dr-megha-roy',
    name: 'Dr. Megha Roy',
    role: 'Physiotherapist & Rehab Expert',
    department: 'Rehabilitation',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
    qualifications: ['BPT', 'MPT (Sports Rehab)'],
    bio: 'Specialized in post-surgical patient recovery, spine rehabilitation, and helping athletes regain complete peak motor coordination and performance.',
    status: 'Available',
    rating: 4.6
  }
];

export const MOCK_PATIENT_PORTAL: PatientRecord = {
  id: 'NMH-2024-432',
  name: 'Alex Johnson',
  age: 38,
  gender: 'Male',
  condition: 'Stable Condition',
  upcomingAppointment: {
    doctor: 'Dr. Sarah Miller',
    department: 'Interventional Cardiology',
    dateTime: 'June 24, 10:30 AM'
  },
  latestReport: {
    title: 'Comprehensive Blood Panel',
    date: 'June 18',
    result: 'Results: Normal',
    pdfUrl: 'blood-report-2024.pdf'
  },
  vitals: [
    {
      label: 'Heart Rate (bpm)',
      data: [
        { day: 'Mon', value: 72 },
        { day: 'Tue', value: 68 },
        { day: 'Wed', value: 75 },
        { day: 'Thu', value: 70 },
        { day: 'Fri', value: 78 },
        { day: 'Sat', value: 72 },
        { day: 'Sun', value: 71 }
      ]
    },
    {
      label: 'Blood Pressure (mmHg)',
      data: [
        { day: 'Mon', value: 120 },
        { day: 'Tue', value: 118 },
        { day: 'Wed', value: 122 },
        { day: 'Thu', value: 119 },
        { day: 'Fri', value: 125 },
        { day: 'Sat', value: 121 },
        { day: 'Sun', value: 118 }
      ]
    },
    {
      label: 'Glucose (mg/dL)',
      data: [
        { day: 'Mon', value: 95 },
        { day: 'Tue', value: 92 },
        { day: 'Wed', value: 98 },
        { day: 'Thu', value: 94 },
        { day: 'Fri', value: 104 },
        { day: 'Sat', value: 96 },
        { day: 'Sun', value: 91 }
      ]
    }
  ]
};
