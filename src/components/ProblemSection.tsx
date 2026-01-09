import { motion } from "framer-motion";
import { AlertTriangle, Clock, FileX, Scale } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Narratives Escalate Faster Than Response Teams",
    description: "Online narratives escalate faster than legal or PR teams can react, turning minor incidents into full-scale crises within hours.",
  },
  {
    icon: FileX,
    title: "Evidence Disappears or Becomes Inadmissible",
    description: "Critical digital evidence is deleted, modified, or captured without proper chain-of-custody, rendering it useless in legal proceedings.",
  },
  {
    icon: AlertTriangle,
    title: "Decisions Made Without Accountability",
    description: "Response decisions are made ad hoc without audit trails, creating liability exposure and compliance gaps.",
  },
  {
    icon: Scale,
    title: "Multi-Domain Fallout From Single Incidents",
    description: "One reputational incident can trigger legal action, regulatory scrutiny, financial penalties, and stakeholder loss simultaneously.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-sentinel-navy/20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            The Problem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Traditional reputation management wasn't designed for the speed and stakes of today's information environment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="sentinel-card p-6 group hover:border-sentinel-steel/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-sentinel-slate/50 text-sentinel-steel group-hover:text-sentinel-glow transition-colors">
                  <problem.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
