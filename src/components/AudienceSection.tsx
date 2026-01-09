import { motion } from "framer-motion";
import { Building2, Scale, Megaphone, UserCircle, Landmark } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Enterprises & Corporate Affairs Teams",
    description: "Protect brand equity and stakeholder trust",
  },
  {
    icon: Scale,
    title: "Law Firms & Compliance Teams",
    description: "Court-ready evidence and regulatory defense",
  },
  {
    icon: Megaphone,
    title: "PR & Strategic Communications Agencies",
    description: "Proactive crisis prevention and response",
  },
  {
    icon: UserCircle,
    title: "High-Profile Executives & Public Figures",
    description: "Personal reputation and privacy protection",
  },
  {
    icon: Landmark,
    title: "Government & Public Institutions",
    description: "Future deployment for public sector use cases",
  },
];

const AudienceSection = () => {
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
            Who This Is For
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built for professionals operating in high-stakes environments where reputation is a strategic asset.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-lg border border-border/50 bg-card/30 hover:border-sentinel-steel/50 transition-colors"
            >
              <div className="p-2.5 rounded-lg bg-sentinel-slate/30 text-sentinel-steel">
                <audience.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-medium text-foreground mb-1">
                  {audience.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {audience.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-sm text-muted-foreground border-t border-border/50 pt-8 max-w-xl mx-auto"
        >
          Not built for casual social media monitoring.
        </motion.p>
      </div>
    </section>
  );
};

export default AudienceSection;
