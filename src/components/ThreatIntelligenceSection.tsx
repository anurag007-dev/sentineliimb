import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Activity } from "lucide-react";
import EntityRadar from "./EntityRadar";
import HeadlineTracker from "./HeadlineTracker";

const ENTITIES = [
  { name: "Tata Steel", type: "Corporate", clockOffset: 0 },
  { name: "Indigo Airlines", type: "Aviation", clockOffset: 2.3 },
  { name: "Kailash Vijayvargiya", type: "Political", clockOffset: 4.7 },
  { name: "The Rebel Kid", type: "Influencer", clockOffset: 6.1 },
];

const ThreatIntelligenceSection = () => {
  const [latestUpdate, setLatestUpdate] = useState<{ entity: string; threatCount: number } | null>(null);

  const handleQuarterTick = useCallback((entityName: string, threatCount: number) => {
    setLatestUpdate({ entity: entityName, threatCount });
  }, []);

  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(228 15% 4%) 0%, hsl(228 15% 6%) 50%, hsl(228 15% 4%) 100%)",
      }}
    >
      {/* Premium ambient glow effects */}
      <div 
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(195, 100%, 50%, 0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsla(210, 100%, 50%, 0.04) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsla(195, 100%, 50%, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsla(195, 100%, 50%, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 10px hsla(195, 100%, 50%, 0.3)",
                  "0 0 20px hsla(195, 100%, 50%, 0.5)",
                  "0 0 10px hsla(195, 100%, 50%, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-lg bg-sentinel-navy/50 border border-sentinel-cyan/20"
            >
              <Shield className="w-5 h-5 text-sentinel-cyan" />
            </motion.div>
            <span className="text-xs text-sentinel-cyan uppercase tracking-[0.25em] font-medium">
              Threat Intelligence Console
            </span>
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 10px hsla(210, 100%, 50%, 0.3)",
                  "0 0 20px hsla(210, 100%, 50%, 0.5)",
                  "0 0 10px hsla(210, 100%, 50%, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="p-2 rounded-lg bg-sentinel-navy/50 border border-primary/20"
            >
              <Activity className="w-5 h-5 text-primary" />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 tracking-tight">
            Real-Time Reputation Monitoring
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Continuous OSINT surveillance across media, social, regulatory, and legal vectors. 
            Each entity operates under independent threat detection protocols.
          </p>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-6 mb-12 flex-wrap"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-navy/40 border border-sentinel-cyan/10">
            <motion.div 
              className="w-2 h-2 rounded-full bg-sentinel-cyan"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[11px] text-sentinel-cyan font-mono uppercase tracking-wider">System Active</span>
          </div>
          <div className="h-4 w-px bg-sentinel-cyan/20" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-navy/40 border border-sentinel-steel/10">
            <span className="text-[11px] text-muted-foreground font-mono tracking-wide">4 ENTITIES MONITORED</span>
          </div>
          <div className="h-4 w-px bg-sentinel-cyan/20" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sentinel-navy/40 border border-sentinel-steel/10">
            <span className="text-[11px] text-muted-foreground font-mono tracking-wide">SWEEP: 8s CYCLE</span>
          </div>
        </motion.div>

        {/* Radar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {ENTITIES.map((entity, index) => (
            <motion.div
              key={entity.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Hover glow effect */}
              <div 
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, hsla(195, 100%, 50%, 0.08) 0%, transparent 70%)",
                }}
              />
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
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <HeadlineTracker latestUpdate={latestUpdate} />
        </motion.div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[11px] text-muted-foreground"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentinel-navy/30 border border-sentinel-threat/10">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: "hsl(0 85% 55%)",
                boxShadow: "0 0 8px hsl(0 85% 55%)" 
              }} 
            />
            <span>High Severity</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentinel-navy/30 border border-orange-500/10">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: "hsl(25 90% 55%)",
                boxShadow: "0 0 8px hsl(25 90% 55%)" 
              }} 
            />
            <span>Medium Severity</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentinel-navy/30 border border-yellow-500/10">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: "hsl(35 85% 60%)",
                boxShadow: "0 0 8px hsl(35 85% 60%)" 
              }} 
            />
            <span>Low Severity</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sentinel-navy/30 border border-sentinel-cyan/10">
            <div className="w-4 h-0.5 bg-sentinel-cyan rounded-full" style={{ boxShadow: "0 0 6px hsl(195 100% 50%)" }} />
            <span>Active Sweep</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreatIntelligenceSection;
