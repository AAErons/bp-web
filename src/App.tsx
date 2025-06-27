import './index.css';
import { useRef, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import { GalleryProvider, useGallery } from './contexts/GalleryContext';
import { TeamProvider, useTeam } from './contexts/TeamContext';
import { AboutProvider, useAbout } from './contexts/AboutContext';
import { TestimonialsProvider, useTestimonials } from './contexts/TestimonialsContext';
import { PartnersProvider, usePartners } from './contexts/PartnersContext';
import { PiedavajumsProvider, usePiedavajums } from './contexts/PiedavajumsContext';
import AdminLogin from './pages/AdminLogin';
import GalleryManagement from './pages/GalleryManagement';
import GalleryView from './components/GalleryView';
import bpLogo from './assets/bp_logo.png';
import heroBg from './assets/title.jpg';

// Define TeamMember type
interface TeamMember {
  name: string;
  description: string;
  smallImage: string;
  fullImage: string;
}

// Use Vite environment variables for Cloudinary config
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
// Make sure to add VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset to your .env file
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function UnderConstruction() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-green-500">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-amber-600 mb-4 flex items-center gap-2">
          <span role="img" aria-label="construction">🚧</span>
          Under Construction
          <span role="img" aria-label="construction">🚧</span>
        </h1>
        <div className="text-center text-gray-700 mb-2">Iegriezies vēlāk!</div>
        <div className="text-center text-gray-700 mb-4">Mēs cepjam augšā ko jaudīgu!</div>
        <div className="text-7xl animate-bounce">👨‍🍳</div>
      </div>
    </div>
  );
}

