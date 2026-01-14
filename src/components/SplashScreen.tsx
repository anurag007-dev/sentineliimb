import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  isVisible: boolean;
}

const SplashScreen = ({ onComplete, isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2.5, ease: [0.4, 0, 0.2, 1] }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") onComplete();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_50%/0.08),transparent_70%)]" />
          
          <div className="relative flex flex-col items-center">
            {/* Outer rotating ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ 
                opacity: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-52 h-52 md:w-72 md:h-72"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="url(#ringGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="6 4"
                  opacity="0.4"
                />
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(210 100% 50%)" />
                    <stop offset="50%" stopColor="hsl(187 100% 50%)" />
                    <stop offset="100%" stopColor="hsl(210 100% 50%)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Middle pulsing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border border-sentinel-glow/30"
            />

            {/* Shield container */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative z-10"
            >
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-3xl bg-sentinel-glow/25 rounded-full scale-150"
              />
              
              {/* Shield icon */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative"
              >
                <ShieldCheck 
                  className="w-20 h-20 md:w-28 md:h-28 text-sentinel-glow" 
                  strokeWidth={1.5} 
                  style={{
                    filter: 'drop-shadow(0 0 30px hsl(210 100% 50% / 0.4))'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Scanning line */}
            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: [0, 0.8, 0], y: 60 }}
              transition={{ duration: 1.8, repeat: 2, delay: 0.8, ease: "easeInOut" }}
              className="absolute w-36 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(210 100% 50%), transparent)'
              }}
            />

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mt-20 text-center"
            >
              <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.2em] text-foreground">
                SENTINEL
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="mt-3 text-xs text-muted-foreground tracking-[0.3em] uppercase"
              >
                Initializing Protection
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.4 }}
              className="mt-10 w-48 h-px bg-white/5 overflow-hidden rounded-full"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: 2, ease: "easeInOut" }}
                className="h-full w-1/2"
                style={{
                  background: 'linear-gradient(90deg, transparent, hsl(210 100% 50%), hsl(187 100% 50%), transparent)'
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
