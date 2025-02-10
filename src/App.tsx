import backgroundImage from './assets/0.jpg';
import members from './assets/members.jpg';
import whiteLogo from './assets/2.png';
import sniegs from './assets/sniegs.png';
import jeekaa from './assets/jeekaa_outline.png';
import dj from './assets/dj_outline.png';
import zirnis from './assets/zirnis_outline.png';
import abra from './assets/abra_outline.png';
import about_us from './assets/about_us.jpg';
import * as React from "react";
import {useState} from "react";


export default function App() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen w-full scroll-smooth overflow-y-scroll scroll-snap-type-y mandatory">
            {/* Sections */}
            <div className="space-y-5 scroll-snap-start">
                <HomeSection id="home" backgroundImage={backgroundImage}>
                    <p>Welcome to my portfolio! Scroll down to see my work.</p>
                </HomeSection>

                <AboutUsSection id="portfolio" backgroundImage={about_us}>
                    <p>Here are some of my projects and works.</p>
                </AboutUsSection>

                <MembersSection id="members" backgroundImage={members} useClick={handleClick} isOpen={isOpen}>
                </MembersSection>

                <EmptySection id="contact">
                    <p>Get in touch with me through my socials or email.</p>
                </EmptySection>
            </div>
        </div>
    );
}

function HomeSection({
                         id,
                         backgroundImage,
                     }: {
    id: string;
    children: React.ReactNode;
    backgroundImage?: string;
}) {
    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center items-center scroll-snap-start bg-gray-100"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Horizontal line as a div */}
            <div className="w-full bg-bpGreen my-4 mt-80 flex items-center justify-center overflow-hidden border-t-10 border-b-10 border-white h-[15vh]">
                <div className="flex items-center justify-center space-x-4 w-full max-w-7xl px-4">
                    <img
                        src={whiteLogo}
                        alt="Image"
                        className="w-1/2 h-auto max-w-full sm:w-1/3 md:w-1/4 lg:w-1/4"
                    />
                    <div className="text-white font-bold w-1/2">
                        <p className="w-fit h-full text-[2vw]">
                            REPA IMPROVIZĀCIJAS
                        </p>
                        <p className="text-white font-bold w-fit text-[2vw]">
                            PARSTEIGUMS JŪSU PASĀKUMĀ
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutUsSection({
                            id,
                            backgroundImage,
                        }: {
    id: string;
    children: React.ReactNode;
    backgroundImage?: string;
}) {
    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center scroll-snap-start items-center bg-bpGreen"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <p className="text-9xl text-cyan-50">Section Under Construction!</p>


        </section>
    );
}

function MembersSection({
                            id,
                            useClick,
                            isOpen,
                            backgroundImage
                        }: {
    id: string;
    useClick: () => void;
    isOpen: boolean;
    backgroundImage?: string;
}) {
    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center scroll-snap-start items-center bg-bpGreen relative"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="relative w-full h-full">
                <img
                    src={jeekaa}
                    alt="Description of image"
                    className="absolute top-120 left-10 w-1/3 h-1/3 object-contain scale-[inherit] hover:scale-105"
                    onClick={useClick}
                />
                <img
                    src={sniegs}
                    alt="Description of image"
                    className="absolute top-90 right-190 w-1/2 h-1/2 object-contain scale-[inherit] hover:scale-105"
                    onClick={useClick}
                />
                <img
                    src={abra}
                    alt="Description of image"
                    className="absolute bottom-30 left-130 w-1/2 h-1/2 object-contain scale-[inherit] hover:scale-105"
                    onClick={useClick}
                />
                <img
                    src={zirnis}
                    alt="Description of image"
                    className="absolute bottom-10 left-190 w-1/2 h-1/2 object-contain scale-[inherit] hover:scale-105"
                    onClick={useClick}
                />
                
                <img
                    src={dj}
                    alt="Description of image"
                    className="absolute top-95 right-5 transform w-1/4 h-1/4 object-contain scale-[inherit] hover:scale-105"
                    onClick={useClick}
                />
                {isOpen && (
                    <div
                        className="relative h-1/2 w-1/2 inset-0 bg-bpGreen bg-opacity-50 flex justify-center items-center"
                        onClick={useClick} // Close the div when clicked outside
                    >
                        <div className="text-white p-4">
                            <p>This is your content inside the black background div!</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function EmptySection({
                          id,
                          backgroundImage,
                      }: {
    id: string;
    children: React.ReactNode;
    backgroundImage?: string;
}) {
    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center scroll-snap-start items-center bg-bpGreen"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <p className="text-9xl text-cyan-50">Section Under Construction!</p>

        </section>
    );
}

