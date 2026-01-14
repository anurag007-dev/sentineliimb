import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const Header = () => {
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ["hsl(228 15% 7% / 0)", "hsl(228 15% 7% / 0.8)"]);
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

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
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
      }}
      className="fixed top-0 left-0 right-0 z-40"
    >
      <motion.div 
        className="absolute inset-x-0 bottom-0 h-px bg-white"
        style={{ opacity: borderOpacity }}
      />
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <ShieldCheck 
                className="w-7 h-7 text-sentinel-glow transition-all duration-300 group-hover:drop-shadow-[0_0_12px_hsl(210,100%,50%,0.5)]" 
                strokeWidth={1.5} 
              />
            </div>
            <span className="text-xl font-semibold tracking-wide text-foreground">
              SENTINEL
            </span>
          </motion.button>

          {/* CTA */}
          <motion.button
            onClick={scrollToWaitlist}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-5 py-2.5 text-sm font-medium rounded-xl overflow-hidden group"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-sentinel-glow to-sentinel-ultramarine opacity-100 transition-opacity duration-200" />
            
            {/* Hover glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sentinel-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-sentinel-glow/40" />
            
            <span className="relative text-white">Request Early Access</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
