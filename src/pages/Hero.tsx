import React, { useRef, useLayoutEffect, useState } from 'react';
import titleImg from '../assets/title.jpg';

interface HeroProps {
  onSectionChange?: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxStyle, setBoxStyle] = useState<React.CSSProperties>({});
  const [secondLineStyle, setSecondLineStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    function updateBox() {
      if (imgRef.current) {
        const imgRect = imgRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate bottom margin based on screen size
        let bottomMargin;
        if (viewportWidth >= 1536) { // 2xl screens
          bottomMargin = 0.15; // 15% from bottom
        } else if (viewportWidth >= 1280) { // xl screens
          bottomMargin = 0.2; // 20% from bottom
        } else if (viewportWidth >= 1024) { // lg screens
          bottomMargin = 0.25; // 25% from bottom
        } else if (viewportWidth >= 768) { // md screens
          bottomMargin = 0.3; // 30% from bottom
        } else {
          bottomMargin = 0.35; // 35% from bottom for mobile
        }
        
        // Calculate box size with responsive scaling
        let baseSize;
        if (viewportWidth >= 1536) { // 2xl screens
          baseSize = Math.min(viewportWidth * 0.08, 160); // 8% of width, max 160px
        } else if (viewportWidth >= 1280) { // xl screens
          baseSize = Math.min(viewportWidth * 0.09, 140); // 9% of width, max 140px
        } else if (viewportWidth >= 1024) { // lg screens
          baseSize = Math.min(viewportWidth * 0.1, 130); // 10% of width, max 130px
        } else if (viewportWidth >= 768) { // md screens
          baseSize = Math.min(viewportWidth * 0.11, 120); // 11% of width, max 120px
        } else {
          baseSize = Math.min(viewportWidth * 0.12, 80); // 12% of width, max 80px for mobile
        }
        
        const boxHeight = Math.max(baseSize, 50); // Reduced minimum height to 50px
        const boxWidth = boxHeight * 5.5; // Decreased from 6.5 to 5.5 times the height for narrower box
        const secondLineFontSize = boxHeight * 0.2; // Decreased from 0.25 to 0.2 for smaller text
        
        // Calculate position to ensure it stays within the image
        const maxLeft = imgRect.width - boxWidth - (imgRect.width * 0.02); // 2% margin
        const maxBottom = imgRect.height - boxHeight - (imgRect.height * bottomMargin); // Dynamic bottom margin
        
        setBoxStyle({
          position: 'absolute',
          width: `${boxWidth}px`,
          height: `${boxHeight}px`,
          background: 'rgb(0, 0, 0)',
          borderRadius: '0', // Removed border radius for rectangular corners
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start', // Changed to flex-start for left alignment
          justifyContent: 'center',
          padding: '0.75rem 0.75rem 0.75rem 1.5rem', // Increased left padding to 1.5rem
          pointerEvents: 'auto', // Changed from 'none' to 'auto' to allow clicking
          fontSize: `${boxHeight * 0.45}px`,
          lineHeight: 1.2,
          left: `${Math.min(imgRect.width * 0.02, maxLeft)}px`,
          bottom: `${Math.min(imgRect.height * bottomMargin, maxBottom)}px`,
        });

        setSecondLineStyle({
          fontSize: `${secondLineFontSize}px`,
          marginTop: '0.25rem', // Add some space between lines
        });
      }
    }
    updateBox();
    window.addEventListener('resize', updateBox);
    return () => window.removeEventListener('resize', updateBox);
  }, []);

  return (
    <section
      className="relative w-full flex items-center justify-center bg-black overflow-hidden"
      style={{
        minHeight: 300,
        height: '100svh',
      }}
    >
      <div
        ref={containerRef}
        className="relative h-full flex items-center justify-center"
        style={{
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        <div className="relative h-full">
          <img
            ref={imgRef}
            src={titleImg}
            alt="Brīvrunu Kas"
            className="h-full w-auto object-contain"
            style={{ display: 'block' }}
          />
          <div style={boxStyle}>
            <span className="text-white font-bold whitespace-nowrap">
              TAS IR BRĪVRUNU KAS?
            </span>
            <div 
              onClick={() => onSectionChange?.('piedavajums')}
              className="text-white whitespace-nowrap hover:text-gray-300 transition-colors cursor-pointer" 
              style={secondLineStyle}
            >
              UZZINĀT VAIRĀK
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 