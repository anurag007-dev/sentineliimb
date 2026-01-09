import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const roles = [
  "Legal / Compliance",
  "PR / Communications",
  "Executive",
  "Agency Partner",
  "Other",
];

const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    role: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="waitlist" className="py-24 bg-sentinel-navy/30 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sentinel-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-10">
            <ShieldCheck className="w-12 h-12 text-sentinel-glow mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Request Early Access
            </h2>
            <p className="text-muted-foreground">
              Join select organisations validating Sentinel's approach to reputation risk management.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="sentinel-card p-8 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-sentinel-safe mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-foreground mb-2">
                Thank You
              </h3>
              <p className="text-muted-foreground text-sm">
                Early access is limited and prioritised for high-risk use cases. 
                We'll be in touch if there's alignment.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="sentinel-card p-8"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-foreground mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    value={formData.organisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all"
                    placeholder="Your company or firm"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground rounded-md transition-all duration-200 border border-sentinel-glow/30 hover:border-sentinel-glow/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Join the Sentinel Early Access List"}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
