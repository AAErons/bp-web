import backgroundImage from './assets/0.jpg';
import whiteLogo from './assets/bp_logo_no_mwarg.png';
import about_us from './assets/about_us_3.jpg';
import about_us_2 from './assets/about_us_2.jpg';
import whatwedo from './assets/what_we_do.png';


export default function App() {
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
                <div className="bg-bpGreen h-screen flex flex-col justify-center items-center scroll-snap-start">
                    <h2 className="text-white text-4xl font-bold mb-6">Mūsu Performances</h2>
                    <div className="w-full h-[80vh] flex overflow-x-auto space-x-4 px-10 snap-x snap-mandatory">
                        <div className="min-w-[80vw] h-full bg-blue-500 flex snap-start">
                            <div className="w-2/3 flex justify-center items-center p-10">
                                <p className="text-white text-3xl">First Slide Description</p>
                            </div>
                            <div className="w-1/3 flex justify-center items-center">
                                <img src={whatwedo} alt="First Slide" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="min-w-[80vw] h-full bg-red-500 flex snap-start">
                            <div className="w-2/3 flex justify-center items-center p-10">
                                <p className="text-white text-3xl">Second Slide Description</p>
                            </div>
                            <div className="w-1/3 flex justify-center items-center">
                                <img src={whatwedo} alt="Second Slide" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="min-w-[80vw] h-full bg-yellow-500 flex snap-start">
                            <div className="w-2/3 flex justify-center items-center p-10">
                                <p className="text-white text-3xl">Third Slide Description</p>
                            </div>
                            <div className="w-1/3 flex justify-center items-center">
                                <img src={whatwedo} alt="Third Slide" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

