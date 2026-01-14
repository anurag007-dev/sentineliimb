import { motion } from "framer-motion";
import { Lock, Shield, Eye } from "lucide-react";

const TrustSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-8">
          {[Lock, Shield, Eye].map((Icon, i) => (
            <motion.div key={i} whileHover={{ scale: 1.1, y: -2 }} className="p-3 rounded-xl bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-white/[0.06] text-sentinel-steel">
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mb-3">Designed for legal, compliance, and crisis-response use cases.</p>
        <p className="text-muted-foreground/50 text-xs uppercase tracking-[0.2em]">Private validation phase</p>
      </motion.div>
    </div>
  </section>
);

export default TrustSection;
