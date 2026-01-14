import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreatDot {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  severity: number;
  opacity: number;
  flickerPhase: number;
}

interface EntityRadarProps {
  entityName: string;
  entityType: string;
  clockOffset: number;
  onQuarterTick: (entityName: string, threatCount: number) => void;
}

const EntityRadar = ({ entityName, entityType, clockOffset, onQuarterTick }: EntityRadarProps) => {
  const [sweepAngle, setSweepAngle] = useState(clockOffset);
  const [threats, setThreats] = useState<ThreatDot[]>([]);
  const [lastQuarter, setLastQuarter] = useState(-1);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  const generateThreatPosition = useCallback((severity: number) => {
    const angle = Math.random() * Math.PI * 2;
    const maxRadius = severity > 0.7 ? 25 : severity > 0.4 ? 40 : 55;
    const minRadius = severity > 0.7 ? 8 : severity > 0.4 ? 20 : 35;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    return {
      x: 50 + radius * Math.cos(angle) * 0.85,
      y: 50 + radius * Math.sin(angle) * 0.85,
    };
  }, []);

  const updateThreats = useCallback(() => {
    setThreats(prev => {
      const newThreats: ThreatDot[] = [];
      const baseCount = 3 + Math.floor(Math.random() * 5);
      
      prev.forEach(threat => {
        if (Math.random() > 0.3) {
          const drift = 2;
          const newPos = {
            x: threat.targetX + (Math.random() - 0.5) * drift,
            y: threat.targetY + (Math.random() - 0.5) * drift,
          };
          newThreats.push({
            ...threat,
            targetX: Math.max(10, Math.min(90, newPos.x)),
            targetY: Math.max(10, Math.min(90, newPos.y)),
            opacity: 0.6 + Math.random() * 0.4,
            flickerPhase: Math.random() * Math.PI * 2,
          });
        }
      });

      const toAdd = Math.max(0, baseCount - newThreats.length);
      for (let i = 0; i < toAdd; i++) {
        const severity = Math.random();
        const pos = generateThreatPosition(severity);
        newThreats.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          x: pos.x,
          y: pos.y,
          targetX: pos.x,
          targetY: pos.y,
          severity,
          opacity: 0.7 + Math.random() * 0.3,
          flickerPhase: Math.random() * Math.PI * 2,
        });
      }

      return newThreats.slice(0, 8);
    });
  }, [generateThreatPosition]);

  useEffect(() => {
    const SWEEP_DURATION = 8000;
    const QUARTER_DURATION = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const adjustedElapsed = elapsed + clockOffset * 1000;
      const angle = ((adjustedElapsed % SWEEP_DURATION) / SWEEP_DURATION) * 360;
      setSweepAngle(angle);

      const currentQuarter = Math.floor((adjustedElapsed % SWEEP_DURATION) / QUARTER_DURATION);
      
      if (currentQuarter !== lastQuarter) {
        setLastQuarter(currentQuarter);
        updateThreats();
        setTimeout(() => {
          setThreats(current => {
            onQuarterTick(entityName, current.length);
            return current;
          });
        }, 50 + Math.random() * 100);
      }

      setThreats(prev => prev.map(threat => ({
        ...threat,
        x: threat.x + (threat.targetX - threat.x) * 0.08,
        y: threat.y + (threat.targetY - threat.y) * 0.08,
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [clockOffset, lastQuarter, entityName, onQuarterTick, updateThreats]);

  const sanitizedName = entityName.replace(/\s/g, '');

  return (
    <div className="relative flex flex-col items-center">
      {/* Entity Label */}
      <div className="mb-4 text-center">
        <h4 className="text-sm font-semibold text-sentinel-cyan tracking-wide truncate max-w-[160px]">
          {entityName}
        </h4>
        <span className="text-[10px] text-sentinel-ultramarine/60 uppercase tracking-[0.2em] font-medium">
          {entityType}
        </span>
      </div>

      {/* Radar Container */}
      <div 
        className="relative w-full aspect-square max-w-[180px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(228 15% 8%) 0%, hsl(228 15% 4%) 100%)",
          boxShadow: `
            inset 0 0 40px hsla(195, 100%, 50%, 0.08),
            0 0 30px hsla(210, 100%, 50%, 0.1),
            0 0 60px hsla(195, 100%, 50%, 0.05)
          `,
        }}
      >
        {/* Outer glow ring */}
        <div 
          className="absolute -inset-1 rounded-full pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent, hsla(195, 100%, 50%, 0.1), transparent, hsla(210, 100%, 50%, 0.1), transparent)",
            filter: "blur(4px)",
            animation: "spin 12s linear infinite",
          }}
        />

        {/* Phosphor glow overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 20%, hsla(195, 100%, 50%, 0.03) 100%)",
          }}
        />

        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          {/* Grid rings with premium cyan */}
          {[48, 36, 24, 12].map((r, i) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="hsl(195 100% 50%)"
              strokeWidth="0.4"
              opacity={0.2 - i * 0.03}
              strokeDasharray={i % 2 === 0 ? "none" : "2 2"}
            />
          ))}

          {/* Cross lines */}
          <line x1="50" y1="2" x2="50" y2="98" stroke="hsl(210 100% 50%)" strokeWidth="0.3" opacity="0.15" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="hsl(210 100% 50%)" strokeWidth="0.3" opacity="0.15" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="hsl(210 100% 50%)" strokeWidth="0.2" opacity="0.1" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="hsl(210 100% 50%)" strokeWidth="0.2" opacity="0.1" />

          {/* Sweep gradient definition */}
          <defs>
            <linearGradient 
              id={`sweepGrad-${sanitizedName}`} 
              gradientUnits="userSpaceOnUse"
              x1="50" y1="50" x2="50" y2="2"
            >
              <stop offset="0%" stopColor="hsl(195 100% 50%)" stopOpacity="0" />
              <stop offset="60%" stopColor="hsl(195 100% 50%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0.9" />
            </linearGradient>
            
            {/* Sweep trail gradient */}
            <linearGradient
              id={`sweepTrail-${sanitizedName}`}
              gradientTransform={`rotate(${sweepAngle - 60}, 50, 50)`}
            >
              <stop offset="0%" stopColor="hsl(195 100% 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(195 100% 50%)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(210 100% 50%)" stopOpacity="0.2" />
            </linearGradient>

            {/* Glow filter */}
            <filter id={`glow-${sanitizedName}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Sweep trail */}
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={`url(#sweepTrail-${sanitizedName})`}
            strokeWidth="46"
            opacity="0.4"
            style={{
              clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
              transform: `rotate(${sweepAngle - 90}deg)`,
              transformOrigin: "50% 50%",
            }}
          />

          {/* Rotating sweep arm */}
          <g 
            style={{ 
              transform: `rotate(${sweepAngle}deg)`,
              transformOrigin: "50% 50%",
            }}
          >
            <path
              d="M50,50 L50,3 A47,47 0 0,1 75,10 Z"
              fill={`url(#sweepGrad-${sanitizedName})`}
              opacity="0.5"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="3"
              stroke="hsl(195 100% 50%)"
              strokeWidth="1.5"
              opacity="0.95"
              filter={`url(#glow-${sanitizedName})`}
            />
          </g>

          {/* Center dot with premium styling */}
          <circle cx="50" cy="50" r="3" fill="hsl(195 100% 50%)" opacity="0.3" />
          <circle cx="50" cy="50" r="2" fill="hsl(210 100% 50%)" opacity="0.7" />
          <circle cx="50" cy="50" r="1" fill="white" opacity="0.9" />
        </svg>

        {/* Threat dots overlay */}
        <div className="absolute inset-0 z-20">
          <AnimatePresence>
            {threats.map((threat) => {
              const flicker = Math.sin(Date.now() / 200 + threat.flickerPhase) * 0.15;
              const threatColor = threat.severity > 0.7 
                ? "hsl(0 85% 55%)" 
                : threat.severity > 0.4 
                  ? "hsl(25 90% 55%)" 
                  : "hsl(35 85% 60%)";
              
              return (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: threat.opacity + flicker,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute rounded-full"
                  style={{
                    left: `${threat.x}%`,
                    top: `${threat.y}%`,
                    width: 5 + threat.severity * 4,
                    height: 5 + threat.severity * 4,
                    backgroundColor: threatColor,
                    boxShadow: `
                      0 0 ${8 + threat.severity * 6}px ${threatColor},
                      0 0 ${16 + threat.severity * 8}px ${threatColor}80
                    `,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Scan noise overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-10 z-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Edge highlight ring */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none z-30"
          style={{
            border: "1px solid hsla(195, 100%, 50%, 0.15)",
            boxShadow: "inset 0 0 20px hsla(210, 100%, 50%, 0.05)",
          }}
        />
      </div>

      {/* Threat count indicator */}
      <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentinel-navy/50 border border-sentinel-cyan/10">
        <motion.div 
          className="w-2 h-2 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundColor: threats.length > 5 
              ? "hsl(0 85% 55%)" 
              : threats.length > 3 
                ? "hsl(25 90% 55%)" 
                : "hsl(195 100% 50%)",
            boxShadow: `0 0 8px ${
              threats.length > 5 
                ? "hsl(0 85% 55%)" 
                : threats.length > 3 
                  ? "hsl(25 90% 55%)" 
                  : "hsl(195 100% 50%)"
            }`,
          }}
        />
        <span className="text-[10px] text-sentinel-cyan/80 font-mono tracking-wider">
          {threats.length} ACTIVE
        </span>
      </div>
    </div>
  );
};

export default EntityRadar;
