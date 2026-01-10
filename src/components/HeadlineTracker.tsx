import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingDown, Eye, FileWarning } from "lucide-react";

interface Headline {
  id: string;
  entity: string;
  text: string;
  severity: "high" | "medium" | "low";
  timestamp: Date;
}

interface HeadlineTrackerProps {
  latestUpdate: { entity: string; threatCount: number } | null;
}

const ENTITIES = {
  "Tata Steel": {
    type: "Corporate",
    headlines: {
      high: [
        "faces regulatory scrutiny over emissions compliance in European operations",
        "under investigation by competition authorities amid pricing concerns",
        "draws shareholder criticism following governance disclosure gaps",
        "confronts legal challenge over land acquisition practices",
      ],
      medium: [
        "draws criticism amid delayed decarbonization commitments",
        "faces workforce unrest at key manufacturing facilities",
        "under pressure following quarterly earnings miss",
        "sees analyst downgrades citing operational headwinds",
      ],
      low: [
        "navigates supply chain uncertainties in volatile market",
        "adjusts production forecasts amid demand fluctuations",
        "reviews strategic investments following market correction",
        "monitors trade policy developments affecting steel sector",
      ],
    },
  },
  "Indigo Airlines": {
    type: "Aviation",
    headlines: {
      high: [
        "faces DGCA scrutiny following safety compliance audit findings",
        "under consumer forum investigation over refund processing delays",
        "draws criticism from pilot association amid contract disputes",
        "confronts regulatory action over operational irregularities",
      ],
      medium: [
        "faces growing pressure over customer service response times",
        "under observation for fleet maintenance scheduling concerns",
        "draws passenger criticism following repeated flight disruptions",
        "sees competitive pressure intensifying in key route markets",
      ],
      low: [
        "monitors fuel cost volatility impacting operational margins",
        "adjusts capacity planning amid seasonal demand shifts",
        "reviews ancillary revenue strategy following market feedback",
        "navigates airport infrastructure constraints at major hubs",
      ],
    },
  },
  "Kailash Vijayvargiya": {
    type: "Political",
    headlines: {
      high: [
        "faces party scrutiny following controversial public remarks",
        "under criticism from opposition over governance decisions",
        "draws media attention amid investigation into asset declarations",
        "confronts internal dissent over constituency resource allocation",
      ],
      medium: [
        "faces growing pressure over delayed infrastructure projects",
        "under observation for remarks on sensitive policy matters",
        "draws criticism from civil society groups over public statements",
        "sees coalition dynamics complicating legislative priorities",
      ],
      low: [
        "navigates party positioning ahead of electoral considerations",
        "monitors constituent feedback on recent policy announcements",
        "reviews public communication strategy following media coverage",
        "adjusts campaign messaging amid shifting voter sentiment",
      ],
    },
  },
  "The Rebel Kid": {
    type: "Influencer",
    headlines: {
      high: [
        "faces platform action following content policy violation review",
        "under scrutiny from advertising standards authority over disclosures",
        "draws criticism from creator community amid collaboration disputes",
        "confronts legal notice over intellectual property concerns",
      ],
      medium: [
        "faces growing pressure over brand partnership transparency",
        "under observation for audience engagement authenticity metrics",
        "draws criticism following controversial content collaboration",
        "sees sponsor reviews following audience demographic shifts",
      ],
      low: [
        "navigates algorithm changes affecting content visibility",
        "monitors audience sentiment following format experimentation",
        "reviews monetization strategy amid platform policy updates",
        "adjusts content calendar following engagement analytics review",
      ],
    },
  },
};

