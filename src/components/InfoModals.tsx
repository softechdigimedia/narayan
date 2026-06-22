import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle, Newspaper, FileUp } from 'lucide-react';

interface InfoModalsProps {
  activeModal: string | null;
  onClose: () => void;
  openAppointment: () => void;
}

export default function InfoModals({ activeModal, onClose, openAppointment }: InfoModalsProps) {
  const [careerForm, setCareerForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Staff Nurse (Grade I)',
    exp: '',
    cvUploaded: false
  });
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  if (!activeModal) return null;

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => {
      setCareerSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl relative overflow-hidden z-10 flex flex-col max-h-[85vh] animate-fadeIn">
        
        {/* Header Block matching NMH theme */}
        <div className="bg-[#086384] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-tight">
              {activeModal === 'about' && 'About Narayan Memorial Hospital'}
              {activeModal === 'chairman' && "Chairman's Commitment"}
              {activeModal === 'ceo' && "CEO's Operational Message"}
              {activeModal === 'awards' && 'Awards & Quality Recognitions'}
              {activeModal === 'waste' && 'Bio Medical Waste Report'}
              {activeModal === 'guide' && "Patient's Admission Guide"}
              {activeModal === 'insurance' && 'Cashless Insurance & TPAs'}
              {activeModal === 'corporates' && 'Corporate Wellness Panels'}
              {activeModal === 'news' && 'News & Clinical Updates'}
              {activeModal === 'gallery' && 'Hospital Visual Tour Gallery'}
              {activeModal === 'press' && 'Press & Media Center'}
              {activeModal === 'career' && 'Join Narayan Memorial Hospital'}
            </h3>
            <span className="text-[9px] text-[#bce3f2] font-mono tracking-widest block mt-0.5 uppercase">
              Narayan Memorial Hospital • Public Affairs
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all cursor-pointer font-bold leading-none text-sm"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-600 text-xs sm:text-sm">
          
          {/* ABOUT NMH */}
          {activeModal === 'about' && (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden h-44 relative bg-slate-100 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800" 
                  alt="NMH" 
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 to-transparent" />
                <span className="absolute bottom-3 left-4 text-white text-xs font-bold bg-[#086384] px-2.5 py-1 rounded-md">Behala, Kolkata</span>
              </div>
              <div className="space-y-3.5 leading-relaxed">
                <p>
                  <strong>Narayan Memorial Hospital (NMH)</strong>, located at Diamond Harbour Road in Behala, Kolkata, represents a revolutionary healthcare hub committed to offering specialized medical services with supreme affordability, advanced diagnostic technologies, and deep care compassion.
                </p>
                <p>
                  Under the governance of a unified national medical board, NMH runs over 30 inpatient and outpatient clinical specialties. We house a sterile 24/7 Emergency response cath lab, modular super-critical critical ICU suites, ultra-fast diagnostic CT capabilities, and surgical robotics.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-3 text-center">
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <span className="text-xl font-black text-[#086384] block leading-none font-mono">200+</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Super Beds</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <span className="text-xl font-black text-[#086384] block leading-none font-mono">45+</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">Specialists</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <span className="text-xl font-black text-[#086384] block leading-none font-mono">100%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">TPA Support</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAIRMAN MESSAGE */}
          {activeModal === 'chairman' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center bg-slate-50/70 p-5 rounded-2xl border border-slate-150">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=260" 
                  alt="Chairman" 
                  className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-200"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800 uppercase tracking-tight">Shri. Prashant Sharma</h4>
                  <p className="text-slate-400 text-xs font-medium">Chairman • Narayan Memorial Hospital</p>
                  <p className="text-xs text-[#086384] font-semibold py-1">"Ethical care built on transparent foundations."</p>
                </div>
              </div>
              <div className="space-y-3.5 leading-relaxed text-slate-600">
                <p>
                  "Narayan Memorial Hospital was founded as an ambitious healthcare vision: to create a trusted multispecialty hospital in South Kolkata where citizens can experience world-class medical treatments without overwhelming financial strain."
                </p>
                <p>
                  "We have invested in top-tier critical response suites, pure airflow laminar OR structures, and advanced patient recovery lounges. Our promise remains clear: to deliver clinical excellence with transparent procedures, compassionate listening, and verified quality outcomes. Thank you for placing your family's health in our care."
                </p>
              </div>
            </div>
          )}

          {/* CEO MESSAGE */}
          {activeModal === 'ceo' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-5 items-center bg-slate-50/70 p-5 rounded-2xl border border-slate-150">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260" 
                  alt="CEO"
                  className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-slate-200"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800 uppercase tracking-tight">Dr. Arundhati Bose</h4>
                  <p className="text-slate-400 text-xs font-medium">Chief Executive Officer • NMH Board</p>
                  <p className="text-xs text-emerald-600 font-semibold py-1">"Pioneering digital integrations and patient safety."</p>
                </div>
              </div>
              <div className="space-y-3.5 leading-relaxed text-slate-600">
                <p>
                  "As the CEO of Narayan Memorial Hospital, my daily priority is operational and clinic-procedural excellence. Our hospital has achieved notable success by digitalizing clinical medical files and integrating advanced cloud-based pathology systems to completely bypass delivery bottlenecks."
                </p>
                <p>
                  "Our operation theaters and trauma beds run under rigorous medical protocols designed to eliminate hospital-acquired infection risks. NMH stands prepared, with high-caliber medical expertise, to navigate the toughest clinical challenges cleanly."
                </p>
              </div>
            </div>
          )}

          {/* AWARDS & ACCOLADES */}
          {activeModal === 'awards' && (
            <div className="space-y-5">
              <p className="leading-relaxed">
                Narayan Memorial Hospital is consistently cited as a leading medical facility in South Kolkata for safety, clinical innovation, and high patient satisfaction metrics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-150 bg-slate-50 p-4 rounded-xl flex items-start space-x-3.5">
                  <Award className="h-6 w-6 text-amber-500 shrink-0" />
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block">ET Health Leaders 2024</span>
                    <p className="text-slate-500 text-xs">Awarded "Best Multi-Specialty Hospital in West Bengal" for affordable advanced therapy.</p>
                  </div>
                </div>

                <div className="border border-slate-150 bg-slate-50 p-4 rounded-xl flex items-start space-x-3.5">
                  <Award className="h-6 w-6 text-[#086384] shrink-0" />
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block">NABH Quality Standard</span>
                    <p className="text-slate-500 text-xs">Certified compliance for strict sanitization, ICU procedure safety, and ethical medical standards.</p>
                  </div>
                </div>

                <div className="border border-slate-150 bg-slate-50 p-4 rounded-xl flex items-start space-x-3.5">
                  <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block">ISO 9001:2015</span>
                    <p className="text-slate-500 text-xs">Accredited diagnosis processes confirming consistent quality for our laboratory reports.</p>
                  </div>
                </div>

                <div className="border border-slate-150 bg-slate-50 p-4 rounded-xl flex items-start space-x-3.5">
                  <Award className="h-6 w-6 text-rose-500 shrink-0" />
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block">Cardiology Excellence Block</span>
                    <p className="text-slate-500 text-xs">First Rank in Fast-Response Angioplasty success curves across South Kolkata districts.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BIO MEDICAL WASTE REPORT */}
          {activeModal === 'waste' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-start space-x-3">
                <span className="font-bold">♻️</span>
                <p className="text-xs">
                  <strong>Regulatory Directive Compliances:</strong> Published under the mandates of West Bengal Pollution Control Board (WBPCB) for public transparency in bio-medical refuse management.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 font-sans uppercase text-xs tracking-wider">NMH Waste Treatment Metrics (Pre-Audit)</h4>
                
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse bg-white">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                      <tr>
                        <th className="p-3">Waste Category Color</th>
                        <th className="p-3">Method used</th>
                        <th className="p-3 text-right">Processed / Month</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3 flex items-center space-x-2">
                          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400 block border" />
                          <span className="font-medium">Yellow Bag (Anatomical)</span>
                        </td>
                        <td className="p-3">Incineration (Deep Burial)</td>
                        <td className="p-3 text-right font-mono font-bold">428.50 Kg</td>
                      </tr>
                      <tr>
                        <td className="p-3 flex items-center space-x-2">
                          <span className="h-3.5 w-3.5 rounded-full bg-red-500 block border" />
                          <span className="font-medium">Red Bag (Contaminated Plastic)</span>
                        </td>
                        <td className="p-3">Autoclaving / Shredding</td>
                        <td className="p-3 text-right font-mono font-bold">295.20 Kg</td>
                      </tr>
                      <tr>
                        <td className="p-3 flex items-center space-x-2">
                          <span className="h-3.5 w-3.5 rounded-full bg-blue-500 block border" />
                          <span className="font-medium">Blue Cardboard (Glassware)</span>
                        </td>
                        <td className="p-3">Chemical Disinfection / Melt</td>
                        <td className="p-3 text-right font-mono font-bold">112.90 Kg</td>
                      </tr>
                      <tr>
                        <td className="p-3 flex items-center space-x-2">
                          <span className="h-3.5 w-3.5 rounded-full bg-white block border-black/30" />
                          <span className="font-medium">White Box (Sharps)</span>
                        </td>
                        <td className="p-3">Dry-heat sterilization / encapsulation</td>
                        <td className="p-3 text-right font-mono font-bold">45.80 Kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-400 text-[10px] italic">
                  *Last official inspection audited by Central Safety Board on June 2026. Consistent zero-leaks status validated.
                </p>
              </div>
            </div>
          )}

          {/* PATIENT GUIDE */}
          {activeModal === 'guide' && (
            <div className="space-y-4 leading-relaxed">
              <p>
                Welcome to Narayan Memorial Hospital. To help make your physical check-in or surgical admission smooth, we recommend keeping these simple parameters in view:
              </p>
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#086384]/10 p-1.5 rounded-lg text-[#086384] font-bold text-xs">1</div>
                  <div>
                    <strong className="text-slate-800 block">Registration desk requirements</strong>
                    <p className="text-slate-500 text-xs">Please arrive 15 minutes before your slot with a valid government photo ID card (Aadhaar, Voter ID, Passport) and your active physical consultation booklet if visiting previously.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-[#086384]/10 p-1.5 rounded-lg text-[#086384] font-bold text-xs">2</div>
                  <div>
                    <strong className="text-slate-800 block">IPD Companion & visiting hours</strong>
                    <p className="text-slate-500 text-xs">Only 1 designated companion is allowed to remain in the ward during active stays. General visual visiting hours are strictly restricted to: <strong>12:00 PM – 02:00 PM</strong> and <strong>04:00 PM – 06:00 PM</strong>.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-[#086384]/10 p-1.5 rounded-lg text-[#086384] font-bold text-xs">3</div>
                  <div>
                    <strong className="text-slate-800 block">Discharge timeline</strong>
                    <p className="text-slate-500 text-xs">IPD discharges are initiated at 10:00 AM daily. Cleared medical bill invoices, post-discharge medication guides, and diagnostic report PDFs are dispatched digitally.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INSURANCE */}
          {activeModal === 'insurance' && (
            <div className="space-y-4">
              <p className="leading-relaxed">
                NMH provides seamless cashless admission and treatment capabilities in partnership with leading Third-Party Administrators (TPA) and national insurance units.
              </p>
              
              <div className="bg-[#086384]/5 p-4 rounded-xl border border-[#086384]/20">
                <span className="font-bold text-slate-800 block text-xs mb-1.5">How to Claim Cashless Admissions:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs">
                  <li>Present your Corporate ID or Health Insurance Card at our specialized TPA Desk.</li>
                  <li>Our billing coordinator handles pre-authorization requests within 2 hours.</li>
                  <li>In emergencies, cashless pre-alerts are submitted post-stabilization to maximize speed.</li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">Top Paneled Insurance Providers</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs">
                  {['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Niva Bupa', 'SBI General', 'Bajaj Allianz', 'National Insurance', 'United India', 'Chola MS'].map(name => (
                    <div key={name} className="bg-slate-50 border border-slate-100 py-2.5 rounded-lg text-slate-700 font-medium">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CORPORATES */}
          {activeModal === 'corporates' && (
            <div className="space-y-4">
              <p className="leading-relaxed">
                We are paneled with various government departments, public sector undertakings, and blue-chip corporations to coordinate diagnostic screenings, emergency trauma stabilization, and executive physical exams.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="font-bold text-[#086384] block">Government Undertakings</span>
                  <p className="text-slate-500 text-xs">Indian Railways, ONGC, Coal India, BSNL, West Bengal State Electricity (WBSEDCL).</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="font-bold text-[#086384] block">Corporate Tie-ups</span>
                  <p className="text-slate-500 text-xs">TCS, Cognizant, Wipro, L&T, Ambuja Neotia, SBI, Bank of Baroda corporate groups.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50/70 rounded-xl border text-center space-y-2">
                <span className="font-bold text-slate-700 block">Want to tie-up your corporate office?</span>
                <p className="text-slate-500 text-xs">Contact our Patient Relations Desk directly to compile specialized executive screening proposals.</p>
                <button 
                  onClick={openAppointment}
                  className="bg-[#086384] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-sky-700 transition"
                >
                  Contact Desk Coordination
                </button>
              </div>
            </div>
          )}

          {/* NEWS */}
          {activeModal === 'news' && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-4 space-y-1.5">
                  <span className="bg-sky-50 text-[#086384] text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">June 18, 2026</span>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug">Advanced Linear Cath Lab Suite Unveiled in Behala Facility</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">NMH installed a premium high-speed cardiac mapping catheter lab to offer stroke interventions within 45 minutes of trauma admission. Readies local critical care response.</p>
                </div>

                <div className="border-b border-slate-100 pb-4 space-y-1.5">
                  <span className="bg-emerald-50 text-emerald-600 text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">June 10, 2026</span>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug">Annual Diabetes & Metabolic Detection Campaign Reaches 1,000+ Citizens</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Our endocrinology division coordinated a free wellness detection camp, focusing on blood sugar trends, kidney assays, and lifestyle correction coaching for neighborhood seniors.</p>
                </div>
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeModal === 'gallery' && (
            <div className="space-y-4">
              <p className="text-slate-500">Explore our clean, modern high-fidelity facility environments designed for medical precision:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=260',
                  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=260',
                  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=260',
                  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=260',
                  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=260',
                  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=260'
                ].map((url, i) => (
                  <div key={i} className="h-28 rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:scale-103 transition duration-300">
                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRESS */}
          {activeModal === 'press' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl flex items-start space-x-3.5">
                <Newspaper className="h-6 w-6 text-[#086384] shrink-0" />
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-sm block">Diagnostic Lab Breakthrough Announcement</span>
                  <p className="text-slate-500 text-xs leading-relaxed">Narayan Memorial Hospital becomes Kolkata's first private facility to secure standard ISO lab certifications inside our high-sensitivity biosafety cabinet rooms. Assures pristine specimen safety.</p>
                  <span className="text-[10px] text-slate-400 block pt-1">Published: Times Health Metro Ledger</span>
                </div>
              </div>
            </div>
          )}

          {/* CAREER */}
          {activeModal === 'career' && (
            <div className="space-y-5">
              {careerSubmitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center space-y-3.5">
                  <CheckCircle className="h-10 w-10 text-emerald-500" />
                  <h4 className="font-bold text-slate-800 text-base">Application Submitted Perfectly</h4>
                  <p className="text-slate-500 text-xs max-w-sm">
                    Thank you. Your resume and clinical background logs have been registered inside our Human Resources database. If short-listed, our officer will reach out.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-4 text-xs">
                  <p className="text-slate-500 text-xs sm:text-sm">We are actively expanding our medical workforce. Submit your details to apply:</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[10px]">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        value={careerForm.name}
                        onChange={(e) => setCareerForm({...careerForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 outline-none focus:border-[#086384]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[10px]">Contact Phone</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={careerForm.phone}
                        onChange={(e) => setCareerForm({...careerForm, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 outline-none focus:border-[#086384]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[10px]/snug">Target Specialization / Role</label>
                    <select 
                      value={careerForm.position}
                      onChange={(e) => setCareerForm({...careerForm, position: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 outline-none focus:border-[#086384] cursor-pointer bg-white"
                    >
                      <option value="Senior Resident Surgeon (Cardiology)">Senior Resident Surgeon (Cardiology)</option>
                      <option value="Staff Nurse (Grade I ICU)">Staff Nurse (Grade I ICU)</option>
                      <option value="Diagnostic Assistant (Pathology Lab)">Diagnostic Assistant (Pathology Lab)</option>
                      <option value="Patient Relations Desk Officer">Patient Relations Desk Officer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5 uppercase tracking-wider text-[10px]">Experience summary</label>
                    <textarea 
                      required
                      rows={2} 
                      placeholder="e.g. 5 Years in critical care cardio support..."
                      value={careerForm.exp}
                      onChange={(e) => setCareerForm({...careerForm, exp: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 outline-none focus:border-[#086384]"
                    />
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <FileUp className="h-5 w-5 text-sky-500" />
                      <div>
                        <span className="font-bold text-slate-700 block text-[11px]">Upload Resume (CV) Document</span>
                        <span className="text-[10px] text-slate-400">PDF, DOCX formats supported</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setCareerForm({...careerForm, cvUploaded: true})}
                      className={`text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-lg cursor-pointer transition ${
                        careerForm.cvUploaded 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-300' 
                          : 'bg-white border border-slate-300 hover:border-sky-500'
                      }`}
                    >
                      {careerForm.cvUploaded ? '✓ Uploaded' : 'Select File'}
                    </button>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-[#086384] hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider"
                    >
                      Submit Candidate Intake
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        {activeModal !== 'career' && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0 gap-2.5">
            <button
              onClick={onClose}
              className="bg-white border border-slate-200 hover:bg-slate-50 px-5 py-2.5 text-slate-600 font-bold text-xs rounded-xl"
            >
              Cancel View
            </button>
            <button
              onClick={() => {
                onClose();
                openAppointment();
              }}
              className="bg-[#086384] hover:bg-[#0a5874] text-white px-5 py-2.5 text-xs font-bold rounded-xl transition"
            >
              Book consultation
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
