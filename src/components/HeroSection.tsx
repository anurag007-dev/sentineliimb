import { motion } from "framer-motion";
import RadarAnimation from "./RadarAnimation";

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-sentinel-navy/30" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--sentinel-steel)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--sentinel-steel)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-sentinel-glow animate-pulse" />
              <span className="text-sm text-muted-foreground">Private Beta — Limited Access</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-foreground mb-6">
              Reputation Risk Is No Longer A PR Problem.{" "}
              <span className="text-sentinel-glow">It's A Strategic Liability.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Sentinel helps organisations and high-profile individuals detect narrative threats early, 
              preserve court-ready evidence, and respond through accountable, human-validated workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToWaitlist}
                className="px-8 py-4 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground rounded transition-all duration-200 border border-sentinel-glow/30 hover:border-sentinel-glow/50 hover:shadow-lg hover:shadow-sentinel-glow/10"
              >
                Request Early Access
              </button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              For enterprises, agencies, and high-risk professionals
            </p>
          </motion.div>

          {/* Right - Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <RadarAnimation />
            
            {/* Legend */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sentinel-threat animate-pulse" />
                <span>Active Threats</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sentinel-glow" />
                <span>Monitoring</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
