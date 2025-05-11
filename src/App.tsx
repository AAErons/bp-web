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
  const [activeSection, setActiveSection] = useState('main'); // 'main', 'galerija', 'piedavajums'
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
  };

  return (
    <div className="w-full min-h-screen bg-white text-black flex flex-col">
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-black bg-white flex justify-center px-4 md:px-8 h-20 flex-shrink-0">
        <ul className="flex w-full max-w-screen-2xl h-full items-center">
          <li className={`flex-1 text-center py-4 border-r border-black font-bold cursor-pointer`} onClick={() => handleMenuClick('hero')}>BP</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('about')}>KOMANDA</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('piedavajums')}>PIEDĀVĀJUMS</li>
          <li className={`flex-1 text-center py-4 border-r border-black cursor-pointer`} onClick={() => handleMenuClick('galerija')}>GALERIJA</li>
          <li className={`flex-1 text-center py-4 cursor-pointer`} onClick={() => handleMenuClick('atsauksmes')}>ATSAUKSMES</li>
        </ul>
      </nav>

      {/* Main Scrollable Slides */}
      {activeSection === 'main' && (
        <main className="flex-1 w-full pt-20 snap-y snap-mandatory overflow-y-auto">
          {/* Hero Section */}
          <section ref={sectionRefs.hero} id="bp" className="w-full min-h-screen flex flex-col items-center justify-center py-12 border-b border-black px-4 md:px-8 snap-start">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-center">BILDE AR SAUKLI UN <a href="#piedavajums" className="underline">LINKU UZ PIEDĀVĀJUMU</a></span>
              </div>
            </div>
          </section>

          {/* About & Team Section */}
          <section ref={sectionRefs.about} id="komanda" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 snap-start">
            <h2 className="text-center text-xl font-bold mb-2">BP VIENĀ TEIKUMĀ</h2>
            <div className="text-center mb-6">Apraksts vienā teikumā šeit.</div>
            <h3 className="text-center text-lg font-bold mb-4">KOMANDA</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-black mb-2"></div>
                  <span>LOREM IPSUM</span>
                </div>
              ))}
            </div>
            <div className="text-center mb-4">LOGO: PARTNERI</div>
            <div className="text-center mb-4 font-bold">4 ATSAUKSMES: <span className="font-normal">SWED, STRAUME, LĪVĀNI, IDEJU INSTITŪTS</span></div>
            <div className="text-center">LINKI UZ SOC</div>
          </section>

          {/* Testimonials Section */}
          <section ref={sectionRefs.atsauksmes} id="atsauksmes" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8 snap-start">
            <div className="text-center font-bold text-lg">ATSAUKSMES</div>
            <div className="text-center mt-4">Šeit būs atsauksmes no klientiem.</div>
          </section>
        </main>
      )}

      {/* Gallery Section (only visible when selected) */}
      {activeSection === 'galerija' && (
        <section id="galerija" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8">
          <div className="text-center font-bold text-lg mb-8">GALERIJA</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 bg-black mb-2"></div>
                <span>LOREM IPSUM</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How It Works Section (only visible when selected) */}
      {activeSection === 'piedavajums' && (
        <section id="piedavajums" className="w-full min-h-screen flex flex-col items-center justify-center py-8 border-b border-black px-4 md:px-8">
          <h2 className="text-center text-xl font-bold mb-6">KĀ TAS DARBOJAS?</h2>
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="space-y-4 flex flex-col items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="w-32 h-20 bg-black text-white flex items-center justify-center mr-4">FOTO/VIDEO PIEMĒRS</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-center items-center">
                <div className="flex-1 border p-4 text-center mx-2 my-2">
                  <div className="font-bold">KONCERTS</div>
                  <div>15-45 MIN</div>
                  <div className="text-xs">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
                <div className="flex-1 border p-4 text-center mx-2 my-2">
                  <div className="font-bold">DARBĪNĪCA</div>
                  <div>ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-center items-center">
                <div className="flex-1 border p-4 text-center mx-2 my-2">
                  <div className="font-bold">PRIVĀTS</div>
                  <div>15-45 MIN</div>
                  <div className="text-xs">ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
                <div className="flex-1 border p-4 text-center mx-2 my-2">
                  <div className="font-bold">RAKSTĪTS</div>
                  <div>ATSLEGVĀRDI, KAM PIEMEROTS</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 w-full justify-center items-center">
                <div className="flex-1 border p-4 text-center mx-2 my-2">
                  <div className="font-bold">REKLĀMA</div>
                  <div>AUDIO / VIDEO</div>
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
