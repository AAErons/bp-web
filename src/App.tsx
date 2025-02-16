import backgroundImage from './assets/0.jpg';
import whiteLogo from './assets/bp_logo_no_mwarg.png';
import about_us from './assets/about_us_3.jpg';
import about_us_2 from './assets/about_us_2.jpg';
import what_we_do_1 from './assets/what_we_do.png';
import what_we_do_2 from './assets/18.jpg';
import what_we_do_3 from './assets/19.jpg';
import what_we_do_4 from './assets/20.jpg';
import what_we_do_5 from './assets/21.jpg';
import {useEffect, useRef, useState} from "react";


export default function App() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // List of section images
    const sectionImages = [
        what_we_do_1,
        what_we_do_2,
        what_we_do_3,
        what_we_do_4,
        what_we_do_5
    ];

    // State to track current background image
    const [whatwedo, setWhatwedo] = useState(sectionImages[0]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Move by one section width
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Function to update background based on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollLeft, clientWidth } = scrollContainerRef.current;
                const currentIndex = Math.round(scrollLeft / clientWidth);
                setWhatwedo(sectionImages[currentIndex] || sectionImages[0]);
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div
            className="h-screen w-screen scroll-smooth [&::-webkit-scrollbar]:hidden overflow-y-scroll scroll-snap-type-y mandatory">
            {/* Sections */}
            <div className="scroll-snap-start">
                <div
                    className="bg-bpGreen h-screen flex flex-col justify-center items-center scroll-snap-start"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>

                    <div
                        className="w-full bg-bpGreen mt-40 xl:mt-80 flex flex-wrap items-center justify-center
        border-t-[4px] border-b-[4px] sm:border-t-[8px] sm:border-b-[8px]
        md:border-t-[6px] md:border-b-[6px] lg:border-t-[4px] lg:border-b-[4px]
        border-white gap-16 xl:gap-32"
                    >
                        <img
                            src={whiteLogo}
                            alt="Image"
                            className="border-t-5 border-b-5 border-transparent w-1/3 sm:w-1/4 md:w-1/4 lg:w-1/4 h-auto max-w-full"
                        />
                        <div className="text-white text-center sm:text-left font-bold">
                            <p className="text-xs md:text-xl lg:text-2xl xl:text-4xl">
                                REPA IMPROVIZĀCIJAS
                            </p>
                            <p className="text-xs md:text-xl lg:text-2xl xl:text-4xl">
                                PARSTEIGUMS JŪSU PASĀKUMĀ
                            </p>
                        </div>
                    </div>

                </div>
                <div className="bg-bpGreen h-screen w-screen flex flex-col justify-start items-start scroll-snap-start"
                     style={{
                         backgroundImage: `url(${about_us})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <div
                        className="bg-bpGreen overflow-hidden my-[20px] min-h-[100px] flex items-center">
                        <div className="text-white flex flex-col justify-center items-start py-[10px]">
                            <p className="text-lg ml-5 mr-5 xl:text-3xl">Kopš 2018.gada.</p>
                            <p className="text-xl ml-5 mr-5 font-bold xl:text-4xl">
                                Joprojām pirmais un vienīgais
                            </p>
                            <p className="text-lg ml-5 mr-5 xl:text-3xl">
                                repa improvizācijas teātris Latvijā.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-bpGreen h-screen flex flex-col justify-end items-center scroll-snap-start"
                     style={{
                         backgroundImage: `url(${about_us_2})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <div className="bg-bpGreen w-full min-h-[150px] my-[10px] flex items-center">
                        <div
                            className="text-white flex flex-col justify-center items-center py-[10px] text-center px-4">
                            <p className="text-2xl xl:text-6xl md:text-4xl font-bold">
                                Viens kolektīvs, piecas dažādas performances
                            </p>
                            <p className="text-sm mt-2 xl:mt-10 xl:text-4xl md:text-2xl font-normal">
                                Septiņu gadu laikā esam izkopuši repa improvizācijas jeb brīvrunas prasmes, lai jebkuru
                                skatītāju ieteikumu pārvērstu dziesmā, etīdē, komplimentā, batlā - priekšnesumā, kas
                                izklaidē
                                un aizrauj. Esam uzstājušies gan mazos klubos un dzimšanas dienas ballītēs, gan
                                festivālos,
                                Mežaparka estrādē vai Arēnā Rīga daudzu tūkstošu skatītāju priekšā. Esam “atkoduši” kā
                                brīvruna var kļūt par unikāli foršu pieredzi jūsu pasākumā!
                            </p>
                        </div>
                    </div>
                </div>
                {/* New Horizontal Scrollable Section */}
                <div className="h-screen flex flex-col justify-start items-center transition-all duration-500 ease-in-out scroll-snap-start"
                     style={{
                         backgroundImage: `url(${whatwedo})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <h2 className="text-white text-4xl xl:text-6xl font-bold mt-5 mb-6">Piedāvājums</h2>
                    <div className="relative w-full h-[80vh]">
                        <div ref={scrollContainerRef}
                             className="w-full h-full flex overflow-x-auto overflow-y-hidden space-x-4 px-10 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
                            <div className="min-w-[80vw] h-full bg-bpGreen flex snap-start">
                                <div className="w-2/3 flex flex-col justify-start items-left p-5">
                                    <h3 className="text-white text-2xl xl:text-6xl font-bold border-b-4 border-white pb-2 mb-4">
                                        Brīvrunu pārsteigums
                                    </h3>
                                    <ul className="list-disc list-outside text-white text-xl flex flex-col justify-between h-full">
                                        <li className="flex items-center xl:text-5xl">
                                            <span className="text-transparent xl:border-14"></span>
                                            <ul className="list-disc list-outside text-white xl:text-4xl pl-5 xl:space-y-4 text-sm">
                                                <li>KORPORATĪVĀ PASĀKUMĀ</li>
                                                <li>BALLES LEDLAUZIS</li>
                                                <li>IEKUSTINĀTĀJS</li>
                                                <li>IZSMĪDINĀTĀJS</li>
                                                <li>LABĀ GARASTĀVOKĻA RADĪTĀJS (JA NU KĀDS
                                                    GROZIŅU PAŅĒMIS, BET LABO GARASTĀVOKLI ATSTĀJIS MĀJĀS..)
                                                </li>
                                                <li>ĪPAŠI PIEMĒROTI AUDIO TAGI</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 15-20 MINŪTES
                                        </li>
                                    </ul>
                                </div>

                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_1} alt="First Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                            <div className="min-w-[80vw] h-full bg-bpGreen flex snap-start">
                                <div className="w-2/3 flex flex-col justify-start items-left p-5">
                                    <h3 className="text-white text-2xl xl:text-6xl font-bold border-b-4 border-white pb-2 mb-4">
                                        Brīvrunu darbnīca
                                    </h3>
                                    <ul className="list-disc list-outside text-white text-xl flex flex-col justify-between h-full">
                                        <li className="flex items-center xl:text-5xl">
                                            <span className="text-transparent xl:border-14"></span>
                                            <ul className="list-disc list-outside text-white xl:text-4xl pl-5 xl:space-y-4 text-sm">
                                                <li>MĀCĪBU IESTĀDES</li>
                                                <li>PILSĒTAS SVĒTKOS</li>
                                                <li>JAUNAS PRASMES UN ZINĀŠANAS KĀ AR IZTĒLI UN BALSI VEIDOT ASOCIĀCIJAS, STĀSTUS, JOKUS UN RĪMES
                                                </li>
                                                <li>IESPĒJA VIENLAIKUS IESAISTĪT LĪDZ 30
                                                    DALĪBNIEKIEM
                                                </li>
                                                <li>PARAUGDEMONSTRĒJUMI NO BP</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 60-90 MINŪTES
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_2} alt="Second Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                            <div className="min-w-[80vw] h-full bg-bpGreen flex snap-start">
                                <div className="w-2/3 flex flex-col justify-start items-left p-5">
                                    <h3 className="text-white text-2xl xl:text-6xl font-bold border-b-4 border-white pb-2 mb-4">
                                        Brīvrunu koncerts
                                    </h3>
                                    <ul className="list-disc list-outside text-white text-xl flex flex-col justify-between h-full">
                                        <li className="flex items-center xl:text-5xl">
                                            <span className="text-transparent xl:border-14"></span>
                                            <ul className="list-disc list-outside text-white xl:text-4xl pl-5 xl:space-y-4 text-sm">
                                                <li>FESTIVĀLĀ</li>
                                                <li>PILSĒTAS SVĒTKOS</li>
                                                <li>KLUBĀ</li>
                                                <li>ENERĢIJAS VULKĀNS - MIJIEDARBĪBĀ AR
                                                    SKATĪTĀJIEM VEIDOTS VIENREIZĒJS MUZIKĀLS
                                                    PRIEKŠNESUMS, KO VAR BAUDĪT GAN SĒDOŠĀ,
                                                    GAN LĒKĀJOŠĀ FORMĀTĀ
                                                </li>
                                                <li>ĪPAŠI PIEMĒROTI AUDIO TAGI</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 30-45 MINŪTES
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_3} alt="Third Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                            <div className="min-w-[80vw] h-full bg-bpGreen flex snap-start">
                                <div className="w-2/3 flex flex-col justify-start items-left p-5">
                                    <h3 className="text-white text-2xl xl:text-6xl font-bold border-b-4 border-white pb-2 mb-4">
                                        Brīvrunu acoustic
                                    </h3>
                                    <ul className="list-disc list-outside text-white text-xl flex flex-col justify-between h-full">
                                        <li className="flex items-center xl:text-5xl">
                                            <span className="text-transparent xl:border-14"></span>
                                            <ul className="list-disc list-outside text-white xl:text-4xl pl-5 xl:space-y-4 text-sm">
                                                <li>IZLAIDUMOS</li>
                                                <li>VECPUIŠU/VECMEITU BALLĪTĒS</li>
                                                <li>CITU INTĪMU PASĀKUMU PĀRSTEIGUMS, KURĀ
                                                    PERSONALIZĒTAS RĪMES DOD PRIEKA LĀDIŅU
                                                    SVINĪBĀM
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 10-15 MINŪTES
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_4} alt="Third Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                            <div className="min-w-[80vw] h-full bg-bpGreen flex snap-start">
                                <div className="w-2/3 flex flex-col justify-start items-left p-5">
                                    <h3 className="text-white text-2xl xl:text-6xl font-bold border-b-4 border-white pb-2 mb-4">
                                        Iestudēts priekšnesums
                                    </h3>
                                    <ul className="list-disc list-outside text-white text-xl flex flex-col justify-between h-full">
                                        <li className="flex items-center xl:text-5xl">
                                            <span className="text-transparent xl:border-14"></span>
                                            <ul className="list-disc list-outside text-white xl:text-4xl pl-5 xl:space-y-4 text-sm">
                                                <li>BALVU PASNIEGŠANAS</li>
                                                <li>PRODUKTU
                                                    PREZENTĀCIJAS
                                                </li>
                                                <li>CITU AUGSTĀKĀS KLASES
                                                    PASĀKUMU MEGA HITS - IESPĒJA IZVEIDOT
                                                    IEPRIEKŠ IZDOMĀTU STĀSTU, TEKSTU UN
                                                    KONCEPTU ŠOVU, KAS ATDZĪVINA HUMORU UN
                                                    IEDVESMU
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 5-30 MINŪTES
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_5} alt="Third Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons (Only inside this section) */}
                        <button
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full"
                            onClick={() => scroll("left")}
                        >
                            ◀
                        </button>
                        <button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full"
                            onClick={() => scroll("right")}
                        >
                            ▶
                        </button>
                    </div>
                </div>
                <div className="bg-bpGreen h-screen flex flex-col justify-start items-center scroll-snap-start"
                     style={{
                         backgroundImage: `url(${whatwedo})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <p className="text-white text-4xl xl:text-6xl font-bold mt-5 mb-6">Dalībnieki</p>
                </div>
            </div>
        </div>
    );
}

