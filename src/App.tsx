import {useState} from "react";
import backgroundImage from './assets/0.jpg';
import members from './assets/members.jpg';
import whiteLogo from './assets/2.png';
import sniegs from './assets/sniegs.png';
import jeekaa from './assets/jeekaa_outline.png';
import dj from './assets/dj_outline.png';
import zirnis from './assets/zirnis_outline.png';
import abra from './assets/abra_outline.png';
import * as React from "react";


export default function App() {
    const [activeSection, setActiveSection] = useState("home");

    return (
        <div className="h-screen w-full scroll-smooth">
            {/* Navigation Bar */}
            <nav
                className="fixed top-0 w-full bg-bpGreen text-white py-4 px-6 flex justify-center space-x-6 shadow-lg z-50">
                {["home", "portfolio", "members", "contact"].map((section) => (
                    <a
                        key={section}
                        href={`#${section}`}
                        className={`capitalize hover:text-blue-400 transition ${
                            activeSection === section ? "text-blue-400" : ""
                        }`}
                        onClick={() => setActiveSection(section)}
                    >
                        {section === "home" ? "Brīvrunu Projekts" :
                            section === "portfolio" ? "Par mums" :  section === "members" ? "Dalībnieki" : "Kontakti"}
                    </a>
                ))}
            </nav>

            {/* Sections */}
            <div className="space-y-16 pt-20">
                <HomeSection id="home" backgroundImage={backgroundImage}>
                    <p>Welcome to my portfolio! Scroll down to see my work.</p>
                </HomeSection>

                <AboutUsSection id="portfolio">
                    <p>Here are some of my projects and works.</p>
                </AboutUsSection>

                <MembersSection id="members" backgroundImage={members}>
                    <p>Here are some of my projects and works.</p>
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
            className="h-screen flex flex-col justify-center items-center bg-gray-100"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Horizontal line as a div */}
            <div
                className="w-full h-50 bg-bpGreen my-4 mt-80 flex items-center justify-center overflow-hidden border-t-10 border-b-10 border-white">
                <div className="flex items-center justify-center space-x-4 w-full max-w-7xl px-4">
                    <img src={whiteLogo} alt="Image" className="w-1/2 h-auto"/>
                    <div className="text-white font-bold w-1/2">
                        <p className="w-fit h-full text-[2vw]">
                            REPA IMPROVIZĀCIJAS
                        </p>
                        <p className="w-fit text-[2vw]">
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
            className="h-screen flex flex-col justify-center items-center bg-bpGreen"
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
                            backgroundImage,
                        }: {
    id: string;
    children: React.ReactNode;
    backgroundImage?: string;
}) {
    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center items-center bg-bpGreen relative"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex justify-start w-full h-full gap-10">
                <img
                    src={jeekaa}
                    alt="Description of image"
                    className="w-1/3 h-1/3 mt-120 object-contain hover:scale-105"
                />
                <img
                    src={sniegs}
                    alt="Description of image"
                    className="w-1/2 h-1/2 object-contain hover:scale-105"
                />
                <img
                    src={abra}
                    alt="Description of image"
                    className="w-1/2 h-1/2 object-contain hover:scale-105"
                />
                <img
                    src={zirnis}
                    alt="Description of image"
                    className="w-1/2 h-1/2 object-contain hover:scale-105"
                />
                <img
                    src={dj}
                    alt="Description of image"
                    className="w-1/2 h-1/2 object-contain hover:scale-105"
                />

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
            className="h-screen flex flex-col justify-center items-center bg-bpGreen"
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

