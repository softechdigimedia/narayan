import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, HeartPulse, Brain, Activity, Baby, Stethoscope, Sparkles, Eye, Droplet, UserRound, Wind, 
  Scale, Ear, Award, Smile, Flame, HeartHandshake, Scissors, Combine, Milestone, Tv, 
  FlaskConical, CheckSquare, ShieldAlert, Shield, Waves, Navigation, AlertOctagon, Biohazard, 
  Users, TrendingUp, Contact, PlusSquare, ChevronDown, ArrowRight,
  ArrowLeft, Clock, Phone, CheckCircle2, ShieldCheck, Heart,  Building
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import gsap from 'gsap';

// Icon mapper helper
const getDepartmentIcon = (iconName: string) => {
  const map: { [key: string]: React.ComponentType<any> } = {
    HeartPulse, Brain, Activity, Baby, Stethoscope, Sparkles, Eye, Droplet, UserRound, Wind,
    Scale, Ear, Award, Smile, Flame, HeartHandshake, Scissors, Combine, Milestone, Tv,
    FlaskConical, CheckSquare, ShieldAlert, Shield, Waves, Navigation, AlertOctagon, Biohazard,
    Users, TrendingUp, Contact, PlusSquare
  };
  return map[iconName] || Stethoscope;
};

interface DepartmentsTabProps {
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
  selectedDeptFromNav?: any;
  setSelectedDeptFromNav?: (dept: any) => void;
}