const HeadlineTracker = ({ latestUpdate }: HeadlineTrackerProps) => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [currentHeadline, setCurrentHeadline] = useState<Headline | null>(null);
  const lastEntityRef = useRef<string>("");
  const usedHeadlinesRef = useRef<Set<string>>(new Set());

  const getSeverityFromThreatCount = (count: number): "high" | "medium" | "low" => {
    if (count > 5) return "high";
    if (count > 3) return "medium";
    return "low";
  };

  const generateHeadline = useCallback((entity: string, threatCount: number): Headline => {
    const entityData = ENTITIES[entity as keyof typeof ENTITIES];
    const severity = getSeverityFromThreatCount(threatCount);
    const headlineOptions = entityData.headlines[severity];
    
    // Avoid repetition
    let selectedHeadline: string;
    let attempts = 0;
    do {
      selectedHeadline = headlineOptions[Math.floor(Math.random() * headlineOptions.length)];
      attempts++;
    } while (usedHeadlinesRef.current.has(`${entity}-${selectedHeadline}`) && attempts < 10);
    
    usedHeadlinesRef.current.add(`${entity}-${selectedHeadline}`);
    
    // Clear old entries to prevent memory buildup
    if (usedHeadlinesRef.current.size > 50) {
      const entries = Array.from(usedHeadlinesRef.current);
      entries.slice(0, 25).forEach(e => usedHeadlinesRef.current.delete(e));
    }

    return {
      id: `${Date.now()}-${Math.random()}`,
      entity,
      text: selectedHeadline,
      severity,
      timestamp: new Date(),
    };
  }, []);

  useEffect(() => {
    if (latestUpdate && latestUpdate.entity !== lastEntityRef.current) {
      lastEntityRef.current = latestUpdate.entity;
      
      const newHeadline = generateHeadline(latestUpdate.entity, latestUpdate.threatCount);
      setCurrentHeadline(newHeadline);
      setHeadlines(prev => [newHeadline, ...prev].slice(0, 10));
    }
  }, [latestUpdate, generateHeadline]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "medium":
        return <FileWarning className="w-4 h-4 text-orange-400" />;
      default:
        return <Eye className="w-4 h-4 text-yellow-400" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div 
      className="w-full mt-8 rounded-lg overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0f0a 0%, #050805 100%)",
        border: "1px solid rgba(0, 255, 65, 0.2)",
        boxShadow: "0 0 30px rgba(0, 255, 65, 0.05)",
      }}
    >
      {/* Header */}
      <div 
        className="px-4 py-2 flex items-center justify-between"
        style={{
          background: "rgba(0, 255, 65, 0.05)",
          borderBottom: "1px solid rgba(0, 255, 65, 0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[#00ff41]" />
          <span className="text-xs font-medium text-[#00ff41] uppercase tracking-widest">
            Live Reputation Threat Feed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="text-[10px] text-[#00ff41]/60 font-mono">MONITORING</span>
        </div>
      </div>

      {/* Current headline display */}
      <div className="px-4 py-4 min-h-[80px] flex items-center">
        <AnimatePresence mode="wait">
          {currentHeadline ? (
            <motion.div
              key={currentHeadline.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-start gap-3 w-full"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getSeverityIcon(currentHeadline.severity)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: currentHeadline.severity === "high" 
                        ? "rgba(255, 51, 51, 0.2)" 
                        : currentHeadline.severity === "medium"
                        ? "rgba(255, 153, 51, 0.2)"
                        : "rgba(255, 204, 51, 0.2)",
                      color: currentHeadline.severity === "high" 
                        ? "#ff5555" 
                        : currentHeadline.severity === "medium"
                        ? "#ffaa44"
                        : "#ffcc44",
                    }}
                  >
                    {currentHeadline.entity}
                  </span>
                  <span className="text-[10px] text-[#00ff41]/40 font-mono">
                    {formatTime(currentHeadline.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="text-white font-medium">{currentHeadline.entity}</span>
                  {" "}{currentHeadline.text}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#00ff41]/40 italic"
            >
              Initializing threat monitoring systems...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent headlines ticker */}
      {headlines.length > 1 && (
        <div 
          className="px-4 py-2 flex items-center gap-4 overflow-x-auto scrollbar-hide"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderTop: "1px solid rgba(0, 255, 65, 0.1)",
          }}
        >
          <span className="text-[10px] text-[#00ff41]/40 uppercase tracking-wider flex-shrink-0">
            Recent:
          </span>
          {headlines.slice(1, 4).map((headline, index) => (
            <span 
              key={headline.id}
              className="text-[11px] text-gray-500 truncate max-w-[200px] flex-shrink-0"
              style={{ opacity: 1 - index * 0.25 }}
            >
              {headline.entity}: {headline.text.slice(0, 40)}...
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeadlineTracker;
