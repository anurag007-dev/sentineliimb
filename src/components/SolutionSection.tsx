import { motion } from "framer-motion";
import { Radar, Shield, Users, FileCheck } from "lucide-react";

const capabilities = [
  { icon: Radar, title: "Real-Time Monitoring", description: "Continuous narrative surveillance across all channels." },
  { icon: Shield, title: "Evidence Preservation", description: "Chain-of-custody compliant digital capture." },
  { icon: Users, title: "Human-Validated Workflows", description: "Expert-reviewed escalation protocols." },
  { icon: FileCheck, title: "Cross-Team Coordination", description: "Unified legal, PR, and compliance response." },
];

const SolutionSection = () => {
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground mb-4">What Sentinel Enables</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Unified detection, preservation, and coordinated response.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="sentinel-card p-6 text-center group"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-white/[0.06] text-sentinel-steel group-hover:text-sentinel-glow transition-colors duration-300 mb-4">
                <item.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-sentinel-steel/80 italic text-sm"
        >
          "Built for environments where mistakes are irreversible."
        </motion.p>
      </div>
    </section>
  );
};

export default SolutionSection;
