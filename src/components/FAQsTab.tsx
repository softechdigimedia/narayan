import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  FileText, 
  Smile, 
  CreditCard, 
  ShieldAlert, 
  Clock, 
  PhoneCall, 
  MapPin, 
  Stethoscope 
} from 'lucide-react';
import gsap from 'gsap';

interface FAQItem {
  id: string;
  category: 'general' | 'appointments' | 'billing' | 'services' | 'emergencies';
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FAQsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFAQId, setOpenFAQId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Queries', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'general', label: 'General Info', icon: <Smile className="h-4 w-4" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="h-4 w-4" /> },
    { id: 'billing', label: 'Billing & Insurance', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'services', label: 'Medical Services', icon: <Stethoscope className="h-4 w-4" /> },
    { id: 'emergencies', label: 'Critical / Emergency', icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'general',
      question: 'What are the general visiting hours at Narayan Memorial Hospital?',
      answer: 'General visiting hours are between 11:00 AM - 1:00 PM and 5:00 PM - 7:00 PM daily. However, visiting hours in Intensive Care Units (ICUs) are strictly restricted and generally scheduled between 4:00 PM - 5:00 PM for one designated relative per patient.',
      icon: <Clock className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-2',
      category: 'appointments',
      question: 'How do I book an appointment with a specialist?',
      answer: "You can easily schedule an appointment by clicking the 'OPD APPOINTMENT' button at the top of the screen. Alternatively, you can search for a doctor under the 'Doctors' tab and click their book button, or contact our central helpdesk directory at +91 33 6636 1234.",
      icon: <Calendar className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-3',
      category: 'billing',
      question: 'Which health insurance providers and TPAs do you partner with?',
      answer: 'We have corporate tie-ups and direct cash-less facilities with almost all major Third Party Administrators (TPAs) and private/government insurance providers, including National Insurance, United India, ICICI Lombard, Star Health, HDFC Ergo, and SBI General. Please visit our Patient Corner -> Insurance Partners page for the full list.',
      icon: <CreditCard className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-4',
      category: 'emergencies',
      question: 'Does NMH support 24x7 trauma care and emergency services?',
      answer: 'Yes. Our trauma care center is fully operational 24 hours a day, 7 days a week. We have dedicated emergency medicine experts, trauma surgeons, critical-care ambulances with advanced life-support (ALS) capabilities, and high-speed diagnostic rooms always ready.',
      icon: <ShieldAlert className="h-5 w-5 text-rose-500" />
    },
    {
      id: 'faq-5',
      category: 'services',
      question: 'Can I get diagnostic lab and imaging reports online?',
      answer: 'Absolutely! Our High-Speed Digital Diagnostics operates 24/7. Once your test results are processed, you can view and download interactive PDF reports instantly on our online Patient Portal or receive them securely via registered WhatsApp/Email updates.',
      icon: <FileText className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-6',
      category: 'general',
      question: 'Where is Narayan Memorial Hospital located, and is there guest parking available?',
      answer: 'We are located at 123, Diamond Harbour Road, Behala, Kolkata - 700034 (near Behala Tram Depot). We offer fully secured 24/7 basement level guest parking for both 2-wheelers and 4-wheelers free of charge for visiting families.',
      icon: <MapPin className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-7',
      category: 'appointments',
      question: 'Can I cancel or reschedule my appointment slot online?',
      answer: 'Yes, you can reschedule or cancel any booked slot through the Patient Portal Demo or by calling our active outpatient executive team. We recommend rescheduling at least 3 hours prior to your slot time so another waiting patient may utilize it.',
      icon: <Calendar className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-8',
      category: 'services',
      question: 'What wellness checkup packages do you recommend?',
      answer: 'We offer specialized wellness packages tailored by age, gender, and lifestyle conditions. These include Clinical Cardiac screenings, Comprehensive Diabetic profiles, and Pediatric growth checkups. You can view details on the Patient Corner -> Health Check-Up Packages sub-section.',
      icon: <Stethoscope className="h-5 w-5 text-sky-600" />
    },
    {
      id: 'faq-9',
      category: 'billing',
      question: 'What mode of payments do you accept for discharge bills?',
      answer: "We accept Cash, major Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking transfers, and authorized corporate letter of authorizations (LOA). Cross-cheques are generally not accepted for immediate discharge release.",
      icon: <CreditCard className="h-5 w-5 text-sky-600" />
    }
  ];

  // Filtering logic
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle single accordion open/close state
  const handleToggle = (id: string) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  // Entrance animations for FAQ rows when category or search changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-item-card', 
        { y: 15, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: 'power2.out' 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [searchQuery, activeCategory]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      
      {/* Title Header with clean premium look */}
      <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#086384]/10 rounded-full border border-[#086384]/15">
          <HelpCircle className="h-3.5 w-3.5 text-[#086384]" />
          <span className="text-[10px] sm:text-xs font-bold text-[#086384] uppercase tracking-wider">Help & FAQS Support Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f3a4b]">
          Common Patient Queries
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Find fast answers to frequently asked questions about appointment booking, medical facilities, insurance clearance, and critical care guidelines.
        </p>
      </div>

      {/* Control center: Search and Filtering tab bar */}
      <div className="space-y-4 mb-8">
        
        {/* Search bar inside glassmorphic panel */}
        <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-3 shadow-3xs flex items-center gap-3">
          <div className="bg-[#086384]/10 text-[#086384] p-3 rounded-xl">
            <Search className="h-4 w-4 stroke-2" />
          </div>
          <input
            type="text"
            placeholder="Type search words (e.g. 'insurance', 'emergency', 'discharge', 'parking')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-hidden font-medium text-xs sm:text-sm placeholder-slate-400 text-slate-800"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] bg-slate-250/70 text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg uppercase font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Pills bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenFAQId(null);
              }}
              className={`flex items-center space-x-2 shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-[#086384] text-white shadow-xs scale-[1.02]' 
                  : 'bg-white/50 text-slate-600 hover:bg-white/80 hover:text-[#086384] border border-white/70'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List render area */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openFAQId === faq.id;
            return (
              <div 
                key={faq.id}
                className="faq-item-card bg-white/60 backdrop-blur-md border border-white/80 hover:border-[#086384]/25 hover:bg-white/80 rounded-2xl transition-all duration-300 overflow-hidden shadow-3xs"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left px-5 py-4 sm:py-5 flex items-start gap-4 cursor-pointer outline-none select-none"
                >
                  <div className="bg-[#086384]/5 p-2 rounded-xl border border-white/60 pt-2 shrink-0">
                    {faq.icon}
                  </div>
                  <div className="flex-1 min-w-0 pr-2 pt-0.5">
                    <span className="text-xs font-bold uppercase text-[#0c7297] tracking-wider mb-1 block">
                      {faq.category}
                    </span>
                    <h3 className="text-xs sm:text-[14px] font-bold text-slate-800 leading-snug tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="mt-1 text-slate-400">
                    {isOpen ? (
                      <div className="bg-[#086384]/10 text-[#086384] p-1 rounded-lg">
                        <ChevronUp className="h-4 w-4 stroke-3" />
                      </div>
                    ) : (
                      <div className="bg-slate-100 p-1 rounded-lg">
                        <ChevronDown className="h-4 w-4 stroke-2" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Accordion Expandable Panel */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-72 border-t border-slate-100/75 bg-[#086384]/3' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pl-14 text-xs sm:text-xs text-slate-600 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white/40 backdrop-blur-md border border-white/70 rounded-2xl p-6">
            <HelpCircle className="h-8 w-8 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-sm">No Matching FAQs Found</h3>
            <p className="text-xs text-slate-400 mt-1">Please try searching for another term or selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Footer Support Notice */}
      <div className="mt-12 bg-[#086384]/5 backdrop-blur-md border border-[#086384]/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="font-bold text-[#0f3a4b] text-xs sm:text-sm">Still have a specific question?</h4>
          <p className="text-xs text-slate-500">Contact our 24/7 client relations executive crew directly.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:+913366361234"
            className="flex items-center space-x-1.5 bg-[#086384] text-white py-2 px-4 rounded-xl text-xs font-bold shadow-xs hover:bg-[#0c7297] transition"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Call Helpdesk</span>
          </a>
        </div>
      </div>

    </div>
  );
}
