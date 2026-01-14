import { motion } from "framer-motion";
import { UserCheck, FileCheck2, ClipboardCheck, ShieldAlert } from "lucide-react";

const differentiators = [
  { icon: UserCheck, title: "Human-In-The-Loop", description: "Expert validation at every critical decision point." },
  { icon: FileCheck2, title: "Court-Ready Evidence", description: "Chain-of-custody compliant for legal admissibility." },
  { icon: ClipboardCheck, title: "Accountability By Design", description: "Full audit trails for every action and decision." },
  { icon: ShieldAlert, title: "Crisis-Grade Architecture", description: "Built for crisis environments, not dashboards." },
];

const DifferentiatorSection = () => (
  <section className="py-28 relative">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-foreground mb-4">Why Sentinel Is Different</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">Purpose-built for high-stakes environments.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {differentiators.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start gap-4 group">
            <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-white/[0.06] group-hover:border-sentinel-glow/30 transition-all duration-300">
              <item.icon className="w-6 h-6 text-sentinel-glow" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-1.5">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DifferentiatorSection;
