import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const organizationTypes = [
  "PR Agency / Communication",
  "Legal / Compliance",
  "Company",
  "Government / Public Institute",
  "Individual",
] as const;

// Validation schema
const formSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  organizationType: z.enum(organizationTypes, { required_error: "Please select an organization type" }),
  requirement: z.string().trim().max(1000, "Requirement must be less than 1000 characters").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const WaitlistSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    organizationType: "" as typeof organizationTypes[number],
    requirement: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("early_access_submissions")
        .insert({
          full_name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone?.trim() || null,
          organization_type: formData.organizationType,
          requirement: formData.requirement?.trim() || null,
        });

      if (error) {
        console.error("Submission error:", error);
        setSubmitError("Unable to submit your request. Please try again.");
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
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
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-sentinel-threat">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all ${
                      errors.fullName ? "border-sentinel-threat/50" : "border-border"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address <span className="text-sentinel-threat">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all ${
                      errors.email ? "border-sentinel-threat/50" : "border-border"
                    }`}
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all ${
                      errors.phone ? "border-sentinel-threat/50" : "border-border"
                    }`}
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.phone}</p>
                  )}
                </div>

                {/* Organization Type */}
                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-foreground mb-2">
                    Organization Type <span className="text-sentinel-threat">*</span>
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md bg-input border text-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all appearance-none cursor-pointer ${
                      errors.organizationType ? "border-sentinel-threat/50" : "border-border"
                    } ${!formData.organizationType ? "text-muted-foreground" : ""}`}
                  >
                    <option value="" disabled>Select organization type</option>
                    {organizationTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.organizationType && (
                    <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.organizationType}</p>
                  )}
                </div>

                {/* Requirement */}
                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium text-foreground mb-2">
                    Your Requirement <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-md bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all resize-none ${
                      errors.requirement ? "border-sentinel-threat/50" : "border-border"
                    }`}
                    placeholder="Briefly describe your requirement"
                  />
                  {errors.requirement && (
                    <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.requirement}</p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="p-3 rounded-md bg-sentinel-threat/10 border border-sentinel-threat/20">
                    <p className="text-sm text-sentinel-threat/90">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground rounded-md transition-all duration-200 border border-sentinel-glow/30 hover:border-sentinel-glow/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join the Sentinel Early Access List"
                  )}
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
