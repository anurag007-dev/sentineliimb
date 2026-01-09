import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, ShieldCheck } from "lucide-react";

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
          transition={{ duration: 0.8, delay: 2.5 }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") onComplete();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            {/* Outer rotating ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.8 },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-48 h-48 md:w-64 md:h-64"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="hsl(var(--sentinel-steel))"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                  opacity="0.3"
                />
              </svg>
            </motion.div>

            {/* Middle pulsing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full border border-sentinel-glow/30"
            />

            {/* Shield container */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10"
            >
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 blur-2xl bg-sentinel-glow/20 rounded-full scale-150"
              />
              
              {/* Shield icon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <ShieldCheck className="w-20 h-20 md:w-28 md:h-28 text-sentinel-glow shield-glow" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Scanning lines */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: [0, 1, 0], y: 80 }}
              transition={{ duration: 1.5, repeat: 2, delay: 0.8 }}
              className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-sentinel-glow to-transparent"
            />

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-16 text-center"
            >
              <h1 className="text-2xl md:text-3xl font-semibold tracking-wider text-foreground">
                SENTINEL
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="mt-2 text-sm text-muted-foreground tracking-widest uppercase"
              >
                Initializing Protection Systems
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="mt-8 w-48 h-0.5 bg-muted overflow-hidden rounded-full"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: 2, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-sentinel-glow to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