function Navigation({ activeSection, onMenuClick, location }: { 
  activeSection: string; 
  onMenuClick: (section: string) => void;
  location: any;
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Determine active state based on both activeSection and location
  const getActiveState = (section: string) => {
    // For main page sections
    if (location.pathname === '/demo') {
      return activeSection === section;
    }
    // For galerija and piedavajums pages
    if (location.pathname === '/demo/galerija') {
      return section === 'galerija';
    }
    if (location.pathname === '/demo/piedavajums') {
      return section === 'piedavajums';
    }
    return false;
  };

  const activeClass = "text-[#CCB399] font-bold text-lg";
  const inactiveClass = "text-white";

  // Handle BP logo click
  const handleLogoClick = () => {
    if (location.pathname === '/demo') {
      // If already on /demo, scroll to hero
      onMenuClick('hero');
    } else {
      // If not, navigate to /demo#hero
      navigate('/demo#hero');
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white flex items-center justify-between px-4 h-16">
        <div 
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={bpLogo} alt="BP Logo" className="h-12 w-auto" />
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-black border border-white rounded-lg"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`md:hidden fixed top-16 left-0 w-full z-40 bg-black border-b border-white transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <ul className="flex flex-col w-full">
          <li className={`text-center py-4 border-b border-white cursor-pointer hover:bg-gray-900 ${getActiveState('about') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('about')}>KOMANDA</li>
          <li className={`text-center py-4 border-b border-white cursor-pointer hover:bg-gray-900 ${getActiveState('piedavajums') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('piedavajums')}>PIEDĀVĀJUMS</li>
          <li className={`text-center py-4 border-b border-white cursor-pointer hover:bg-gray-900 ${getActiveState('galerija') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('galerija')}>GALERIJA</li>
          <li className={`text-center py-4 cursor-pointer hover:bg-gray-900 ${getActiveState('atsauksmes') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('atsauksmes')}>ATSAUKSMES</li>
        </ul>
      </nav>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-black border-b border-white justify-center px-4 md:px-8 h-20">
        <ul className="flex w-full max-w-screen-2xl h-full items-center">
          <li className={`flex-1 text-center py-4 border-r border-white cursor-pointer hover:opacity-80 transition-opacity ${getActiveState('hero') ? activeClass : inactiveClass}`} onClick={handleLogoClick}>
            <img src={bpLogo} alt="BP Logo" className="h-12 w-auto mx-auto" />
          </li>
          <li className={`flex-1 text-center py-4 border-r border-white cursor-pointer hover:opacity-80 transition-opacity ${getActiveState('about') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('about')}>KOMANDA</li>
          <li className={`flex-1 text-center py-4 border-r border-white cursor-pointer hover:opacity-80 transition-opacity ${getActiveState('piedavajums') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('piedavajums')}>PIEDĀVĀJUMS</li>
          <li className={`flex-1 text-center py-4 border-r border-white cursor-pointer hover:opacity-80 transition-opacity ${getActiveState('galerija') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('galerija')}>GALERIJA</li>
          <li className={`flex-1 text-center py-4 cursor-pointer hover:opacity-80 transition-opacity ${getActiveState('atsauksmes') ? activeClass : inactiveClass}`} onClick={() => onMenuClick('atsauksmes')}>ATSAUKSMES</li>
        </ul>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="w-full text-center py-6 text-white text-sm border-t border-white bg-black">
      © {new Date().getFullYear()} Brīvrunu Projekts. All rights reserved.
    </footer>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');
  const { isLoading } = useGallery();
  const { teamMembers, isLoading: isLoadingTeamMembers } = useTeam();
  const { aboutText, isLoading: isLoadingAboutText } = useAbout();
  const { testimonials } = useTestimonials();
  const { partners } = usePartners();
  const { isLoading: isLoadingPiedavajums } = usePiedavajums();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    atsauksmes: useRef<HTMLDivElement>(null)
  };

  // Explicit usage to satisfy TypeScript
  if (false) {
    console.log(selectedMember, setSelectedMember, isModalOpen, setIsModalOpen, sectionRefs);
  }

  // Handle menu clicks
  const handleMenuClick = (section: string) => {
    if (section === 'galerija' || section === 'piedavajums') {
      navigate(`/demo/${section}`);
      return;
    }

    setActiveSection(section);
    const element = sectionRefs[section as keyof typeof sectionRefs]?.current;
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  // Handle hash changes and scroll position
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sectionRefs[hash as keyof typeof sectionRefs]) {
        setActiveSection(hash);
        handleMenuClick(hash);
      }
    };

    const handleScroll = () => {
      // Find which section is currently in view
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const { top, bottom } = ref.current.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes and scroll
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading || isLoadingTeamMembers || isLoadingAboutText || isLoadingPiedavajums) {
    return (
      <div className="w-full min-h-screen bg-[#FAF8F8] text-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CCB399]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-black flex flex-col">
      <Navigation activeSection={activeSection} onMenuClick={handleMenuClick} location={location} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section ref={sectionRefs.hero} className="relative w-full flex flex-col pt-16 md:pt-20">
          <div className="relative w-full">
            <div className="relative">
              <img
                src={heroBg}
                alt="Brīvrunu Projekts"
                className="w-full max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] h-auto object-contain object-top"
                style={{ display: 'block' }}
              />
              <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center md:mb-12 z-10 px-4">
                <div className="bg-black/70 px-2 md:px-4 py-1 md:py-2 flex flex-col items-center">
                  <h1 
                    className="font-extrabold uppercase text-white text-center text-2xl md:text-6xl lg:text-7xl tracking-tight"
                    style={{
                      lineHeight: '1.1',
                      letterSpacing: '-0.03em',
                      wordSpacing: '0.2em'
                    }}
                  >
                    TAS IR BRĪVRUNU KAS?
                  </h1>
                  <span
                    className="block mt-1 md:mt-2"
                  >
                    <span
                      className="inline-block border border-white px-3 py-1 text-white text-sm md:text-xl lg:text-2xl font-semibold uppercase tracking-wider cursor-pointer transition-colors duration-200 hover:text-[#CCB399] hover:border-[#CCB399] bg-transparent"
                      onClick={() => navigate('/demo/piedavajums')}
                    >
                      UZZINĀT VAIRĀK
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} className="min-h-screen py-20">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed font-bold">
              {aboutText}
            </div>
            
            {/* Team Members Grid */}
            <div className="w-full max-w-6xl">
              {teamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">No team members available</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
                  {teamMembers.map((member) => (
                    <div 
                      key={member._id}
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => handleMemberClick(member)}
                    >
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-3 overflow-hidden">
                        <img 
                          src={member.smallImage}
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-sm md:text-base text-center font-medium transition-colors duration-200 group-hover:font-bold group-hover:text-[#CCB399]">{member.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={sectionRefs.atsauksmes} className="min-h-screen py-20">
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">ATSAUKSMES</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Ko saka mūsu klienti par "Brīvrunu projektu"?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {testimonials.map((testimonial) => (
                  <div key={testimonial._id} className="bg-white border border-black p-6 md:p-8 relative">
                    <div className="absolute -top-4 left-6 bg-black text-white px-4 font-bold text-sm md:text-base">
                      {testimonial.company}
                    </div>
                    <div className="text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                      {testimonial.testimonial}
                    </div>
                    <div className="text-right font-medium">
                      — {testimonial.signature}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mb-16">
                <div className="font-bold text-sm md:text-base mb-6">MŪSU PARTNERI</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center items-center">
                  {partners.map((partner) => (
                    <div 
                      key={partner._id} 
                      className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-2 hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mb-16">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm md:text-base font-medium">Seko mums</span>
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-center gap-12 md:gap-16">
                  <a 
                    href="https://www.instagram.com/brivrunuprojekts/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#CCB399]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/BrivrunuProjekts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#CCB399]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@brivrunuprojekts8416" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#CCB399]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://open.spotify.com/artist/0bnglFd0oM0O6ZUChuwms2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#CCB399]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Team Member Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            {/* Left: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-full">
              <img 
                src={selectedMember.fullImage} 
                alt={selectedMember.name} 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Separator line - horizontal for mobile, vertical for desktop */}
            <div className="block md:hidden w-full h-px bg-black"></div>
            <div className="hidden md:block w-px bg-black"></div>
            {/* Right: Info */}
            <div className="flex-1 w-full min-w-[320px] md:min-w-[400px] bg-[#FFF7F3] flex flex-col justify-start p-6 md:p-12 relative overflow-y-auto max-h-[calc(90vh-12rem)] md:max-h-[90vh]">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-black pr-12">{selectedMember.name}</h2>
              <div className="border-t border-black mb-4 md:mb-6"></div>
              <div className="text-base md:text-2xl text-gray-700 leading-relaxed whitespace-pre-line pb-4">{selectedMember.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { galleries, isLoading } = useGallery();
  const [activeSection] = useState('galerija');

  const handleMenuClick = (section: string) => {
    if (section === 'galerija' || section === 'piedavajums') {
      navigate(`/demo/${section}`);
      return;
    }
    navigate(`/demo#${section}`);
  };

  return (
    <div className="w-full min-h-screen text-black flex flex-col">
      <Navigation activeSection={activeSection} onMenuClick={handleMenuClick} location={location} />
      <main className="flex-grow pt-20">
        <section className="min-h-screen py-20">
          <div className="w-full max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <GalleryView galleries={galleries} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PiedavajumsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection] = useState('piedavajums');
  const { piedavajumsSections, piedavajumsHeader, isLoading: isLoadingPiedavajums } = usePiedavajums();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/xgvyrvrw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _replyto: 'brivrunuprojekts@gmail.com',
          _subject: 'Jauns jautājums no BP mājaslapas',
        }),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const handleMenuClick = (section: string) => {
    if (section === 'galerija' || section === 'piedavajums') {
      navigate(`/demo/${section}`);
      return;
    }
    navigate(`/demo#${section}`);
  };

  if (isLoadingPiedavajums) {
    return (
      <div className="w-full min-h-screen bg-[#FAF8F8] text-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CCB399]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-black flex flex-col">
      <Navigation activeSection={activeSection} onMenuClick={handleMenuClick} location={location} />
      <main className="flex-grow pt-20">
        <section className="min-h-screen py-20">
          <div className="w-full max-w-4xl mx-auto mb-8 mt-4 px-4">
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-black mb-4">
              {piedavajumsHeader?.header || 'TAS IR "BRĪVRUNU PROJEKTS"!'}
            </h2>
            <div className="text-center text-base md:text-lg lg:text-xl leading-relaxed space-y-3">
              <p className="font-bold">
                {piedavajumsHeader?.introParagraph1 || 
                  'Mūsu arsenālā ir vairāk nekā 15 dažādas idejas, kā pāris minūtēs jūsu pasākums var iegūt unikālu skanējumu un radīt apmeklētājiem emocijas.'
                }
              </p>
              <p className="font-bold">
                {piedavajumsHeader?.introParagraph2 || 
                  'Mēs spējam gan izveidot notikumu no nulles, gan izcelt un paspilgtināt jūsu ideju vai stāstu. Tāpēc mūs atkārtoti aicina uzstāties pilsētas svētkos, korporatīvās ballēs, festivālos un citos notikumos, jo katra performance ir vienreizēja un unikāla.'
                }
              </p>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto space-y-16 px-4">
            {piedavajumsSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No piedavajums sections available</div>
              </div>
            ) : (
              piedavajumsSections.map((section, index) => (
                <div 
                  key={section._id} 
                  className={`flex flex-col md:flex-row gap-8 items-start ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' }}>
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div>
                      <div className="inline-block bg-black text-white px-3 py-2">
                        <h3 className="text-xl md:text-2xl font-bold">{section.title}</h3>
                      </div>
                      {section.duration && (
                        <div className="text-base md:text-lg font-medium text-gray-700 mt-2">{section.duration}</div>
                      )}
                    </div>
                    <p className="text-base md:text-lg leading-relaxed">
                      {section.description}
                    </p>
                    {section.additionalTitle && section.additionalDescription && (
                      <div>
                        <h4 className="font-bold text-sm md:text-base mb-1">{section.additionalTitle}</h4>
                        <p className="text-sm md:text-base leading-relaxed">
                          {section.additionalDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-2xl mx-auto mt-16 mb-8 px-4">
            <div className="border-t border-black pt-8">
              <h3 className="text-center text-lg md:text-xl font-bold mb-6">Sazinieties ar mums!</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Vārds, Uzvārds *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Ievadiet savu vārdu"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-pasts *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Ievadiet savu e-pastu"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Tālrunis *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Ievadiet savu tālruni"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Jūsu jautājums
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Rakstiet savu jautājumu šeit..."
                  ></textarea>
                </div>
                <div className="text-center space-y-4">
                  {formStatus === 'success' && (
                    <p className="text-green-600">Paldies! Jūsu ziņojums ir nosūtīts.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-600">Kļūda! Lūdzu, mēģiniet vēlreiz.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`px-8 py-3 bg-black text-white font-medium transition-colors duration-200 ${
                      formStatus === 'sending' 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    {formStatus === 'sending' ? 'Sūta...' : 'Nosūtīt'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Overlay for subtlety */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: 'rgba(255,255,255,0.85)' }} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function ContentManagement() {
  const navigate = useNavigate();
  const { logout } = useAdmin();
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, isLoading: isLoadingTeamMembers } = useTeam();
  const { aboutText, updateAboutText } = useAbout();
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const { partners, addPartner, updatePartner, deletePartner } = usePartners();
  const { piedavajumsSections, piedavajumsHeader, addPiedavajumsSection, updatePiedavajumsSection, deletePiedavajumsSection, updatePiedavajumsHeader, movePiedavajumsSection, isLoading: isLoadingPiedavajums } = usePiedavajums();
  const [activeTab, setActiveTab] = useState('team');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
  const [localAboutText, setLocalAboutText] = useState(aboutText);
  const [localPiedavajumsHeader, setLocalPiedavajumsHeader] = useState(piedavajumsHeader?.header || 'TAS IR "BRĪVRUNU PROJEKTS"!');
  const [localPiedavajumsIntro, setLocalPiedavajumsIntro] = useState([
    piedavajumsHeader?.introParagraph1 || 'Mūsu arsenālā ir vairāk nekā 15 dažādas idejas, kā pāris minūtēs jūsu pasākums var iegūt unikālu skanējumu un radīt apmeklētājiem emocijas.',
    piedavajumsHeader?.introParagraph2 || 'Mēs spējam gan izveidot notikumu no nulles, gan izcelt un paspilgtināt jūsu ideju vai stāstu. Tāpēc mūs atkārtoti aicina uzstāties pilsētas svētkos, korporatīvās ballēs, festivālos un citos notikumos, jo katra performance ir vienreizēja un unikāla.'
  ]);
  const [isReordering, setIsReordering] = useState(false);

  // Update local state when context changes
  useEffect(() => {
    setLocalAboutText(aboutText);
  }, [aboutText]);

  useEffect(() => {
    setLocalPiedavajumsHeader(piedavajumsHeader?.header || 'TAS IR "BRĪVRUNU PROJEKTS"!');
    setLocalPiedavajumsIntro([
      piedavajumsHeader?.introParagraph1 || 'Mūsu arsenālā ir vairāk nekā 15 dažādas idejas, kā pāris minūtēs jūsu pasākums var iegūt unikālu skanējumu un radīt apmeklētājiem emocijas.',
      piedavajumsHeader?.introParagraph2 || 'Mēs spējam gan izveidot notikumu no nulles, gan izcelt un paspilgtināt jūsu ideju vai stāstu. Tāpēc mūs atkārtoti aicina uzstāties pilsētas svētkos, korporatīvās ballēs, festivālos un citos notikumos, jo katra performance ir vienreizēja un unikāla.'
    ]);
  }, [piedavajumsHeader]);

  // Team Member Form State
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [teamMemberForm, setTeamMemberForm] = useState({
    name: '',
    description: '',
    smallImage: '',
    fullImage: ''
  });
  const [selectedSmallImage, setSelectedSmallImage] = useState<File | null>(null);
  const [selectedFullImage, setSelectedFullImage] = useState<File | null>(null);
  const smallImageInputRef = useRef<HTMLInputElement>(null);
  const fullImageInputRef = useRef<HTMLInputElement>(null);

  // Testimonials State
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    company: '',
    testimonial: '',
    signature: ''
  });

  // Partners State
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<string | null>(null);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    logo: ''
  });
  const [selectedPartnerLogo, setSelectedPartnerLogo] = useState<File | null>(null);
  const partnerLogoInputRef = useRef<HTMLInputElement>(null);

  // Piedavajums Form State
  const [showPiedavajumsForm, setShowPiedavajumsForm] = useState(false);
  const [editingPiedavajums, setEditingPiedavajums] = useState<string | null>(null);
  const [piedavajumsForm, setPiedavajumsForm] = useState({
    title: '',
    duration: '',
    description: '',
    additionalTitle: '',
    additionalDescription: '',
    image: ''
  });
  const [selectedPiedavajumsImage, setSelectedPiedavajumsImage] = useState<File | null>(null);
  const piedavajumsImageInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return `${file.name} is not an image file`;
    }
    if (file.size > 10 * 1024 * 1024) {
      return `${file.name} is too large. Maximum size is 10MB`;
    }
    return null;
  };

  // Replace uploadImage with direct-to-Cloudinary logic
  const uploadImage = async (file: File): Promise<string> => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error?.message || `Failed to upload ${file.name}: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else if (data.url) {
      return data.url;
    } else {
      throw new Error('Invalid response from Cloudinary');
    }
  };

  const handleSave = async (section: string) => {
    if (section === 'About text') {
      try {
        setIsSubmitting(true);
        await updateAboutText(localAboutText);
        alert('About text saved successfully!');
      } catch (error) {
        console.error('Error saving about text:', error);
        alert('Failed to save about text');
      } finally {
        setIsSubmitting(false);
      }
    } else if (section === 'Piedavajums header and intro') {
      try {
        setIsSubmitting(true);
        await updatePiedavajumsHeader({
          header: localPiedavajumsHeader,
          introParagraph1: localPiedavajumsIntro[0],
          introParagraph2: localPiedavajumsIntro[1]
        });
        alert('Piedavajums header and intro saved successfully!');
      } catch (error) {
        console.error('Error saving piedavajums header:', error);
        alert('Failed to save piedavajums header and intro');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(true);
      // Simulate API call for other sections
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      alert(`${section} saved successfully!`);
    }
  };

  const handleAddTeamMember = () => {
    setEditingMember(null);
    setTeamMemberForm({
      name: '',
      description: '',
      smallImage: '',
      fullImage: ''
    });
    setSelectedSmallImage(null);
    setSelectedFullImage(null);
    setUploadError(null);
    setShowTeamMemberForm(true);
  };

  const handleEditTeamMember = (member: any) => {
    setEditingMember(member._id); // Use MongoDB _id instead of id
    setTeamMemberForm({
      name: member.name,
      description: member.description,
      smallImage: member.smallImage,
      fullImage: member.fullImage
    });
    setSelectedSmallImage(null);
    setSelectedFullImage(null);
    setUploadError(null);
    setShowTeamMemberForm(true);
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteTeamMember(id);
      } catch (error) {
        console.error('Error deleting team member:', error);
        alert('Failed to delete team member');
      }
    }
  };

  const handleSaveTeamMember = async () => {
    try {
      setUploadError(null);
      setIsSubmitting(true);
      
      let smallImageUrl = teamMemberForm.smallImage;
      let fullImageUrl = teamMemberForm.fullImage;

      // Calculate total uploads needed
      const totalUploads = (selectedSmallImage ? 1 : 0) + (selectedFullImage ? 1 : 0);
      setUploadProgress({ current: 0, total: totalUploads });

      console.log('Starting team member save process...');
      console.log('Initial URLs - smallImage:', smallImageUrl, 'fullImage:', fullImageUrl);
      console.log('Total uploads needed:', totalUploads);

      // Upload new images if selected
      if (selectedSmallImage) {
        console.log('Uploading small image:', selectedSmallImage.name);
        const error = validateFile(selectedSmallImage);
        if (error) {
          setUploadError(error);
          setIsSubmitting(false);
          return;
        }
        smallImageUrl = await uploadImage(selectedSmallImage);
        console.log('Small image uploaded successfully:', smallImageUrl);
        setUploadProgress(prev => ({ ...prev, current: prev.current + 1 }));
      }

      if (selectedFullImage) {
        console.log('Uploading full image:', selectedFullImage.name);
        const error = validateFile(selectedFullImage);
        if (error) {
          setUploadError(error);
          setIsSubmitting(false);
          return;
        }
        fullImageUrl = await uploadImage(selectedFullImage);
        console.log('Full image uploaded successfully:', fullImageUrl);
        setUploadProgress(prev => ({ ...prev, current: prev.current + 1 }));
      }

      const memberData = {
        name: teamMemberForm.name,
        description: teamMemberForm.description,
        smallImage: smallImageUrl,
        fullImage: fullImageUrl
      };

      console.log('Final member data to send:', memberData);

      if (editingMember) {
        // Update existing member
        await updateTeamMember(editingMember, memberData);
      } else {
        // Add new member
        await addTeamMember(memberData);
      }

      setShowTeamMemberForm(false);
      setEditingMember(null);
      setSelectedSmallImage(null);
      setSelectedFullImage(null);
      setUploadError(null);
      if (smallImageInputRef.current) smallImageInputRef.current.value = '';
      if (fullImageInputRef.current) fullImageInputRef.current.value = '';
    } catch (error) {
      console.error('Error saving team member:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to save team member');
    } finally {
      setIsSubmitting(false);
      setUploadProgress({ current: 0, total: 0 });
    }
  };

  const handleCancelTeamMember = () => {
    setShowTeamMemberForm(false);
    setEditingMember(null);
    setSelectedSmallImage(null);
    setSelectedFullImage(null);
    setUploadError(null);
    if (smallImageInputRef.current) smallImageInputRef.current.value = '';
    if (fullImageInputRef.current) fullImageInputRef.current.value = '';
  };

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      company: '',
      testimonial: '',
      signature: ''
    });
    setShowTestimonialForm(true);
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonial(testimonial._id);
    setTestimonialForm({
      company: testimonial.company,
      testimonial: testimonial.testimonial,
      signature: testimonial.signature
    });
    setShowTestimonialForm(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete testimonial');
      }
    }
  };

  const handleSaveTestimonial = async () => {
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        await updateTestimonial(editingTestimonial, testimonialForm);
      } else {
        // Add new testimonial
        await addTestimonial(testimonialForm);
      }
      setShowTestimonialForm(false);
      setEditingTestimonial(null);
      setTestimonialForm({
        company: '',
        testimonial: '',
        signature: ''
      });
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial');
    }
  };

  const handleCancelTestimonial = () => {
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const handleAddPartner = () => {
    setEditingPartner(null);
    setPartnerForm({
      name: '',
      logo: ''
    });
    setSelectedPartnerLogo(null);
    setUploadError(null);
    setShowPartnerForm(true);
  };

  const handleEditPartner = (partner: any) => {
    setEditingPartner(partner._id);
    setPartnerForm({
      name: partner.name,
      logo: partner.logo
    });
    setSelectedPartnerLogo(null);
    setUploadError(null);
    setShowPartnerForm(true);
  };

  const handleDeletePartner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await deletePartner(id);
      } catch (error) {
        console.error('Error deleting partner:', error);
        alert('Failed to delete partner');
      }
    }
  };

  const handleSavePartner = async () => {
    try {
      setUploadError(null);
      setIsSubmitting(true);
      
      let logoUrl = partnerForm.logo;

      // Upload new logo if selected
      if (selectedPartnerLogo) {
        console.log('Uploading partner logo:', selectedPartnerLogo.name);
        logoUrl = await uploadImage(selectedPartnerLogo);
        console.log('Partner logo uploaded successfully:', logoUrl);
      }

      const partnerData = {
        name: partnerForm.name,
        logo: logoUrl
      };

      if (editingPartner) {
        // Update existing partner
        await updatePartner(editingPartner, partnerData);
      } else {
        // Add new partner
        await addPartner(partnerData);
      }
      
      setShowPartnerForm(false);
      setEditingPartner(null);
      setPartnerForm({
        name: '',
        logo: ''
      });
      setSelectedPartnerLogo(null);
      setUploadError(null);
    } catch (error) {
      console.error('Error saving partner:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to save partner');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPartner = () => {
    setShowPartnerForm(false);
    setEditingPartner(null);
    setPartnerForm({
      name: '',
      logo: ''
    });
    setSelectedPartnerLogo(null);
    setUploadError(null);
  };

  const handleAddPiedavajums = () => {
    setEditingPiedavajums(null);
    setPiedavajumsForm({
      title: '',
      duration: '',
      description: '',
      additionalTitle: '',
      additionalDescription: '',
      image: ''
    });
    setSelectedPiedavajumsImage(null);
    setUploadError(null);
    setShowPiedavajumsForm(true);
  };

  const handleEditPiedavajums = (section: any) => {
    setEditingPiedavajums(section._id);
    setPiedavajumsForm({
      title: section.title,
      duration: section.duration,
      description: section.description,
      additionalTitle: section.additionalTitle || '',
      additionalDescription: section.additionalDescription || '',
      image: section.image
    });
    setSelectedPiedavajumsImage(null);
    setUploadError(null);
    setShowPiedavajumsForm(true);
  };

  const handleDeletePiedavajums = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this piedavajums section?')) {
      try {
        await deletePiedavajumsSection(id);
      } catch (error) {
        console.error('Error deleting piedavajums section:', error);
        alert('Failed to delete piedavajums section');
      }
    }
  };

  const handleSavePiedavajums = async () => {
    try {
      setUploadError(null);
      
      // Validate required fields
      if (!piedavajumsForm.title.trim()) {
        setUploadError('Title is required');
        return;
      }
      if (!piedavajumsForm.description.trim()) {
        setUploadError('Description is required');
        return;
      }
      if (!piedavajumsForm.image && !selectedPiedavajumsImage) {
        setUploadError('Image is required');
        return;
      }
      
      setIsSubmitting(true);
      
      let imageUrl = piedavajumsForm.image;

      // Upload new image if selected
      if (selectedPiedavajumsImage) {
        console.log('Uploading piedavajums image:', selectedPiedavajumsImage.name);
        imageUrl = await uploadImage(selectedPiedavajumsImage);
        console.log('Piedavajums image uploaded successfully:', imageUrl);
      }

      const sectionData = {
        title: piedavajumsForm.title.trim(),
        duration: piedavajumsForm.duration.trim(),
        description: piedavajumsForm.description.trim(),
        additionalTitle: piedavajumsForm.additionalTitle.trim(),
        additionalDescription: piedavajumsForm.additionalDescription.trim(),
        image: imageUrl
      };

      if (editingPiedavajums) {
        // Update existing section
        await updatePiedavajumsSection(editingPiedavajums, sectionData);
      } else {
        // Add new section
        await addPiedavajumsSection(sectionData);
      }
      
      setShowPiedavajumsForm(false);
      setEditingPiedavajums(null);
      setPiedavajumsForm({
        title: '',
        duration: '',
        description: '',
        additionalTitle: '',
        additionalDescription: '',
        image: ''
      });
      setSelectedPiedavajumsImage(null);
      setUploadError(null);
    } catch (error) {
      console.error('Error saving piedavajums section:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to save piedavajums section');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPiedavajums = () => {
    setShowPiedavajumsForm(false);
    setEditingPiedavajums(null);
    setPiedavajumsForm({
      title: '',
      duration: '',
      description: '',
      additionalTitle: '',
      additionalDescription: '',
      image: ''
    });
    setSelectedPiedavajumsImage(null);
    setUploadError(null);
  };

  const handleMovePiedavajums = async (id: string, direction: 'up' | 'down') => {
    try {
      setIsReordering(true);
      await movePiedavajumsSection(id, direction);
    } catch (error) {
      console.error('Error moving piedavajums section:', error);
      alert('Failed to move piedavajums section');
    } finally {
      setIsReordering(false);
    }
  };

  const renderTeamMembers = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">About Section Text</h3>
        <textarea
          value={localAboutText}
          onChange={(e) => setLocalAboutText(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md"
          placeholder="Enter about section text..."
        />
        <button
          onClick={() => handleSave('About text')}
          disabled={isSubmitting}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save About Text'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Team Members</h3>
          <button
            onClick={handleAddTeamMember}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Team Member
          </button>
        </div>
        
        {isLoadingTeamMembers ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading team members...</div>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">No team members found. Add your first team member!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <img 
                    src={member.smallImage} 
                    alt={member.name} 
                    className="w-16 h-16 object-cover rounded flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{member.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {member.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEditTeamMember(member)}
                    className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeamMember(member._id)}
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Team Member Form Modal */}
      {showTeamMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={teamMemberForm.name}
                  onChange={(e) => setTeamMemberForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter member name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={teamMemberForm.description}
                  onChange={(e) => setTeamMemberForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter member description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Small Image</label>
                  <div className="space-y-2">
                    <input
                      ref={smallImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedSmallImage(file);
                          setUploadError(null);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => smallImageInputRef.current?.click()}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-300"
                      >
                        Choose Image
                      </button>
                      {(teamMemberForm.smallImage || selectedSmallImage) && (
                        <img 
                          src={selectedSmallImage ? URL.createObjectURL(selectedSmallImage) : teamMemberForm.smallImage} 
                          alt="Small preview" 
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}
                    </div>
                    {selectedSmallImage && (
                      <p className="text-xs text-green-600">
                        Selected: {selectedSmallImage.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Large Image</label>
                  <div className="space-y-2">
                    <input
                      ref={fullImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFullImage(file);
                          setUploadError(null);
                        }
                      }}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => fullImageInputRef.current?.click()}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md border border-gray-300"
                      >
                        Choose Image
                      </button>
                      {(teamMemberForm.fullImage || selectedFullImage) && (
                        <img 
                          src={selectedFullImage ? URL.createObjectURL(selectedFullImage) : teamMemberForm.fullImage} 
                          alt="Large preview" 
                          className="w-12 h-12 object-cover rounded border"
                        />
                      )}
                    </div>
                    {selectedFullImage && (
                      <p className="text-xs text-green-600">
                        Selected: {selectedFullImage.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {isSubmitting && uploadProgress.total > 0 && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="text-sm text-blue-700 mb-2">
                    Uploading images... {uploadProgress.current}/{uploadProgress.total}
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {uploadError && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveTeamMember}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : (editingMember ? 'Update Member' : 'Add Member')}
              </button>
              <button
                onClick={handleCancelTeamMember}
                disabled={isSubmitting}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Testimonials</h3>
          <button
            onClick={handleAddTestimonial}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Testimonial
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{testimonial.company}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-4">
                    {testimonial.testimonial}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    — {testimonial.signature}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => testimonial._id && handleDeleteTestimonial(testimonial._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Form Modal */}
      {showTestimonialForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company/Organization</label>
                <input
                  type="text"
                  value={testimonialForm.company}
                  onChange={(e) => setTestimonialForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter company or organization name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Testimonial</label>
                <textarea
                  value={testimonialForm.testimonial}
                  onChange={(e) => setTestimonialForm(prev => ({ ...prev, testimonial: e.target.value }))}
                  className="w-full h-32 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter testimonial text"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Signature</label>
                <input
                  type="text"
                  value={testimonialForm.signature}
                  onChange={(e) => setTestimonialForm(prev => ({ ...prev, signature: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter signature (e.g., name and title)"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSaveTestimonial}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </button>
              <button
                onClick={handleCancelTestimonial}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Partners</h3>
          <button
            onClick={handleAddPartner}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Partner
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {partners.map((partner) => (
            <div key={partner._id} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="mb-3">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-16 h-16 mx-auto object-contain" 
                />
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-3 truncate">
                {partner.name}
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPartner(partner)}
                  className="flex-1 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => partner._id && handleDeletePartner(partner._id)}
                  className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Form Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium mb-4">
              {editingPartner ? 'Edit Partner' : 'Add New Partner'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Partner Name</label>
                <input
                  type="text"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter partner name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Logo</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      onClick={() => partnerLogoInputRef.current?.click()}
                    >
                      {selectedPartnerLogo ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    {selectedPartnerLogo && (
                      <button
                        type="button"
                        onClick={() => setSelectedPartnerLogo(null)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <input
                    ref={partnerLogoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const error = validateFile(file);
                        if (error) {
                          setUploadError(error);
                          return;
                        }
                        setSelectedPartnerLogo(file);
                        setUploadError(null);
                      }
                    }}
                    className="hidden"
                  />
                  
                  {(selectedPartnerLogo || partnerForm.logo) && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                      <img 
                        src={selectedPartnerLogo ? URL.createObjectURL(selectedPartnerLogo) : partnerForm.logo} 
                        alt="Logo preview" 
                        className="w-24 h-24 object-contain border rounded bg-gray-50"
                      />
                    </div>
                  )}
                  
                  {uploadError && (
                    <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSavePartner}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </button>
              <button
                onClick={handleCancelPartner}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPiedavajums = () => (
    <div className="space-y-6">
      {/* Header and Intro Text Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Piedavajums Header & Introduction</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Header Text</label>
            <input
              type="text"
              value={localPiedavajumsHeader}
              onChange={(e) => setLocalPiedavajumsHeader(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter header text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Introduction Paragraph 1</label>
            <textarea
              value={localPiedavajumsIntro[0]}
              onChange={(e) => setLocalPiedavajumsIntro(prev => 
                prev.map((text, i) => i === 0 ? e.target.value : text)
              )}
              className="w-full h-20 p-2 border border-gray-300 rounded-md"
              placeholder="Enter first paragraph"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Introduction Paragraph 2</label>
            <textarea
              value={localPiedavajumsIntro[1]}
              onChange={(e) => setLocalPiedavajumsIntro(prev => 
                prev.map((text, i) => i === 1 ? e.target.value : text)
              )}
              className="w-full h-20 p-2 border border-gray-300 rounded-md"
              placeholder="Enter second paragraph"
            />
          </div>
        </div>

        <button
          onClick={() => handleSave('Piedavajums header and intro')}
          disabled={isSubmitting}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Header & Intro'}
        </button>
      </div>

      {/* Piedavajums Sections */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Piedavajums Sections</h3>
          <button
            onClick={handleAddPiedavajums}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add Section
          </button>
        </div>
        
        {isLoadingPiedavajums ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading piedavajums sections...</div>
          </div>
        ) : piedavajumsSections.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">No piedavajums sections found. Add your first section!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {piedavajumsSections.map((section, index) => (
              <div key={section._id} className="border border-gray-200 rounded-lg p-4 flex items-start space-x-4">
                {/* Order Controls */}
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => handleMovePiedavajums(section._id!, 'up')}
                    disabled={index === 0 || isReordering}
                    className={`p-1 rounded ${index === 0 || isReordering ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleMovePiedavajums(section._id!, 'down')}
                    disabled={index === piedavajumsSections.length - 1 || isReordering}
                    className={`p-1 rounded ${index === piedavajumsSections.length - 1 || isReordering ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Section Content */}
                <div className="flex-1 flex space-x-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 truncate">
                          {section.title}
                        </h4>
                        {section.duration && (
                          <p className="text-xs text-gray-500 mb-1">
                            {section.duration}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {section.description}
                        </p>
                        {section.additionalTitle && (
                          <p className="text-xs text-gray-500 mt-1">
                            Additional: {section.additionalTitle}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEditPiedavajums(section)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => section._id && handleDeletePiedavajums(section._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Piedavajums Form Modal */}
      {showPiedavajumsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              {editingPiedavajums ? 'Edit Piedavajums Section' : 'Add New Piedavajums Section'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={piedavajumsForm.title}
                    onChange={(e) => setPiedavajumsForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter section title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={piedavajumsForm.duration}
                    onChange={(e) => setPiedavajumsForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter duration (optional)"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={piedavajumsForm.description}
                  onChange={(e) => setPiedavajumsForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-20 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter section description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Additional Title (Optional)</label>
                <input
                  type="text"
                  value={piedavajumsForm.additionalTitle}
                  onChange={(e) => setPiedavajumsForm(prev => ({ ...prev, additionalTitle: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter additional title (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Additional Description (Optional)</label>
                <textarea
                  value={piedavajumsForm.additionalDescription}
                  onChange={(e) => setPiedavajumsForm(prev => ({ ...prev, additionalDescription: e.target.value }))}
                  className="w-full h-20 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter additional description (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Image *</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      onClick={() => piedavajumsImageInputRef.current?.click()}
                    >
                      {selectedPiedavajumsImage ? 'Change Image' : 'Upload Image'}
                    </button>
                    {selectedPiedavajumsImage && (
                      <button
                        type="button"
                        onClick={() => setSelectedPiedavajumsImage(null)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <input
                    ref={piedavajumsImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const error = validateFile(file);
                        if (error) {
                          setUploadError(error);
                          return;
                        }
                        setSelectedPiedavajumsImage(file);
                        setUploadError(null);
                      }
                    }}
                    className="hidden"
                  />
                  
                  {(selectedPiedavajumsImage || piedavajumsForm.image) && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                      <img 
                        src={selectedPiedavajumsImage ? URL.createObjectURL(selectedPiedavajumsImage) : piedavajumsForm.image} 
                        alt="Image preview" 
                        className="w-32 h-24 object-cover border rounded bg-gray-50"
                      />
                    </div>
                  )}
                  
                  {uploadError && (
                    <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleSavePiedavajums}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : (editingPiedavajums ? 'Update Section' : 'Add Section')}
              </button>
              <button
                onClick={handleCancelPiedavajums}
                disabled={isSubmitting}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold">Content Management</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'team', name: 'Team Members' },
              { id: 'testimonials', name: 'Testimonials' },
              { id: 'partners', name: 'Partners' },
              { id: 'piedavajums', name: 'Piedavajums' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'team' && renderTeamMembers()}
          {activeTab === 'testimonials' && renderTestimonials()}
          {activeTab === 'partners' && renderPartners()}
          {activeTab === 'piedavajums' && renderPiedavajums()}
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery Management Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Gallery Management
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Manage photo galleries
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="text-sm">
                  <button
                    onClick={() => navigate('/admin/gallery')}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Go to Gallery Management →
                  </button>
                </div>
              </div>
            </div>

            {/* Content Management Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Content Management
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Manage website content
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="text-sm">
                  <button
                    onClick={() => navigate('/admin/content')}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Go to Content Management →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <GalleryProvider>
        <TeamProvider>
          <AboutProvider>
            <TestimonialsProvider>
              <PartnersProvider>
                <PiedavajumsProvider>
                  <Routes>
                    <Route path="/" element={<UnderConstruction />} />
                    <Route path="/demo/*" element={<MainPage />} />
                    <Route path="/demo/galerija" element={<GalleryPage />} />
                    <Route path="/demo/piedavajums" element={<PiedavajumsPage />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route
                      path="/admin/content"
                      element={
                        <ProtectedRoute>
                          <ContentManagement />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/gallery"
                      element={
                        <ProtectedRoute>
                          <GalleryManagement />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </PiedavajumsProvider>
              </PartnersProvider>
            </TestimonialsProvider>
          </AboutProvider>
        </TeamProvider>
      </GalleryProvider>
    </AdminProvider>
  );
}

export default function WrappedApp() {
  return <AppWrapper><App /></AppWrapper>;
}