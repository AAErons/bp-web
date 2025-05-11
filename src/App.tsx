import './index.css';
import { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';


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
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    atsauksmes: useRef<HTMLDivElement>(null),
  };

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
          <section ref={sectionRefs.hero} id="bp" className="w-full min-h-screen flex flex-col items-center justify-center py-8 md:py-12 border-b border-black px-4 md:px-8 snap-start">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full h-32 md:h-48 bg-gray-200 flex items-center justify-center mb-4 md:mb-6">
                <span className="text-lg md:text-2xl font-bold text-center px-4">BILDE AR SAUKLI UN <a href="#piedavajums" className="underline">LINKU UZ PIEDĀVĀJUMU</a></span>
              </div>
            </div>
          </section>

          {/* About & Team Section */}
          <section ref={sectionRefs.about} id="komanda" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 snap-start">
            <h2 className="text-center text-lg md:text-xl font-bold mb-2">BP VIENĀ TEIKUMĀ</h2>
            <div className="text-center mb-8 md:mb-12">Apraksts vienā teikumā šeit.</div>
            <h3 className="text-center text-base md:text-lg font-bold mb-6">KOMANDA</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 justify-items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-black mb-3"></div>
                  <span className="text-sm md:text-base text-center">KOMANDAS LOČEKLIS {i + 1}</span>
                </div>
              ))}
            </div>
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
          <div className="text-center font-bold text-base md:text-lg mb-8">GALERIJA</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-black mb-2"></div>
                <span className="text-sm md:text-base">LOREM IPSUM</span>
              </div>
            ))}
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

export default function App() {
  return (
    <Routes>
      <Route path="/demo" element={<DemoPage />} />
      <Route path="*" element={<UnderConstruction />} />
    </Routes>
  );
}
