import backgroundImage from './assets/0.jpg';
import whiteLogo from './assets/2.png';
import about_us from './assets/about_us.jpg';
import about_us_2 from './assets/about_us_2.jpg';
import {useEffect, useRef} from "react";


const aboutUsSlides = [
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundImage: `url(${about_us})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    </div>,
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundImage: `url(${about_us_2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>,
    <div className="w-full h-full flex items-center justify-center bg-green-400 text-white text-3xl"></div>,
];

export default function App() {
    return (
        <div className="h-screen w-full scroll-smooth overflow-y-scroll scroll-snap-type-y mandatory">
            {/* Sections */}
            <div className="space-y-5 scroll-snap-start">
                <Section id="home" backgroundImage={backgroundImage}/>

                <AboutUsSection id="portfolio" backgroundImage={about_us}/>

                {/*<EmptySection id="members" backgroundImage={members}/>

                <EmptySection id="contact" />*/}
            </div>
        </div>
    );
}

function Section({id,backgroundImage}: {
    id: string;
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
                <div className="flex items-center justify-center space-x-2 w-full max-w-7xl">
                    <img
                        src={whiteLogo}
                        alt="Image"
                        className="w-1/2 h-auto max-w-full sm:w-1/4 md:w-1/4 lg:w-1/4"
                    />
                    <div className="text-white font-bold w-1/2">
                        <p className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                            REPA IMPROVIZĀCIJAS
                        </p>
                        <p className="text-sm md:text-lg lg:text-xl xl:text-2xl">
                            PARSTEIGUMS JŪSU PASĀKUMĀ
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutUsSection({ id, backgroundImage }: { id: string; backgroundImage?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Add first & last slide duplicates for looping
    const clonedSlides = [aboutUsSlides[aboutUsSlides.length - 1], ...aboutUsSlides, aboutUsSlides[0]];

    useEffect(() => {
        if (scrollRef.current) {
            // Start at the first real slide (index 1)
            const initialPosition = window.innerWidth;
            scrollRef.current.scrollLeft = initialPosition;
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const scrollAmount = window.innerWidth;
        const newPosition =
            direction === "left"
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

        scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });

        setTimeout(() => {
            if (!scrollRef.current) return;

            const maxScroll = scrollAmount * (aboutUsSlides.length);
            if (scrollRef.current.scrollLeft >= maxScroll) {
                // If at the fake last slide, jump to the first real slide
                scrollRef.current.scrollLeft = scrollAmount;
            } else if (scrollRef.current.scrollLeft <= 0) {
                // If at the fake first slide, jump to the last real slide
                scrollRef.current.scrollLeft = maxScroll - scrollAmount;
            }
        }, 500); // Timeout to allow smooth scrolling before the "jump"
    };

    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center items-center scroll-snap-start bg-gray-100 relative"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Scrollable Container */}
            <div ref={scrollRef} className="w-full h-full overflow-x-auto flex scroll-smooth no-scrollbar">
                {clonedSlides.map((aboutUsSlides, index) => (
                    <div key={index} className="min-w-full min-h-full">
                        {aboutUsSlides}
                    </div>
                ))}
            </div>

            {/* Left Button */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                ◀
            </button>

            {/* Right Button */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                ▶
            </button>
        </section>
    );
}

/*
function EmptySection({ id, backgroundImage }: { id: string; backgroundImage?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Add first & last slide duplicates for looping
    const clonedSlides = [aboutUsSlides[aboutUsSlides.length - 1], ...aboutUsSlides, aboutUsSlides[0]];

    useEffect(() => {
        if (scrollRef.current) {
            // Start at the first real slide (index 1)
            const initialPosition = window.innerWidth;
            scrollRef.current.scrollLeft = initialPosition;
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const scrollAmount = window.innerWidth;
        const newPosition =
            direction === "left"
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

        scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });

        setTimeout(() => {
            if (!scrollRef.current) return;

            const maxScroll = scrollAmount * (aboutUsSlides.length);
            if (scrollRef.current.scrollLeft >= maxScroll) {
                // If at the fake last slide, jump to the first real slide
                scrollRef.current.scrollLeft = scrollAmount;
            } else if (scrollRef.current.scrollLeft <= 0) {
                // If at the fake first slide, jump to the last real slide
                scrollRef.current.scrollLeft = maxScroll - scrollAmount;
            }
        }, 500); // Timeout to allow smooth scrolling before the "jump"
    };

    return (
        <section
            id={id}
            className="h-screen flex flex-col justify-center items-center scroll-snap-start bg-gray-100 relative"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/!* Scrollable Container *!/}
            <div ref={scrollRef} className="w-full h-full overflow-x-auto flex whitespace-nowrap scroll-smooth no-scrollbar">
                {clonedSlides.map((aboutUsSlides, index) => (
                    <div key={index} className="min-w-full h-full flex items-center justify-center bg-gray-200">
                        {aboutUsSlides}
                    </div>
                ))}
            </div>

            {/!* Left Button *!/}
            <button
                onClick={() => scroll("left")}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                ◀
            </button>

            {/!* Right Button *!/}
            <button
                onClick={() => scroll("right")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
                ▶
            </button>
        </section>
    );
}
*/
