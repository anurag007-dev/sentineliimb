import { motion } from "framer-motion";
import { UserCheck, FileCheck2, ClipboardCheck, ShieldAlert } from "lucide-react";

const differentiators = [
  {
    icon: UserCheck,
    title: "Human-In-The-Loop",
    description: "Expert validation at every critical decision point — not blind automation.",
  },
  {
    icon: FileCheck2,
    title: "Court-Ready Evidence",
    description: "Chain-of-custody compliant workflows designed for legal admissibility.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability By Design",
    description: "Full audit trails for every action, decision, and escalation.",
  },
  {
    icon: ShieldAlert,
    title: "Crisis-Grade Architecture",
    description: "Built for crisis environments, not marketing dashboards.",
  },
];

const DifferentiatorSection = () => {
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
            Why Sentinel Is Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Purpose-built for high-stakes environments where standard monitoring tools fall short.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-sentinel-steel/20">
                <item.icon className="w-6 h-6 text-sentinel-glow" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
