import React, { useState, useEffect, useRef } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Calendar, 
  User, 
  MessageSquare, 
  Award, 
  Activity,
  Heart,
  UserPlus
} from 'lucide-react';
import gsap from 'gsap';

interface Testimonial {
  id: string;
  name: string;
  age: number;
  condition: string;
  department: string;
  doctor: string;
  story: string;
  quote: string;
  image: string;
  rating: number;
  date: string;
}

export default function TestimonialsTab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newStory, setNewStory] = useState({
    name: '',
    age: '',
    condition: '',
    department: 'Cardiology',
    doctor: '',
    quote: '',
    story: '',
    rating: 5
  });

  const carouselRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const initialTestimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      name: 'Aditya Sen',
      age: 52,
      condition: 'Successful Angioplasty & Pacemaker Implant',
      department: 'Cardiology',
      doctor: 'Dr. S. K. Sarkar',
      quote: 'Narayan Memorial gave me a second chance at life. The cardiac care is absolute world-class.',
      story: 'I was rushed to the emergency room with severe chest pain. Within minutes, the diagnostic team and cardiology surgeons diagnosed a critical blockage and performed an emergency angioplasty. The level of speed, precision, and human-centric care I received made all the difference.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: 'May 12, 2026'
    },
    {
      id: 'testimonial-2',
      name: 'Priyanka Banerjee',
      age: 34,
      condition: 'Complex Brain Tumor Resection',
      department: 'Neurology',
      doctor: 'Dr. Amitabha Ghosh',
      quote: 'The surgical precision paired with neuro-rehab guided me beautifully back to my normal routine.',
      story: 'Dealing with a neurological diagnosis was terrifying. Dr. Ghosh explained the surgical strategy clearly, answering every query. The high-precision neurosurgery and dedicated post-operative care in the Level 3 suites ensured a complete recovery without any neurological deficit.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: 'April 28, 2026'
    },
    {
      id: 'testimonial-3',
      name: 'Rajinder Singh',
      age: 64,
      condition: 'Double Total Knee Replacement',
      department: 'Orthopedics',
      doctor: 'Dr. Joydeep Banerjee Chowdhury',
      quote: 'Walking pain-free after five years feels like a miracle. Seamless joint replacement programs!',
      story: 'I was unable to walk even 100 meters due to severe osteoarthritis. The surgical team operated on both my knees. The personalized physiotherapy and active rehabilitation support in the hospital started the very next day. I am now walking independently.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: 'June 02, 2026'
    },
    {
      id: 'testimonial-4',
      name: 'Meenakshi Dutta',
      age: 41,
      condition: 'Complicated Laparoscopic Hysterectomy',
      department: 'Gynecology',
      doctor: 'Dr. Runa Bal',
      quote: 'Minimum pain and very rapid recovery. Their team treated me with extreme warmth and respect.',
      story: 'I underwent a complex laparoscopic gynecological procedure. The recovery team was attentive, managing my pain protocols perfectly and getting me discharged within 48 hours. I appreciate the stellar clinical standard and personal care.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: 'May 18, 2026'
    },
    {
      id: 'testimonial-5',
      name: 'Subhasish Chakraborty',
      age: 47,
      condition: 'Advanced Oncological Chemotherapy Cycle',
      department: 'Oncology',
      doctor: 'Dr. Chanchal Goswami',
      quote: 'The holistic support at NMH tumor board helped me fight with immense hope and energy.',
      story: 'Facing cancer is as much of a mental battle as physical. The medical oncology division coupled high-speed diagnostic monitoring with extremely targeted chemotherapy. The support coaches, clinical dietitians, and tumor specialist nurses guided us like family.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      rating: 5,
      date: 'March 15, 2026'
    }
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const filteredTestimonials = testimonials.filter(
    item => filterDepartment === 'all' || item.department === filterDepartment
  );

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, filteredTestimonials.length]);

  // Reset active index if testimonials list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filterDepartment]);

  // Entrance and switch transitions with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Carousel transitions
      gsap.fromTo('.testimonial-fade-item', 
        { opacity: 0, scale: 0.98, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, carouselRef);
    return () => ctx.revert();
  }, [activeIndex, filterDepartment]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General stats rise
      gsap.fromTo('.stat-box',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }, statsRef);
    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    setIsPlaying(false);
    if (filteredTestimonials.length > 0) {
      setActiveIndex(prev => (prev + 1) % filteredTestimonials.length);
    }
  };

  const handlePrev = () => {
    setIsPlaying(false);
    if (filteredTestimonials.length > 0) {
      setActiveIndex(prev => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
    }
  };

  const departments = ['all', 'Cardiology', 'Neurology', 'Orthopedics', 'Gynecology', 'Oncology'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.name || !newStory.quote || !newStory.story) return;

    const submittedTestimonial: Testimonial = {
      id: `custom-${Date.now()}`,
      name: newStory.name,
      age: parseInt(newStory.age) || 45,
      condition: newStory.condition || 'General Well-being Treatment',
      department: newStory.department,
      doctor: newStory.doctor || 'Senior Hospital Consultant',
      quote: newStory.quote,
      story: newStory.story,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200', // standard profile placeholder
      rating: newStory.rating,
      date: 'Just Now'
    };

    setTestimonials(prev => [submittedTestimonial, ...prev]);
    setFormSubmitted(true);
    setNewStory({
      name: '',
      age: '',
      condition: '',
      department: 'Cardiology',
      doctor: '',
      quote: '',
      story: '',
      rating: 5
    });

    // Reset notification after 4 seconds
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const currentTestimonial = filteredTestimonials[activeIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 relative z-10 space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-550/10 rounded-full border border-emerald-550/15">
          <Award className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider">Patient Success Stories</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f3a4b]">
          Healing Journeys & Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          At Narayan Memorial Hospital, your recovery is our ultimate credential. Read genuine accounts of patients who overcame complex medical challenges with the support of our dedicated clinical team.
        </p>
      </div>

      {/* Trust Statistics Row */}
      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div id="stat-1" className="stat-box bg-white/50 backdrop-blur-md border border-white/80 p-5 rounded-2xl text-center shadow-3xs space-y-1">
          <Heart className="h-5 w-5 text-[#086384] mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-[#0f3a4b]">99.2%</div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patient Satisfaction</p>
        </div>
        <div id="stat-2" className="stat-box bg-white/50 backdrop-blur-md border border-white/80 p-5 rounded-2xl text-center shadow-3xs space-y-1">
          <Activity className="h-5 w-5 text-emerald-600 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-[#0f3a4b]">12,500+</div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Successful Surgeries</p>
        </div>
        <div id="stat-3" className="stat-box bg-white/50 backdrop-blur-md border border-white/80 p-5 rounded-2xl text-center shadow-3xs space-y-1">
          <Award className="h-5 w-5 text-amber-500 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-[#0f3a4b]">4.9 / 5</div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Google Rating Score</p>
        </div>
        <div id="stat-4" className="stat-box bg-white/50 backdrop-blur-md border border-white/80 p-5 rounded-2xl text-center shadow-3xs space-y-1">
          <User className="h-5 w-5 text-sky-600 mx-auto" />
          <div className="text-xl sm:text-2xl font-black text-[#0f3a4b]">24/7</div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dedicated Nursing</p>
        </div>
      </div>

      {/* Filtering Pills */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-lg mx-auto">
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setFilterDepartment(dept)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
              filterDepartment === dept
                ? 'bg-[#086384] text-white shadow-3xs'
                : 'bg-white/40 text-slate-600 hover:bg-white/70 border border-white/60'
            }`}
          >
            {dept === 'all' ? 'All Specialties' : dept}
          </button>
        ))}
      </div>

      {/* Main Glassmorphic Carousel Card */}
      <div 
        ref={carouselRef} 
        id="testimonial-carousel"
        className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-white/80 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
      >
        {/* Subtle decorative background light orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

        {currentTestimonial ? (
          <div className="testimonial-fade-item space-y-6 sm:space-y-8 relative z-10">
            {/* Top Row: Quotes symbol & Patient Meta */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-800">{currentTestimonial.name}</h3>
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                    <span>Age: {currentTestimonial.age}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="bg-[#086384]/10 text-[#086384] px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide">
                      {currentTestimonial.department}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Star Group */}
              <div className="flex flex-col items-center sm:items-end gap-1 shrink-0">
                <div className="flex gap-0.5">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>{currentTestimonial.date}</span>
                </div>
              </div>
            </div>

            {/* Middle Block: Testimonial Highlight and Detailed Story */}
            <div className="space-y-4">
              <div className="relative">
                <Quote className="absolute -top-3.5 -left-3.5 h-8 w-8 text-[#086384]/10 pointer-events-none" />
                <h4 className="text-sm sm:text-base font-bold text-slate-800 italic leading-relaxed pl-5">
                  "{currentTestimonial.quote}"
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-5">
                {currentTestimonial.story}
              </p>
            </div>

            {/* Bottom Row: Doctor Credit & Navigation Buttons */}
            <div className="border-t border-slate-100/80 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold bg-[#086384]/5 py-1.5 px-3 rounded-xl border border-[#086384]/10">
                <span className="text-[#086384]">Attending Expert:</span>
                <span className="text-slate-700">{currentTestimonial.doctor}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="bg-white/85 hover:bg-white border border-slate-200/80 p-2 rounded-xl text-slate-600 hover:text-[#086384] transition active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {/* Manual indices */}
                <div className="flex gap-1.5 px-2">
                  {filteredTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsPlaying(false);
                        setActiveIndex(idx);
                      }}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        idx === activeIndex ? 'w-5 bg-[#086384]' : 'w-2 bg-slate-300/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="bg-white/85 hover:bg-white border border-slate-200/80 p-2 rounded-xl text-slate-600 hover:text-[#086384] transition active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xs text-slate-500 font-bold">No patient stories found in this specialty category.</p>
          </div>
        )}
      </div>

      {/* Auto-Play Control Button */}
      {filteredTestimonials.length > 1 && (
        <div className="text-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[10px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full bg-white/40 border border-white/80 text-slate-500 hover:bg-white/70 hover:text-[#086384] transition cursor-pointer"
          >
            Autoplay Carousel: <span className="font-extrabold text-[#0c7297]">{isPlaying ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      )}

      {/* Share Your Own Healing Story Form Block with glassmorphic layout */}
      <div id="share-testimonial-form" className="max-w-3xl mx-auto bg-white/40 backdrop-blur-md border border-white/85 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#086384]/10 text-[#086384] p-2.5 rounded-xl">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#0f3a4b]">Share Your Hospital Healing Story</h3>
            <p className="text-xs text-slate-500">Your experiences can empower, comfort, and guide other patients on their path to recovery.</p>
          </div>
        </div>

        {formSubmitted && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs sm:text-sm font-bold text-center">
            🎉 Thank you so much! Your testimonial has been successfully submitted and appended to the patient carousel board.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 block uppercase">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sen"
                value={newStory.name}
                onChange={e => setNewStory({ ...newStory, name: e.target.value })}
                className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 block uppercase">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 45"
                  value={newStory.age}
                  onChange={e => setNewStory({ ...newStory, age: e.target.value })}
                  className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-600 block uppercase">Score rating</label>
                <select
                  value={newStory.rating}
                  onChange={e => setNewStory({ ...newStory, rating: parseInt(e.target.value) })}
                  className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-2 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs cursor-pointer"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 block uppercase">Medical Condition Treated *</label>
              <input
                type="text"
                required
                placeholder="e.g. Heart surgery / Cataract"
                value={newStory.condition}
                onChange={e => setNewStory({ ...newStory, condition: e.target.value })}
                className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 block uppercase">Medical Department *</label>
              <select
                value={newStory.department}
                onChange={e => setNewStory({ ...newStory, department: e.target.value })}
                className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs cursor-pointer"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Oncology">Oncology</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 block uppercase">Consulting Doctor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Amitabha Ghosh"
                value={newStory.doctor}
                onChange={e => setNewStory({ ...newStory, doctor: e.target.value })}
                className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 block uppercase">One-Sentence Experience Quote *</label>
            <input
              type="text"
              required
              placeholder="e.g. The nurses and medical setup was absolutely comforting!"
              value={newStory.quote}
              onChange={e => setNewStory({ ...newStory, quote: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 block uppercase">Your Full Healing Story *</label>
            <textarea
              required
              rows={4}
              placeholder="Please describe how our clinical skills, facilities, or nursing care helped support your medical journey..."
              value={newStory.story}
              onChange={e => setNewStory({ ...newStory, story: e.target.value })}
              className="w-full bg-white/60 border border-slate-200/60 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#086384] outline-hidden shadow-3xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#086384] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-xs hover:bg-[#0c7297] transition cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <UserPlus className="h-4 w-4" />
            <span>Submit Story onto Carousel</span>
          </button>
        </form>
      </div>

    </div>
  );
}
