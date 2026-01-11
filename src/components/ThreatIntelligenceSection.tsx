import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Activity } from "lucide-react";
import EntityRadar from "./EntityRadar";
import HeadlineTracker from "./HeadlineTracker";

const ENTITIES = [
  { name: "Tata Steel", type: "Corporate", clockOffset: 0 },
  { name: "Indigo Airlines", type: "Aviation", clockOffset: 2.3 },
  { name: "Narendra Modi", type: "Political", clockOffset: 4.7 },
  { name: "The Rebel Kid", type: "Influencer", clockOffset: 6.1 },
];

const ThreatIntelligenceSection = () => {
  const [latestUpdate, setLatestUpdate] = useState<{ entity: string; threatCount: number } | null>(null);

  const handleQuarterTick = useCallback((entityName: string, threatCount: number) => {
    setLatestUpdate({ entity: entityName, threatCount });
  }, []);

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #030503 0%, #050805 50%, #030503 100%)",
      }}
    >
      {/* Ambient glow effects */}
      <div 
        className="absolute top-1/2 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 65, 0.03) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-96 h-96 translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0, 255, 65, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#00ff41]" />
            <span className="text-xs text-[#00ff41] uppercase tracking-[0.3em] font-medium">
              Threat Intelligence Console
            </span>
            <Activity className="w-5 h-5 text-[#00ff41]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real-Time Reputation Monitoring
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Continuous OSINT surveillance across media, social, regulatory, and legal vectors. 
            Each entity operates under independent threat detection protocols.
          </p>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[11px] text-[#00ff41]/70 font-mono uppercase">System Active</span>
          </div>
          <div className="h-3 w-px bg-[#00ff41]/20" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500 font-mono">4 ENTITIES MONITORED</span>
          </div>
          <div className="h-3 w-px bg-[#00ff41]/20" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500 font-mono">SWEEP: 8s CYCLE</span>
          </div>
        </motion.div>

        {/* Radar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {ENTITIES.map((entity, index) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <EntityRadar
                entityName={entity.name}
                entityType={entity.type}
                clockOffset={entity.clockOffset}
                onQuarterTick={handleQuarterTick}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Headline Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <HeadlineTracker latestUpdate={latestUpdate} />
        </motion.div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" style={{ boxShadow: "0 0 6px #ff3333" }} />
            <span>High Severity Threat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400/80" style={{ boxShadow: "0 0 6px #ff6644" }} />
            <span>Medium Severity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-300/80" style={{ boxShadow: "0 0 6px #ff8866" }} />
            <span>Low Severity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#00ff41]" />
            <span>Active Sweep</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreatIntelligenceSection;
