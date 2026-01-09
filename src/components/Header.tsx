import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ShieldCheck className="w-7 h-7 text-sentinel-glow" strokeWidth={1.5} />
            <span className="text-xl font-semibold tracking-wide text-foreground">
              SENTINEL
            </span>
          </button>

          {/* CTA */}
          <button
            onClick={scrollToWaitlist}
            className="px-5 py-2.5 text-sm font-medium bg-accent hover:bg-accent/80 text-accent-foreground rounded transition-all duration-200 border border-sentinel-glow/20 hover:border-sentinel-glow/40"
          >
            Request Early Access
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
