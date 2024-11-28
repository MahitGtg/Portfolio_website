import React, { ReactNode } from 'react';

interface GrainyBackgroundProps {
  children: ReactNode;
  className?: string;
}

const GrainyBackground: React.FC<GrainyBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Base background color */}
      <div className="absolute inset-0 bg-[#E6EEF4]" />
      
      {/* Very coarse primary grain */}
      <div 
        className="absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.4' numOctaves='5' seed='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Medium contrast heavy grain */}
      <div 
        className="absolute inset-0 opacity-[0.5] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='6' seed='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Sharp detailed grain */}
      <div 
        className="absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='microGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='7' seed='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23microGrain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '15px 15px',
        }}
      />

      {/* High contrast noise specks */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-color-burn"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckles'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='5' seed='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckles)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Extra coarse overlay for more texture */}
      <div 
        className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='extraCoarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23extraCoarse)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-50 mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default GrainyBackground;