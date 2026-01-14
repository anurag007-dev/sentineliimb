import { motion } from "framer-motion";
import { AlertTriangle, Clock, FileX, Scale } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Narratives Escalate Faster Than Response Teams",
    description: "Online narratives escalate faster than legal or PR teams can react.",
  },
  {
    icon: FileX,
    title: "Evidence Disappears or Becomes Inadmissible",
    description: "Critical digital evidence is deleted or captured without chain-of-custody.",
  },
  {
    icon: AlertTriangle,
    title: "Decisions Made Without Accountability",
    description: "Response decisions made ad hoc without audit trails create liability.",
  },
  {
    icon: Scale,
    title: "Multi-Domain Fallout From Single Incidents",
    description: "One incident triggers legal, regulatory, and stakeholder consequences.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sentinel-slate/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-foreground mb-4">The Problem</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Traditional reputation management wasn't built for today's speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="sentinel-card p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-white/[0.06] text-sentinel-steel group-hover:text-sentinel-glow transition-colors duration-300">
                  <problem.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-1.5">
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
