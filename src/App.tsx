

export default function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-bpGreen text-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-yellow-600 mb-4 whitespace-nowrap">
                    🚧 Under Construction 🚧
                </h1>
                <p className="text-gray-700 text-lg mb-2">
                    Iegriezies vēlāk!
                </p>
                <p className="text-gray-700 text-lg mb-6">
                    Mēs cepjam augšā ko jaudīgu!
                </p>
                <div className="animate-bounce text-yellow-500 text-5xl">‍👨‍🍳️</div>
            </div>
        </div>
    );
}

/*export default function App() {
    const teamMembers = [
        { name: 'JeeKaa', image: jeekaa, about: 'JeeKaa ir viens no "Brīvrunu Projekts" dalībniekiem, kurš izceļas ar tehniski precīzu plūsmu un spēcīgu liriku. Viņš regulāri piedalās brīvrunu batlos, demonstrējot gan ātru domāšanu, gan asu vārdu spēli. JeeKaa ir nozīmīga Latvijas freestyle repa scēnas daļa, aktīvi iesaistoties tās attīstībā.' },
        { name: 'Zirnis', image: zirnis, about: 'Zirnis ir viens no spilgtākajiem "Brīvrunu Projekts" dalībniekiem, pazīstams ar izcilām improvizācijas prasmēm un asprātīgu liriku. Viņš regulāri piedalās brīvrunu batlos un cīņās, demonstrējot spēju ātri reaģēt un veidot spēcīgas rindas. Zirnis ir nozīmīga figūra Latvijas freestyle repa scēnā.' },
        { name: 'Abra', image: abra, about: 'Abra ir viens no "Brīvrunu Projekts" dalībniekiem, kurš izceļas ar spēcīgu klātbūtni un asprātīgu improvizāciju. Viņš regulāri piedalās brīvrunu batlos, demonstrējot gan radošumu, gan asu vārdu spēli. Abra ir būtiska Latvijas freestyle repa scēnas daļa, aktīvi veicinot tās attīstību.' },
        { name: 'Sniegs', image: sniegs, about: 'Sniegs ir viens no "Brīvrunu Projekts" dalībniekiem, kurš izceļas ar daudzpusīgu plūsmu un radošu pieeju improvizācijai. Viņš regulāri piedalās brīvrunu batlos, demonstrējot gan asprātību, gan spēju ātri reaģēt. Sniegs ir nozīmīga Latvijas freestyle repa scēnas daļa, aktīvi piedaloties tās attīstībā.' },
        { name: 'Dj Birch Please', image: dj, about: 'DJ Birch Please ir "Brīvrunu Projekts" dīdžejs, kurš nodrošina enerģisku muzikālo pavadījumu brīvrunu batliem un pasākumiem. Viņa prasme atlasīt un miksēt bītus palīdz radīt īsto atmosfēru improvizācijai. DJ Birch Please ir svarīga Latvijas freestyle repa skatuves daļa, atbalstot tās attīstību ar savu muzikālo redzējumu.' },
        { name: 'E.V.', image: ev, about: 'E.V. ir viens no "Brīvrunu Projekts" dalībniekiem, kurš izceļas ar asu vārdu spēli un spēcīgu improvizācijas prasmi. Viņš regulāri piedalās brīvrunu batlos, demonstrējot gan radošumu, gan spēju ātri reaģēt uz pretinieka rindām. E.V. ir nozīmīga Latvijas freestyle repa scēnas daļa, aktīvi piedaloties tās attīstībā.' }
    ];

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
            {/!* Sections *!/}
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
                            className="border-t-5 border-b-5 border-transparent w-1/4 sm:w-1/4 md:w-1/4 lg:w-1/4 h-auto max-w-full"
                        />
                        <div className="text-white text-center font-bold">
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
                        className="bg-bpGreen overflow-hidden my-[100px] min-h-[100px] flex items-center">
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
                    <div className="bg-bpGreen w-full min-h-[150px] my-[30px] flex items-center">
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
                {/!* New Horizontal Scrollable Section *!/}
                <div className="h-screen flex flex-col justify-start items-center transition-all duration-500 ease-in-out scroll-snap-start"
                     style={{
                         backgroundImage: `url(${whatwedo})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <div className="relative w-full h-[60vh] mt-20">
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
                                                <li>Korporatīvie pasākumi</li>
                                                <li>Balles ledlauzis</li>
                                                <li>Iekustinātājs</li>
                                                <li>Izsmīdinātājs</li>
                                                <li>Labā garastāvokļa radītājs (ja nu kāds
                                                    groziņu paņēmis, bet labo garastāvokli atstājis mājās...)
                                                </li>
                                                <li>Īpaši piemērtoi audio tagi</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 15-20 minūtes
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
                                                <li>Mācību iestādēs</li>
                                                <li>Pilsētas svētkos</li>
                                                <li>Jaunas prasmes un zināšanas kā ar iztēli un balsi veidot asociācijas, stāstus, jokus un rīmes
                                                </li>
                                                <li>Iespēja vienlaikus iesaistīt līdz 30 dalbībniekiem</li>
                                                <li>Paraugdemonstrējumi no BP</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 60-90 minūtes
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
                                                <li>Festivālā</li>
                                                <li>Pilsētas svētkos</li>
                                                <li>Klubā</li>
                                                <li>Enerģijas vulkāns - mijiedarbībā ar skatītājiem veidots vienreizējs muzikāls priekšnesums, ko var baudīt gan sēdošā, gan lēkajosā formātā</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 30-45 minūtes
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
                                                <li>Izlaidumos</li>
                                                <li>Vecpuišu/vecmeitu ballitēs</li>
                                                <li>Citu intīmu pasākumu pārsteigums, kurā personalziētas rīmes dod prieka lādiņu svinībām</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 10-15 minūtes
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
                                                <li>Balvu pasniegšanas</li>
                                                <li>Produktu preznetācija</li>
                                                <li>Citu augstākās klases pasākumu mega hits - iespēja izveidot iepriekš izdomātu stāstu, tekstu un konceptu šovu, kas adzīvina humoru un iedvesmu</li>
                                            </ul>
                                        </li>
                                        <li className="flex items-center gap-2 xl:text-4xl self-start">
                                            <span className="text-green-400">⏱️</span> 5-30 minūtes
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-1/3 flex justify-center items-center">
                                    <img src={what_we_do_5} alt="Third Slide" className="h-full w-auto overflow-hidden object-cover"/>
                                </div>
                            </div>
                        </div>

                        {/!* Navigation Buttons (Only inside this section) *!/}
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
                <div className="bg-bpGreen min-h-screen flex flex-col justify-start items-center scroll-snap-start overflow-hidden"
                     style={{
                         backgroundImage: `url(${what_we_do_2})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}
                     >

                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mt-20">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-bpGreen p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-white"
                                />
                                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                <p className="text-white mt-2 text-sm">{member.about}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-bpGreen min-h-screen flex flex-col justify-start items-center scroll-snap-start overflow-hidden"
                     style={{
                         backgroundImage: `url(${whatwedo})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <p className="text-white text-4xl xl:text-6xl font-bold mt-5 mb-6">Partneri</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4">
                        {/!* Repeat this div for each partner icon *!/}
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_1} alt="Partner 1" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_2} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_3} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_4} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_5} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_6} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_7} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_8} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_9} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_10} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_11} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_12} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_13} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                        <div className="flex justify-center items-center bg-bpGreen p-4 rounded-lg">
                            <img src={partner_14} alt="Partner 2" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </div>
                    </div>
                </div>
                <div className="bg-bpGreen min-h-screen flex flex-col justify-start items-center scroll-snap-start overflow-hidden"
                     style={{
                         backgroundImage: `url(${whatwedo})`,
                         backgroundSize: 'cover',
                         backgroundPosition: 'center',
                     }}>
                    <p className="text-white text-4xl xl:text-6xl font-bold mt-5 mb-6">Meklē mūs šeit</p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 xl:mt-30 px-4 mb-8">
                        {/!* YouTube *!/}
                        <a href="https://www.youtube.com/@brivrunuprojekts8416" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center bg-bpGreen p-4 rounded-lg overflow-hidden bg-cover">
                            <img src={youtube} alt="YouTube" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </a>
                        {/!* Spotify *!/}
                        <a href="https://open.spotify.com/artist/0bnglFd0oM0O6ZUChuwms2" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center bg-bpGreen p-4 rounded-lg overflow-hidden">
                            <img src={spotify} alt="Spotify" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </a>
                        {/!* Facebook *!/}
                        <a href="https://www.facebook.com/BrivrunuProjekts" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center bg-bpGreen p-4 rounded-lg overflow-hidden">
                            <img src={facebook} alt="Facebook" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </a>
                        {/!* Instagram *!/}
                        <a href="https://www.instagram.com/brivrunuprojekts" target="_blank" rel="noopener noreferrer" className="flex justify-center items-center bg-bpGreen p-4 rounded-lg overflow-hidden">
                            <img src={instagram} alt="Instagram" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" />
                        </a>
                    </div>

                    {/!* Contact Form *!/}
                    <form action="mailto:theeriksfreimanis@gmail.com" method="post" encType="multipart/form-data" className="flex flex-col items-center bg-bpGreen p-4 rounded-lg mt-auto mb-4">
                        <label htmlFor="question" className="text-white text-xl mb-2 ml-5 mr-5">Ir kāds jautājums? Sūti šurp!</label>
                        <textarea
                            id="question"
                            name="question"
                            className="w-64 sm:w-80 md:w-96 p-3 text-black rounded-lg mb-4"
                            placeholder="Ievadi jautājumu šeit..."
                        ></textarea>
                        <button type="submit" className="bg-white text-bpGreen font-bold py-2 px-4 rounded-lg">
                            Sūtīt
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}*/

