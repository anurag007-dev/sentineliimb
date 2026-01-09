import { motion } from "framer-motion";
import { Lock, Shield, Eye } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex justify-center gap-8 mb-8">
            <div className="p-3 rounded-lg bg-sentinel-slate/30 text-sentinel-steel">
              <Lock className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="p-3 rounded-lg bg-sentinel-slate/30 text-sentinel-steel">
              <Shield className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div className="p-3 rounded-lg bg-sentinel-slate/30 text-sentinel-steel">
              <Eye className="w-6 h-6" strokeWidth={1.5} />
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4">
            Designed with legal, compliance, and crisis-response use cases in mind.
          </p>
          <p className="text-muted-foreground/70 text-xs uppercase tracking-wider">
            Currently in private validation phase
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
