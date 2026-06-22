import React, { useState } from 'react';
import { 
  Award, ShieldCheck, User, CheckCircle, 
   Briefcase, FileSpreadsheet, Newspaper, 
  Image as ImageIcon, FileUp, ArrowLeft,  
  Building2, Users, Receipt, BookOpen, Stethoscope, FileClock
} from 'lucide-react';

interface InfoPageTabProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
}

export default function InfoPageTab({ currentTab, setCurrentTab, openAppointmentModal }: InfoPageTabProps) {
  const [careerForm, setCareerForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Staff Nurse (Grade I ICU)',
    exp: '',
    cvUploaded: false
  });
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => {
      setCareerSubmitted(false);
      setCareerForm({
        name: '',
        email: '',
        phone: '',
        position: 'Staff Nurse (Grade I ICU)',
        exp: '',
        cvUploaded: false
      });
    }, 3500);
  };

  // Subgroup definitions for beautiful sidebar navigation
  const navigationGroups = [
    {
      title: "Our Heritage & Board",
      items: [
        { id: 'about', label: 'About NMH', icon: Building2 },
        { id: 'chairman', label: 'Chairman’s Message', icon: User },
        { id: 'ceo', label: 'CEO’s Message', icon: Users },
        { id: 'awards', label: 'Awards & Quality', icon: Award }
      ]
    },
    {
      title: "Clinical Cell Info",
      items: [
        { id: 'waste', label: 'Waste Management Report', icon: FileSpreadsheet },
        { id: 'news', label: 'News & Events', icon: Newspaper },
        { id: 'press', label: 'Press Releases', icon: FileClock },
        { id: 'gallery', label: 'Hospital Visual Tour', icon: ImageIcon }
      ]
    },
    {
      title: "Patient Assistance & Career",
      items: [
        { id: 'guide', label: 'Patient’s Guide', icon: BookOpen },
        { id: 'insurance', label: 'Insurance Partners', icon: Receipt },
        { id: 'corporates', label: 'Corporate Tie-Ups', icon: Stethoscope },
        { id: 'career', label: 'Careers @ NMH', icon: Briefcase }
      ]
    }
  ];

  const getPageMeta = () => {
    switch (currentTab) {
      case 'about': return { title: 'About Narayan Memorial Hospital', subtitle: 'Leading clinical standards with supreme care accessibility.' };
      case 'chairman': return { title: 'Chairman’s Message', subtitle: 'Uncompromising corporate governance & patient commitments.' };
      case 'ceo': return { title: 'CEO’s Operational Message', subtitle: 'Pioneering healthcare digital integration & safety protocols.' };
      case 'awards': return { title: 'Awards & Quality Recognitions', subtitle: 'Adherence to regional and national safety compliance benchmarks.' };
      case 'waste': return { title: 'Bio-Medical Waste Reports', subtitle: 'Environmental compliance indicators & public health disclosures.' };
      case 'guide': return { title: 'Patient Admission Guide', subtitle: 'Smooth physical check-in parameters and clinical rules.' };
      case 'insurance': return { title: 'Cashless Insurance & TPAs', subtitle: 'Direct hassle-free panels with key corporate claims providers.' };
      case 'corporates': return { title: 'Corporate Wellness Panels', subtitle: 'Bespoke diagnostic protocols for state enterprises & corporate employees.' };
      case 'news': return { title: 'News & Clinical Campaigns', subtitle: 'Reactions, health alerts, and clinical progress logs.' };
      case 'gallery': return { title: 'Hospital Visual Gallery', subtitle: 'Explore our sterile environments, imaging centers, and wards.' };
      case 'press': return { title: 'Press Releases', subtitle: 'Official NMH Board communications and legal releases.' };
      case 'career': return { title: 'Careers @ Narayan Memorial', subtitle: 'Integrate into an ambitious, specialized medical workforce.' };
      default: return { title: 'Hospital Information Page', subtitle: 'Public affairs and records.' };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10" id="info-page-tab-root">
      
      {/* Back to Home Button Link */}
      <div className="mb-6">
        <button
          onClick={() => setCurrentTab('home')}
          className="inline-flex items-center space-x-2 bg-white/55 hover:bg-[#086384]/15 border border-white/65 hover:border-[#086384]/30 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:text-[#086384] transition-all cursor-pointer shadow-3xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit to Main Homepage</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Group Sidebar Directory Section */}
        <aside className="lg:col-span-4 bg-white/35 backdrop-blur-xl border border-white/65 rounded-3xl p-5.5 space-y-6 shadow-xl relative z-10">
          <div className="border-b border-white/40 pb-4">
            <h3 className="font-sans font-black text-sm uppercase tracking-wider text-[#086384]">Information Directory</h3>
            <p className="text-slate-500 text-[11px] mt-1 font-semibold">Switch instantly to dynamic dedicated pages.</p>
          </div>

          <div className="space-y-5">
            {navigationGroups.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block px-2.5 mb-1">{group.title}</span>
                <div className="flex flex-col space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-[#086384] to-[#0c7297] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-white/45 hover:text-[#086384]'
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : 'text-[#086384]'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Support Banner Widget */}
          <div className="bg-[#086384]/10 border border-[#086384]/25 p-4 rounded-2xl space-y-2 text-xs">
            <h4 className="font-sans font-bold text-slate-800 uppercase tracking-tight">Need Urgent Help?</h4>
            <p className="text-slate-600 font-medium leading-relaxed">Our Patient Services helpdesk is reachable 24/7. Directly book an OPD slot to consult with any active board specialist.</p>
            <button
              onClick={openAppointmentModal}
              className="w-full bg-[#086384] hover:bg-sky-700 text-white font-bold py-2 rounded-xl text-[11px] uppercase tracking-wider cursor-pointer shadow-3xs transition-all"
            >
              OPD Appointment Request
            </button>
          </div>
        </aside>

        {/* Right Column: High Quality Dedicated Page Body Context */}
        <section className="lg:col-span-8 bg-white/35 backdrop-blur-xl border border-white/65 rounded-3xl shadow-xl overflow-hidden min-h-[600px] flex flex-col justify-between relative z-10">
          
          {/* Detailed Page Header Block */}
          <div className="bg-white/55 border-b border-white/60 p-6 sm:p-8 relative overflow-hidden shrink-0">
            {/* Ambient subtle light circles */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-300/10 blur-xl pointer-events-none" />
            <div className="relative z-10 space-y-1">
              <span className="text-[10px] text-[#086384] font-black uppercase tracking-widest block font-mono">DEDICATED INFORMATION PORTAL</span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">{meta.title}</h1>
              <p className="text-slate-600 text-xs sm:text-sm font-semibold">{meta.subtitle}</p>
            </div>
          </div>

          {/* Dynamic Scrollable Body Container */}
          <div className="p-6 sm:p-8 flex-grow space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
            
            {/* 1. ABOUT NMH PAGE LAYOUT */}
            {currentTab === 'about' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="rounded-3xl overflow-hidden h-56 relative border border-white/50 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200" 
                    alt="Narayan Memorial Hospital Facility" 
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-white text-xs font-bold bg-[#086384] px-3.5 py-1.5 rounded-xl border border-white/20 shadow-xs">Behala, South Kolkata</span>
                </div>

                <div className="space-y-4 font-semibold text-slate-600">
                  <p>
                    <strong className="text-slate-800 text-sm">Narayan Memorial Hospital (NMH)</strong>, situated strategically in Behala, Kolkata on Diamond Harbour Road, welcomes patients into a premier hub of advanced clinical resources. Our focus is centered purely on accessibility, supreme clinical precision, and patient-centric ethical care.
                  </p>
                  <p>
                    We have successfully gathered over 80 board certified specialist consultants, residency surgery veterans, and diagnostic lab pioneers to form our primary response teams. Spanning over 200 high-fidelity patient beds and 40 distinct diagnostic cells, NMH is recognized region-wide for delivering standard healthcare with deep sincerity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/45 border border-white/50 p-4.5 rounded-2xl text-center shadow-3xs hover:bg-white/60 transition-all">
                    <span className="text-2xl font-black text-[#086384] block leading-none font-mono">200+</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5 block tracking-wider">Super IPD Beds</span>
                  </div>
                  <div className="bg-white/45 border border-white/50 p-4.5 rounded-2xl text-center shadow-3xs hover:bg-white/60 transition-all">
                    <span className="text-2xl font-black text-[#086384] block leading-none font-mono">80+</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5 block tracking-wider">Medical Experts</span>
                  </div>
                  <div className="bg-white/45 border border-white/50 p-4.5 rounded-2xl text-center shadow-3xs hover:bg-white/60 transition-all">
                    <span className="text-2xl font-black text-emerald-600 block leading-none font-mono">100%</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase mt-1.5 block tracking-wider">TPA Desk Support</span>
                  </div>
                </div>

                <div className="bg-white/45 border border-white/50 rounded-2xl p-5 space-y-2.5 shadow-3xs">
                  <h3 className="font-sans font-bold text-slate-800 uppercase text-xs tracking-wider">Primary Healthcare Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-semibold">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#086384]" />
                      <span> L6 Level Emergency Trauma & Cardiology Unit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#086384]" />
                      <span>Laminar Airflow Equipped Super Surgery Rooms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#086384]" />
                      <span>3T High-Sensitivity MRI & 128 Slice Computed CT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 rounded-full bg-[#086384]" />
                      <span>Advanced Molecular Pathology Laboratory Panels</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CHAIRMAN MESSAGE */}
            {currentTab === 'chairman' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/45 border border-white/50 p-6 rounded-2xl shadow-3xs">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=350" 
                    alt="Chairman Shri. Prashant Sharma" 
                    className="w-28 h-28 rounded-2xl object-cover shrink-0 border border-white/50 shadow-xs"
                  />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">Shri. Prashant Sharma</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Chairman • Narayan Memorial Hospital Group</p>
                    <p className="text-xs text-[#086384] font-bold py-1 bg-[#086384]/5 px-3 rounded-lg border border-[#086384]/15 w-fit">
                      "Ethical care built on transparent financial & operating foundations."
                    </p>
                  </div>
                </div>

                <div className="space-y-4 leading-relaxed">
                  <p>
                    "Welcome to Narayan Memorial Hospital. Our institution was built upon a clear, sincere aspiration: to establish a truly premier health ecosystem in South Kolkata where citizens could receive sophisticated multi-specialty treatments without facing astronomical financial stress."
                  </p>
                  <p>
                    "We don't prioritize clinical volume over quality. Instead, NMH invests deeply in laminative clean air systems, level-3 critical trauma cells, and the recruitment of exceptional resident surgeons. Our absolute pledge remains simple: to treat your loved ones with transparent procedures, compassionate listening, and clinical success."
                  </p>
                  <p className="pt-4 border-t border-white/40 italic font-medium text-slate-500 text-right">
                    — Shri. Prashant Sharma, Chairman NMH
                  </p>
                </div>
              </div>
            )}

            {/* 3. CEO MESSAGE */}
            {currentTab === 'ceo' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/45 border border-white/50 p-6 rounded-2xl shadow-3xs">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350" 
                    alt="CEO Dr. Arundhati Bose" 
                    className="w-28 h-28 rounded-2xl object-cover shrink-0 border border-white/50 shadow-xs"
                  />
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h4 className="text-base font-black text-slate-900 uppercase tracking-tight">Dr. Arundhati Bose</h4>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Chief Executive Officer • NMH Medical Board</p>
                    <p className="text-xs text-emerald-600 font-bold py-1 bg-emerald-500/5 px-3 rounded-lg border border-emerald-500/20 w-fit">
                      "Pioneering digital integrations, clinical safety, and instant report returns."
                    </p>
                  </div>
                </div>

                <div className="space-y-4 leading-relaxed">
                  <p>
                    "In modern healthcare settings, precision and speed represent the ultimate pillars of clinical success. As the CEO of Narayan Memorial Hospital, my daily focus remains entirely on operational and diagnostic excellence."
                  </p>
                  <p>
                    "We have successfully removed classic logistical bottlenecks by transitioning NMH into a fully digital hospital. Pathological specimens, specimen records, and physician reports reside safely inside secure networks, enabling doctors to make life-saving calls within minutes of digital scanning."
                  </p>
                  <p>
                    "Every operation theater, bedside vital monitor, and trauma suite complies strictly with zero-infection procedures, assuring families of a clean, safe refuge during emergency checks. We stand complete in our technical capabilities and completely active for your service."
                  </p>
                  <p className="pt-4 border-t border-white/40 italic font-medium text-slate-500 text-right">
                    — Dr. Arundhati Bose, Chief Executive Officer
                  </p>
                </div>
              </div>
            )}

            {/* 4. AWARDS & QUALITY */}
            {currentTab === 'awards' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <p>
                  Our persistent quality checks and patient recovery percentages keep NMH cited annually as one of South West Bengal’s safest super-specialty hubs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-white/60 bg-white/40 p-5 rounded-2xl space-y-3.5 shadow-3xs">
                    <div className="bg-amber-100 text-amber-700 p-2.5 rounded-xl w-fit border border-amber-200">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block text-sm">ET Health Leaders Excellence 2024</span>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Recognized as the "Most Outstanding Multi-Specialty Hospital" in South West Bengal districts for high medical affordability metrics.</p>
                    </div>
                  </div>

                  <div className="border border-white/60 bg-white/40 p-5 rounded-2xl space-y-3.5 shadow-3xs">
                    <div className="bg-blue-100 text-[#086384] p-2.5 rounded-xl w-fit border border-blue-200">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block text-sm">NABH Quality Standard Certification</span>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Formal regulatory accreditation confirming 100% compliance with safe sanitization, procedural transparency, and ICU nurse ratios.</p>
                    </div>
                  </div>

                  <div className="border border-white/60 bg-white/40 p-5 rounded-2xl space-y-3.5 shadow-3xs">
                    <div className="bg-emerald-100 text-emerald-700 p-2.5 rounded-xl w-fit border border-emerald-200">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block text-sm">ISO 9001:2015 diagnostic process</span>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Rigorous analytical review validation confirming high process standard and strict diagnostic speed inside laboratory sections.</p>
                    </div>
                  </div>

                  <div className="border border-white/60 bg-white/40 p-5 rounded-2xl space-y-3.5 shadow-3xs">
                    <div className="bg-rose-100 text-rose-700 p-2.5 rounded-xl w-fit border border-rose-200">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-900 block text-sm">Best Cardiology response unit award</span>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Certified for holding some of the fastest Angioplasty recovery timelines in Kolkata medical response lists.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. BIO MEDICAL WASTE REPORT */}
            {currentTab === 'waste' && (
              <div className="space-y-5 animate-fadeIn text-slate-600 font-semibold">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-slate-700 rounded-2xl flex items-start space-x-3 shadow-3xs">
                  <span className="text-sm">♻️</span>
                  <p className="text-xs font-semibold leading-relaxed">
                    <strong>Pollution board transparency directive:</strong> Public medical waste records published under compliance guidelines of the West Bengal Pollution Control Board (WBPCB) and health agency standards.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <h4 className="font-sans font-bold text-slate-800 uppercase text-xs tracking-wider">Refuse Processing Logistics (Current Year Archive)</h4>
                  
                  <div className="border border-white/50 rounded-2xl overflow-hidden text-xs shadow-3xs bg-white/50">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#086384]/10 border-b border-white text-slate-800 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-4">Waste Category</th>
                          <th className="p-4">Treatment process</th>
                          <th className="p-4 text-right">Avg Processed / Month</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/40 text-slate-600">
                        <tr>
                          <td className="p-4 flex items-center space-x-3 font-semibold text-slate-800">
                            <span className="h-3.5 w-3.5 rounded-full bg-yellow-400 block border border-white" />
                            <span>Yellow Container (Anatomical)</span>
                          </td>
                          <td className="p-4">Central High Temp Incineration (Deep Burial)</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-800">428.50 Kg</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center space-x-3 font-semibold text-slate-800">
                            <span className="h-3.5 w-3.5 rounded-full bg-red-500 block border border-white" />
                            <span>Red Container (Contaminated Plastics)</span>
                          </td>
                          <td className="p-4">Rigorous Audited Autoclaving / Shredding</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-800">295.20 Kg</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center space-x-3 font-semibold text-slate-800">
                            <span className="h-3.5 w-3.5 rounded-full bg-blue-500 block border border-white" />
                            <span>Blue Box (Glassware specimens)</span>
                          </td>
                          <td className="p-4">Intensive Chemical Disinfection / Melt cycle</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-800">112.90 Kg</td>
                        </tr>
                        <tr>
                          <td className="p-4 flex items-center space-x-3 font-semibold text-slate-800">
                            <span className="h-3.5 w-3.5 rounded-full bg-slate-100 block border border-slate-350" />
                            <span>White Container (Sharps & Blades)</span>
                          </td>
                          <td className="p-4">Dry Heat Sterilization and encapsulation</td>
                          <td className="p-4 text-right font-mono font-bold text-slate-800">45.80 Kg</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-slate-400 text-[10px] italic font-semibold">
                    *Last certified physical safety audit completed seamlessly by state agency representatives on June 2026. Consistent clean track-record verified.
                  </p>
                </div>
              </div>
            )}

            {/* 6. PATIENT GUIDE */}
            {currentTab === 'guide' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <p>
                  To make your arrival, admission, or scheduled check-up as convenient as possible, we have outlined these essential check-in steps below:
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-4 bg-white/40 p-4.5 rounded-2xl border border-white/60 shadow-3xs">
                    <div className="bg-[#086384]/15 text-[#086384] font-black h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-white">
                      1
                    </div>
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 text-sm block uppercase tracking-tight">Identity & check-in</strong>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Please arrive at least 15 minutes prior to your outpatient check-up slot. Carry a physical photo ID government document (Aadhaar Card, Passport, or PAN card) along with previous prescription slips.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 bg-white/40 p-4.5 rounded-2xl border border-white/60 shadow-3xs">
                    <div className="bg-[#086384]/15 text-[#086384] font-black h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-white">
                      2
                    </div>
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 text-sm block uppercase tracking-tight">Companion rules & hours</strong>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Each inpatient room is strictly limited to 1 patient companion token. Outpatient visiting gates open daily from <strong>12:00 PM – 02:00 PM</strong> and <strong>04:00 PM – 06:00 PM</strong> inside wards.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 bg-white/40 p-4.5 rounded-2xl border border-white/60 shadow-3xs">
                    <div className="bg-[#086384]/15 text-[#086384] font-black h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-white">
                      3
                    </div>
                    <div className="space-y-1.5">
                      <strong className="text-slate-900 text-sm block uppercase tracking-tight">Discharge protocol</strong>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">Discharge processes commence at 10:00 AM daily. Billing audits, take-home pharmaceuticals, and digital summaries are dispatched directly to companion emails for rapid exit.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. INSURANCE */}
            {currentTab === 'insurance' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <p>
                  Narayan Memorial Hospital provides direct cashless IPD admission and recovery in alliance with India’s leading insurance coordinators and Third-Party Administrators (TPA).
                </p>

                <div className="bg-[#086384]/5 p-5 rounded-2xl border border-[#086384]/20 space-y-3 shadow-3xs">
                  <span className="font-sans font-black text-slate-800 uppercase tracking-tight text-xs block">Pre-Authorization Checklist:</span>
                  <ul className="list-disc pl-5 space-y-2 text-slate-650 text-xs font-semibold">
                    <li>Submit your active Corporate Health Card at our specialized TPA Desk in the lobby floor.</li>
                    <li>Ensure pre-auth forms are logged by doctors at least 48 hours before elective surgery slots.</li>
                    <li>For emergency admissions, our billing executives initiate cashless coordination within 2 hours of vitals stabilization.</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="font-sans font-black text-slate-700 uppercase text-[10px] tracking-wider block">Empaneled Cashless TPA Networks</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
                    {['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Niva Bupa', 'SBI General', 'Bajaj Allianz', 'National Insurance', 'United India', 'Chola MS'].map(name => (
                      <div key={name} className="bg-white/45 hover:bg-white/75 border border-white/60 py-3.5 rounded-xl text-slate-800 font-bold transition-all shadow-3xs">
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 8. CORPORATES */}
            {currentTab === 'corporates' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <p>
                  We are paneled with prominent national agencies, public sector undertakings, and major multinational corporations to handle periodic executive medical wellness, and critical occupational therapies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/40 border border-white/60 rounded-2xl space-y-2 shadow-3xs">
                    <span className="font-bold text-slate-900 block text-sm">Government Enterprises</span>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">Indian Railways, Coal India (CIL), ONGC, BSNL, and West Bengal State Electricity Corporation (WBSEDCL).</p>
                  </div>
                  <div className="p-5 bg-white/40 border border-white/60 rounded-2xl space-y-2 shadow-3xs">
                    <span className="font-bold text-slate-900 block text-sm">Corporate Panels</span>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">Tata Consultancy Services (TCS), Cognizant (CTS), Wipro, Larsen & Toubro (L&T), and State Bank of India employee tiers.</p>
                  </div>
                </div>

                <div className="p-6 bg-white/45 border border-white/60 rounded-2xl text-center space-y-3.5 shadow-3xs">
                  <span className="font-black text-slate-800 block text-sm uppercase">Establish Corporate Partnership</span>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-md mx-auto">Does your enterprise require customized clinical check-up protocols or safety billing panels for local staff networks?</p>
                  <button 
                    onClick={openAppointmentModal}
                    className="bg-[#086384] hover:bg-sky-700 text-white text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider cursor-pointer shadow-3xs transition-all"
                  >
                    Contact corporate deck
                  </button>
                </div>
              </div>
            )}

            {/* 9. NEWS */}
            {currentTab === 'news' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <p>
                  Keep active pace with NMH medical deployments, clinical milestones, and regional healthcare outreach updates inside West Bengal.
                </p>

                <div className="space-y-4">
                  <div className="p-5 bg-white/45 border border-white/60 rounded-2xl space-y-3 shadow-3xs">
                    <span className="bg-[#086384]/10 text-[#086384] text-[9px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider w-fit block">June 18, 2026</span>
                    <h4 className="font-black text-slate-900 text-sm leading-snug">Advanced Linear Cardiac Cath Lab Commissioned in Behala facility</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">Our cardiology team successfully commissioned a cutting-edge high-speed vascular imaging and catheter system. The suite is configured to support acute stroke and coronary interventions within 45 minutes of trauma gate arrivals.</p>
                  </div>

                  <div className="p-5 bg-white/45 border border-white/60 rounded-2xl space-y-3 shadow-3xs">
                    <span className="bg-emerald-500/10 text-emerald-600 text-[9px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider w-fit block">June 10, 2026</span>
                    <h4 className="font-black text-slate-900 text-sm leading-snug">Metabolic health & Diabetes Detection Camp Screens 1,000+ neighbors</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">Under Dr. Bose’s coordination, NMH hosted a major metabolic screening day at Behala square, providing seniors with free kidney profile checkups, glucose checks, and specialized endocrine consulting.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 10. PRESS */}
            {currentTab === 'press' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                <div className="p-5 bg-white/45 border border-white/60 rounded-2xl flex items-start space-x-4 shadow-3xs">
                  <div className="bg-sky-100/70 p-3 rounded-xl border border-white text-[#086384]">
                    <Newspaper className="h-6 w-6 shrink-0" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block font-mono">Official Board Statement</span>
                    <h4 className="font-black text-slate-900 text-sm leading-snug">Narayan Memorial Hospital Achieves High Integrity Bio-Safety Standards</h4>
                    <p className="text-slate-500 text-xs font-semibold leading-relaxed">"The national accrediting body has certified NMH’s ultra-clean pathological cleanrooms. This ensures that molecular and biological diagnostic tests operate under perfect biocontainment parameters, completely guaranteeing sample integrity for critical decisions."</p>
                    <span className="text-[9px] text-[#086384] font-bold block pt-1 uppercase">Printed inside: West Bengal National Health Bulletin</span>
                  </div>
                </div>
              </div>
            )}

            {/* 11. GALLERY */}
            {currentTab === 'gallery' && (
              <div className="space-y-5 animate-fadeIn">
                <p className="text-slate-500 font-semibold text-xs text-center">Click on any image block to enlarge and inspect our diagnostic suites closely.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
                  {[
                    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600', name: 'Lobby & Reception Center' },
                    { url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600', name: 'Super-Specialty Exterior' },
                    { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600', name: 'Diagnostics Lab Wing' },
                    { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600', name: 'Physician Consulting Clinic' },
                    { url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', name: 'Modern Dental Chair' },
                    { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600', name: 'Emergency Triage Room' }
                  ].map((img, i) => (
                    <div 
                      key={i} 
                      onClick={() => setZoomedImage(img.url)}
                      className="group relative h-32 rounded-2xl overflow-hidden border border-white/50 shadow-3xs cursor-pointer hover:scale-103 transition-all duration-300 z-10"
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-all" />
                      <span className="absolute bottom-2.5 left-3 text-white text-[9px] font-bold uppercase tracking-wider block truncate max-w-[90%]">{img.name}</span>
                    </div>
                  ))}
                </div>

                {/* Lightbox Modal overlay strictly for internal gallery click zoom */}
                {zoomedImage && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs" onClick={() => setZoomedImage(null)}>
                    <div className="relative max-w-4xl max-h-[80vh] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                      <img src={zoomedImage} alt="Expanded Preview" className="max-w-full max-h-[75vh] object-contain block mx-auto" />
                      <button 
                        onClick={() => setZoomedImage(null)}
                        className="absolute top-4 right-4 bg-black/65 text-white hover:bg-black/90 p-2.5 rounded-full font-bold leading-none text-xs"
                      >
                        ✕ Close Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 12. CAREER SECTION */}
            {currentTab === 'career' && (
              <div className="space-y-6 animate-fadeIn text-slate-600 font-semibold">
                {careerSubmitted ? (
                  <div className="p-8 text-center bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex flex-col items-center justify-center space-y-4 shadow-3xs">
                    <div className="bg-emerald-100 p-3 rounded-full border border-emerald-300 text-emerald-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h4 className="font-sans font-black text-slate-900 text-base uppercase tracking-tight">Application Logged Perfectly</h4>
                    <p className="text-slate-600 text-xs font-semibold max-w-sm leading-relaxed">
                      Thank you for submitting your profile. Your surgical and nursing credentials have been locked into our HR talent pool. Our staffing officer will make contact should qualifications match elective vacancies.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCareerSubmit} className="space-y-4 text-xs">
                    <p className="text-slate-500 text-xs font-semibold">We are expanding residential staffing quotas inside Behala. Complete the intake application below:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Shri. Dr. John Doe"
                          value={careerForm.name}
                          onChange={(e) => setCareerForm({...careerForm, name: e.target.value})}
                          className="w-full bg-white/60 hover:bg-white/90 border border-white/70 rounded-xl p-3 text-slate-800 font-bold outline-none focus:border-[#086384] transition shadow-3xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">Active Contact Email</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="johndoe@gmail.com"
                          value={careerForm.email}
                          onChange={(e) => setCareerForm({...careerForm, email: e.target.value})}
                          className="w-full bg-white/60 hover:bg-white/90 border border-white/70 rounded-xl p-3 text-slate-800 font-bold outline-none focus:border-[#086384] transition shadow-3xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">Mobile Phone (+91)</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210"
                          value={careerForm.phone}
                          onChange={(e) => setCareerForm({...careerForm, phone: e.target.value})}
                          className="w-full bg-white/60 hover:bg-white/90 border border-white/70 rounded-xl p-3 text-slate-800 font-bold outline-none focus:border-[#086384] transition shadow-3xs"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">Target Medical Designation</label>
                        <select 
                          value={careerForm.position}
                          onChange={(e) => setCareerForm({...careerForm, position: e.target.value})}
                          className="w-full bg-white/60 hover:bg-white/90 border border-white/70 rounded-xl p-3 text-slate-700 font-bold outline-none focus:border-[#086384] transition cursor-pointer shadow-3xs"
                        >
                          <option value="Senior Resident Surgeon (Cardiology)">Senior Resident Surgeon (Cardiology)</option>
                          <option value="Staff Nurse (Grade I ICU)">Staff Nurse (Grade I ICU)</option>
                          <option value="Diagnostic Assistant (Pathology Lab)">Diagnostic Assistant (Pathology Lab)</option>
                          <option value="Patient Relations Desk Officer">Patient Relations Desk Officer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-slate-800 font-bold uppercase tracking-wider text-[10px]">Experience Summary & Tenure</label>
                      <textarea 
                        required
                        rows={3} 
                        placeholder="e.g. 6 years in cardiology surgical resident units, registered with West Bengal Medical Board..."
                        value={careerForm.exp}
                        onChange={(e) => setCareerForm({...careerForm, exp: e.target.value})}
                        className="w-full bg-white/60 hover:bg-white/90 border border-white/70 rounded-xl p-3 text-slate-800 font-bold outline-none focus:border-[#086384] transition shadow-3xs"
                      />
                    </div>

                    <div className="p-4 bg-white/40 border border-white/60 rounded-2xl flex items-center justify-between shadow-3xs">
                      <div className="flex items-center space-x-3">
                        <div className="bg-sky-100 text-[#086384] p-2.5 rounded-xl border border-white">
                          <FileUp className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-850 block text-[11px] uppercase tracking-tight">Upload Medical Curriculum Vitae (CV)</span>
                          <span className="text-[10px] text-slate-400 font-bold block">PDF and DOCX under 10MB permitted</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setCareerForm({...careerForm, cvUploaded: true})}
                        className={`text-[10px] uppercase tracking-wider font-extrabold px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                          careerForm.cvUploaded 
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-300' 
                            : 'bg-white hover:bg-slate-50 border border-slate-350 hover:border-sky-500'
                        }`}
                      >
                        {careerForm.cvUploaded ? '✓ Uploaded Successfully' : 'Select PDF File'}
                      </button>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button 
                        type="submit"
                        className="bg-gradient-to-r from-[#086384] to-[#0c7297] hover:brightness-105 text-white font-bold py-3.5 px-8 rounded-xl uppercase tracking-wider cursor-pointer shadow-xs active:scale-98 transition-all"
                      >
                        Submit Medical Intake Form
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* Consistent Elegant Landing Action Footer */}
          <div className="p-4 sm:px-8 bg-white/55 border-t border-white/60 flex items-center justify-between shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden sm:inline">Narayan Memorial Hospital • Public Affairs</span>
            <div className="flex space-x-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => setCurrentTab('home')}
                className="bg-white/55 border border-white/80 hover:bg-white/80 px-5 py-2.5 text-slate-700 font-bold text-xs rounded-xl cursor-pointer shadow-3xs transition-all"
              >
                Go Back Home
              </button>
              <button
                onClick={openAppointmentModal}
                className="bg-[#086384] hover:bg-sky-700 text-white px-5 py-2.5 text-xs font-bold rounded-xl cursor-pointer shadow-3xs transition-all border border-white/10 uppercase tracking-wide"
              >
                Book OPD Consultation
              </button>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
