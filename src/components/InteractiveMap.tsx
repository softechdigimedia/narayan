import  { useState } from 'react';
import { 
  
  ShieldAlert, 
  Stethoscope, 
  Compass, 
  Clock,
  Navigation,
  PhoneCall,
  Activity
} from 'lucide-react';

interface MarkerData {
  id: string;
  title: string;
  type: 'emergency' | 'main' | 'opd' | 'diagnostic';
  subtitle: string;
  description: string;
  timing: string;
  phone: string;
  mapsUrl: string;
}

export default function InteractiveMap() {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('marker-1');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Direct Google Maps Embed URL matching the Homepage Map Component (no API Key required)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2081519782503!2d88.3150531760447!3d22.496355435728867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027bc9166f3631%3A0xe54ef5a297e59c7b!2sNarayan%20Memorial%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const directionsUrl = "https://www.google.com/maps/dir//Narayan+Memorial+Hospital,+169,+Diamond+Harbour+Rd,+Behala,+Kolkata,+West+Bengal+700034/@22.4963554,88.3150532,17z/";

  const markers: MarkerData[] = [
    {
      id: 'marker-1',
      title: "NMH Main Hospital Building",
      subtitle: "Main Entrance & Enquiries",
      type: 'main',
      description: "Central reception, inpatient admissions desk, visitor lobbies, and clinical service lounges inside the primary diagnostic complex.",
      timing: "Open 24 Hours",
      phone: "+91 33 6636 1234",
      mapsUrl: directionsUrl
    },
    {
      id: 'marker-2',
      title: "Trauma Care & ER Gates",
      subtitle: "Emergency Ambulance Bay",
      type: 'emergency',
      description: "Dedicated critical diagnostics, major trauma ORs, and active-duty cardiac emergency specialists on duty 24/7.",
      timing: "Open 24/7/365",
      phone: "+91 33 6688 8888",
      mapsUrl: directionsUrl
    },
    {
      id: 'marker-3',
      title: "Outpatient Clinic OPD Block",
      subtitle: "Specialist Clinics Wing",
      type: 'opd',
      description: "Consultation chambers for senior cardiologists, neuro-experts, orthopedics, and pediatricians.",
      timing: "09:00 AM – 08:00 PM (Mon-Sat)",
      phone: "+91 33 6636 1235",
      mapsUrl: directionsUrl
    },
    {
      id: 'marker-4',
      title: "Diagnostics & Pathology Lab",
      subtitle: "CT / MRI & Pathology Center",
      type: 'diagnostic',
      description: "State-of-the-art diagnostic scans, specimen collections, ultrasound processing, and digital medical record reporting.",
      timing: "Open 24 Hours",
      phone: "+91 33 6636 1236",
      mapsUrl: directionsUrl
    }
  ];

  const getMarkerColor = (type: 'emergency' | 'main' | 'opd' | 'diagnostic') => {
    switch(type) {
      case 'emergency': return '#ef4444'; // red
      case 'main': return '#086384'; // iconic blue
      case 'opd': return '#10b981'; // green
      case 'diagnostic': return '#f59e0b'; // amber
    }
  };

  const getMarkerIcon = (type: 'emergency' | 'main' | 'opd' | 'diagnostic') => {
    switch(type) {
      case 'emergency': return <ShieldAlert className="h-4 w-4 text-white" />;
      case 'main': return <Compass className="h-4 w-4 text-white" />;
      case 'opd': return <Stethoscope className="h-4 w-4 text-white" />;
      case 'diagnostic': return <Activity className="h-4 w-4 text-white" />;
    }
  };

  const activeMarker = markers.find(m => m.id === selectedMarkerId) || markers[0];

  return (
    <div className="relative w-full min-h-[500px] bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl flex flex-col md:flex-row">
      
      {/* Sidebar Controls Panel */}
      <div className="w-full md:w-80 bg-[#f8fafc]/90 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-200/80 p-6 flex flex-col justify-between shrink-0 z-10 relative">
        <div className="space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">Campus Directory</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono mt-0.5">Live Interactive Google Map</p>
          </div>

          {/* Directory Points selection list */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-black uppercase text-[#0d3b50]/60 tracking-wider block font-mono">Hospital Zones Directory</span>
            <div className="space-y-1.5 max-h-56 md:max-h-none overflow-y-auto pr-1">
              {markers.map((marker) => {
                const isActive = marker.id === selectedMarkerId;
                const dotColor = getMarkerColor(marker.type);
                return (
                  <button
                    key={marker.id}
                    id={`campus-marker-${marker.id}`}
                    onClick={() => setSelectedMarkerId(marker.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                      isActive 
                        ? 'bg-white border-[#086384]/40 shadow-xs ring-2 ring-[#086384]/5' 
                        : 'bg-white/50 hover:bg-white border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: dotColor }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800 text-xs block truncate leading-tight">
                          {marker.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block truncate leading-none mt-1">
                          {marker.subtitle}
                        </span>
                      </div>
                    </div>
                    <div 
                      className="p-1.5 rounded-lg shrink-0"
                      style={{ backgroundColor: `${dotColor}12`, color: dotColor }}
                    >
                      {getMarkerIcon(marker.type)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Zone directory panel */}
        <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4">
          <div className="space-y-2">
            <span className="bg-[#086384]/10 text-[#086384] px-2.5 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-wider inline-block">
              {activeMarker.type} service details
            </span>
            <p className="text-xs text-slate-650 leading-relaxed font-semibold">
              {activeMarker.description}
            </p>
          </div>

          <div className="space-y-2 text-[11px] font-bold text-slate-700 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-[#086384]" />
              <span className="font-semibold text-slate-600">{activeMarker.timing}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-slate-100">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <a href={`tel:${activeMarker.phone}`} id="phone-directory-call" className="hover:underline text-emerald-700 font-semibold">{activeMarker.phone}</a>
            </div>
          </div>

          <a
            href={activeMarker.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="campus-maps-directions"
            className="w-full bg-[#086384] hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs group"
          >
            <Navigation className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Navigate to Zone</span>
          </a>
        </div>
      </div>

      {/* Embedded Google Map Component Area */}
      <div className="flex-grow h-[350px] md:h-auto min-h-[400px] relative bg-slate-50">
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-4 border-[#086384] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Loading Core Map...</p>
            </div>
          </div>
        )}
        <iframe
          src={mapEmbedUrl}
          id="interactive-google-map-iframe"
          className="w-full h-full border-0 absolute inset-0"
          title="Narayan Memorial Hospital Map"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setMapLoaded(true)}
        />
      </div>

    </div>
  );
}
