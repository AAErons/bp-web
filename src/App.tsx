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
                        className="w-full bg-bpGreen my-4 mt-80 flex items-center justify-center overflow-hidden border-t-10 border-b-10 border-white h-[15vh]">
                        <img
                            src={whiteLogo}
                            alt="Image"
                            className="w-1/2 h-auto max-w-full sm:w-1/4 md:w-1/4 lg:w-1/4 "
                        />
                        <div className="text-white font-bold">
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                                REPA IMPROVIZĀCIJAS
                            </p>
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl">
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
                    <div className="bg-bpGreen overflow-hidden my-[20px] w-3/4 xl:w-2/4 md:w-2/4 min-h-[100px] flex items-center">
                        <div className="text-white flex flex-col justify-center items-start py-[10px]">
                            <p className="text-xl ml-5 xl:text-4xl">Kopš 2018.gada.</p>
                            <p className="text-2xl ml-5 font-bold xl:text-5xl">
                                Joprojām pirmais un vienīgais
                            </p>
                            <p className="text-xl ml-5 xl:text-4xl">
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
                        <div className="text-white flex flex-col justify-center items-center py-[10px] text-center px-4">
                            <p className="text-2xl xl:text-6xl md:text-4xl font-bold">
                                Viens kolektīvs, piecas dažādas performances
                            </p>
                            <p className="text-sm mt-2 xl:mt-10 xl:text-4xl md:text-2xl font-normal">
                                Septiņu gadu laikā esam izkopuši repa improvizācijas jeb brīvrunas prasmes, lai jebkuru
                                skatītāju ieteikumu pārvērstu dziesmā, etīdē, komplimentā, batlā - priekšnesumā, kas izklaidē
                                un aizrauj. Esam uzstājušies gan mazos klubos un dzimšanas dienas ballītēs, gan festivālos,
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