export default function DepartmentsTab({ 
  setCurrentTab, 
  openAppointmentModal,
  selectedDeptFromNav,
  setSelectedDeptFromNav
}: DepartmentsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'clinical' | 'diagnostic' | 'support'>('all');
  const [selectedDeptInfo, setSelectedDeptInfo] = useState<any>(null);

  useEffect(() => {
    if (selectedDeptFromNav) {
      const correspondingDocs = DOCTORS.filter(d => d.department.toLowerCase() === selectedDeptFromNav.name.toLowerCase());
      setSelectedDeptInfo({ ...selectedDeptFromNav, docs: correspondingDocs });
      if (setSelectedDeptFromNav) {
        setSelectedDeptFromNav(null);
      }
    }
  }, [selectedDeptFromNav]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filteredDepts = DEPARTMENTS.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dept.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || dept.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // GSAP animation on list view
  useEffect(() => {
    if (!selectedDeptInfo) {
      const ctx = gsap.context(() => {
        gsap.fromTo('.dept-card-item', 
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out'
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [searchQuery, activeCategory, selectedDeptInfo]);

  // GSAP animation for transition to Dedicated Department Page
  useEffect(() => {
    if (selectedDeptInfo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      gsap.fromTo('.dedicated-page-entry',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [selectedDeptInfo]);

  // Handle click on department card to load dedicated view
  const handleDeptClick = (dept: any) => {
    const correspondingDocs = DOCTORS.filter(d => d.department.toLowerCase() === dept.name.toLowerCase());
    setSelectedDeptInfo({ ...dept, docs: correspondingDocs });
  };

  // Dedicated Page Render
  if (selectedDeptInfo) {
    const IconComponent = getDepartmentIcon(selectedDeptInfo.icon);
    
    return (
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 dedicated-page-entry">
        
        {/* Navigation Breadcrumb back arrow */}
        <button
          onClick={() => setSelectedDeptInfo(null)}
          id="back-to-all-depts"
          className="group flex items-center space-x-2 text-xs font-bold text-[#086384] hover:text-sky-700 transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-3xs cursor-pointer w-fit"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Departments</span>
        </button>

        {/* Hero Banner Header Grid */}
        <div className="bg-gradient-to-r from-[#086384] to-[#12495d] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle overlay decorative elements */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial-[circle_at_bottom_right,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_70%] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 shadow-lg">
                <IconComponent className="h-8 w-8 stroke-[1.8]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-sky-200 bg-white/10 px-2.5 py-0.5 rounded-md">
                    {selectedDeptInfo.category || 'Clinical'} Division
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold">• NMH Active Sector</span>
                </div>
                <h1 className="text-2xl sm:text-4.5xl font-black uppercase tracking-tight leading-none text-white">
                  {selectedDeptInfo.name}
                </h1>
                <p className="text-sky-100 text-xs sm:text-sm font-medium">Departmental Location: Outpatient Clinic Block, Level 2</p>
              </div>
            </div>

            <button
              onClick={openAppointmentModal}
              id="dept-hero-booking"
              className="bg-white text-[#086384] hover:bg-sky-50 transition-colors font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md cursor-pointer shrink-0 border border-transparent active:scale-95 transition-transform"
            >
              Consult with this division
            </button>
          </div>
        </div>

        {/* Detailed Page Content Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main column - Department description, features, and Doctor roster */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-[#086384]" />
                <span>Specialty Overview & Medical Competencies</span>
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed whitespace-pre-line">
                {selectedDeptInfo.description}
              </p>
              
              {/* Features bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-start space-x-2.5 text-xs text-slate-650">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Advanced clinical diagnostic screening utilities.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-slate-650">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Integrated trauma response & rehabilitative care.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-slate-650">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Patient-centered multidisciplinary treatment models.</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs text-slate-650">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">24/7 senior medical monitoring & backup support.</span>
                </div>
              </div>
            </div>

            {/* Doctors Roster Grid / List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#086384]" />
                  <span>Primary Medical Consultants</span>
                </h3>
                <span className="text-xs text-[#086384] font-bold">
                  {selectedDeptInfo.docs?.length || 0} Board-Certified Specialists
                </span>
              </div>

              {selectedDeptInfo.docs && selectedDeptInfo.docs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedDeptInfo.docs.map((doc: any) => (
                    <div 
                      key={doc.id} 
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center space-x-4">
                        <img 
                          src={doc.image} 
                          alt={doc.name} 
                          className="h-14 w-14 rounded-full object-cover shadow-xs border border-slate-200 group-hover:scale-[1.03] transition-transform duration-300"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight truncate">
                            {doc.name}
                          </h4>
                          <p className="text-[#086384] text-xs font-semibold truncate mt-0.5">{doc.role}</p>
                          <p className="text-slate-400 text-[10px] font-medium truncate mt-0.5">
                            {doc.qualifications.join(', ')}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-4">
                        <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Consultation Slot Open</span>
                        <button
                          onClick={() => {
                            setCurrentTab('doctors');
                          }}
                          className="text-[#086384] font-bold hover:text-sky-700 flex items-center space-x-1"
                        >
                          <span>Roster & Book</span>
                          <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200/80 p-8 rounded-2xl text-center shadow-3xs">
                  <Heart className="h-8 w-8 text-[#086384]/20 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                    All senior medical consultants in our {selectedDeptInfo.name} division are currently available on Rota and emergency basis. Click on "Consult with this division" or schedule via general consultation booking parameters.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Schedule Sidebar & Details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Outpatient Consultation Schedule Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-slate-800 font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2 border-b border-slate-150 pb-3">
                <Clock className="h-5 w-5 text-[#086384]" />
                <span>OPD Core Timings</span>
              </h3>
              
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 font-semibold">Monday - Saturday:</span>
                  <span className="font-extrabold text-slate-800 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-100 font-mono">08:00 AM - 08:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-slate-50">
                  <span className="text-slate-500 font-semibold">Sunday Rota:</span>
                  <span className="font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md font-mono">10:00 AM - 02:00 PM</span>
                </div>
                <p className="text-[10px] text-amber-600 font-semibold bg-amber-500/5 p-2 rounded-lg border border-amber-500/10 leading-normal">
                  ⚠️ Sunday timings are reserved for critical walk-ins, specialist diagnostic reviews, and urgent inpatient referrals.
                </p>
              </div>
            </div>

            {/* Quick Action Booking Details Card */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 text-center">
              <div className="p-3 bg-[#086384]/10 rounded-2xl text-[#086384] w-fit mx-auto">
                <Building className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm">Need Direct Diagnostic Routing?</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Avoid queues by filling out our fast consultation gateway form directly.
                </p>
              </div>
              
              <button
                onClick={openAppointmentModal}
                className="w-full bg-[#086384] hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase shadow-md transition-colors cursor-pointer"
              >
                Schedule Appointment Now
              </button>
            </div>

            {/* Support Helpline Call */}
            <div className="border border-red-200/60 bg-rose-500/5 p-5 rounded-2xl space-y-2.5">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="h-5 w-5 text-red-600" />
                <h4 className="font-black text-rose-950 text-xs uppercase tracking-wider">Trauma & Emergency Services</h4>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                For ambulance dispatch, emergency cardiac admissions, or acute physical trauma referrals, notify our critical care desk immediately:
              </p>
              <div className="flex items-center space-x-2 text-[#086384] font-bold text-xs">
                <Phone className="h-4 w-4 text-emerald-600" />
                <a href="tel:+913366888888" className="hover:underline text-[#086384] font-extrabold">+91 33 6688 8888</a>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title block */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto">
        <span className="text-[#086384] text-xs font-mono font-bold uppercase tracking-wider">World-Class Specialties</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">Specialized Departments</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Access comprehensive, integrated clinical solutions led by board-certified senior medical consultants equipped with state-of-the-art diagnostic technology.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search bar */}
          <div className="md:col-span-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#086384]" />
            <input
              type="text"
              placeholder="Search by department name, specialty or disease keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/10 outline-none transition-all placeholder-slate-400 text-slate-700"
            />
          </div>

          {/* Tab Categories */}
          <div className="md:col-span-4 flex rounded-xl bg-slate-100 p-1">
            {(['all', 'clinical', 'diagnostic', 'support'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#086384] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        <div className="text-xs text-slate-400 flex justify-between items-center px-1">
          <span>Showing {filteredDepts.length} of {DEPARTMENTS.length} total active facilities</span>
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#086384] font-bold hover:underline">
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDepts.map((dept) => {
          const IconComponent = getDepartmentIcon(dept.icon);
          
          return (
            <div
              key={dept.id}
              onClick={() => handleDeptClick(dept)}
              id={`dept-card-${dept.id}`}
              className="dept-card-item bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-md hover:border-[#086384]/30 transition-all pointer-events-auto cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Glowing Icon Container */}
                <div className="p-3 bg-[#086384]/10 text-[#086384] rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 stroke-2" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-800 text-base tracking-tight group-hover:text-[#086384] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-[#086384] font-bold mt-5">
                <span>View Dedicated Page</span>
                <ChevronDown className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
