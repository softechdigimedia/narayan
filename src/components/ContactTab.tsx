import React, { useState } from 'react';
import { Phone, MapPin, Clock, Asterisk, Navigation, CheckCircle, RefreshCw } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import { DEPARTMENTS } from '../data';

export default function ContactTab() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState('');
  const [msg, setMsg] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dialSimActive, setDialSimActive] = useState(false);
  const [dialDuration, setDialDuration] = useState(0);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // reset fields
      setName('');
      setPhone('');
      setDept('');
      setMsg('');
    }, 1800);
  };

  // Simulate call duration ticking
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (dialSimActive) {
      interval = setInterval(() => {
        setDialDuration(prev => prev + 1);
      }, 1000);
    } else {
      setDialDuration(0);
    }
    return () => clearInterval(interval);
  }, [dialSimActive]);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. Header Segment matching Image 1 */}
      <div className="space-y-3.5 text-left pb-4 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-black text-[#086384] uppercase tracking-tight leading-none font-sans">
          Contact & Location
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          We are here to provide exceptional care with cutting-edge technology and human compassion. Visit us or reach out via our dedicated helplines.
        </p>
      </div>

      {/* 2. Main Two-Column Structure (Stats + Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column span 5 */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Card A: Emergency Helpline */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-start space-x-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full transform translate-x-8 -translate-y-8" />
            
            {/* Asterisk Red Circular Icon Container matching Image 1 */}
            <div className="bg-rose-50 p-3.5 rounded-xl text-rose-500 shrink-0 border border-rose-100/50">
              <Asterisk className="h-6 w-6 stroke-3" />
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-800 text-sm">Emergency Helpline</h4>
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Available 24/7 for critical care</p>
              </div>

              {/* Call-to Helpline display */}
              <div
                onClick={() => setDialSimActive(true)}
                className="text-2xl sm:text-3xl font-black text-rose-600 hover:text-rose-700 font-sans tracking-tight cursor-pointer inline-block transition-colors"
              >
                +91 (033) 4050 6070
              </div>
              
              <span className="text-[10px] text-slate-400 block font-medium">Click on the number to launch virtual call center simulator.</span>
            </div>
          </div>

          {/* Card B: Our Address */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-start space-x-4">
            <div className="bg-sky-50 p-3.5 rounded-xl text-[#086384] shrink-0 border border-sky-100/50">
              <MapPin className="h-6 w-6 stroke-2" />
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-800 text-sm">Our Address</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  601, Diamond Harbour Rd, Behala, Kolkata, <br />
                  West Bengal 700034
                </p>
              </div>

              <button
                onClick={() => {
                  alert("Opening digital routing coordinates... Diamond Harbour Rd, Behala.");
                }}
                className="w-full border border-slate-200 hover:border-[#086384] text-slate-600 hover:text-[#086384] text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer bg-white"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Card C: OPD Timings matching Image 1 */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-3.5 border-b border-slate-100 pb-3">
              <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 border border-teal-100/50">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">OPD Timings</h4>
                <p className="text-slate-400 text-[9px] uppercase font-bold tracking-wider">Book ahead to reduce wait time</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Monday - Saturday</span>
                <span className="font-bold text-slate-800">08:00 AM - 08:00 PM</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Sunday</span>
                <span className="font-bold text-slate-800">10:00 AM - 02:00 PM</span>
              </div>

              <div className="flex justify-between items-center bg-sky-50/50 p-2.5 rounded-xl border border-sky-100/40 text-[11px]">
                <span className="font-medium text-[#086384]">Diagnostic Services</span>
                <span className="font-bold text-[#086384] uppercase">Open 24 Hours</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column span 7: Interactive map */}
        <div className="lg:col-span-7 flex">
          <InteractiveMap />
        </div>

      </div>

      {/* 3. "Request a Call Back" segment matching Image 1 */}
      <section className="bg-slate-50/30 border border-slate-200/80 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto space-y-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#086384]/5 rounded-full transform -translate-x-12 -translate-y-12" />
        
        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Request a Call Back</h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
            Fill in your details and our patient relationship team will reach out within 30 minutes.
          </p>
        </div>

        {/* Success alert slide down */}
        {submitSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center space-x-3 text-xs text-slate-700 animate-fadeIn shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-800">Callback Registered successfully.</span> Our healthcare consultant is compiling routing logs and will call you on your cell within 30 minutes.
            </div>
            <button onClick={() => setSubmitSuccess(false)} className="ml-auto font-bold text-[#086384]">✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-2">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 sm:py-4 focus:border-[#086384]/80 focus:ring-2 focus:ring-[#086384]/10 outline-none text-slate-700 placeholder-slate-400 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-2">Phone Number</label>
              <input
                required
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 sm:py-4 focus:border-[#086384]/80 focus:ring-2 focus:ring-[#086384]/10 outline-none text-slate-700 placeholder-slate-400 transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 font-bold uppercase tracking-wider mb-2">Department of Interest</label>
            <select
              required
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 sm:py-4 focus:border-[#086384] outline-none text-slate-600 transition-all shadow-xs bg-white cursor-pointer"
            >
              <option value="">General Consultation</option>
              {DEPARTMENTS.slice(0, 10).map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="text-xs">
            <label className="block text-slate-700 font-bold uppercase tracking-wider mb-2 font-sans">Short Message (Optional)</label>
            <textarea
              rows={3}
              placeholder="How can we help you?"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:border-[#086384] outline-none text-slate-700 placeholder-slate-400 transition-all shadow-xs resize-none"
            />
          </div>

          <div className="pt-4 flex justify-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-[#086384] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-12 py-4 rounded-xl cursor-pointer hover:bg-sky-700 transition-all shadow-md active:scale-98 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Submitting logs...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>

        </form>
      </section>

      {/* EMERGENCY CALL DIALER SIMULATOR MODAL */}
      {dialSimActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs" onClick={() => setDialSimActive(false)} />
          
          <div className="bg-slate-950 text-white border border-slate-800 rounded-3xl w-full max-w-sm p-6 relative overflow-hidden z-10 flex flex-col items-center justify-center space-y-6 text-center shadow-2xl">
            
            {/* Pulsing visual circles */}
            <div className="relative flex items-center justify-center h-24 w-24">
              <span className="absolute animate-ping h-20 w-20 rounded-full bg-rose-500 opacity-20" />
              <div className="h-16 w-16 bg-rose-600 text-white rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg relative z-10">
                <Phone className="h-7 w-7" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold font-sans">Connecting to Helpline</h4>
              <p className="text-xs text-rose-500 font-semibold tracking-wider uppercase mt-1">EMERGENCY FIRST RESPONSE</p>
              <p className="text-xl font-bold font-mono text-slate-300 mt-2">+91 (033) 4050 6070</p>
            </div>

            <div className="space-y-1 text-xs text-slate-400 max-w-xs">
              <span className="font-mono text-sm block font-bold text-[#086384]">{formatDuration(dialDuration)}</span>
              <p>Simulating terminal line coordinates. Sound loops & ambulance pre-alerts are active.</p>
            </div>

            <button
              onClick={() => setDialSimActive(false)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              Disconnect Call
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
