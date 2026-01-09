import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sentinel-steel" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground">
              Sentinel © 2026
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a 
              href="#" 
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="mailto:info@sentinel-platform.com"
              className="hover:text-foreground transition-colors"
            >
              info@sentinel-platform.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
