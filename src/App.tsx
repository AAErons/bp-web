import './index.css';
import { useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import { GalleryProvider, useGallery } from './contexts/GalleryContext';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import GalleryManagement from './pages/GalleryManagement';
import GalleryImages from './pages/GalleryImages';
import GalleryView from './components/GalleryView';
import Hero from './pages/Hero';
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
import swedbankLogo from './assets/partners/swedbank.png';
import jagermeisterLogo from './assets/partners/jagermeister.png';
import ghettoGamesLogo from './assets/partners/ghetto_games.png';
import vefLogo from './assets/partners/vef.png';
import ventspilsNaftaLogo from './assets/partners/ventspils_nafta.png';
import theBronxsLogo from './assets/partners/thebronxs.jpeg';
import dzinatrsLogo from './assets/partners/dzinatrs.png';
import spilvaLogo from './assets/partners/spilva.png';
import publicConcert from './assets/howItWorks/public.jpg';
import closedEvent from './assets/howItWorks/closed.jpg';
import presentation from './assets/howItWorks/presentation.jpg';

function UnderConstruction() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-500">
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

function DemoPage() {
  const [activeSection, setActiveSection] = useState('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<{ name: string; description: string; smallImage: string; fullImage: string } | null>(null);
  const { galleries, isLoading } = useGallery();
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    atsauksmes: useRef<HTMLDivElement>(null),
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const teamMembers = [
    { name: 'E.V.', description: '"Kreisais Krasts" biedrs, kurš prot performēt divās valodās: latviešu un angļu. Ne tikai harizmātisks ceremoniju meistars, bet arī skatuves magnēts, kas apvieno psiholoģijas gudrības ar skanīgām vārdu vārsmām.', smallImage: evSmall, fullImage: evFull },
    { name: 'Zirnis', description: 'Divkartējs "Ghetto Games" brīvrunu batla "Štuka par bazaru" uzvarētājs. BP radošais dzinējs un pulksteņmeistars. Zirnim vienmēr ir plāns un pēc vārda kabatā nav jāmeklē, jo viņš spēj uzburt reālu frīstailu jebkurā laikā un vietā.', smallImage: zirnisSmall, fullImage: zirnisFull },
    { name: 'JeeKaa', description: '"Kreisais Krasts" vecbiedrs ar aptuveni 20 gadu bagāžu brīvrunā! Viņa stils? Mierīga plūsma, asi joki, pašironija un spēja pielāgoties jebkādiem apstākļiem. No mazām skatuvēm līdz lielām hallēm - JeeKaa vienmēr ienes īstu vārdu spēles garšu!', smallImage: jeekaaSmall, fullImage: jeekaaFull },
    { name: 'Sniegs', description: 'Latvijas brīvrunas scēnas lielāko pasākumu veidotājs un vadītājs, kurš arī pēc 25 gadiem brīvrunā joprojām to dara ar aizrautību. Pieredze, radošums un spēja uzrunāt savus vienaudžus ir Sniega stiprā puse un ieguvums pasākuma kopējam skanējumam.', smallImage: sniegsSmall, fullImage: sniegsFull },
    { name: 'Abra', description: '"Brīvrunu Projekta" aizsācējs un četrkārtējs "Ghetto Games" brīvrunu battla "Štuka par bazaru" čempions. Abras superspēja ir brīvrunā izmantot improvizācijas teātrī gūto pieredzi, tādējādi apvienojot dažādas mākslas formas vienā un regulāri sniedzot radošus risinājumus "ārpus kastes".', smallImage: abraSmall, fullImage: abraFull },
    { name: 'Birch Please', description: 'DJ un bītmeikeris ar 10 gadu pieredzi. BP aisbergs, kuru pasākumos var redzēt kā DJ, taču neredzamā daļa ir saklausāma priekšnesumos, jo katra iznāciena pavadījums ir Birch Please autordarbs. Improvizācija ir klātesoša arī Birch esencē - scratch, kas bagātina šovu.', smallImage: birchSmall, fullImage: birchFull },
  ];

  // Handle menu clicks
  const handleMenuClick = (section: string) => {
    if (section === 'galerija' || section === 'piedavajums') {
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSection('main');
      setTimeout(() => {
        if (sectionRefs[section as keyof typeof sectionRefs]?.current) {
          sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
    setIsMenuOpen(false); // Close menu after click on mobile
  };

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
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  if (isLoading) {
    // ... existing code ...
  }

  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col">
      {/* Mobile Navigation Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white border border-black rounded-lg"
      >
        <div className="w-6 h-0.5 bg-black mb-1.5"></div>
        <div className="w-6 h-0.5 bg-black mb-1.5"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-40 border-b border-black bg-white justify-center px-4 md:px-8 h-20 flex-shrink-0">
        <ul className="flex w-full max-w-screen-2xl h-full items-center">
          <li className={`flex-1 text-center py-4 border-r border-black font-bold cursor-pointer`} onClick={() => handleMenuClick('hero')}>BP</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('about')}>KOMANDA</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('piedavajums')}>PIEDĀVĀJUMS</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('galerija')}>GALERIJA</li>
          <li className={`flex-1 text-center py-4 cursor-pointer`} onClick={() => handleMenuClick('atsauksmes')}>ATSAUKSMES</li>
        </ul>
      </nav>

      {/* Mobile Navigation Menu */}
      <nav className={`md:hidden fixed top-0 left-0 w-full z-40 bg-white border-b border-black transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <ul className="flex flex-col w-full">
          <li className={`text-center py-4 border-b border-black font-bold cursor-pointer`} onClick={() => handleMenuClick('hero')}>BP</li>
          <li className={`text-center py-4 border-b border-black cursor-pointer`} onClick={() => handleMenuClick('about')}>KOMANDA</li>
          <li className={`text-center py-4 border-b border-black cursor-pointer`} onClick={() => handleMenuClick('piedavajums')}>PIEDĀVĀJUMS</li>
          <li className={`text-center py-4 border-b border-black cursor-pointer`} onClick={() => handleMenuClick('galerija')}>GALERIJA</li>
          <li className={`text-center py-4 cursor-pointer`} onClick={() => handleMenuClick('atsauksmes')}>ATSAUKSMES</li>
        </ul>
      </nav>

      {/* Main Scrollable Slides */}
      {activeSection === 'main' && (
        <main className="flex-1 w-full pt-20 md:pt-20 snap-y snap-mandatory overflow-y-auto">
          {/* Hero Section */}
          <section ref={sectionRefs.hero} className="w-full min-h-screen snap-start">
            <Hero onSectionChange={handleMenuClick} />
          </section>
          {/* About & Team Section */}
          <section ref={sectionRefs.about} id="komanda" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 snap-start">
            <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed">
              "Brīvrunu Projekts" ir pirmais un vienīgais repa improvizācijas kolektīvs
              Latvijā. Skatītāju ieteikumus, vidi un notikuma tematiku "Brīvrunu
              Projekts" pārvērš repa improvizācijas etīdēs, kas rada pacilājošas emocijas
              un pasākuma pievienoto vērtību. Astoņu gadu laikā izkoptie formāti
              uzrunā plašu auditoriju, neatkarīgi no vecuma vai izpratnes par repu.
            </div>
            
            {/* Team Members Grid */}
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedTeamMember(member)}
                  >
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-3 overflow-hidden">
                      <img
                        src={member.smallImage}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-sm md:text-base text-center font-medium">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Member Modal */}
            {selectedTeamMember && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 overflow-y-auto"
                onClick={() => setSelectedTeamMember(null)}
              >
                <div 
                  className="relative max-w-4xl w-full bg-white p-4 md:p-6 my-8"
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedTeamMember(null)}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="w-full mb-4">
                    <img
                      src={selectedTeamMember.fullImage}
                      alt={selectedTeamMember.name}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{selectedTeamMember.name}</h3>
                  <p className="text-gray-700">{selectedTeamMember.description}</p>
                </div>
              </div>
            )}
          </section>

          {/* Testimonials Section */}
          <section ref={sectionRefs.atsauksmes} id="atsauksmes" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 snap-start">
            <div className="w-full max-w-6xl">
              <div className="text-center mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { company: 'SWEDBANK', logo: 'SWED' },
                    { company: 'STRAUME', logo: 'STRAUME' },
                    { company: 'LĪVĀNI', logo: 'LĪVĀNI' },
                    { company: 'IDEJU INSTITŪTS', logo: 'IDEJU INSTITŪTS' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white border border-black p-6 md:p-8 relative">
                      <div className="absolute -top-4 left-6 bg-white px-4 font-bold text-sm md:text-base">
                        {item.logo}
                      </div>
                      <div className="text-sm md:text-base lg:text-lg leading-relaxed mb-6">
                        "Sadarbība ar Brīvrunu Projektu vienmēr ir bijusi ļoti iedvesmojoša un profesionāla. Viņu spēja radīt saturu, kas uzrunā un aizrauj, ir patiesi unikāla. Projekti, ko īstenojām kopā ar viņiem, bija ne tikai kvalitatīvi, bet arī emocionāli spēcīgi un ar lielu pievienoto vērtību mūsu auditorijai."
                      </div>
                      <div className="text-right font-medium">
                        — {item.company}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="font-bold text-sm md:text-base mb-6">MŪSU PARTNERI</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center items-center">
                  {[
                    { logo: swedbankLogo, name: 'Swedbank' },
                    { logo: jagermeisterLogo, name: 'Jägermeister' },
                    { logo: ghettoGamesLogo, name: 'Ghetto Games' },
                    { logo: vefLogo, name: 'VEF' },
                    { logo: ventspilsNaftaLogo, name: 'Ventspils Nafta' },
                    { logo: theBronxsLogo, name: 'The Bronxs' },
                    { logo: dzinatrsLogo, name: 'Dzinātŗs' },
                    { logo: spilvaLogo, name: 'Spilva' }
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

              <div className="relative my-12">
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
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Gallery Section */}
      {activeSection === 'galerija' && (
        <section id="galerija" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 pt-20 md:pt-20">
          <div className="w-full max-w-7xl">
            <GalleryView galleries={galleries} />
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {activeSection === 'piedavajums' && (
        <section id="piedavajums" className="w-full min-h-screen flex flex-col items-center justify-start py-4 border-b border-black px-4 md:px-8 pt-24 md:pt-28">
          <div className="w-full max-w-4xl mx-auto mb-8 mt-4">
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

          <div className="w-full max-w-6xl mx-auto space-y-16">
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
      )}

      {/* Footer */}
      <footer className="w-full py-4 border-t border-black text-center text-sm md:text-base">
        © {new Date().getFullYear()} Brīvrunu Projekts. All rights reserved.
      </footer>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <AdminProvider>
      <GalleryProvider>
    <Routes>
      <Route path="/demo" element={<DemoPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
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
          <Route
            path="/admin/gallery/:id"
            element={
              <ProtectedRoute>
                <GalleryImages />
              </ProtectedRoute>
            }
          />
      <Route path="*" element={<UnderConstruction />} />
    </Routes>
      </GalleryProvider>
    </AdminProvider>
  );
}
