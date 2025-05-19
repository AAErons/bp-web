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

  const teamMembers = [
    { name: 'E.V.', description: '"Kreisais Krasts" biedrs, kurš prot performēt divās valodās: latviešu un angļu. Ne tikai harizmātisks ceremoniju meistars, bet arī skatuves magnēts, kas apvieno psiholoģijas gudrības ar skanīgām vārdu vārsmām.', smallImage: evSmall, fullImage: evFull },
    { name: 'Zirnis', description: 'Divkartējs "Ghetto Games" brīvrunu batla "Štuka par bazaru" uzvarētājs. BP radošais dzinējs un pulksteņmeistars. Zirnim vienmēr ir plāns un pēc vārda kabatā nav jāmeklē, jo viņš spēj uzburt reālu frīstailu jebkurā laikā un vietā.', smallImage: zirnisSmall, fullImage: zirnisFull },
    { name: 'Jeekaa', description: '"Kreisais Krasts" vecbiedrs ar aptuveni 20 gadu bagāžu brīvrunā! Viņa stils? Mierīga plūsma, asi joki, pašironija un spēja pielāgoties jebkādiem apstākļiem. No mazām skatuvēm līdz lielām hallēm - JeeKaa vienmēr ienes īstu vārdu spēles garšu!', smallImage: jeekaaSmall, fullImage: jeekaaFull },
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
            <div className="text-center font-bold text-base md:text-lg mb-6">ATSAUKSMES</div>
            <div className="text-center mb-8">Šeit būs atsauksmes no klientiem.</div>
            
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <div className="font-bold text-sm md:text-base mb-4">MŪSU PARTNERI</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 flex items-center justify-center">
                      LOGO {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="font-bold text-sm md:text-base mb-2">4 ATSAUKSMES NO:</div>
                <div className="text-sm md:text-base">SWED, STRAUME, LĪVĀNI, IDEJU INSTITŪTS</div>
              </div>

              <div className="text-center">
                <div className="font-bold text-sm md:text-base mb-2">SOCIĀLIE TĪKLI</div>
                <div className="flex justify-center gap-4">
                  <a href="#" className="text-sm md:text-base underline">INSTAGRAM</a>
                  <a href="#" className="text-sm md:text-base underline">FACEBOOK</a>
                  <a href="#" className="text-sm md:text-base underline">LINKEDIN</a>
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
        <section id="piedavajums" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 pt-20 md:pt-20">
          <h2 className="text-center text-lg md:text-xl font-bold mb-6">KĀ TAS DARBOJAS?</h2>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="space-y-4 flex flex-col items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-center w-full">
                  <div className="w-24 h-16 md:w-32 md:h-20 bg-black text-white flex items-center justify-center mr-4 text-sm md:text-base">FOTO/VIDEO PIEMĒRS</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
                <div className="border p-2 md:p-4 text-center">
                  <div className="font-bold text-sm md:text-base">KONCERTS</div>
                  <div className="text-xs md:text-sm">15-45 MIN</div>
                  <div className="text-xs">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
                <div className="border p-2 md:p-4 text-center">
                  <div className="font-bold text-sm md:text-base">DARBĪNĪCA</div>
                  <div className="text-xs md:text-sm">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
                <div className="border p-2 md:p-4 text-center">
                  <div className="font-bold text-sm md:text-base">PRIVĀTS</div>
                  <div className="text-xs md:text-sm">15-45 MIN</div>
                  <div className="text-xs">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
                <div className="border p-2 md:p-4 text-center">
                  <div className="font-bold text-sm md:text-base">RAKSTĪTS</div>
                  <div className="text-xs md:text-sm">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
              </div>
              <div className="w-full">
                <div className="border p-2 md:p-4 text-center">
                  <div className="font-bold text-sm md:text-base">REKLĀMA</div>
                  <div className="text-xs md:text-sm">AUDIO / VIDEO</div>
                  <div className="text-xs">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
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
