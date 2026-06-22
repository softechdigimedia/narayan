import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Clock,  ArrowRight, Sparkles  } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import gsap from 'gsap';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Filter doctors based on selected department
  const filteredDoctors = selectedDept
    ? DOCTORS.filter(doc => doc.department.toLowerCase() === selectedDept.toLowerCase())
    : DOCTORS;

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      // Reset variables
      setSelectedDept('');
      setSelectedDoctor('');
      setDate('');
      setTimeSlot('');
      setName('');
      setPhone('');
      setEmail('');
      setNote('');

      // GSAP Spring pop-in
      gsap.fromTo(
        modalCardRef.current,
        { scale: 0.82, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }
  }, [isOpen]);

  const slots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:30 PM',
    '02:00 PM', '03:30 PM', '04:30 PM', '06:00 PM'
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      // Transition animation between steps
      gsap.to(modalCardRef.current, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.2,
        onComplete: () => {
          setStep(step + 1);
          gsap.to(modalCardRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      gsap.to(modalCardRef.current, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.2,
        onComplete: () => {
          setStep(step - 1);
          gsap.to(modalCardRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer pointer-events-auto z-0"
      />

      {/* Modal Card */}
      <div
        ref={modalCardRef}
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 flex flex-col max-h-[90vh] pointer-events-auto"
      >
        {/* Header decoration */}
        <div className="bg-[#086384] text-white px-6 py-5 flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />
          <div className="relative pointer-events-none">
            <h3 className="text-lg font-bold font-sans tracking-tight">Book an Appointment</h3>
            <p className="text-white/80 text-xs mt-0.5">Step {step} of 3 • Perfect Healthcare Solutions</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="relative z-30 text-white/85 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-all cursor-pointer pointer-events-auto"
            aria-label="Close"
          >
            <X className="h-5 w-5 pointer-events-none" />
          </button>
        </div>

        {/* Form Body - scrollable */}
        <div className="p-6 overflow-y-auto grow">
          
          {/* Step 1: Department & Specialist selection */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Department <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedDoctor('');
                  }}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white"
                >
                  <option value="">-- Choose Medical Specialty --</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Specialist <span className="text-slate-400">(Optional)</span>
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white"
                >
                  <option value="">-- Any Available Specialist --</option>
                  {filteredDoctors.map(doc => (
                    <option key={doc.id} value={doc.name}>{doc.name} • {doc.qualifications.join(', ')}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Selecting a department first filters our doctors to that specialty.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preffered Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all text-slate-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Preffered Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all text-slate-600 bg-white"
                  >
                    <option value="">-- Choose Slot --</option>
                    {slots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#086384] text-white font-semibold py-3.5 rounded-xl cursor-pointer hover:bg-[#0a5874] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <span>Select Patient Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Patient Registration Details */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-xs text-slate-600 flex items-start space-x-2.5 mb-2">
                <Sparkles className="h-4 w-4 text-[#086384] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800">Booking Summary:</span> {selectedDept || 'General Medicine'} {selectedDoctor && `under ${selectedDoctor}`} on {date} at {timeSlot || 'morning'}.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address <span className="text-slate-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Short Message / Health Concern <span className="text-slate-400">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us briefly about symptoms or checkup purpose..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#086384] focus:ring-2 focus:ring-[#086384]/20 outline-hidden transition-all bg-white resize-none"
                />
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 border border-slate-200 text-slate-600 font-semibold py-3.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer text-center text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#086384] text-white font-semibold py-3.5 rounded-xl cursor-pointer hover:bg-[#0a5874] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success Confirmation Ticket */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-4 text-center space-y-6">
              
              <div className="bg-emerald-500/10 text-emerald-600 p-4 rounded-full border border-emerald-500/15 animate-bounce">
                <CheckCircle className="h-10 w-10 stroke-2" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800">Booking Confirmed!</h4>
                <p className="text-slate-500 text-sm mt-1 max-w-sm">
                  Your appointment slot is reserved. A confirmation SMS with details was sent to {phone}.
                </p>
              </div>

              {/* Printable-style medical ticket */}
              <div className="w-full bg-slate-50/60 border border-slate-200/80 rounded-2xl p-5 text-left font-sans text-xs space-y-3.5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-slate-200/20 rounded-full transform translate-x-8 -translate-y-8" />
                
                <div className="flex justify-between border-b border-dashed border-slate-200 pb-3">
                  <div>
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[9px]">Receipt Code</span>
                    <span className="font-bold text-[#086384] text-sm font-mono">NMH-{Math.floor(100 + Math.random() * 900)}-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block uppercase font-bold tracking-wider text-[9px]">Status</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">APPROVED</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Patient Name</span>
                    <span className="font-bold text-slate-700 text-sm">{name || 'John Doe'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Department</span>
                    <span className="font-bold text-slate-700 text-sm">{selectedDept || 'General Consultation'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Specialist</span>
                    <span className="font-bold text-slate-700 text-sm">{selectedDoctor || 'Dr. Dhruba Bhattacharya'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold text-[9px] uppercase tracking-wider">Appointment Time</span>
                    <span className="font-bold text-slate-700 text-sm flex items-center mt-0.5">
                      <Clock className="h-3.5 w-3.5 text-[#086384] mr-1" />
                      {timeSlot || '10:00 AM'}, {date || 'June 24'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Please arrive 15 minutes ahead of your schedule.</span>
                  <span className="font-bold text-slate-700 select-none">QR AUTHENTICATED</span>
                </div>
              </div>

              <div className="w-full pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl cursor-pointer hover:bg-slate-800 active:scale-[0.98] transition-all relative z-10 pointer-events-auto"
                >
                  Close & Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
