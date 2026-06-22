import  { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, FileText, Pill, Settings, Calendar, Download, TrendingUp, AlertCircle, Eye, CheckCircle2 } from 'lucide-react';
import { MOCK_PATIENT_PORTAL } from '../data';
import gsap from 'gsap';

export default function PatientPortalDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [vitalType, setVitalType] = useState(0); // 0: Heart Rate, 1: BP, 2: Glucose
  const [viewingReport, setViewingReport] = useState<any>(null);
  
  const parentContainerRef = useRef<HTMLDivElement>(null);

  // Stagger load the charts or items when activeTab changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portal-animate-item', 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
      gsap.fromTo('.vital-bar', 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'bottom',
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out'
        }
      );
    }, parentContainerRef);

    return () => ctx.revert();
  }, [activeTab, vitalType]);

  const activeVitalData = MOCK_PATIENT_PORTAL.vitals[vitalType];

  const reports = [
    { id: 'rep-01', title: 'Comprehensive Blood Panel', date: 'June 18, 2026', doctor: 'Dr. Sarah Miller', status: 'Normal', marker: 'bg-emerald-500' },
    { id: 'rep-02', title: 'ECG Cardiac Rhythm Test', date: 'May 20, 2026', doctor: 'Dr. Dhruba Bhattacharya', status: 'Healthy Rhythm', marker: 'bg-emerald-500' },
    { id: 'rep-03', title: 'Lipid Lipid Profile Screen', date: 'April 05, 2026', doctor: 'Dr. Anil Mukherjee', status: 'Borderline LDL', marker: 'bg-amber-500' },
    { id: 'rep-04', title: 'Thyroid Function (TSH/T3/T4)', date: 'Feb 12, 2026', doctor: 'Dr. Sarah Miller', status: 'Normal', marker: 'bg-emerald-500' }
  ];

  const prescriptions = [
    { name: 'Atorvastatin (Lipitor)', dosage: '10mg', frequency: 'Once daily (Night)', purpose: 'Cholesterol control', refills: 3, remainingDays: 45 },
    { name: 'Metformin Hydrochloride', dosage: '500mg', frequency: 'Twice daily with meals', purpose: 'Insulin moderation', refills: 2, remainingDays: 14 },
    { name: 'Methylcobalamin (B12)', dosage: '1500mcg', frequency: 'Daily (Morning)', purpose: 'Nervous system support', refills: 5, remainingDays: 60 }
  ];

  return (
    <div
      ref={parentContainerRef}
      className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/65 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px] relative z-10"
    >
      {/* Sidebar - col span 3 matching image */}
      <div className="lg:col-span-3 bg-white/10 backdrop-blur-md p-6 border-r border-white/45 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Patient Profile */}
          <div className="flex items-center space-x-3.5 pb-5 border-b border-white/40">
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-[#086384] text-white flex items-center justify-center font-bold font-sans text-base shadow-sm ring-2 ring-white/50">
                AJ
              </div>
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-emerald-500 rounded-full border-2 border-white ring-px ring-emerald-500/25" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 leading-none">{MOCK_PATIENT_PORTAL.name}</h4>
              <span className="text-[10px] text-slate-500 font-bold font-mono mt-1 block">ID: {MOCK_PATIENT_PORTAL.id}</span>
            </div>
          </div>

          {/* Tab buttons list */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab('dashboard'); setViewingReport(null); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white/70 text-[#086384] shadow-xs border-l-4 border-[#086384] ring-1 ring-white/40'
                  : 'text-slate-700 hover:bg-white/30 hover:text-[#086384]'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab('reports'); setViewingReport(null); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-white/70 text-[#086384] shadow-xs border-l-4 border-[#086384] ring-1 ring-white/40'
                  : 'text-slate-700 hover:bg-white/30 hover:text-[#086384]'
              }`}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span>Reports</span>
            </button>

            <button
              onClick={() => { setActiveTab('prescriptions'); setViewingReport(null); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'prescriptions'
                  ? 'bg-white/70 text-[#086384] shadow-xs border-l-4 border-[#086384] ring-1 ring-white/40'
                  : 'text-slate-700 hover:bg-white/30 hover:text-[#086384]'
              }`}
            >
              <Pill className="h-4 w-4 shrink-0" />
              <span>Prescriptions</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setViewingReport(null); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white/70 text-[#086384] shadow-xs border-l-4 border-[#086384] ring-1 ring-white/40'
                  : 'text-slate-700 hover:bg-white/30 hover:text-[#086384]'
              }`}
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Diagnostic health parameters card */}
        <div className="bg-white/30 border border-white/50 rounded-xl p-4 text-xs shadow-3xs">
          <span className="font-mono text-[#086384] font-bold block uppercase tracking-wider text-[9px] mb-1">Assisted Health Check</span>
          <span className="text-slate-600 font-semibold">Secure connection to hospital vital monitors is currently operational.</span>
        </div>
      </div>

      {/* Main Panel - col span 9 */}
      <div className="lg:col-span-9 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white/5 backdrop-blur-xs">
        
        {/* TAB 1: DASHBOARD DETAILED OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Health Banner and state */}
            <div className="portal-animate-item flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/40 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight uppercase">Health Monitor</h3>
                <p className="text-slate-600 text-xs mt-0.5 font-semibold">Welcome back! Your logged health vitals are looking excellent today.</p>
              </div>
              <span className="mt-2.5 sm:mt-0 px-3 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold rounded-full w-fit shadow-2xs">
                ● Connected Stable
              </span>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 portal-animate-item">
              
              {/* Card 1: Upcoming Appointment */}
              <div className="border border-white/60 rounded-2xl p-5 bg-white/30 backdrop-blur-xs hover:border-[#086384]/55 hover:bg-white/40 transition-all shadow-3xs">
                <span className="text-[10px] font-bold text-[#086384] uppercase tracking-wider">Upcoming Appointment</span>
                <h4 className="font-bold text-slate-900 text-base mt-2">{MOCK_PATIENT_PORTAL.upcomingAppointment.doctor}</h4>
                <p className="text-slate-600 text-xs mt-0.5 font-semibold">{MOCK_PATIENT_PORTAL.upcomingAppointment.department}</p>
                
                <div className="flex items-center space-x-2 text-slate-700 text-xs mt-4 font-bold">
                  <Calendar className="h-4 w-4 text-[#086384]" />
                  <span>{MOCK_PATIENT_PORTAL.upcomingAppointment.dateTime}</span>
                </div>

                <div className="mt-5 flex items-center space-x-3">
                  <button
                    onClick={() => {
                      alert("Appointment schedule revision request registered! Our executive will contact you to align schedules.");
                    }}
                    className="bg-[#086384] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0a5874] cursor-pointer"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {
                      alert("Are you sure you want to cancel? Pressing OK sends this inquiry to our relationship desk.");
                    }}
                    className="text-slate-500 hover:text-rose-500 text-xs font-semibold px-3 py-2 cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>

              {/* Card 2: Latest Diagnostic Lab Report */}
              <div className="border border-white/60 rounded-2xl p-5 bg-white/30 backdrop-blur-xs hover:border-[#086384]/55 hover:bg-white/40 transition-all flex flex-col justify-between shadow-3xs">
                <div>
                  <span className="text-[10px] font-bold text-[#086384] uppercase tracking-wider">Latest Lab Report</span>
                  <h4 className="font-bold text-slate-900 text-base mt-2">{MOCK_PATIENT_PORTAL.latestReport.title}</h4>
                  <p className="text-[#086384] text-xs font-semibold mt-1">{MOCK_PATIENT_PORTAL.latestReport.result}</p>
                  <span className="text-slate-500 text-[10px] font-semibold block mt-1.5">Completed on {MOCK_PATIENT_PORTAL.latestReport.date}</span>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('reports');
                    setViewingReport(reports[0]);
                  }}
                  className="mt-5 bg-slate-900 text-white font-bold flex items-center justify-center space-x-2 w-fit px-4 py-2.5 rounded-lg text-xs hover:bg-slate-800 transition-all border border-white/20 cursor-pointer shadow-3xs"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF Report</span>
                </button>
              </div>

            </div>

            {/* Vitals Trend Segment matching image */}
            <div className="border border-white/60 rounded-2xl p-5 sm:p-6 space-y-5 portal-animate-item bg-white/30 backdrop-blur-xs shadow-3xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-white/30 pb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-[#086384]" />
                  <span className="font-bold text-slate-800 text-sm uppercase tracking-tight">Vitals Trend Tracker</span>
                </div>
                
                {/* Vitals Selector */}
                <div className="flex flex-wrap gap-1 mt-2.5 sm:mt-0 bg-white/40 p-1 rounded-xl border border-white/50">
                  {MOCK_PATIENT_PORTAL.vitals.map((v, idx) => (
                    <button
                      key={v.label}
                      onClick={() => setVitalType(idx)}
                      className={`px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all cursor-pointer ${
                        vitalType === idx
                          ? 'bg-white text-[#086384] shadow-3xs ring-1 ring-black/5'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {v.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Chart rendered directly as flawless styled responsive SVG */}
              <div className="space-y-4">
                <div className="h-48 w-full flex items-end justify-between px-2 pt-6">
                  {activeVitalData.data.map((item) => {
                    // Normalize height based on expected ranges
                    let heightPercent = 20;
                    if (vitalType === 0) heightPercent = ((item.value - 50) / 40) * 100; // Heart Rate
                    else if (vitalType === 1) heightPercent = ((item.value - 90) / 40) * 100; // BP
                    else heightPercent = ((item.value - 70) / 50) * 100; // Glucose

                    heightPercent = Math.max(15, Math.min(100, heightPercent));

                    return (
                      <div key={item.day} className="flex flex-col items-center justify-end h-full w-1/8 group">
                        {/* Tooltip value */}
                        <span className="bg-slate-950 text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-md mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute translate-y-[-160%] shadow-md border border-white/10">
                          {item.value}
                        </span>
                        
                        {/* Graphical Bar */}
                        <div className="relative w-full max-w-[28px] bg-white/45 border border-white/50 rounded-md overflow-hidden h-full flex items-end shadow-3xs">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`vital-bar w-full rounded-b-md ${
                              vitalType === 0
                                ? 'bg-sky-500 group-hover:bg-[#086384]'
                                : vitalType === 1
                                ? 'bg-indigo-500 group-hover:bg-indigo-700'
                                : 'bg-[#086384] group-hover:bg-[#064e69]'
                            } transition-colors duration-200`}
                          />
                        </div>

                        <span className="text-[10px] text-slate-500 font-bold mt-2">{item.day}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center bg-white/40 p-3 rounded-xl border border-white/50 text-[11px] text-slate-600 font-semibold shadow-3xs">
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-[#086384] mr-1.5" />
                    Last logged biometric reading: <strong className="text-slate-800 ml-1">{activeVitalData.data[activeVitalData.data.length-1].value} {vitalType === 0 ? 'bpm' : vitalType === 1 ? 'mmHg' : 'mg/dL'}</strong>
                  </span>
                  <button
                    onClick={() => { alert("Re-syncing with hospital diagnostic databases..."); }}
                    className="text-[#086384] hover:underline font-bold"
                  >
                    Refresh Sync
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: REPORTS VIEW / DETAILED PDF VIEW */}
        {activeTab === 'reports' && (
          <div className="space-y-6 portal-animate-item">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Diagnostic Lab Reports</h3>
                <p className="text-slate-500 text-xs mt-0.5">Secure patient repository hosted in compliance with standard protocols.</p>
              </div>
              
              {viewingReport && (
                <button
                  onClick={() => setViewingReport(null)}
                  className="text-xs bg-[#086384]/10 text-[#086384] font-bold px-3 py-1.5 rounded-lg hover:bg-[#086384]/20"
                >
                  ← Back to List
                </button>
              )}
            </div>

            {!viewingReport ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-slate-200/80 rounded-xl p-4 flex justify-between items-center hover:border-[#086384] hover:shadow-xs transition-all pointer-events-auto bg-white"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 font-bold">{report.id}</span>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{report.title}</h4>
                      <p className="text-slate-400 text-[10px]">Issued: {report.date} • {report.doctor}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-2.5">
                      <span className="text-[10px] font-bold bg-[#086384]/5 text-[#086384] px-2 py-0.5 rounded-full">
                        {report.status}
                      </span>
                      <button
                        onClick={() => setViewingReport(report)}
                        className="p-2 bg-slate-50 rounded-lg hover:bg-[#086384] text-slate-500 hover:text-white transition-all cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-[#086384]/20 bg-slate-50/50 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between items-start border-b border-slate-200/60 pb-4">
                  <div>
                    <span className="bg-[#086384]/10 text-[#086384] font-mono text-[9px] px-2 py-0.5 rounded-md font-bold">{viewingReport.id}</span>
                    <h4 className="text-lg font-bold text-slate-800 mt-1.5">{viewingReport.title}</h4>
                    <p className="text-xs text-slate-500">Ordered by: <strong>{viewingReport.doctor}</strong> • Released on {viewingReport.date}</p>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Downloading official PDF copy of diagnostic report ${viewingReport.id}...`);
                    }}
                    className="bg-[#086384] text-white flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs hover:bg-[#0a5874] cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                {/* Simulated Diagnostic breakdown list */}
                <div className="space-y-3.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bio-Metrics breakdown</span>
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <div>
                        <span className="font-bold text-slate-700 block">Hemoglobin (Hb)</span>
                        <span className="text-[10px] text-slate-400">Oxygen capacity monitor</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800 block">14.2 g/dL</span>
                        <span className="text-[9px] text-emerald-500 font-bold">NORMAL (Range: 13.5 - 17.5)</span>
                      </div>
                    </div>

                    <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <div>
                        <span className="font-bold text-slate-700 block">Total Cholesterol</span>
                        <span className="text-[10px] text-slate-400">Cardiovascular assessment</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800 block">195 mg/dL</span>
                        <span className="text-[9px] text-emerald-500 font-bold">DESIRABLE (Range: &lt; 200)</span>
                      </div>
                    </div>

                    <div className="flex justify-between p-3 bg-white rounded-xl border border-slate-100">
                      <div>
                        <span className="font-bold text-slate-700 block">Fast Glucose Panel</span>
                        <span className="text-[10px] text-slate-400">Metabolic blood check</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-800 block">94 mg/dL</span>
                        <span className="text-[9px] text-emerald-500 font-bold">NORMAL (Range: 70 - 100)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600 flex items-center space-x-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span>Verified electronically by our Central Pathology Division. No physical signature is required.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRESCRIPTIONS LIST */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6 portal-animate-item">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Active Medical Prescriptions</h3>
              <p className="text-slate-500 text-xs mt-0.5">Approved medicines from your consulting physicians. Present the codes at any pharmacy.</p>
            </div>

            <div className="space-y-4">
              {prescriptions.map((p) => (
                <div
                  key={p.name}
                  className="border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-xs hover:border-[#086384]/30 transition-all"
                >
                  <div className="space-y-1.5">
                    <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-sm text-[9px] uppercase font-mono">RX APPROVED</span>
                    <h4 className="font-bold text-slate-800 text-sm">{p.name} • <span className="text-[#086384] font-medium">{p.dosage}</span></h4>
                    <p className="text-slate-500 text-xs">{p.frequency}</p>
                    <span className="text-slate-400 text-[10px] block">Indication: {p.purpose}</span>
                  </div>

                  <div className="mt-4 sm:mt-0 text-right space-y-1.5 self-stretch sm:self-center">
                    <div className="text-xs text-slate-500 font-semibold">
                      Refills remaining: <span className="font-medium text-slate-700">{p.refills}</span>
                    </div>
                    <div className="text-[10px] text-amber-600 font-mono">
                      Current supply: {p.remainingDays} days remaining
                    </div>
                    <button
                      onClick={() => {
                        alert(`Refill request for ${p.name} was saved and pushed to pharmacy system code!`);
                      }}
                      className="bg-slate-950 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md hover:bg-[#086384] transition-all cursor-pointer"
                    >
                      Request Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS / ALERTS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 portal-animate-item">
            <div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">Portal & Identity Configuration</h3>
              <p className="text-slate-500 text-xs mt-0.5">Control secure credentials, SMS alerts, and vital sync parameters.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Configuration updated!"); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Profile Email</label>
                  <input type="text" disabled value="alex.johnson@patients.nmh.org" className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-lg p-2.5 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Registered Mobile Number</label>
                  <input type="text" disabled value="+91 XXXXX 9481" className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-lg p-2.5 text-xs" />
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-3.5">
                <span className="font-bold text-slate-700 text-xs block">Communication Preferences</span>
                
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Send diagnostic report release alert SMS</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#086384]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Push monthly heart rate and health vitals report</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#086384]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Two-Factor Biometric ID for Report viewing</span>
                  <input type="checkbox" className="h-4 w-4 accent-[#086384]" />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#086384] text-white font-semibold px-4 py-2.5 rounded-lg text-xs hover:bg-[#0a5874] cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
