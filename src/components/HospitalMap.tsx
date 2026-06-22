import { useState } from 'react';
import { MapPin, Phone, Clock, Compass, ExternalLink, HeartHandshake } from 'lucide-react';

export default function HospitalMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const hospitalAddress = "169, Diamond Harbour Rd, Behala, Kolkata, West Bengal 700034";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2081519782503!2d88.3150531760447!3d22.496355435728867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027bc9166f3631%3A0xe54ef5a297e59c7b!2sNarayan%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const googleMapsDirectionsUrl = "https://www.google.com/maps/dir//Narayan+Memorial+Hospital,+169,+Diamond+Harbour+Rd,+Behala,+Kolkata,+West+Bengal+700034/@22.4963554,88.3150532,17z/";

  return (
    <section className="relative w-full py-16 bg-slate-50/50 border-t border-white/60" id="google-maps-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#086384]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] text-[#086384] font-black tracking-widest uppercase bg-[#086384]/10 px-3.5 py-1.5 rounded-full border border-[#086384]/15 mb-4 inline-block font-mono">
            Location & Access Directory
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            Find Us in Kolkata
          </h2>
          <p className="text-slate-650 text-xs sm:text-sm font-semibold mt-2.5">
            Narayan Memorial Hospital is conveniently situated on Diamond Harbour Road in Behala, offering direct transit access for West Bengal citizens.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Location Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white/40 backdrop-blur-md border border-white/70 p-6 sm:p-8 rounded-3xl shadow-xl">
            
            <div className="space-y-6">
              {/* Header inside Panel */}
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-sans font-black text-slate-900 text-sm uppercase tracking-wider flex items-center space-x-2">
                  <Compass className="h-5 w-5 text-[#086384]" />
                  <span>Hospital Coordinates</span>
                </h3>
                <p className="text-slate-500 text-[11px] font-semibold mt-1">Direct diagnostic gate, emergency entry points.</p>
              </div>

              {/* Address detail */}
              <div className="flex items-start space-x-4">
                <div className="bg-[#086384]/10 p-3 rounded-2xl border border-white text-[#086384] shrink-0 shadow-3xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider block font-mono">Postal Address</span>
                  <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed">{hospitalAddress}</p>
                </div>
              </div>

              {/* Fast Emergency Helpline */}
              <div className="flex items-start space-x-4">
                <div className="bg-rose-500/10 p-3 rounded-2xl border border-white text-rose-600 shrink-0 shadow-3xs">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-rose-500 font-bold uppercase text-[9px] tracking-wider block font-mono">Emergency Trauma Desk</span>
                  <p className="text-[#086384] text-sm sm:text-base font-black leading-none">+91 33 6688 8888</p>
                  <span className="text-slate-500 text-[10px] font-semibold block">Available continuous 24/7/365</span>
                </div>
              </div>

              {/* Hours of Operations */}
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-500/10 p-3 rounded-2xl border border-white text-emerald-600 shrink-0 shadow-3xs">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-emerald-600 font-bold uppercase text-[9px] tracking-wider block font-mono">Gate Status</span>
                  <div className="text-slate-800 text-xs font-bold space-y-1">
                    <p className="flex items-center space-x-1.5 text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>24/7 Trauma Emergency Care</span>
                    </p>
                    <p className="text-slate-600">OPD Services: 09:00 AM – 08:00 PM (Mon - Sat)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Block */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#086384] hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer border border-white/20 text-center"
              >
                <span>Google Maps Directions</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="tel:+913366888888"
                className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-350 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-3xs transition-all cursor-pointer"
              >
                <span>Call Desk</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive IFrame Embed */}
          <div className="lg:col-span-7 relative bg-white/40 backdrop-blur-md border border-white/70 p-2.5 rounded-3xl shadow-xl flex flex-col h-[400px] lg:h-auto min-h-[380px]">
            <div className="relative w-full h-full flex-grow rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900/5 shadow-inner">
              
              {/* Spinner loader layout before iframe triggers */}
              {!mapLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-slate-950/5 text-slate-700 select-none">
                  <div className="h-8 w-8 rounded-full border-3 border-[#086384]/20 border-t-[#086384] animate-spin" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Contacting Google Maps Gateway...</span>
                </div>
              )}

              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                title="Narayan Memorial Hospital Map Link"
                className={`w-full h-full rounded-2xl transition-all duration-500 ${
                  mapLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
                }`}
              />
            </div>
          </div>

        </div>

        {/* Security / Safe Transit Advice Checklist Banner */}
        <div className="mt-8 bg-slate-900 text-white p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3.5 text-xs sm:text-sm">
            <div className="bg-[#086384]/50 p-2.5 rounded-xl border border-white/10 text-white shrink-0">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="font-extrabold text-white uppercase tracking-wider text-[11px] sm:text-xs">Valet Parking & Patient Lounges Available</p>
              <p className="text-slate-400 text-[10px] sm:text-xs font-semibold leading-relaxed mt-0.5">Complimentary physical valet drop services operate directly inside the Diamond Harbour gate for immediate emergency drop-offs.</p>
            </div>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 bg-[#086384] hover:bg-sky-700 font-black text-[10px] uppercase tracking-widest text-white px-5 py-3 rounded-xl shadow-3xs cursor-pointer border border-white/10"
          >
            Go back to top page ↑
          </button>
        </div>

      </div>
    </section>
  );
}
