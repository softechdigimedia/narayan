import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import InfoModals from './components/InfoModals';
import HomeTab from './components/HomeTab';
import DoctorsTab from './components/DoctorsTab';
import DepartmentsTab from './components/DepartmentsTab';
import ServicesTab from './components/ServicesTab';
import ContactTab from './components/ContactTab';
import InfoPageTab from './components/InfoPageTab';
import HospitalMap from './components/HospitalMap';
import FAQsTab from './components/FAQsTab';
import TestimonialsTab from './components/TestimonialsTab';
import { ArrowUp, Phone, ShieldAlert, X } from 'lucide-react';
import gsap from 'gsap';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCallPrompt, setShowCallPrompt] = useState(false);
  
  // Navigation-triggered interactive elements
  const [selectedDeptFromNav, setSelectedDeptFromNav] = useState<any>(null);
  const [selectedDoctorFromNav, setSelectedDoctorFromNav] = useState<any>(null);
  const [activeInfoModal, setActiveInfoModal] = useState<string | null>(null);

  // Monitor scroll height to show/hide scroll top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on tab change and run simple smooth fade-in
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Smooth GSAP page fade-in
    gsap.fromTo(
      '#main-tab-viewport',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [currentTab]);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-tr from-[#f3f7fb] via-[#ecf2f7] to-[#e4edf5] text-[#0f3a4b] font-sans antialiased flex flex-col justify-between">
      
      {/* Background Floating Gloss Orbs - Styled according to reference image style guide */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Cyan-blue orb top-left */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] rounded-full bg-sky-300/40 blur-[100px] animate-float" />
        {/* Soft Sapphire/Periwinkle orb top-right */}
        <div className="absolute top-[12%] -right-24 w-[400px] h-[400px] rounded-full bg-indigo-200/40 blur-[110px] animate-float-delayed" />
        {/* Teal center-left */}
        <div className="absolute top-[40%] -left-48 w-[500px] h-[500px] rounded-full bg-cyan-200/35 blur-[120px] animate-float" />
        {/* Soft Purple orb bottom-right */}
        <div className="absolute -bottom-16 -right-16 w-[550px] h-[550px] rounded-full bg-purple-200/40 blur-[130px] animate-float-delayed" />
        {/* Dynamic ambient central sky flare */}
        <div className="absolute top-[70%] left-[25%] w-[400px] h-[400px] rounded-full bg-sky-100/30 blur-[100px] animate-float" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between pt-[116px] sm:pt-[116px]">
        {/* Fixed Header Wrapper containing alert banner and navbar */}
        <header className="fixed top-0 left-0 right-0 z-50">
          {/* Top Banner alert message */}
          <div className="bg-[#086384]/75 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold py-2.5 px-4 text-center select-none tracking-wide border-b border-white/10">
            📢 Special Bulletin: High-speed diagnostic pathology scanning is now active 24/7. OPD slots open.
          </div>

          {/* Styled Navigation Header */}
          <Navbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
            setSelectedDeptFromNav={setSelectedDeptFromNav}
            setSelectedDoctorFromNav={setSelectedDoctorFromNav}
            setActiveInfoModal={setActiveInfoModal}
          />
        </header>

      {/* Primary Tab Viewport */}
      <main id="main-tab-viewport" className="flex-grow">
        {currentTab === 'home' && (
          <HomeTab
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
          />
        )}
        {currentTab === 'doctors' && (
          <DoctorsTab
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
            selectedDoctorFromNav={selectedDoctorFromNav}
            setSelectedDoctorFromNav={setSelectedDoctorFromNav}
          />
        )}
        {currentTab === 'departments' && (
          <DepartmentsTab
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
            selectedDeptFromNav={selectedDeptFromNav}
            setSelectedDeptFromNav={setSelectedDeptFromNav}
          />
        )}
        {currentTab === 'services' && (
          <ServicesTab
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
          />
        )}
        {currentTab === 'contact' && (
          <ContactTab />
        )}
        {currentTab === 'faqs' && (
          <FAQsTab />
        )}
        {currentTab === 'testimonials' && (
          <TestimonialsTab />
        )}
        {['about', 'chairman', 'ceo', 'awards', 'waste', 'guide', 'insurance', 'corporates', 'news', 'gallery', 'press', 'career'].includes(currentTab) && (
          <InfoPageTab
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            openAppointmentModal={() => setIsAppointmentModalOpen(true)}
          />
        )}
      </main>

      {/* Custom Global Information Modals */}
      <InfoModals
        activeModal={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        openAppointment={() => setIsAppointmentModalOpen(true)}
      />

      {/* Embedded Google Maps Location Section */}
      <HospitalMap />

      {/* Hospital Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        openAppointmentModal={() => setIsAppointmentModalOpen(true)}
      />

      {/* Floating Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      {/* PERSISTENT FLOATING ACTIONS PANEL */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className={`h-12 w-12 bg-[#086384] hover:bg-sky-700 text-white rounded-full flex items-center justify-center shadow-xl border border-white/20 transition-all duration-300 pointer-events-auto cursor-pointer ${
            showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
          }`}
          title="Scroll To Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>

        {/* Emergency Call Hotline Action */}
        <button
          onClick={() => setShowCallPrompt(true)}
          className="h-12 w-12 bg-rose-600 hover:bg-rose-500 text-white rounded-full flex items-center justify-center shadow-xl border border-white/20 transition duration-305 pointer-events-auto cursor-pointer animate-pulse"
          title="NMH Helpdesk & Hotlines"
        >
          <Phone className="h-5 w-5" />
        </button>
      </div>

      {/* QUICK HOTLINE TELEPHONY PROMPT DIALOG */}
      {showCallPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn" id="call-modal-overlay">
          <div className="bg-white/95 border border-white/70 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 animate-scaleIn">
            
            <button 
              onClick={() => setShowCallPrompt(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <span className="text-rose-600 font-mono text-[9px] uppercase tracking-wider font-extrabold block">Emergency Priority</span>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">NMH Ambulance & Helpdesk</h3>
              </div>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              If you require instantaneous clinical assistance or emergency trauma dispatch, you can dial our priority response coordinators directly.
            </p>

            <div className="space-y-3.5 pt-2">
              {/* Emergency Hotline */}
              <a 
                href="tel:+913340156788"
                className="p-4 bg-rose-50/50 hover:bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between transition group pointer-events-auto"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">🚑</span>
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm zoom-in">Trauma & Emergency Desk</h4>
                    <p className="text-[10px] text-rose-600 font-mono mt-0.5">+91 (33) 4015 6788 (24/7)</p>
                  </div>
                </div>
                <span className="text-[10px] bg-rose-600 text-white font-extrabold px-2.5 py-1 rounded-full font-sans tracking-wide shrink-0">DIAL NOW</span>
              </a>

              {/* Patient Admission */}
              <a 
                href="tel:+913340156700"
                className="p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-150 rounded-2xl flex items-center justify-between transition group pointer-events-auto"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm">Main Admitting Helpline</h4>
                    <p className="text-[10px] text-[#086384] font-mono mt-0.5">+91 (33) 4015 6700</p>
                  </div>
                </div>
                <span className="text-[10px] bg-[#086384] text-white font-extrabold px-2.5 py-1 rounded-full font-sans tracking-wide shrink-0">DIAL NOW</span>
              </a>

              {/* Outpatient Appointments */}
              <button 
                onClick={() => { setShowCallPrompt(false); setIsAppointmentModalOpen(true); }}
                className="w-full bg-[#086384] hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition cursor-pointer text-center"
              >
                Or Book OPD Appointment Online
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
