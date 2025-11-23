import React, { useEffect, useState } from 'react';

export const SatelliteVisualizer: React.FC = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[300px]">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'radial-gradient(#00d6cb 1px, transparent 1px)', 
             backgroundSize: '20px 20px' 
           }}>
      </div>

      {/* Earth */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-900 to-black border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center relative z-10">
         <div className="w-full h-full rounded-full opacity-50 bg-[url('https://raw.githubusercontent.com/josh-street/planet-textures/master/earth.jpg')] bg-cover animate-spin-slow" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Orbit Rings */}
      <div className="absolute w-64 h-64 border border-white/5 rounded-full" />
      <div className="absolute w-80 h-80 border border-white/5 rounded-full" />

      {/* Satellite Object */}
      <div 
        className="absolute w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div className="absolute top-10 flex flex-col items-center transform -rotate-[${angle}deg]">
           <div className="w-4 h-4 bg-primary rounded-sm shadow-[0_0_15px_#00d6cb] animate-pulse"></div>
           {/* Solar Panels */}
           <div className="absolute w-12 h-1 bg-primary/50 top-1.5 -z-10"></div>
        </div>
      </div>

      {/* Connection Lines (Simulated) */}
      <div className="absolute top-1/2 left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>

      {/* HUD Elements */}
      <div className="absolute top-4 left-4 font-mono text-xs text-primary/60">
        LAT: 34.0522 N<br/>
        LON: 118.2437 W<br/>
        ALT: 550 KM
      </div>
    </div>
  );
};
