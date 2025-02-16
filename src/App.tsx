import backgroundImage from './assets/0.jpg';
import whiteLogo from './assets/2.png';
import about_us from './assets/about_us_3.jpg';
import about_us_2 from './assets/about_us_2.jpg';


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
                        className="w-full bg-bpGreen mt-40 flex flex-wrap items-center justify-center
        border-t-[4px] border-b-[4px] sm:border-t-[8px] sm:border-b-[8px]
        md:border-t-[6px] md:border-b-[6px] lg:border-t-[4px] lg:border-b-[4px]
        border-white"
                    >
                        <img
                            src={whiteLogo}
                            alt="Image"
                            className="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 h-auto max-w-full"
                        />
                        <div className="text-white font-bold text-center sm:text-left">
                            <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-serif">
                                REPA IMPROVIZĀCIJAS
                            </p>
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-serif">
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
                        className="bg-bpGreen overflow-hidden my-[20px] w-3/4 xl:w-2/4 md:w-2/4 min-h-[100px] flex items-center">
                        <div className="text-white flex flex-col justify-center items-start py-[10px]">
                            <p className="text-xl ml-5 xl:text-4xl font-serif">Kopš 2018.gada.</p>
                            <p className="text-2xl ml-5 font-bold xl:text-5xl font-serif">
                                Joprojām pirmais un vienīgais
                            </p>
                            <p className="text-xl ml-5 xl:text-4xl font-serif">
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
                            <p className="text-2xl xl:text-6xl md:text-4xl font-serif font-bold">
                                Viens kolektīvs, piecas dažādas performances
                            </p>
                            <p className="text-sm mt-2 xl:mt-10 xl:text-4xl md:text-2xl font-serif font-normal">
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
            </div>
        </div>
    );
}
