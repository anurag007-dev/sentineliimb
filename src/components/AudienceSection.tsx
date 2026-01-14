import { motion } from "framer-motion";
import { Building2, Scale, Megaphone, UserCircle, Landmark } from "lucide-react";

const audiences = [
  { icon: Building2, title: "Enterprises & Corporate Affairs", description: "Protect brand equity and stakeholder trust" },
  { icon: Scale, title: "Law Firms & Compliance", description: "Court-ready evidence and regulatory defense" },
  { icon: Megaphone, title: "PR & Communications Agencies", description: "Proactive crisis prevention and response" },
  { icon: UserCircle, title: "Executives & Public Figures", description: "Personal reputation and privacy protection" },
  { icon: Landmark, title: "Government & Public Institutions", description: "Future deployment for public sector" },
];

const AudienceSection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sentinel-slate/5 to-transparent" />
    <div className="container mx-auto px-6 relative">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h2 className="text-foreground mb-4">Who This Is For</h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">Built for professionals in high-stakes environments.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {audiences.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-card/30 hover:border-sentinel-glow/20 transition-all duration-300 group">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-sentinel-slate to-sentinel-navy border border-white/[0.06] text-sentinel-steel group-hover:text-sentinel-glow transition-colors">
              <item.icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10 text-xs text-muted-foreground/60">Not built for casual social media monitoring.</motion.p>
    </div>
  </section>
);

export default AudienceSection;
