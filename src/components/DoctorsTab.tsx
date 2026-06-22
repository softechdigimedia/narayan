import  { useState, useEffect, useRef } from 'react';
import { Search, Star, Award, Clock } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import gsap from 'gsap';

interface DoctorsTabProps {
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
  selectedDoctorFromNav?: any;
  setSelectedDoctorFromNav?: (doc: any) => void;
}

export default function DoctorsTab({ 
  setCurrentTab, 
  openAppointmentModal,
  selectedDoctorFromNav,
  setSelectedDoctorFromNav
}: DoctorsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [selectedDocDetails, setSelectedDocDetails] = useState<any>(null);

  useEffect(() => {
    if (selectedDoctorFromNav) {
      setSelectedDocDetails(selectedDoctorFromNav);
      if (setSelectedDoctorFromNav) {
        setSelectedDoctorFromNav(null);
      }
    }
  }, [selectedDoctorFromNav]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filters logic
  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = !deptFilter || doc.department.toLowerCase() === deptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.doctor-card-item', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [searchQuery, deptFilter]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3.5 max-w-2xl mx-auto">
        <span className="text-[#086384] text-xs font-mono font-bold uppercase tracking-wider">Board Certified Specialists</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight leading-none">Meet Our Experts</h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Consult with our board-certified physicians and clinical researchers who are recognized leaders in their respective medical specialties.
        </p>
      </div>

      {/* Filter Options */}
      <div className="bg-white/35 backdrop-blur-md border border-white/65 p-5 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Search */}
        <div className="md:col-span-7 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#086384]" />
          <input
            type="text"
            placeholder="Search doctors by name, qualifications or research area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 border border-white/70 rounded-xl pl-12 pr-4 py-3.5 text-xs sm:text-sm focus:bg-white/95 focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/10 outline-none transition-all placeholder-slate-400 font-semibold text-slate-700 shadow-3xs"
          />
        </div>

        {/* Department filter dropdown */}
        <div className="md:col-span-5">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="w-full bg-white/60 border border-white/70 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-700 focus:bg-white/95 focus:border-[#086384] outline-none transition-all cursor-pointer shadow-3xs"
          >
            <option value="">-- All Departments & Specialties --</option>
            {DEPARTMENTS.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Outpatient Specialists Grid matching Image 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="doctor-card-item bg-white/30 backdrop-blur-xs border border-white/60 rounded-2xl overflow-hidden hover:bg-white/45 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-3xs relative z-10"
          >
            {/* Image header frame */}
            <div className="h-68 overflow-hidden relative border-b border-white/40 group">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-full object-cover origin-center group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Status pill */}
              <span className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm ${
                doc.status === 'Available'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-300/30'
                  : 'bg-amber-50 text-amber-500 border-amber-300/30'
              }`}>
                ● {doc.status}
              </span>
            </div>

            {/* Profile Info */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#086384] tracking-wider uppercase block">{doc.role}</span>
                <h3 className="text-lg font-black text-slate-900 leading-tight tracking-tight uppercase">{doc.name}</h3>
                
                {/* Qualifications list */}
                <span className="text-slate-500 text-xs font-mono font-bold block pb-1">
                  {doc.qualifications.join(' • ')}
                </span>
                
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 pt-2.5 border-t border-white/40 font-medium">
                  {doc.bio}
                </p>
              </div>

              {/* Patient Rating and details */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <strong className="text-slate-700">{doc.rating.toFixed(1)}</strong>
                  <span>patient score</span>
                </div>
                <button
                  onClick={() => setSelectedDocDetails(doc)}
                  className="text-xs text-[#086384] hover:underline font-bold"
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* CTA action bottom footer bar */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setSelectedDocDetails(doc);
                }}
                className="flex-1 bg-white border border-slate-200 text-slate-600 hover:text-[#086384] hover:bg-slate-50 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
              >
                Inquire Schedule
              </button>
              <button
                onClick={openAppointmentModal}
                className="flex-1 bg-[#086384] hover:bg-[#0a5874] text-white text-xs font-bold py-3 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Book Consultation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DOCTOR DETAILED INFO POPUP PANEL */}
      {selectedDocDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setSelectedDocDetails(null)} />
          
          <div className="bg-white rounded-3xl w-full max-w-xl border border-slate-200 shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[85vh]">
            
            {/* Header / Picture framework */}
            <div className="bg-slate-50 px-6 py-6 border-b border-slate-150 flex flex-col sm:flex-row items-center gap-5 shrink-0">
              <img
                src={selectedDocDetails.image}
                alt={selectedDocDetails.name}
                className="h-20 w-20 rounded-2xl object-cover shrink-0 border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[10px] font-bold text-[#086384] uppercase tracking-wider block">{selectedDocDetails.role}</span>
                <h3 className="font-bold text-slate-800 text-lg uppercase leading-none">{selectedDocDetails.name}</h3>
                <span className="text-slate-400 text-xs block">{selectedDocDetails.qualifications.join(', ')}</span>
              </div>
              <button
                onClick={() => setSelectedDocDetails(null)}
                className="absolute top-4 right-4 bg-slate-200/50 hover:bg-slate-200 p-1.5 rounded-full text-slate-500 transition-all text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal details body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600">
              <div className="space-y-2">
                <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest">Medical Background Profile</span>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedDocDetails.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-slate-100 bg-slate-50/60 p-3 rounded-xl flex items-start space-x-2.5">
                  <Award className="h-5 w-5 text-[#086384] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 block">Quality Rating</span>
                    <p className="text-slate-500 mt-0.5">{selectedDocDetails.rating.toFixed(1)} / 5.0 (verified patient metrics)</p>
                  </div>
                </div>

                <div className="border border-slate-100 bg-slate-50/60 p-3 rounded-xl flex items-start space-x-2.5">
                  <Clock className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-700 block">Clinical Rota Status</span>
                    <p className="text-slate-500 mt-0.5">{selectedDocDetails.status} for physical OPD walk-ins</p>
                  </div>
                </div>
              </div>

              {/* Research and clinical competencies */}
              <div className="space-y-2.5">
                <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest">Compentency areas</span>
                
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600 text-[11px]">
                  <li>Expert surgical diagnostic interventions and post-operative monitoring standards.</li>
                  <li>Involved in peer-reviewed clinical research and academic publications globally.</li>
                  <li>Dedicated to multi-disciplinary care approaches aligned with ethical priorities.</li>
                </ul>
              </div>

              {/* CTA Booking panel in modal details */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDocDetails(null)}
                  className="w-1/3 border border-slate-200 text-slate-600 font-bold py-3.5 rounded-xl text-center hover:bg-slate-50 transition-colors"
                >
                  Close Profile
                </button>
                <button
                  onClick={() => {
                    setSelectedDocDetails(null);
                    openAppointmentModal();
                  }}
                  className="w-2/3 bg-[#086384] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider hover:bg-sky-700 cursor-pointer text-center shadow-md hover:shadow-sky-500/15"
                >
                  Book consultation
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
