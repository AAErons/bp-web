import backgroundImage from './assets/0.jpg';
import members from './assets/members.jpg';
import whiteLogo from './assets/2.png';
import about_us from './assets/about_us.jpg';
import {useEffect, useRef} from "react";


export default function App() {
    return (
        <div className="h-screen w-full scroll-smooth overflow-y-scroll scroll-snap-type-y mandatory">
            {/* Sections */}
            <div className="space-y-5 scroll-snap-start">
                <Section id="home" backgroundImage={backgroundImage}/>

                <EmptySection id="portfolio" backgroundImage={about_us}/>

                <EmptySection id="members" backgroundImage={members}/>

                <EmptySection id="contact" />
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

function EmptySection({ id, backgroundImage }: { id: string; backgroundImage?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const slides = ["Page 1", "Page 2", "Page 3"]; // Your actual slides

    // Add first & last slide duplicates for looping
    const clonedSlides = [slides[slides.length - 1], ...slides, slides[0]];

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

            const maxScroll = scrollAmount * (slides.length);
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
            <div ref={scrollRef} className="w-full h-full overflow-x-auto flex whitespace-nowrap scroll-smooth no-scrollbar">
                {clonedSlides.map((slide, index) => (
                    <div key={index} className="min-w-full h-full flex items-center justify-center bg-gray-200">
                        {slide}
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
