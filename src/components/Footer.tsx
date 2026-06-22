
import { PlusSquare, Globe, Heart, Phone, Mail } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
}

export default function Footer({ setCurrentTab, openAppointmentModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100/80 pt-16 pb-8 text-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="flex flex-col space-y-4">
            <div
              onClick={() => setCurrentTab('home')}
              className="flex items-center space-x-2 cursor-pointer group w-fit"
            >
              <div className="bg-[#086384] text-white p-1.5 rounded-md">
                <PlusSquare className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-[#086384] tracking-tight">
                Narayan Memorial
              </span>
            </div>
            
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Dedicated to providing holistic healthcare through innovation and empathy since 1995. Experience world-class medical expertise integrated with cutting-edge technology.
            </p>

            <div className="flex items-center space-x-3.5 pt-3">
              <a
                href="#"
                className="p-2 bg-white rounded-full border border-slate-100 hover:border-[#086384] hover:text-[#086384] hover:-translate-y-1 transition-all duration-300"
              >
                <Globe className="h-4.5 w-4.5 text-slate-500" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-full border border-slate-100 hover:border-[#086384] hover:text-[#086384] hover:-translate-y-1 transition-all duration-300"
              >
                <Mail className="h-4.5 w-4.5 text-slate-500" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-full border border-slate-100 hover:border-[#086384] hover:text-[#086384] hover:-translate-y-1 transition-all duration-300"
              >
                <Phone className="h-4.5 w-4.5 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  About Our Hospital
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('doctors')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Find a Specialist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('departments')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Medical Departments
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Specialty Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-5">
              Patient Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => setCurrentTab('contact')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  OPD Timings & Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Insurance Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Secure Patient Portal
                </button>
              </li>
              <li>
                <button
                  onClick={openAppointmentModal}
                  className="text-slate-500 hover:text-[#086384] transition-colors font-medium"
                >
                  Book Instant Appointment
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Feedback Form
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('faqs')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Help & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('testimonials')}
                  className="text-slate-500 hover:text-[#086384] transition-colors"
                >
                  Patient Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info & Legal */}
          <div>
            <h3 className="text-slate-800 font-semibold text-sm uppercase tracking-wider mb-5">
              Legal & Policy
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-slate-500 hover:text-[#086384] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-[#086384] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-[#086384] transition-colors">
                  Quality Assurance
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-500 hover:text-[#086384] transition-colors">
                  Hospital Bylaws
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white rounded-lg border border-slate-100 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">Helpline Numbers</p>
              <p>Emergency: +91 (033) 4050 6070</p>
              <p>OPD Booking: +91 33 4567 8900</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/60 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {currentYear} Narayan Memorial Hospital. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Built with dedication <Heart className="h-3.5 w-3.5 text-rose-500 mx-1 fill-rose-500" /> for perfect health solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
