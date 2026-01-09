import { motion } from "framer-motion";
import { Radar, Shield, Users, FileCheck } from "lucide-react";

const capabilities = [
  {
    icon: Radar,
    title: "Real-Time Narrative Monitoring",
    description: "Continuous surveillance of reputation and narrative risk across all digital channels.",
  },
  {
    icon: Shield,
    title: "Secure Evidence Preservation",
    description: "Time-stamped, chain-of-custody compliant digital evidence capture and storage.",
  },
  {
    icon: Users,
    title: "Human-Validated Workflows",
    description: "Expert-reviewed escalation and response protocols with full accountability.",
  },
  {
    icon: FileCheck,
    title: "Cross-Team Coordination",
    description: "Unified response coordination across legal, PR, and compliance functions.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            What Sentinel Enables
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A unified platform for reputation risk detection, evidence preservation, and coordinated response.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="sentinel-card p-6 text-center group hover:border-sentinel-glow/30 transition-all"
            >
              <div className="inline-flex p-4 rounded-full bg-sentinel-slate/30 text-sentinel-steel group-hover:text-sentinel-glow transition-colors mb-4">
                <capability.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-foreground mb-2">
                {capability.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-sentinel-steel italic"
        >
          "Designed for environments where mistakes are irreversible."
        </motion.p>
      </div>
    </section>
  );
};

export default SolutionSection;
