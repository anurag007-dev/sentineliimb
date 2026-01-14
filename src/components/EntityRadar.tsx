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
      
      // Keep some existing threats with drift
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

      // Add new threats
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
        // Slight delay for micro-latency effect
        setTimeout(() => {
          setThreats(current => {
            onQuarterTick(entityName, current.length);
            return current;
          });
        }, 50 + Math.random() * 100);
      }

      // Interpolate threat positions
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

  return (
    <div className="relative flex flex-col items-center">
      {/* Entity Label */}
      <div className="mb-3 text-center">
        <h4 className="text-sm font-medium text-[#00ff41] tracking-wide truncate max-w-[140px]">
          {entityName}
        </h4>
        <span className="text-[10px] text-[#00ff41]/50 uppercase tracking-widest">
          {entityType}
        </span>
      </div>

      {/* Radar Container */}
      <div 
        className="relative w-full aspect-square max-w-[180px]"
        style={{
          background: "radial-gradient(circle, #0A0F0A 0%, #050805 100%)",
          borderRadius: "50%",
          boxShadow: "inset 0 0 30px rgba(0, 255, 65, 0.1), 0 0 20px rgba(0, 255, 65, 0.05)",
        }}
      >
        {/* Phosphor glow overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, transparent 30%, rgba(0, 255, 65, 0.02) 100%)",
          }}
        />

        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid rings */}
          {[48, 36, 24, 12].map((r, i) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="#00ff41"
              strokeWidth="0.3"
              opacity={0.15 - i * 0.02}
            />
          ))}

          {/* Cross lines */}
          <line x1="50" y1="2" x2="50" y2="98" stroke="#00ff41" strokeWidth="0.2" opacity="0.1" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="#00ff41" strokeWidth="0.2" opacity="0.1" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="#00ff41" strokeWidth="0.15" opacity="0.08" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="#00ff41" strokeWidth="0.15" opacity="0.08" />

          {/* Sweep gradient definition */}
          <defs>
            <linearGradient 
              id={`sweepGrad-${entityName.replace(/\s/g, '')}`} 
              gradientUnits="userSpaceOnUse"
              x1="50" y1="50" x2="50" y2="2"
            >
              <stop offset="0%" stopColor="#00ff41" stopOpacity="0" />
              <stop offset="100%" stopColor="#00ff41" stopOpacity="0.8" />
            </linearGradient>
            
            {/* Sweep trail gradient */}
            <linearGradient
              id={`sweepTrail-${entityName.replace(/\s/g, '')}`}
              gradientTransform={`rotate(${sweepAngle - 60}, 50, 50)`}
            >
              <stop offset="0%" stopColor="#00ff41" stopOpacity="0" />
              <stop offset="50%" stopColor="#00ff41" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#00ff41" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Sweep trail */}
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke={`url(#sweepTrail-${entityName.replace(/\s/g, '')})`}
            strokeWidth="46"
            opacity="0.3"
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
              fill={`url(#sweepGrad-${entityName.replace(/\s/g, '')})`}
              opacity="0.4"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="3"
              stroke="#00ff41"
              strokeWidth="1"
              opacity="0.9"
              style={{
                filter: "drop-shadow(0 0 3px #00ff41)",
              }}
            />
          </g>

          {/* Center dot */}
          <circle cx="50" cy="50" r="2" fill="#00ff41" opacity="0.8" />
          <circle cx="50" cy="50" r="1" fill="#fff" opacity="0.9" />
        </svg>

        {/* Threat dots overlay */}
        <div className="absolute inset-0">
          <AnimatePresence>
            {threats.map((threat) => {
              const flicker = Math.sin(Date.now() / 200 + threat.flickerPhase) * 0.15;
              return (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: threat.opacity + flicker,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute rounded-full"
                  style={{
                    left: `${threat.x}%`,
                    top: `${threat.y}%`,
                    width: 4 + threat.severity * 3,
                    height: 4 + threat.severity * 3,
                    backgroundColor: threat.severity > 0.7 ? "#ff3333" : threat.severity > 0.4 ? "#ff6644" : "#ff8866",
                    boxShadow: `0 0 ${6 + threat.severity * 4}px ${threat.severity > 0.7 ? "#ff3333" : "#ff6644"}`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Scan noise overlay */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Threat count indicator */}
      <div className="mt-2 flex items-center gap-1.5">
        <div 
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: threats.length > 5 ? "#ff3333" : threats.length > 3 ? "#ff6644" : "#00ff41",
            boxShadow: `0 0 6px ${threats.length > 5 ? "#ff3333" : threats.length > 3 ? "#ff6644" : "#00ff41"}`,
          }}
        />
        <span className="text-[10px] text-[#00ff41]/70 font-mono">
          {threats.length} ACTIVE
        </span>
      </div>
    </div>
  );
};

export default EntityRadar;

