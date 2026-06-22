import  { useState } from 'react';
import { ShieldCheck, HeartPulse, Building, PhoneCall, MapPin } from 'lucide-react';

interface ServicesTabProps {
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
}

export default function ServicesTab({ setCurrentTab, openAppointmentModal }: ServicesTabProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const keyDifferentiators = [
    {
      title: 'World-Class Infrastructure',
      desc: 'State-of-the-art sterile wards, advanced airflow diagnostics, and modular critical suites prioritizing rapid clinical stabilization.',
      icon: Building,
      color: 'text-sky-500 bg-sky-50'
    },
    {
      title: 'Multispecialty Excellence',
      desc: 'Coordinating over 30 clinical divisions under a unified medical board to resolve complex dual-diagnosis conditions seamlessly.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      title: '24/7 Critical Emergency Care',
      desc: 'Round-the-clock cardiac response units, trauma surgical blocks, and fully loaded ambulance suites monitoring vitals on route.',
      icon: HeartPulse,
      color: 'text-rose-500 bg-rose-50'
    }
  ];

  const packages = [
    {
      name: 'Essential Wellness Screening',
      price: '₹1,499',
      features: ['Fast blood sugar test', 'Complete blood panel (CBC)', 'Lipid Cholesterol screening', 'Kidney urea checks', 'General physician consultation'],
      badge: 'POPULAR'
    },
    {
      name: 'Cardio-Vascular Health Check',
      price: '₹3,499',
      features: ['ECG diagnostic graph', 'Echocardiogram examination', ' लिपिड (Lipid) comprehensive profile', 'Physician heart optimization review', 'Cardiology team feedback'],
      badge: 'SPECIALIZED'
    },
    {
      name: 'Senior Citizen Care Plan',
      price: '₹2,999',
      features: ['Uric acid panel screenings', 'Thyroid profile tests', 'Bone health density assay', 'Vision & hearing checks', 'Senior wellness recommendation report'],
      badge: 'GERIATRIC CARE'
    }
  ];

  const faqs = [
    { q: 'How do I schedule a same-day specialist OPD consultation?', a: 'You can use our secure online Appointment widget mapped on the website header or call our central booking helpline directly. Walk-in slots are subject to specialist availability.' },
    { q: 'What insurance providers or cashless claims systems are active?', a: 'Narayan Memorial Hospital is paneled with all premier national TPAs and commercial insurance networks, supporting clean, rapid cashless discharge processes.' },
    { q: 'Where do I fetch my official diagnostic lab reports?', a: 'All records are processed electronically and hosted instantly on our secure Patient Portal. You can log on using your NMH Patient ID code to download original PDFs.' }
  ];

  return (
    <div className="space-y-20 pb-16 py-12">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <span className="text-[#086384] text-xs font-mono font-bold uppercase tracking-wider">Advanced Care Infrastructure</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-tight leading-tight">
            Advanced Medical Care <br />With a Human Touch
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            At Narayan Memorial Hospital, we blend world-class medical expertise with personalized care strategies, securing the best clinical results for our patient families.
          </p>
        </div>

        {/* Big high quality illustration placeholder matching Image 9 layout */}
        <div className="h-96 rounded-3xl overflow-hidden relative border border-slate-200 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
            alt="Advanced Medical Care"
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent flex items-end p-6 sm:p-10" />
        </div>
      </section>

      {/* 2. Key Differentiators Grid */}
      <section className="bg-slate-50/70 border-y border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Why Choose Our Hospital</h2>
            <p className="text-slate-500 text-xs">Pioneering clinical outcomes with holistic patient priority.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyDifferentiators.map((diff) => (
              <div
                key={diff.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-2xl w-fit ${diff.color}`}>
                  <diff.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base tracking-tight">{diff.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Preventive Health Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Preventive Health Panels</h2>
          <p className="text-slate-500 text-xs text-center">Detect metabolic shifts early with pre-packaged diagnostic screening routines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-[#086384]/30 transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="bg-sky-50 text-[#086384] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracker-wider">
                    {pkg.badge}
                  </span>
                  <span className="text-xl font-mono font-bold text-[#086384]">{pkg.price}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-800 text-base leading-tight">{pkg.name}</h3>
                  <span className="text-[10px] text-slate-400 block font-medium">Outpatient Screening Protocol</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-50 pt-4 list-none">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={openAppointmentModal}
                  className="w-full bg-[#086384] hover:bg-sky-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs uppercase tracking-wider cursor-pointer"
                >
                  Schedule Package Check
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQs accordion */}
      <section className="bg-slate-50/70 border-t border-slate-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Support queries</h2>
            <p className="text-slate-500 text-xs">Essential information for patients visiting our hospital.</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center cursor-pointer outline-none transition-colors hover:bg-slate-50/50"
                >
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">{faq.q}</span>
                  <span className="text-slate-400 font-sans font-bold text-lg md:text-xl">
                    {activeFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {activeFaq === idx && (
                  <div className="p-5 pt-0 border-t border-slate-50 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Emergency Banner section matching image in layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-950 text-white rounded-3xl p-8 sm:p-10 border border-sky-900 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(8,99,132,0.4)_0%,rgba(8,99,132,0)_60%)]" />
          
          <div className="space-y-3 relative z-10 text-center md:text-left max-w-lg">
            <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight">Need Emergency Assistance?</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our trauma stabilization rooms and emergency response ambulance drivers operate round-the-clock. Call immediately for critical support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 self-stretch sm:self-center">
            <a
              href="tel:+9103340506070"
              className="w-full sm:w-auto bg-[#086384] text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 hover:bg-sky-600 transition-all shadow-md"
            >
              <PhoneCall className="h-4.5 w-4.5" />
              <span>+91 (033) 4050 6070</span>
            </a>
            
            <button
              onClick={() => setCurrentTab('contact')}
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white hover:bg-white/5 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MapPin className="h-4.5 w-4.5" />
              <span>Locate Us</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
