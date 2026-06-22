import { useState, useEffect, useRef } from 'react';
import { Menu, X, PlusSquare, ChevronDown, Search } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAppointmentModal: () => void;
  setSelectedDeptFromNav: (dept: any) => void;
  setSelectedDoctorFromNav: (doc: any) => void;
  setActiveInfoModal: (modal: string | null) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  openAppointmentModal,
  setSelectedDeptFromNav,
  setSelectedDoctorFromNav,
  setActiveInfoModal
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = (dropdownId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(dropdownId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    { type: 'doctor' | 'department'; name: string; item: any }[]
  >([]);

  const menuRef = useRef<HTMLDivElement>(null);

  const departmentColumns = [
    [
      { label: 'Anaesthesiology', id: 'anesthesiology' },
      { label: 'Cardiology', id: 'cardiology' },
      { label: 'Critical Care', id: 'critical-care' },
      { label: 'Dentistry', id: 'dentistry' },
      { label: 'Dermatology', id: 'dermatology' },
      { label: 'Endocrinology', id: 'endocrinology' },
    ],
    [
      { label: 'ENT', id: 'ent' },
      { label: 'Gastroenterology', id: 'gastroenterology' },
      { label: 'General Medicine', id: 'internal-medicine' },
      { label: 'Gynaecology', id: 'gynecology' },
      { label: 'Haematology', id: 'hematology' },
      { label: 'Interventional Cardiology', id: 'cardiology' },
    ],
    [
      { label: 'Nephrology', id: 'nephrology' },
      { label: 'Neurology', id: 'neurology' },
      { label: 'Opthalmology', id: 'ophthalmology' },
      { label: 'Orthopedics', id: 'orthopedics' },
      { label: 'Pathology', id: 'pathology' },
      { label: 'Pediatrics', id: 'pediatrics' },
    ],
    [
      { label: 'Plastic Surgery', id: 'plastic-surgery' },
      { label: 'Psychiatry', id: 'psychiatry' },
      { label: 'Pulmonology', id: 'pulmonology' },
      { label: 'Radiology', id: 'radiology' },
      { label: 'Urology', id: 'urology' },
    ],
  ];

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matches: typeof searchResults = [];

    DOCTORS.forEach((doc) => {
      if (
        doc.name.toLowerCase().includes(q) ||
        doc.role.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'doctor', name: doc.name, item: doc });
      }
    });

    DEPARTMENTS.forEach((dept) => {
      if (
        dept.name.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'department', name: dept.name, item: dept });
      }
    });

    setSearchResults(matches.slice(0, 7));
  }, [searchQuery]);

  const handleDepartmentSelect = (deptId: string) => {
    const dept = DEPARTMENTS.find((d) => d.id === deptId);
    if (dept) {
      setSelectedDeptFromNav(dept);
      setCurrentTab('departments');
    } else {
      setCurrentTab('departments');
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const handleDoctorSelect = (doc: any) => {
    setSelectedDoctorFromNav(doc);
    setCurrentTab('doctors');
    setSearchQuery('');
    setIsOpen(false);
  };

  /* ─── shared nav button class helpers ─── */
  const navBtn = (id: string) =>
    `flex items-center gap-1 text-[12.5px] px-2.5 py-1.5 rounded-lg cursor-pointer border-none outline-none transition-all duration-150 whitespace-nowrap font-medium ${
      currentTab === id || activeDropdown === id
        ? 'text-[#086384] bg-[#086384]/10'
        : 'text-slate-600 hover:text-[#086384] hover:bg-[#086384]/8 bg-transparent'
    }`;

  const dropdownPanel =
    'absolute top-full pt-2 z-50 animate-fadeIn';

  return (
    <nav className="relative z-50 select-none bg-white border-b border-slate-200/80 font-sans shadow-sm">

      {/* ═══════════════════════════════════════════
          DESKTOP NAVBAR — single 56px row
      ═══════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center h-14 px-5 max-w-screen-2xl mx-auto gap-0">

        {/* ── Logo ── */}
        <div
          onClick={() => { setCurrentTab('home'); setActiveDropdown(null); }}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0 mr-5"
        >
          <div className="bg-[#086384]/10 text-[#086384] p-2 rounded-lg transition-all duration-200 group-hover:bg-[#086384]/15">
            <PlusSquare className="h-5 w-5 stroke-2" />
          </div>
          <div className="leading-none">
            <p className="text-[14px] font-semibold text-slate-900 group-hover:text-[#086384] transition-colors tracking-tight">
              Narayan Memorial
            </p>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium mt-0.5">
              Hospital · Behala
            </p>
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div className="w-px h-7 bg-slate-200 flex-shrink-0 mr-5" />

        {/* ── Nav links (flex-1 so they fill available space) ── */}
        <div className="flex items-center gap-0.5 flex-1">

          {/* Home */}
          <button
            onClick={() => { setCurrentTab('home'); setActiveDropdown(null); }}
            className={navBtn('home')}
          >
            Home
          </button>

          {/* About NMH */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button className={navBtn('about')}>
              About NMH <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {activeDropdown === 'about' && (
              <div className={`${dropdownPanel} left-0 w-60`}>
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-0.5">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-2 pt-1 pb-0.5">
                    Our Group
                  </p>
                  {[
                    { label: 'About NMH', tab: 'about' },
                    { label: "Chairman's Message", tab: 'chairman' },
                    { label: "CEO's Message", tab: 'ceo' },
                    { label: 'Awards & Accolades', tab: 'awards' },
                  ].map(({ label, tab }) => (
                    <button
                      key={tab}
                      onClick={() => { setCurrentTab(tab); setActiveDropdown(null); }}
                      className="w-full text-left text-[12px] font-medium py-2 px-2.5 rounded-lg hover:bg-[#086384]/8 hover:text-[#086384] text-slate-700 transition-colors"
                    >
                      {label}
                    </button>
                  ))}

                  <div className="border-t border-slate-100 pt-1 mt-1 space-y-0.5">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-2 pt-0.5 pb-0.5">
                      Info & Media
                    </p>
                    {[
                      { label: 'News & Events', tab: 'news' },
                      { label: 'Gallery', tab: 'gallery' },
                      { label: 'Press Releases', tab: 'press' },
                    ].map(({ label, tab }) => (
                      <button
                        key={tab}
                        onClick={() => { setCurrentTab(tab); setActiveDropdown(null); }}
                        className="w-full text-left text-[12px] font-medium py-2 px-2.5 rounded-lg hover:bg-[#086384]/8 hover:text-[#086384] text-slate-700 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                    <button
                      onClick={() => { setCurrentTab('career'); setActiveDropdown(null); }}
                      className="w-full text-left text-[12px] font-semibold py-2 px-2.5 rounded-lg bg-[#086384]/8 hover:bg-[#086384]/14 text-[#086384] transition-colors"
                    >
                      Careers @ NMH
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => { setCurrentTab('waste'); setActiveDropdown(null); }}
                      className="w-full text-left text-[11px] font-medium py-1.5 px-2.5 rounded-lg hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition-colors"
                    >
                      Bio Medical Waste Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Departments — mega menu */}
          <div
            className="static"
            onMouseEnter={() => handleMouseEnter('departments')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => { setCurrentTab('departments'); setActiveDropdown(null); }}
              className={navBtn('departments')}
            >
              Departments <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {activeDropdown === 'departments' && (
              <div className="absolute left-0 right-0 top-full pt-1 max-w-screen-2xl mx-auto z-50 px-5 animate-fadeIn">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 grid grid-cols-4 gap-4">
                  {departmentColumns.map((col, idx) => (
                    <div
                      key={idx}
                      className="space-y-0.5 border-r border-slate-100 last:border-r-0 pr-4 last:pr-0"
                    >
                      {col.map((deptItem) => (
                        <button
                          key={deptItem.label}
                          onClick={() => handleDepartmentSelect(deptItem.id)}
                          className="w-full text-left text-[12px] font-medium py-1.5 px-2.5 rounded-lg text-slate-600 hover:bg-[#086384]/8 hover:text-[#086384] transition-colors truncate"
                        >
                          {deptItem.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Doctors */}
          <button
            onClick={() => { setCurrentTab('doctors'); setActiveDropdown(null); }}
            className={navBtn('doctors')}
          >
            Doctors
          </button>

          {/* Patient Corner */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('patientCorner')}
            onMouseLeave={handleMouseLeave}
          >
            <button className={navBtn('patientCorner')}>
              Patient Corner <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {activeDropdown === 'patientCorner' && (
              <div className={`${dropdownPanel} left-0 w-56`}>
                <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-0.5">
                  <button
                    onClick={() => { openAppointmentModal(); setActiveDropdown(null); }}
                    className="w-full text-left text-[12px] font-semibold py-2.5 px-3 rounded-lg bg-[#086384] hover:bg-[#086384]/90 text-white transition-colors"
                  >
                    Request an Appointment
                  </button>
                  <div className="pt-1 space-y-0.5">
                    {[
                      { label: 'Health Check-Up Packages', tab: 'services' },
                      { label: "Patient's Guide", tab: 'guide' },
                      { label: 'Insurance Partners', tab: 'insurance' },
                      { label: 'Corporate Tie-Ups', tab: 'corporates' },
                    ].map(({ label, tab }) => (
                      <button
                        key={tab}
                        onClick={() => { setCurrentTab(tab); setActiveDropdown(null); }}
                        className="w-full text-left text-[12px] font-medium py-2 px-2.5 rounded-lg hover:bg-[#086384]/8 hover:text-[#086384] text-slate-700 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <button
            onClick={() => { setCurrentTab('contact'); setActiveDropdown(null); }}
            className={navBtn('contact')}
          >
            Contact
          </button>

          {/* FAQs */}
          <button
            onClick={() => { setCurrentTab('faqs'); setActiveDropdown(null); }}
            className={navBtn('faqs')}
          >
            FAQs
          </button>

          {/* Testimonials */}
          <button
            onClick={() => { setCurrentTab('testimonials'); setActiveDropdown(null); }}
            className={navBtn('testimonials')}
          >
            Testimonials
          </button>
        </div>

        {/* ── Right side: Search + CTA (inline, same row) ── */}
        <div className="flex items-center gap-2.5 flex-shrink-0 ml-4">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-[12px] font-medium bg-slate-50 border border-slate-200 rounded-lg h-8 pl-8 pr-3 w-36 focus:w-44 focus:outline-none focus:ring-2 focus:ring-[#086384]/30 focus:border-[#086384]/40 placeholder-slate-400 text-slate-800 transition-all duration-200"
            />

            {/* Search suggestions */}
            {searchResults.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-2 space-y-0.5 animate-fadeIn">
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider px-2.5 py-1">
                  Instant Results
                </p>
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (res.type === 'doctor') {
                        handleDoctorSelect(res.item);
                      } else {
                        setSelectedDeptFromNav(res.item);
                        setCurrentTab('departments');
                      }
                      setSearchQuery('');
                    }}
                    className="w-full text-left text-[11.5px] py-2 px-2.5 rounded-lg hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-700 block truncate">{res.name}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{res.type} match</span>
                    </div>
                    <span className="text-[#086384] text-[11px] font-semibold">view →</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* OPD Appointment CTA */}
          <button
            onClick={openAppointmentModal}
            className="h-8 px-4 bg-[#086384] hover:bg-[#086384]/90 active:bg-[#086384]/80 text-white text-[12px] font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap flex-shrink-0"
          >
            Book Appointment
          </button>
        </div>
      </div>


      {/* ═══════════════════════════════════════════
          MOBILE NAVBAR
      ═══════════════════════════════════════════ */}
      <div className="lg:hidden flex items-center justify-between h-14 px-4 bg-white">

        {/* Mobile Logo */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-[#086384]/10 text-[#086384] p-1.5 rounded-lg">
            <PlusSquare className="h-4.5 w-4.5 stroke-2" />
          </div>
          <div className="leading-none">
            <p className="text-[13px] font-semibold text-slate-900 tracking-tight">Narayan Memorial</p>
            <p className="text-[9px] text-slate-400 tracking-widest uppercase font-medium">Hospital · Behala</p>
          </div>
        </div>

        {/* Mobile right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={openAppointmentModal}
            className="bg-[#086384] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg"
          >
            Appointment
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>


      {/* ═══════════════════════════════════════════
          MOBILE MENU PANEL
      ═══════════════════════════════════════════ */}
      {isOpen && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-14 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-40 max-h-[80vh] overflow-y-auto"
        >
          {/* Mobile search */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search physicians or divisions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-[12px] font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#086384]/25"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="mt-2 bg-slate-50 border border-slate-100 p-1.5 rounded-xl space-y-0.5">
                {searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (res.type === 'doctor') {
                        handleDoctorSelect(res.item);
                      } else {
                        setSelectedDeptFromNav(res.item);
                        setCurrentTab('departments');
                      }
                      setSearchQuery('');
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-[12px] py-2 px-2.5 rounded-lg hover:bg-slate-200 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-700 block truncate">{res.name}</span>
                      <span className="text-[10px] text-[#086384] capitalize">{res.type} match</span>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 py-3 space-y-0.5">

            <button
              onClick={() => { setCurrentTab('home'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Home
            </button>

            {/* About section */}
            <div className="pt-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 pb-1">
                About Us
              </p>
              {[
                { label: 'About NMH', tab: 'about' },
                { label: "Chairman's Message", tab: 'chairman' },
                { label: "CEO's Message", tab: 'ceo' },
                { label: 'Awards & Accolades', tab: 'awards' },
                { label: 'Bio Medical Waste Report', tab: 'waste' },
              ].map(({ label, tab }) => (
                <button
                  key={tab}
                  onClick={() => { setCurrentTab(tab); setIsOpen(false); }}
                  className="w-full text-left text-[12.5px] font-medium py-2 px-5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setCurrentTab('departments'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Departments
            </button>

            <button
              onClick={() => { setCurrentTab('doctors'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Doctors
            </button>

            {/* Patient Corner section */}
            <div className="pt-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 pb-1">
                Patient Corner
              </p>
              <button
                onClick={() => { openAppointmentModal(); setIsOpen(false); }}
                className="w-full text-left text-[12.5px] font-semibold py-2 px-5 hover:bg-[#086384]/8 rounded-lg text-[#086384] transition-colors"
              >
                Request an Appointment
              </button>
              {[
                { label: 'Health Check-Up Packages', tab: 'services' },
                { label: "Patient's Guide", tab: 'guide' },
                { label: 'Insurance Partners', tab: 'insurance' },
                { label: 'Corporate Tie-Ups', tab: 'corporates' },
              ].map(({ label, tab }) => (
                <button
                  key={tab}
                  onClick={() => { setCurrentTab(tab); setIsOpen(false); }}
                  className="w-full text-left text-[12.5px] font-medium py-2 px-5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Media section */}
            <div className="pt-2">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 pb-1">
                Media
              </p>
              {[
                { label: 'News & Events', tab: 'news' },
                { label: 'Gallery', tab: 'gallery' },
                { label: 'Press Releases', tab: 'press' },
              ].map(({ label, tab }) => (
                <button
                  key={tab}
                  onClick={() => { setCurrentTab(tab); setIsOpen(false); }}
                  className="w-full text-left text-[12.5px] font-medium py-2 px-5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={() => { setCurrentTab('contact'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Contact Us
            </button>

            <button
              onClick={() => { setCurrentTab('faqs'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              FAQs
            </button>

            <button
              onClick={() => { setCurrentTab('testimonials'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Testimonials
            </button>

            <button
              onClick={() => { setCurrentTab('career'); setIsOpen(false); }}
              className="w-full text-left font-semibold text-[13px] py-2.5 px-3 hover:bg-slate-50 rounded-lg text-slate-800 transition-colors"
            >
              Career / Join NMH
            </button>

          </div>
        </div>
      )}

    </nav>
  );
}