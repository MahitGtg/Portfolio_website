import React, { ReactNode, useEffect } from 'react';

interface GrainyBackgroundProps {
  children: ReactNode;
  className?: string;
}

const GrainyBackground: React.FC<GrainyBackgroundProps> = ({ children, className = '' }) => {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <div 
      className={`
        fixed inset-0 
        overflow-y-auto 
        scrollbar-none 
        touch-pan-y 
        bg-[#fdfeff] 
        bg-repeat 
        bg-[length:100px_100px]
        ${className}
      `}
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        WebkitOverflowScrolling: 'touch',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default GrainyBackground;