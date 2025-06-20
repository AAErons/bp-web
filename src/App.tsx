import './index.css';
import { useRef, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { GalleryProvider, useGallery } from './contexts/GalleryContext';
import AdminLogin from './pages/AdminLogin';
import GalleryManagement from './pages/GalleryManagement';
import GalleryView from './components/GalleryView';
import bpLogo from './assets/bp_logo.png';
import evSmall from './assets/team/small/ev_small.jpg';
import evFull from './assets/team/full/ev_full.jpg';
import zirnisSmall from './assets/team/small/zirnis_small.jpg';
import zirnisFull from './assets/team/full/zirnis_full.jpg';
import jeekaaSmall from './assets/team/small/jeekaa_small.jpg';
import jeekaaFull from './assets/team/full/jeekaa_full.jpg';
import sniegsSmall from './assets/team/small/sniegs_small.jpg';
import sniegsFull from './assets/team/full/sniegs_full.jpg';
import abraSmall from './assets/team/small/abra_small.jpg';
import abraFull from './assets/team/full/abra_full.jpg';
import birchSmall from './assets/team/small/birch_small.jpg';
import birchFull from './assets/team/full/birch_full.jpg';
import theBronxsLogo from './assets/partners/thebronxs.jpeg';
import tioKaussLogo from './assets/partners/tio-kauss.png';
import straumeLogo from './assets/partners/straume.jpeg';
import spiediensLogo from './assets/partners/spiediens.png';
import siguldaLogo from './assets/partners/sigulda.png';
import rigaLogo from './assets/partners/riga.png';
import scaniaLogo from './assets/partners/scania.png';
import positvisLogo from './assets/partners/positvis.png';
import lmtLogo from './assets/partners/lmt.jpg';
import investmentAgencyLogo from './assets/partners/investment-agency.png';
import idejuKaussLogo from './assets/partners/ideju-kauss.png';
import ikeaLogo from './assets/partners/ikea.png';
import feeLogo from './assets/partners/fee.png';
import dienasBiznessLogo from './assets/partners/dienas_bizness.jpeg';
import publicConcert from './assets/howItWorks/public.jpg';
import closedEvent from './assets/howItWorks/closed.jpg';
import presentation from './assets/howItWorks/presentation.jpg';
import heroBg from './assets/title.jpg';

// Define TeamMember type
interface TeamMember {
  name: string;
  description: string;
  smallImage: string;
  fullImage: string;
}

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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    atsauksmes: useRef<HTMLDivElement>(null)
  };

  const teamMembers: TeamMember[] = [
    { 
      name: 'E.V.', 
      description: '"Kreisais Krasts" biedrs, kurš prot performēt divās valodās: latviešu un angļu. Ne tikai harizmātisks ceremoniju meistars, bet arī skatuves magnēts, kas apvieno psiholoģijas gudrības ar skanīgām vārdu vārsmām.', 
      smallImage: evSmall, 
      fullImage: evFull 
    },
    { 
      name: 'Zirnis', 
      description: 'Divkartējs "Ghetto Games" brīvrunu batla "Štuka par bazaru" uzvarētājs. BP radošais dzinējs un pulksteņmeistars. Zirnim vienmēr ir plāns un pēc vārda kabatā nav jāmeklē, jo viņš spēj uzburt reālu frīstailu jebkurā laikā un vietā.', 
      smallImage: zirnisSmall, 
      fullImage: zirnisFull 
    },
    { 
      name: 'JeeKaa', 
      description: '"Kreisais Krasts" vecbiedrs ar aptuveni 20 gadu bagāžu brīvrunā! Viņa stils? Mierīga plūsma, asi joki, pašironija un spēja pielāgoties jebkādiem apstākļiem. No mazām skatuvēm līdz lielām hallēm - JeeKaa vienmēr ienes īstu vārdu spēles garšu!', 
      smallImage: jeekaaSmall, 
      fullImage: jeekaaFull 
    },
    { 
      name: 'Sniegs', 
      description: 'Latvijas brīvrunas scēnas lielāko pasākumu veidotājs un vadītājs, kurš arī pēc 25 gadiem brīvrunā joprojām to dara ar aizrautību. Pieredze, radošums un spēja uzrunāt savus vienaudžus ir Sniega stiprā puse un ieguvums pasākuma kopējam skanējumam.', 
      smallImage: sniegsSmall, 
      fullImage: sniegsFull 
    },
    { 
      name: 'Abra', 
      description: '"Brīvrunu Projekta" aizsācējs un četrkārtējs "Ghetto Games" brīvrunu battla "Štuka par bazaru" čempions. Abras superspēja ir brīvrunā izmantot improvizācijas teātrī gūto pieredzi, tādējādi apvienojot dažādas mākslas formas vienā un regulāri sniedzot radošus risinājumus "ārpus kastes".', 
      smallImage: abraSmall, 
      fullImage: abraFull 
    },
    { 
      name: 'Birch Please', 
      description: 'DJ un bītmeikeris ar 10 gadu pieredzi. BP aisbergs, kuru pasākumos var redzēt kā DJ, taču neredzamā daļa ir saklausāma priekšnesumos, jo katra iznāciena pavadījums ir Birch Please autordarbs. Improvizācija ir klātesoša arī Birch esencē - scratch, kas bagātina šovu.', 
      smallImage: birchSmall, 
      fullImage: birchFull 
    },
  ];

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

  if (isLoading) {
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
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center -mb-2 md:mb-12 z-10 px-4">
                <h1 
                  className="font-extrabold uppercase text-white text-center bg-black bg-opacity-50 px-4 py-3 md:px-8 md:py-4 rounded-lg shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] mb-2 md:mb-6"
                  style={{
                    fontSize: 'clamp(1rem, 3vw + 0.5rem, 6rem)',
                    lineHeight: '1.1'
                  }}
                >
                  TAS IR BRĪVRUNU KAS?
                </h1>
                <button
                  className="bg-black text-white uppercase font-semibold tracking-wider mt-1 md:mt-2 shadow-lg"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.2vw + 0.3rem, 1.125rem)',
                    padding: 'clamp(0.75rem, 1.2vw + 0.4rem, 1rem) clamp(1.5rem, 2vw + 0.8rem, 2rem)'
                  }}
                  onClick={() => navigate('/demo/piedavajums')}
                >
                  UZZINĀT VAIRĀK
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.about} className="min-h-screen py-20">
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed font-bold">
            "Brīvrunu Projekts" ir pirmais un vienīgais repa improvizācijas kolektīvs Latvijā. Skatītāju ieteikumus, vidi un notikuma tematiku "Brīvrunu Projekts" pārvērš repa improvizācijas etīdēs, kas rada pacilājošas emocijas un pasākuma pievienoto vērtību. Astoņu gadu laikā izkoptie formāti uzrunā plašu auditoriju, neatkarīgi no vecuma vai izpratnes par repu.
            </div>
            
            {/* Team Members Grid */}
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
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
                {[
                  { company: 'GULBENES NOVADA JAUNIEŠU CENTRS "BĀZE"', logo: 'GULBENES NOVADA JAUNIEŠU CENTRS "BĀZE"' },
                  { company: 'VSIA "LATVIJAS KONCERTI"', logo: 'VSIA "LATVIJAS KONCERTI"' },
                  { company: 'LĪVĀNI', logo: 'LĪVĀNI' },
                  { company: 'IDEJU INSTITŪTS', logo: 'IDEJU INSTITŪTS' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-black p-6 md:p-8 relative">
                    <div className="absolute -top-4 left-6 bg-white px-4 font-bold text-sm md:text-base">
                      {item.logo}
                    </div>
                    <div className="text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                      {index === 0 ? (
                        <>
                          "Sadarbība ar "Brīvrunu Projektu" mūsu pasākumā "Gada atsitiens 2024" ietvaros bija patiesi iedvesmojoša un profesionāla. Iepriekš izrunātas detaļas un velmes tika realizētas ar uzviju. Brīvrunu projekts mūs pārsteidza ar unikāliem un spēcīgiem tekstiem par visiem pasākuma nominantiem, ko viņi izpildīja savā īpašajā stilā – ar harismu, dinamiku un lielisku savstarpējo saspēli. Mūzika, enerģija un kustība – viss kopā radīja neaizmirstamu pieredzi. Skatitāji, nominanti, organizātori palika sajūma par "Brīvrunu projekta" izpildījumu. No sirds iesakām šo komandu arī citiem!"
                        </>
                      ) : index === 1 ? (
                        <>
                          "2025.gada 20.martā VEF KP izskanēja VSIA "Latvijas Koncerti" veidotā cikla "Mūzika Tev" pēdējais koncerts 7.-12.klasēm. Parasti šo koncertu veidojam demokrātiskāku, aicinot tajā piedalīties solistus un grupas, kuru muzikālie žanri un izpausmes mūsu jauniešiem ir tuvāki. Pirmo reizi iepazinām "Brīvrunu projektu", grupu, kam bija jānoslēdz visa koncertprogramma. Patiess bija mūsu- koncertu rīkotāju un, protams, arī publikas atzinums- "Brīvrunu projekts" bija tieši tas, kas jauniešiem bija vajadzīgs. Grupas uzstāšanās bija tik aizrautīga, tik enerģijas pārpilna, ka nav šaubu- visi koncerta apmeklētāji aizgāja no koncerta absolūti uzlādēti. Pārsteidza gan "Brīvrunu projekta" dalībnieku augstā profesionālā meistarība, lieliskā savstarpējā ansambļa izjūta, kur katrs zināja savu uzdevumu un radīja iespaidu, cik tas viņiem viegli. Pārsteidz ne tikai viņu lieliskās repošanas prasmes, elektronikas izmantojums, bet arī asprātība un humors savos priekšnesumos iesaistot jauniešus no klausītāju rindām. Īpaši gribētos izcelt arī "Brīvrunu projekta" dalībnieku pieklājību, vienkāršību un sirsnību saskarē ar mums, koncerta veidotājiem. Noteikti pie izdevības turpināsim sadarbību ar "Brīvrunu projektu" arī nākotnē"
                        </>
                      ) : (
                        '"Sadarbība ar Brīvrunu Projektu vienmēr ir bijusi ļoti iedvesmojoša un profesionāla. Viņu spēja radīt saturu, kas uzrunā un aizrauj, ir patiesi unikāla. Projekti, ko īstenojām kopā ar viņiem, bija ne tikai kvalitatīvi, bet arī emocionāli spēcīgi un ar lielu pievienoto vērtību mūsu auditorijai."'
                      )}
                    </div>
                    <div className="text-right font-medium">
                      {index === 0 ? (
                        <>
                          — Cieņā,<br />
                          Valērija Stībele<br />
                          Gulbenes novada jauniešu centrs "Bāze" vadītāja
                        </>
                      ) : index === 1 ? (
                        <>
                          — Ar cieņu,<br />
                          Karina Bērziņa<br />
                          VSIA Latvijas Koncerti<br />
                          Izglītības programmas vadītāja, producente
                        </>
                      ) : (
                        `— ${item.company}`
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mb-16">
                <div className="font-bold text-sm md:text-base mb-6">MŪSU PARTNERI</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center items-center">
                  {[
                    { logo: tioKaussLogo, name: 'Tio Kauss' },
                    { logo: straumeLogo, name: 'Straume' },
                    { logo: spiediensLogo, name: 'Spiediens' },
                    { logo: siguldaLogo, name: 'Sigulda' },
                    { logo: rigaLogo, name: 'Riga' },
                    { logo: scaniaLogo, name: 'Scania' },
                    { logo: positvisLogo, name: 'Positvis' },
                    { logo: lmtLogo, name: 'LMT' },
                    { logo: investmentAgencyLogo, name: 'Investment Agency' },
                    { logo: idejuKaussLogo, name: 'Ideju Kauss' },
                    { logo: ikeaLogo, name: 'IKEA' },
                    { logo: feeLogo, name: 'Fee' },
                    { logo: dienasBiznessLogo, name: 'Dienas Bizness' },
                    { logo: theBronxsLogo, name: 'The Bronxs' }
                  ].map((partner, index) => (
                    <div 
                      key={index} 
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
                  <span className="bg-[#FAF8F8] px-4 text-sm md:text-base font-medium">Seko mums</span>
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
                    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/BrivrunuProjekts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@brivrunuprojekts8416" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://open.spotify.com/artist/0bnglFd0oM0O6ZUChuwms2" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
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
            <div className="md:w-auto w-full flex items-center justify-start md:max-h-[90vh]">
              <img 
                src={selectedMember.fullImage} 
                alt={selectedMember.name} 
                className="max-h-[40vh] md:max-h-[90vh] w-auto h-auto object-contain"
              />
            </div>
            {/* Right: Info */}
            <div className="flex-1 w-full min-w-[320px] md:min-w-[400px] bg-[#FFF7F3] flex flex-col justify-start p-6 md:p-12 relative overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-black pr-12">{selectedMember.name}</h2>
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
      const response = await fetch('https://formspree.io/f/mblobqbr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _replyto: 'eriksfreimanis@gmail.com',
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

  return (
    <div className="w-full min-h-screen text-black flex flex-col">
      <Navigation activeSection={activeSection} onMenuClick={handleMenuClick} location={location} />
      <main className="flex-grow pt-20">
        <section className="min-h-screen py-20">
          <div className="w-full max-w-4xl mx-auto mb-8 mt-4 px-4">
            <h2 className="text-center text-xl md:text-2xl font-bold mb-4">TAS IR "BRĪVRUNU PROJEKTS"!</h2>
            <div className="text-center text-base md:text-lg lg:text-xl leading-relaxed space-y-3">
              <p>
                Mūsu arsenālā ir vairāk nekā 15 dažādas idejas, kā pāris minūtēs jūsu
                pasākums var iegūt unikālu skanējumu un radīt apmeklētājiem emocijas.
              </p>
              <p>
                Mēs spējam gan izveidot notikumu no nulles, gan izcelt un paspilgtināt
                jūsu ideju vai stāstu. Tāpēc mūs atkārtoti aicina uzstāties pilsētas svētkos,
                korporatīvās ballēs, festivālos un citos notikumos, jo katra performance ir
                vienreizēja un unikāla.
              </p>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto space-y-16 px-4">
            {/* Section 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden">
                <img 
                  src={publicConcert} 
                  alt="Publisks koncerts" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="border-b border-black pb-2">
                  <h3 className="text-lg md:text-xl font-bold">PUBLISKS KONCERTS</h3>
                  <div className="text-sm md:text-base font-medium text-gray-700">15 I 30 I 45 minūtes</div>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  Garākā uzstāšanās forma no 15 līdz 45 minūtēm. Tā ietver vairāk nekā 10
                  dažādas repa improvizācijas etīdes, kas kopumā veido pilnvērtīgu
                  koncerta pieredzi.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-sm md:text-base mb-2">PAPILDUS PIEREDZE – REPA IMPROVIZĀCIJAS DARBNĪCA</h4>
                  <p className="text-sm md:text-base leading-relaxed">
                    60-90 minūšu laikā dalībniekiem ir iespēja uzzināt un praktiski pamēģināt
                    iztēles iekustināšanas, dīdžejošanas un repa vingrinājumus, kas ir svarīgi,
                    lai veidotu brīvrunu. Iegūtās prasmes noder ikdienas dzīvē, ne tikai repā.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-start">
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden">
                <img 
                  src={closedEvent} 
                  alt="Notikums slēgtā vidē" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="border-b border-black pb-2">
                  <h3 className="text-lg md:text-xl font-bold">NOTIKUMS SLĒGTĀ VIDĒ</h3>
                  <div className="text-sm md:text-base font-medium text-gray-700">15 I 20 minūtes</div>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  Īpaši izveidota programma no BP uzdevumu "zelta repertuāra", kas 15 līdz
                  20 minūšu šovā iekustina un izklaidē, radot neaizmirstamas emocijas. Šī ir
                  iespēja priekšnesumā iesaistīt īpašus cilvēkus, produktus vai
                  pakalpojumus.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-sm md:text-base mb-2">ĻOTI PERSONĪGA PIEREDZE – RAKSTĪTI TEKSTI</h4>
                  <p className="text-sm md:text-base leading-relaxed">
                    Brīvrunas improvizācija ir gaisīga, taču reizēm ir nepieciešama īpaša
                    detalizācija, lai kādu cilvēku, produktu vai pakalpojumu noliktu pasākuma
                    centrā. Šādos gadījumos ir iespēja sagatavot iepriekš iestudētu
                    priekšnesumu ar iepriekš sagatavotu tekstu.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden">
                <img 
                  src={presentation} 
                  alt="Produktu vai pakalpojumu popularizēšana" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="border-b border-black pb-2">
                  <h3 className="text-lg md:text-xl font-bold">PRODUKTU VAI PAKALPOJUMU POPULARIZĒŠANA</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  Ja produkts vai pakalpojums saskan ar BP komandas vērtībām, esam
                  atvērti arī reklāmas sadarbībām, piedāvājot teksta rakstīšanas
                  pakalpojumu, audio ierakstīšanu, kā arī BP dalībnieku izmantošanu saturā.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-2xl mx-auto mt-16 mb-8 px-4">
            <div className="border-t border-black pt-8">
              <h3 className="text-center text-lg md:text-xl font-bold mb-6">Jautājumi?</h3>
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

function App() {
  return (
    <AdminProvider>
      <GalleryProvider>
        <Routes>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/demo/*" element={<MainPage />} />
          <Route path="/demo/galerija" element={<GalleryPage />} />
          <Route path="/demo/piedavajums" element={<PiedavajumsPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <GalleryManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </GalleryProvider>
    </AdminProvider>
  );
}

export default function WrappedApp() {
  return <AppWrapper><App /></AppWrapper>;
}
