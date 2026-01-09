import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ThreatDot {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
}

const RadarAnimation = () => {
  const [threats, setThreats] = useState<ThreatDot[]>([]);

  useEffect(() => {
    // Generate random threat dots
    const generateThreats = () => {
      const newThreats: ThreatDot[] = [];
      const numThreats = 8 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < numThreats; i++) {
        // Position dots within the radar circle
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 70; // 20-90% of radar radius
        const x = 50 + radius * Math.cos(angle) * 0.45;
        const y = 50 + radius * Math.sin(angle) * 0.45;
        
        newThreats.push({
          id: i,
          x,
          y,
          delay: Math.random() * 3,
          size: 3 + Math.random() * 4,
        });
      }
      setThreats(newThreats);
    };

    generateThreats();
    const interval = setInterval(generateThreats, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-sentinel-glow/5 rounded-full blur-3xl" />
      
      {/* Radar container */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background circles */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="hsl(var(--sentinel-steel))"
          strokeWidth="0.3"
          opacity="0.2"
        />
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="hsl(var(--sentinel-steel))"
          strokeWidth="0.3"
          opacity="0.2"
        />
        <circle
          cx="50"
          cy="50"
          r="24"
          fill="none"
          stroke="hsl(var(--sentinel-steel))"
          strokeWidth="0.3"
          opacity="0.2"
        />
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="none"
          stroke="hsl(var(--sentinel-steel))"
          strokeWidth="0.3"
          opacity="0.2"
        />

        {/* Cross lines */}
        <line x1="50" y1="2" x2="50" y2="98" stroke="hsl(var(--sentinel-steel))" strokeWidth="0.2" opacity="0.2" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="hsl(var(--sentinel-steel))" strokeWidth="0.2" opacity="0.2" />
        <line x1="15" y1="15" x2="85" y2="85" stroke="hsl(var(--sentinel-steel))" strokeWidth="0.2" opacity="0.1" />
        <line x1="85" y1="15" x2="15" y2="85" stroke="hsl(var(--sentinel-steel))" strokeWidth="0.2" opacity="0.1" />

        {/* Outer ring with glow */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="hsl(var(--sentinel-glow))"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Sweep gradient */}
        <defs>
          <linearGradient id="sweepGradient" gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="2">
            <stop offset="0%" stopColor="hsl(var(--sentinel-glow))" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(var(--sentinel-glow))" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="threatGlow">
            <stop offset="0%" stopColor="hsl(var(--sentinel-threat))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--sentinel-threat))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Rotating sweep */}
        <g className="radar-sweep origin-center">
          <path
            d="M50,50 L50,2 A48,48 0 0,1 90,20 Z"
            fill="url(#sweepGradient)"
            opacity="0.3"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="2"
            stroke="hsl(var(--sentinel-glow))"
            strokeWidth="0.8"
            opacity="0.8"
          />
        </g>

        {/* Center point */}
        <circle cx="50" cy="50" r="2" fill="hsl(var(--sentinel-glow))" opacity="0.8" />
        <circle cx="50" cy="50" r="1" fill="hsl(var(--foreground))" />
      </svg>

      {/* Threat dots overlay */}
      <div className="absolute inset-0">
        {threats.map((threat) => (
          <motion.div
            key={threat.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: threat.delay,
            }}
            className="absolute rounded-full"
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              width: threat.size,
              height: threat.size,
              backgroundColor: "hsl(var(--sentinel-threat))",
              boxShadow: "0 0 8px hsl(var(--sentinel-threat))",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Media</span>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Legal</span>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Social</span>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Regulatory</span>
      </div>
    </div>
  );
};

export default RadarAnimation;
