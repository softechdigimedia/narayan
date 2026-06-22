import React, { useState, useEffect, useRef } from 'react';
import { Search, HeartPulse, Brain, Activity, Baby, Stethoscope, ChevronRight, ArrowRight, Video, Landmark, ShieldCheck, Cpu, FlaskConical, CircleAlert, Users, BookOpen, HeartHandshake, Truck, Award, Shield, ChevronDown, CheckCircle2,  Sparkles, Clock,ArrowUp } from 'lucide-react';
// import PatientPortalDemo from './PatientPortalDemo';
import { DEPARTMENTS } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomeTabProps {
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
  setSelectedDeptFromNav?: (dept: any) => void;
}

export default function HomeTab({ setCurrentTab, openAppointmentModal, setSelectedDeptFromNav }: HomeTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialtyIndex, setActiveSpecialtyIndex] = useState(0);
  const [vrTourActive, setVrTourActive] = useState(false);
  const [vrStep, setVrStep] = useState(1);
  const [activeLibraryCategory, setActiveLibraryCategory] = useState<'procedures' | 'drugs' | 'diagnostics' | 'wellness'>('procedures');
  const [activeProviderSection, setActiveProviderSection] = useState<number>(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const coeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero sections text slide in with elasticity
      gsap.fromTo('.hero-slide-text', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
      gsap.fromTo('.hero-badge', 
        { scale: 0 },
        {
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.2
        }
      );

      // Quick booking widget entry
      if (bookingRef.current) {
        gsap.fromTo(bookingRef.current, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: bookingRef.current,
              start: 'top 85%'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const centersOfExcellence = [
    { id: 'cardiology', label: 'Cardiology', icon: HeartPulse, color: 'text-rose-500 bg-rose-50 border-rose-100' },
    { id: 'neurology', label: 'Neurology', icon: Brain, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
    { id: 'oncology', label: 'Oncology', icon: Activity, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { id: 'orthopedics', label: 'Orthopedics', icon: Landmark, color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { id: 'pediatrics', label: 'Pediatrics', icon: Baby, color: 'text-sky-500 bg-sky-50 border-sky-100' },
    { id: 'gastroenterology', label: 'Gastroenterology', icon: Stethoscope, color: 'text-teal-500 bg-teal-50 border-teal-100' },
  ];

  const specialtySlides = [
    {
      title: 'State-of-the-Art Operation Theatres',
      desc: 'Laminar airflow systems, computerized monitoring layouts, and advanced robotic surgical assistance ensuring minimal patient recovery times and extreme precision.',
      image: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Comprehensive Cardiovascular Wing',
      desc: 'Equipped with custom digital flat-panel cath labs, ECG monitors, and non-invasive surgical blocks prioritizing heart valve restoration operations.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Advanced Diagnostic Scanning Block',
      desc: 'Hosting next-gen 3 Tesla MRI, high-speed volumetric CT, and advanced PET-scanning layout that facilitates early-stage tumor mapping seamlessly.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600'
    }
  ];

  // Rotate specialty slides automatically
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSpecialtyIndex((prev) => (prev + 1) % specialtySlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentTab('departments');
    }
  };

  const healthLibraryContent = {
    procedures: [
      { title: "Cardiac Angioplasty & Stenting", tag: "Cardiology", desc: "Premium catheter-guided balloon dilation and drug-eluting stent placement.", img: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=350" },
      { title: "Minimally Invasive Joint Replacement", tag: "Orthopedics", desc: "Next-gen robotic-guided knee and hip reconstructions with low-wear materials.", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=350" },
      { title: "Stereotactic Neurosurgery", tag: "Neurology", desc: "Computer-mapped target localization for precise focal brain interventions.", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=350" }
    ],
    drugs: [
      { title: "Anti-coagulant Regimens", tag: "Medications", desc: "Guidelines on dosage stability, food restrictions, and clotting speed indicators.", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=350" },
      { title: "Monoclonal Antibody Infusions", tag: "Immunotherapy", desc: "Specialist protocols for directed cellular immune enhancement pipelines.", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=350" },
      { title: "Chronic Pain Modulators", tag: "Neuro-pharma", desc: "Guidance on non-addictive neural receptor stabilization therapies.", img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=350" }
    ],
    diagnostics: [
      { title: "Dual-Source Volumetric CT scans", tag: "Radiology", desc: "High-speed 3D organ renderings with up to 90% reduced radiation exposure.", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=350" },
      { title: "Molecular Tumor Marker Assays", tag: "Pathology", desc: "Ultra-sensitive bloodstream screening for early oncological identification.", img: "https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=350" },
      { title: "24-Hour Ambulatory Holter monitoring", tag: "Diagnostics", desc: "Continuous cardiac rhythm telemetry mapping during standard daily activities.", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=350" }
    ],
    wellness: [
      { title: "Cardiopulmonary Exercise Conditioning", tag: "Rehabilitation", desc: "Guided cardiovascular workouts designed to restore high aerobic capability safely.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=350" },
      { title: "Diabetic Metabolism Blueprints", tag: "Endocrinology", desc: "Personalized dietary fiber index and carbohydrate balance calculations.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=350" },
      { title: "Mindfulness Stroke Prevention", tag: "Neuro-care", desc: "Vagus nerve stimulation techniques and healthy blood pressure habits.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=350" }
    ]
  };

  const providerSections = [
    {
      title: "Nursing Careers & Residency Pools",
      badge: "CAREER PIPELINES",
      icon: Award,
      description: "Narayan Memorial Hospital offers premium, multi-disciplinary nursing pathways led by seasoned clinical administrators. Join our elite wards to build expertise on advanced medical technology under a high-trust, patient-first environment.",
      points: [
        "Specialized onboarding in high-speed diagnostic scan complexes and laminar ORs.",
        "Continuous educational credits and fully-funded board specialization grants.",
        "Balanced clinical shift patterns prioritizing nursing staff well-being."
      ]
    },
    {
      title: "Clinical Trials & Investigational Drugs",
      badge: "ONGOING RESEARCH",
      icon: Shield,
      description: "Our dedicated Clinical Investigation Unit runs approved Phase II and III trials focusing on targeted chemotherapy pathways and non-invasive cardiac devices. NMH complies with all global safety reporting metrics.",
      points: [
        "Inquire eligibility benchmarks for registered national lung & liver studies.",
        "Close oversight by our independent Institutional Ethics Committee (IEC).",
        "Toll-free 24/7 dedicated research physician query line."
      ]
    },
    {
      title: "Residency & Medical Education (CME)",
      badge: "ACADEMICS CELL",
      icon: BookOpen,
      description: "NMH is a recognized venue for Continuing Medical Education (CME) certified by the national medical council. We host regular workshops, live surgery transmission webinars, and advanced diagnostic scans webinars.",
      points: [
        "Monthly credit-based clinical presentation panels led by national scholars.",
        "Hands-on mock workshops utilizing advanced surgical simulator units.",
        "Complimentary full-text access to the global NMH Clinical Journal index."
      ]
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION WITH GLASS ACCENTS AND DOUBLE-LINES */}
      <section
        ref={heroRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10"
      >
        {/* Giant Floating Glass Panel - representing Image 1 & 2 design templates */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/65 bg-white/25 backdrop-blur-xl py-16 px-6 sm:px-12 lg:px-20 text-center shadow-xl">
          
          {/* Inner Light Glow Spots confined to container */}
          <div className="absolute inset-0 pointer-events-none rounded-[36px] overflow-hidden">
            <div className="absolute top-[10%] left-[20%] w-72 h-72 rounded-full bg-blue-300/25 blur-[60px]" />
            <div className="absolute bottom-[10%] right-[15%] w-80 h-80 rounded-full bg-cyan-200/30 blur-[70px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            
            <div className="hero-badge inline-flex items-center space-x-1.5 bg-white/60 border border-white/80 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider text-[#086384] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>EXCELLENCE IN CLINICAL SERVICES</span>
            </div>

            <h1 className="hero-slide-text text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-sans text-slate-900">
              Care Beyond <span className="text-[#086384] drop-shadow-xs">Comparison</span>
            </h1>

            <p className="hero-slide-text text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              Experience world-class medical expertise integrated with cutting-edge technology. We provide a sanctuary of healing designed for your complete comfort and recovery, staffed by modern clinical leaders and specialized consultants.
            </p>

            <div className="hero-slide-text flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab('services')}
                className="bg-[#086384] hover:bg-sky-700 text-white font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border border-white/20"
              >
                Explore Divisions
              </button>
              
              <button
                onClick={() => { setVrTourActive(true); setVrStep(1); }}
                className="bg-white/55 border border-white/80 hover:bg-white/70 text-slate-800 font-bold px-7 py-3.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
              >
                <Video className="h-4 w-4 text-[#086384]" />
                <span>Hospital VR Tour</span>
              </button>
            </div>
            
          </div>

          {/* Quick Stats Grid nestled elegantly on bottom part of Hero glass panel */}
          <div className="mt-12 pt-8 border-t border-white/40 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto relative z-10">
            <div className="space-y-1 bg-white/30 p-4 rounded-2xl border border-white/40 backdrop-blur-xs">
              <h4 className="text-xl sm:text-2xl font-black text-[#086384]">80+</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Medical Experts</p>
            </div>

            <div className="space-y-1 bg-white/30 p-4 rounded-2xl border border-white/40 backdrop-blur-xs">
              <h4 className="text-xl sm:text-2xl font-black text-emerald-600">24/7</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Emergency Care</p>
            </div>

            <div className="space-y-1 bg-white/30 p-4 rounded-2xl border border-white/40 backdrop-blur-xs">
              <h4 className="text-xl sm:text-2xl font-black text-[#086384]">98%</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Patient Trust</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. QUICK BOOKING BAR WITH METALS AND WHITE-GLASS EFFECTS */}
      <section ref={bookingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="bg-white/35 backdrop-blur-xl rounded-3xl border border-white/65 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Booking Inputs */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-slate-800 text-lg sm:text-xl font-sans tracking-tight uppercase">Book Your OPD consultation</h3>
            <p className="text-slate-600 text-xs mt-0.5 font-medium leading-relaxed">Schedule an in-person diagnostic test or specialist check-up across 40+ departments in just a few clicks.</p>
            
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch space-y-2.5 sm:space-y-0 sm:space-x-3 mt-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#086384]" />
                <input
                  type="text"
                  placeholder="Search specialty, department or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/60 border border-white/70 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm focus:bg-white/90 focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/10 outline-none transition-all placeholder-slate-400 font-semibold text-slate-700 shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="bg-[#086384] hover:bg-sky-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm hover:shadow-xs cursor-pointer transition-all active:scale-[0.98] border border-white/10"
              >
                Inquire Speciality
              </button>
            </form>
          </div>

          {/* Quick links card widgets matching Image 3 right stack */}
          <div className="md:col-span-5 bg-white/20 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/50 space-y-3">
            
            {/* Urgent care */}
            <div
              onClick={() => setCurrentTab('contact')}
              className="group p-4 bg-white/50 hover:bg-white/70 border border-white/60 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 pointer-events-auto shadow-2xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl transition-transform duration-200 group-hover:scale-105 border border-white">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Emergency Care</h4>
                  <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">24/7 Response Trauma block</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-rose-600 transition-colors" />
            </div>

            {/* Find Doctor */}
            <div
              onClick={() => setCurrentTab('doctors')}
              className="group p-4 bg-white/50 hover:bg-white/70 border border-white/60 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 pointer-events-auto shadow-2xs"
            >
              <div className="flex items-center space-x-3.5">
                <div className="bg-sky-100 text-[#086384] p-2.5 rounded-xl transition-transform duration-250 group-hover:scale-105 border border-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Find a Specialist</h4>
                  <span className="text-[10px] text-slate-500 mt-0.5 block font-semibold">Browse world-renowned clinicians</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-[#086384] transition-colors" />
            </div>

          </div>
        </div>
      </section>

      {/* COMPASSIONATE CARE FOR YOUR HEALTH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Content / Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight leading-tight">
              Compassionate Care <br />For Your Health
            </h2>
            <p className="text-slate-605 text-xs sm:text-sm font-semibold leading-relaxed">
              Our medical institution is dedicated to offering unparalleled compassion, premium comfort, and clinical leadership. Every patient journey is custom-curated with precision-designed workflows, prioritizing your psychological comfort and speed of recovery.
            </p>

            {/* Feature Checkpoints */}
            <div className="space-y-4 pt-3">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/45 border border-white/60 hover:bg-white/60 transition shadow-3xs">
                <div className="bg-[#086384]/10 text-[#086384] p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Expert Doctors & Clinicians</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Our hospital panels leading national scholars and diagnostic pioneers equipped with modern computer-assisted surgical guidelines.</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/45 border border-white/60 hover:bg-white/60 transition shadow-3xs">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0 h-11 w-11 flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Advanced Surgical Technology</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Integrating laminar airflow theatres, robotic laparoscopy pipelines, and real-time volumetric scanning desks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Mockups matching the image overlay list */}
          <div className="lg:col-span-6 relative flex flex-col sm:flex-row gap-5 items-stretch">
            {/* Background radial accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,99,132,0.1)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Card 1: Available Doctors selector mock card */}
            <div className="flex-1 bg-white/50 backdrop-blur-md border border-white/70 rounded-3xl p-5 flex flex-col justify-between shadow-sm space-y-4">
              <div>
                <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">Realtime Panel</span>
                <h4 className="font-bold text-slate-800 text-sm mt-0.5">Available Doctors</h4>
              </div>
              
              {/* Doctor capsule item */}
              <div className="bg-white/80 p-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-3xs">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" alt="Dr. Adinda" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="min-w-0">
                  <h5 className="font-bold text-slate-800 text-xs truncate">Dr. Adinda Sen</h5>
                  <p className="text-[10px] text-[#086384] font-bold uppercase mt-0.5">Senior Eye Specialist</p>
                </div>
              </div>

              <button 
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-[#0c7297] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center"
              >
                Book Appointment
              </button>
            </div>

            {/* Card 2: Interactive Appointment Scheduling & Certified Specialists list */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-white/60 p-4 rounded-2xl border border-white/70 shadow-3xs hover:bg-white/80 transition flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200/50 text-[#086384] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold font-mono">📅</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">One-Click</span>
                  <h5 className="font-extrabold text-slate-850 text-xs">Easy Appointment Booking</h5>
                </div>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-white/70 shadow-3xs hover:bg-white/80 transition flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-650 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold font-mono">⭐</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Board Certified</span>
                  <h5 className="font-extrabold text-slate-850 text-xs">Clinical Specialists Team</h5>
                </div>
              </div>

              {/* Doctor presentation card */}
              <div className="bg-[#086384]/10 backdrop-blur-md border border-white/55 p-4 sm:p-5 rounded-3xl flex flex-col justify-between flex-grow">
                <span className="text-[9px] font-mono font-black text-[#086384] tracking-widest uppercase mb-1 block">Clinical Sanctuary</span>
                <p className="text-[11px] text-[#0d3b50]/80 font-bold leading-relaxed mb-4">
                  We operate at optimal safety guidelines with modern medical standards.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-5 h-5 rounded-full bg-slate-300 border border-white overflow-hidden"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=50" className="w-full h-full object-cover" /></div>
                    <div className="w-5 h-5 rounded-full bg-slate-400 border border-white overflow-hidden"><img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=50" className="w-full h-full object-cover" /></div>
                    <div className="w-5 h-5 rounded-full bg-slate-500 border border-white overflow-hidden"><img src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=50" className="w-full h-full object-cover" /></div>
                  </div>
                  <span className="text-[9px] text-[#086384] font-black tracking-wider uppercase font-mono">80+ Panelists</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ADMINISTRATIVE CLINICAL STATS BOARD (Inspired by MedicPro - Image 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/45 backdrop-blur-md border border-white/60 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 shadow-3xs">
            <div className="h-11 w-11 bg-[#086384]/10 text-[#086384] rounded-2xl flex items-center justify-center shrink-0 border border-white/40">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight">24/7</h4>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-0.5">Active Response</p>
            </div>
          </div>

          <div className="bg-white/45 backdrop-blur-md border border-white/60 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 shadow-3xs">
            <div className="h-11 w-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 border border-white/40">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight">80+</h4>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-0.5">Consultants Panel</p>
            </div>
          </div>

          <div className="bg-white/45 backdrop-blur-md border border-white/60 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 shadow-3xs">
            <div className="h-11 w-11 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-white/40">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight">100K+</h4>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-0.5">Citizens Adjudged</p>
            </div>
          </div>

          <div className="bg-white/45 backdrop-blur-md border border-white/60 p-6 rounded-3xl flex items-center gap-4 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 shadow-3xs">
            <div className="h-11 w-11 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 border border-white/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-850 tracking-tight">99.8%</h4>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono mt-0.5">Clinical Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CENTERS OF EXCELLENCE WITH ICE GLAZE PLATES */}
      <section ref={coeRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-white/40 pb-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Centers of Excellence</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold">Dedicated clinical cells providing advanced, premium intervention pipelines.</p>
          </div>
          <button
            onClick={() => setCurrentTab('departments')}
            className="text-xs sm:text-sm text-[#086384] hover:text-sky-700 font-bold flex items-center mt-3.5 sm:mt-0 transition-colors"
          >
            <span className="border-b border-[#086384]/30 pb-0.5">Explore All Departments</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </button>
        </div>

        {/* Circular grid representation matching standard glass cards in reference image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {centersOfExcellence.map((center) => (
            <div
              key={center.id}
              onClick={() => {
                const dept = DEPARTMENTS.find(d => d.id === center.id);
                if (dept && setSelectedDeptFromNav) {
                  setSelectedDeptFromNav(dept);
                }
                setCurrentTab('departments');
              }}
              className="bg-white/35 backdrop-blur-md border border-white/65 rounded-2xl p-5 flex flex-col items-center text-center justify-center space-y-4 hover:-translate-y-1.5 hover:bg-white/60 hover:shadow-xs transition-all duration-300 group cursor-pointer pointer-events-auto"
            >
              <div className={`p-4 rounded-full border ${center.color} transition-all duration-300 group-hover:scale-110 shadow-3xs`}>
                <center.icon className="h-5.5 w-5.5" />
              </div>
              <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider group-hover:text-[#086384] transition-colors">
                {center.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* COMPASSIONATE SERVICE CHANNELS (Inspired by Serenica - Image 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block">Our Service Philosophy</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight text-center">Every Service With a Touch of Compassion</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold text-center">
            We deliver highly optimized personal assistance channels designed to support you and your loved ones at every clinical step, both inside our hospital and at home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Personal Care */}
          <div className="bg-white/35 backdrop-blur-md border border-white/65 hover:bg-white/65 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group shadow-3xs cursor-pointer pointer-events-auto" onClick={openAppointmentModal}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-[#086384]/10 text-[#086384] rounded-2xl flex items-center justify-center border border-white/50 shadow-3xs group-hover:scale-105 transition-transform">
                <HeartHandshake className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Personal Assisted Care</h3>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Dedicated non-clinical assistants guide elderly or critical patients through OPD registrations, diagnostics, and pharmaceutical checkouts smoothly.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-[#086384] font-bold text-xs uppercase tracking-wider">
              <span>Book Guide</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Medication Help */}
          <div className="bg-white/35 backdrop-blur-md border border-white/65 hover:bg-white/65 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group shadow-3xs cursor-pointer pointer-events-auto" onClick={openAppointmentModal}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-white/50 shadow-3xs group-hover:scale-105 transition-transform">
                <Stethoscope className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Home Medication & Support</h3>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Receive proactive medication schedule reminders, custom home-care vital reports, and tele-consultation support directly inside your personal mailbox.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-[#086384] font-bold text-xs uppercase tracking-wider">
              <span>Inquire Setup</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Friendly Visits */}
          <div className="bg-white/35 backdrop-blur-md border border-white/65 hover:bg-white/65 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group shadow-3xs cursor-pointer pointer-events-auto" onClick={openAppointmentModal}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-white/50 shadow-3xs group-hover:scale-105 transition-transform">
                <Users className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Assisted Diagnostic Escorts</h3>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Qualified patient escorts provide companion transportation, step-by-step guidance, and medical records file coordination during clinical exams.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-[#086384] font-bold text-xs uppercase tracking-wider">
              <span>Schedule Companion</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Safe Transport */}
          <div className="bg-white/35 backdrop-blur-md border border-white/65 hover:bg-white/65 rounded-3xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group shadow-3xs cursor-pointer pointer-events-auto" onClick={openAppointmentModal}>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-white/50 shadow-3xs group-hover:scale-105 transition-transform">
                <Truck className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Patient Safe Transport</h3>
              <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                Specially calibrated low-suspension clinical transportation and paramedical shuttle services mapped to key residential neighborhoods.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between text-[#086384] font-[#086384] font-bold text-xs uppercase tracking-wider">
              <span className="text-[#086384]">Book Vehicle</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FUTURE READY MEDICAL INFRASTRUCTURE CAROUSEL */}
      <section className="bg-white/20 backdrop-blur-md border-y border-white/60 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left carousel block */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white/60 border border-white/70 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold text-[#086384] tracking-wider shadow-2xs">
              <span>SPECIALIZED INFRASTRUCTURE</span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Future-Ready Technology</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
              Narayan Memorial Hospital is equipped with the latest diagnostic and therapeutic infrastructure, ensuring unmatched precision and speed in clinical reporting and critical patient actions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
              
              <div className="bg-white/40 border border-white/60 p-4 rounded-xl space-y-1 hover:bg-white/60 transition-all duration-200 shadow-3xs">
                <Cpu className="h-5 w-5 text-[#086384]" />
                <h4 className="font-bold text-slate-800">Advanced Lab</h4>
                <p className="text-slate-500 font-semibold text-[11px]">Automated pathology with rapid reporting panels.</p>
              </div>

              <div className="bg-white/40 border border-white/60 p-4 rounded-xl space-y-1 hover:bg-white/60 transition-all duration-200 shadow-3xs">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h4 className="font-bold text-slate-800">Intensive Care</h4>
                <p className="text-slate-500 font-semibold text-[11px]">Specialized level 3 ICU units with 1:1 nurse ratios.</p>
              </div>

              <div className="bg-white/40 border border-white/60 p-4 rounded-xl space-y-1 hover:bg-white/60 transition-all duration-200 shadow-3xs">
                <FlaskConical className="h-5 w-5 text-indigo-600" />
                <h4 className="font-bold text-slate-800">Precision Imaging</h4>
                <p className="text-slate-500 font-semibold text-[11px]">3 Tesla MRI and high-speed volumetric CT scanners.</p>
              </div>

              <div className="bg-white/40 border border-white/60 p-4 rounded-xl space-y-1 hover:bg-white/60 transition-all duration-200 shadow-3xs">
                <CircleAlert className="h-5 w-5 text-rose-500" />
                <h4 className="font-bold text-slate-800">Robotics Care</h4>
                <p className="text-slate-500 font-semibold text-[11px]">Minimally invasive computer-assisted surgeries.</p>
              </div>

            </div>

          </div>

          {/* Right active slide card */}
          <div className="lg:col-span-7 relative bg-white/45 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden shadow-md p-5 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 h-56 rounded-2xl overflow-hidden relative border border-white/40 shadow-xs">
              <img
                src={specialtySlides[activeSpecialtyIndex].image}
                alt={specialtySlides[activeSpecialtyIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between py-1">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#086384] uppercase tracking-wider">Our Specialities Showcase</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight transition-all">
                  {specialtySlides[activeSpecialtyIndex].title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed transition-all font-medium">
                  {specialtySlides[activeSpecialtyIndex].desc}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 pt-5">
                {specialtySlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSpecialtyIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSpecialtyIndex === idx
                        ? 'w-7 bg-[#086384]'
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us : EXPERIENCE EXCELLENCE IN CLINICAL CARE */}
      <section className="bg-slate-50/50 border-y border-white/60 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Key points with hover directions matching image row/grid design */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block mb-1">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight leading-tight">
                Experience Excellence <br className="hidden sm:inline" />In Medical Care
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2 font-semibold">
                Combining deep compassionate attention with cutting-edge diagnostics to ensure a seamless medical resolution path for our citizens.
              </p>
            </div>

            <div className="space-y-3">
              {/* Quick Response */}
              <div className="p-4 bg-white hover:bg-slate-50 border border-slate-100/85 rounded-2xl flex items-center justify-between transition group shadow-3xs cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">🚑</span>
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Quick Response & Emergency Priority</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">High-speed trauma mobilization & active emergency beds.</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-350 group-hover:text-[#086384] group-hover:translate-x-1.5 transition-all" />
              </div>

              {/* Customer Focus */}
              <div className="p-4 bg-white hover:bg-slate-50 border border-slate-100/85 rounded-2xl flex items-center justify-between transition group shadow-3xs cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">❤️</span>
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Complete Patient-Centric Focus</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Personalized treatment blueprints & comprehensive family updates.</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-350 group-hover:text-emerald-650 group-hover:translate-x-1.5 transition-all" />
              </div>

              {/* 50+ Expert Doctors */}
              <div className="p-4 bg-white hover:bg-slate-50 border border-slate-100/85 rounded-2xl flex items-center justify-between transition group shadow-3xs cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">🩺</span>
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">50+ Board Certified Consultants</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Extensive multidisciplinary medical cells and diagnostics experts.</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-350 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all" />
              </div>
            </div>
          </div>

          {/* Right Column - Beautiful styled image/video card block with video icon prompt overlay to match image */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800" 
                alt="Excellence in Medical Care" 
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              {/* Soft cyan-tint gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              
              {/* Dynamic visual overlay button representing play video overlay */}
              <button 
                onClick={() => { setVrTourActive(true); setVrStep(1); }}
                className="absolute inset-0 flex items-center justify-center group pointer-events-auto cursor-pointer"
              >
                <div className="h-16 w-16 bg-[#086384] hover:bg-sky-700 text-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl transition duration-305 group-hover:scale-105">
                  <Video className="h-6 w-6 ml-0.5 animate-pulse" />
                </div>
              </button>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-150 flex items-center justify-between">
                <div className="min-w-0">
                  <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide truncate">Inside Narayan Memorial</h5>
                  <p className="text-[10px] text-slate-500 font-bold mt-0.5 truncate">Watch Our Campus Infrastructure & Trauma Response Team</p>
                </div>
                <span className="text-[9px] bg-red-500 font-bold text-white px-2 py-0.5 rounded-full shrink-0 font-mono tracking-wider animate-pulse ml-2.5">STREAM</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CLINICAL LIBRARY & HEALTH RESOURCE CENTER (Inspired by Cleveland Clinic - Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200/60 pb-5">
          <div>
            <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block">Health Library</span>
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Reliable Clinical Resource Center</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold">
              Browse professional medical guidelines, diagnostic procedures, drug safety schemas, and cardiovascular health blueprints.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Selector List */}
          <div className="lg:col-span-4 flex flex-col gap-2 bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/60 shadow-3xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono px-3 mb-2 block">Filter Resources</span>
            
            {(['procedures', 'drugs', 'diagnostics', 'wellness'] as const).map((cat) => {
              const labels = {
                procedures: 'Therapeutic Procedures',
                drugs: 'Drugs & Supplements',
                diagnostics: 'Diagnostics & Testing',
                wellness: 'Wellness & Prevention'
              };
              return (
                <button
                  key={cat}
                  onClick={() => setActiveLibraryCategory(cat)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                    activeLibraryCategory === cat
                      ? 'bg-[#086384] text-white shadow-3xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{labels[cat]}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeLibraryCategory === cat ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Resource Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthLibraryContent[activeLibraryCategory].map((item, index) => (
              <div 
                key={index} 
                className="bg-white/35 backdrop-blur-md border border-white/65 hover:bg-white/65 transition-all duration-300 rounded-3xl overflow-hidden shadow-3xs hover:-translate-y-1 flex flex-col justify-between group pointer-events-auto cursor-pointer"
                onClick={openAppointmentModal}
              >
                <div>
                  <div className="relative h-44 overflow-hidden border-b border-white/40">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#086384] font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/30">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm leading-tight group-hover:text-[#086384] transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <div className="p-5 border-t border-slate-100/50 pt-4 flex items-center justify-between text-[#086384] text-[10px] font-bold uppercase tracking-wider pointer-events-none">
                  <span>Read Full Guide</span>
                  <BookOpen className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIVE CLINIC STYLE "FOR PROVIDERS" GATEWAY (Inspired by Cleveland Clinic / MedicPro - Image 2 & 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-4 space-y-5">
            <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block">Clinical Governance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">For Medical Providers</h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
              We cooperate deeply with the broader clinical community to promote academic rigor, high safety standards, and innovative medical protocols. Access our dedicated referring liaisons.
            </p>
            <div className="p-5 bg-[#086384]/5 border border-[#086384]/15 rounded-3xl space-y-2.5">
              <h4 className="font-mono text-[#086384] text-[10px] uppercase tracking-widest font-black">Admitting Privilege Hotline</h4>
              <p className="text-xs text-slate-700 font-bold">Priority Referring Line: +91 (33) 4015 6700</p>
              <p className="text-[10px] text-slate-400 font-medium">Restricted solely for verified board-certified practitioners.</p>
            </div>
          </div>

          {/* Right Column Interactive Accordion */}
          <div className="lg:col-span-8 space-y-3.5">
            {providerSections.map((sect, idx) => {
              const IconComp = sect.icon;
              const isActive = activeProviderSection === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden transition duration-200 pointer-events-auto"
                >
                  <button
                    onClick={() => setActiveProviderSection(isActive ? -1 : idx)}
                    className="w-full text-left p-5 flex items-center justify-between cursor-pointer hover:bg-white/60 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl border transition-colors ${
                        isActive 
                          ? 'bg-[#086384] text-white border-transparent' 
                          : 'bg-white text-slate-600 border-slate-100'
                      }`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-[#086384] font-bold tracking-widest uppercase font-mono block mb-0.5">{sect.badge}</span>
                        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">{sect.title}</h4>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-slate-450 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#086384]' : ''}`} />
                  </button>

                  {isActive && (
                    <div className="p-6 border-t border-slate-100 bg-white/30 space-y-4 animate-fadeIn">
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">{sect.description}</p>
                      
                      <div className="space-y-2.5">
                        <span className="text-[9px] text-slate-450 font-black uppercase tracking-wider font-mono block">Action Framework Coordinates:</span>
                        {sect.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="h-4 w-4 text-[#086384] shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-500 font-semibold">{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3">
                        <button 
                          onClick={openAppointmentModal}
                          className="bg-[#086384] hover:bg-sky-700 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-xl transition cursor-pointer border border-white/10"
                        >
                          Access Physician Gateway
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4B. CORE OBJECTIVES & CLINICAL VALUES (Inspired by Medicare - Image 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/35 backdrop-blur-md rounded-[36px] border border-white/65 p-8 sm:p-12 shadow-sm">
          
          {/* Left Column - Content details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block mb-1">Our Core Objective</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight leading-tight">
                Let's Know About Our <br className="hidden sm:inline" />Main Goal & Mission
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2 font-medium">
                We aim to offer clear and comprehensive diagnostic reports, state-of-the-art therapeutic procedures, and proactive wellness regimes to verify that each patient enjoys optimal life-comfort standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg shrink-0 mt-0.5 border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Accessible Diagnosis</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Quick delivery of lab coordinates & scan reports.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-[#086384]/10 text-[#086384] p-1.5 rounded-lg shrink-0 mt-0.5 border border-[#086384]/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">High Active Engagement</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Continuous physician-patient video consultation channels.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg shrink-0 mt-0.5 border border-indigo-100">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Preventive Health Care</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Bi-weekly clinical camps and full-body health checklists.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="bg-rose-50 text-rose-600 p-1.5 rounded-lg shrink-0 mt-0.5 border border-rose-100">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Trusted Clinical Accuracy</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Verified by senior double-board specialists panels.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={openAppointmentModal}
                className="bg-[#086384] hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition cursor-pointer text-center"
              >
                Inquire Health Framework
              </button>
              <button 
                onClick={() => setCurrentTab('departments')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition cursor-pointer text-center"
              >
                Explore Specialties
              </button>
            </div>
          </div>

          {/* Right Column - Visual Graphic mockup matching image doctor pose */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-900 h-80 sm:h-96">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600" 
                alt="Expert Medical Goal" 
                className="w-full h-full object-cover filter brightness-95 contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 space-y-2">
                <div className="flex items-center gap-1.5 text-[#086384]">
                  <Sparkles className="h-4 w-4 fill-[#086384]/20" />
                  <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold">Active Institutional Mission</span>
                </div>
                <h5 className="font-black text-slate-900 text-xs uppercase">Compassionate Governance</h5>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  Integrating clinical precision surgical simulators with personalized diagnostic support to protect over 120,000 citizens.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4C. LET'S MEET WITH EXPERT CLINICIANS (Inspired by Medicare - Image 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-extrabold block">Specialist Panel</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight text-center">Meet Our Expert Clinicians</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold text-center">
            Our medical directorate unites leading board-certified consultants equipped with global clinical training.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Doctor 1 */}
          <div className="bg-white/45 backdrop-blur-md border border-white/60 hover:bg-white/60 rounded-[32px] overflow-hidden shadow-3xs group transition-all duration-300 flex flex-col justify-between">
            <div className="p-3">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" 
                  alt="Dr. Adinda Sen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0d3b50]/90 backdrop-blur-xs text-white font-mono text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                  OPD PRIMARY
                </span>
              </div>
              <div className="p-4 space-y-1 text-center">
                <h4 className="font-extrabold text-slate-850 text-sm group-hover:text-[#086384] transition-colors">Dr. Adinda Sen</h4>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">Senior Eye Consultant</p>
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="text-[10px] bg-[#0c7297]/15 text-[#086384] px-2 py-0.5 rounded-full font-bold">MBBS, MS (Ophth)</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button 
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-[#0c7297] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center uppercase tracking-wider"
              >
                Inquire Specialist
              </button>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="bg-white/45 backdrop-blur-md border border-white/60 hover:bg-white/60 rounded-[32px] overflow-hidden shadow-3xs group transition-all duration-300 flex flex-col justify-between">
            <div className="p-3">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" 
                  alt="Dr. Bruce Grayson"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0d3b50]/90 backdrop-blur-xs text-white font-mono text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                  TRAUMA CLINIC
                </span>
              </div>
              <div className="p-4 space-y-1 text-center">
                <h4 className="font-extrabold text-slate-850 text-sm group-hover:text-[#086384] transition-colors">Dr. Bruce Grayson</h4>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">Lead Trauma Surgeon</p>
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="text-[10px] bg-[#0c7297]/15 text-[#086384] px-2 py-0.5 rounded-full font-bold">FRCS (Edin), MCh</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button 
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-[#0c7297] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center uppercase tracking-wider"
              >
                Inquire Specialist
              </button>
            </div>
          </div>

          {/* Doctor 3 */}
          <div className="bg-white/45 backdrop-blur-md border border-white/60 hover:bg-white/60 rounded-[32px] overflow-hidden shadow-3xs group transition-all duration-300 flex flex-col justify-between">
            <div className="p-3">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400" 
                  alt="Dr. Shelly Patel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0d3b50]/90 backdrop-blur-xs text-white font-mono text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                  PEDIATRICS
                </span>
              </div>
              <div className="p-4 space-y-1 text-center">
                <h4 className="font-extrabold text-slate-850 text-sm group-hover:text-[#086384] transition-colors">Dr. Shelly Patel</h4>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">Consultant Pediatrician</p>
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="text-[10px] bg-[#0c7297]/15 text-[#086384] px-2 py-0.5 rounded-full font-bold">MD (Ped), DCH</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button 
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-[#0c7297] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center uppercase tracking-wider"
              >
                Inquire Specialist
              </button>
            </div>
          </div>

          {/* Doctor 4 */}
          <div className="bg-white/45 backdrop-blur-md border border-white/60 hover:bg-white/60 rounded-[32px] overflow-hidden shadow-3xs group transition-all duration-300 flex flex-col justify-between">
            <div className="p-3">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/40">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" 
                  alt="Dr. Kullok Dash"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#0d3b50]/90 backdrop-blur-xs text-white font-mono text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
                  NEURO CELL
                </span>
              </div>
              <div className="p-4 space-y-1 text-center">
                <h4 className="font-extrabold text-slate-850 text-sm group-hover:text-[#086384] transition-colors">Dr. Pullok Das</h4>
                <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono">Senior Clinical Neurologist</p>
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="text-[10px] bg-[#0c7297]/15 text-[#086384] px-2 py-0.5 rounded-full font-bold">DM (Neuro), MD</span>
                </div>
              </div>
            </div>
            <div className="p-4 pt-0">
              <button 
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-[#0c7297] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center uppercase tracking-wider"
              >
                Inquire Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PATIENT PORTAL WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[#086384] font-mono text-xs uppercase tracking-wider font-bold">Secure Personal Access</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">Patient Portal</h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Access your complete medical history, download lab blueprints, view active medication prescriptions, and manage upcoming specialist consultations safely.
          </p>
        </div>

        {/* Modular patient portal loading with high fidelity biometrics */}
        {/* <PatientPortalDemo /> */}
      </section>

      {/* 6. VALET PARKING & PATIENT LOUNGES BANNER (Inspired by screenshot - Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8 relative z-10 animate-fadeIn">
        <div className="bg-[#0c2430] border border-white/10 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="h-12 w-12 bg-[#086384]/30 text-sky-400 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-md">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-white text-sm sm:text-base tracking-wide uppercase">
                Valet Parking & Patient Lounges Available
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm font-semibold max-w-2xl leading-relaxed">
                Complimentary physical valet drop services operate directly inside the Diamond Harbour gate for immediate emergency drop-offs.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#086384] hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 rounded-xl sm:rounded-2xl transition cursor-pointer shrink-0 border border-white/10 flex items-center gap-2"
          >
            <span>Go Back To Top Page</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </section>


      {/* VR TOUR POPUP SIMULATION MODAL */}
      {vrTourActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs" onClick={() => setVrTourActive(false)} />
          
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl relative overflow-hidden z-10 flex flex-col">
            <div className="bg-slate-900 text-white px-5 py-4 flex justify-between items-center bg-radial">
              <div>
                <h4 className="font-bold text-sm tracking-tight text-white flex items-center">
                  <Video className="h-4.5 w-4.5 mr-2 text-sky-400" />
                  <span>NMH VIRTUAL REALITY TOUR</span>
                </h4>
                <p className="text-[10px] text-sky-300 font-mono mt-0.5">Stream Step {vrStep} of 3</p>
              </div>
              <button onClick={() => setVrTourActive(false)} className="text-white/80 hover:text-white bg-white/10 px-2 py-1 rounded-md text-xs font-bold">Close</button>
            </div>

            <div className="p-5 flex flex-col space-y-4">
              {vrStep === 1 && (
                <div className="space-y-3.5">
                  <div className="h-40 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                    <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover filter brightness-95" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Central Main Atrium Lobby</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Designed as a therapeutic sanctuary with spacious negative space, natural sunlight ingress, and immediate access to outpatient diagnostic counters with responsive assistance desks.
                  </p>
                </div>
              )}

              {vrStep === 2 && (
                <div className="space-y-3.5">
                  <div className="h-40 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                    <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover filter brightness-95" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Level 3 Cardiac Intensive suite</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Equipped with complete modular telemetry systems, immediate wall oxygen delivery pipelines, and an emergency response link directly mapped to the duty cardiology specialist Desk.
                  </p>
                </div>
              )}

              {vrStep === 3 && (
                <div className="space-y-3.5">
                  <div className="h-40 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200">
                    <img src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover filter brightness-95" referrerPolicy="no-referrer" />
                    <span className="absolute bottom-3 left-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Clean Glass Operation Theatre</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero-dust environment operating under strict positive air pressure limits. Accommodates surgical robotics, stereotactic imaging coordinates, and multi-disciplinary clinical consoles.
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                {vrStep > 1 ? (
                  <button onClick={() => setVrStep(vrStep - 1)} className="text-xs text-slate-500 hover:text-slate-800 font-bold">← Previous Section</button>
                ) : <span />}

                {vrStep < 3 ? (
                  <button onClick={() => setVrStep(vrStep + 1)} className="bg-[#086384] text-white font-bold text-xs px-3.5 py-1.5 rounded-md hover:bg-sky-700">Next Section →</button>
                ) : (
                  <button onClick={() => setVrTourActive(false)} className="bg-emerald-500 text-white font-bold text-xs px-4 py-1.5 rounded-md hover:bg-emerald-600">Finish Virtual Tour</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
