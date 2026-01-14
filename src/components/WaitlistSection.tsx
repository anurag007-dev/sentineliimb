import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const organizationTypes = ["PR Agency / Communication", "Legal / Compliance", "Company", "Government / Public Institute", "Individual"] as const;

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  organizationType: z.enum(organizationTypes, { required_error: "Please select an organization type" }),
  requirement: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

const WaitlistSection = () => {
  const [formData, setFormData] = useState<FormData>({ fullName: "", email: "", phone: "", organizationType: "" as typeof organizationTypes[number], requirement: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    try { formSchema.parse(formData); setErrors({}); return true; }
    catch (error) { if (error instanceof z.ZodError) { const fieldErrors: Partial<Record<keyof FormData, string>> = {}; error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as keyof FormData] = err.message; }); setErrors(fieldErrors); } return false; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("early_access_submissions").insert({ full_name: formData.fullName.trim(), email: formData.email.trim().toLowerCase(), phone: formData.phone?.trim() || null, organization_type: formData.organizationType, requirement: formData.requirement?.trim() || null });
      if (error) { setSubmitError("Unable to submit. Please try again."); return; }
      setIsSubmitted(true);
    } catch { setSubmitError("An unexpected error occurred."); }
    finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const inputClass = (hasError: boolean) => `w-full px-4 py-3.5 rounded-xl bg-sentinel-navy/50 border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-sentinel-glow/30 focus:border-sentinel-glow/50 transition-all duration-200 ${hasError ? "border-sentinel-threat/50" : "border-white/[0.08]"}`;

  return (
    <section id="waitlist" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(210_100%_50%/0.06),transparent_70%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-6">
              <ShieldCheck className="w-12 h-12 text-sentinel-glow" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 20px hsl(210 100% 50% / 0.4))' }} />
            </motion.div>
            <h2 className="text-foreground mb-3">Request Early Access</h2>
            <p className="text-muted-foreground text-sm">Join select organisations validating Sentinel's approach.</p>
          </div>

          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-sentinel-safe mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium text-foreground mb-2">Thank You</h3>
              <p className="text-muted-foreground text-sm">We'll be in touch if there's alignment.</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">Full Name <span className="text-sentinel-threat">*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass(!!errors.fullName)} placeholder="Your full name" />
                {errors.fullName && <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">Email <span className="text-sentinel-threat">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass(!!errors.email)} placeholder="you@company.com" />
                {errors.email && <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">Phone <span className="text-muted-foreground text-xs">(optional)</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass(!!errors.phone)} placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">Organization Type <span className="text-sentinel-threat">*</span></label>
                <select name="organizationType" value={formData.organizationType} onChange={handleChange} className={`${inputClass(!!errors.organizationType)} cursor-pointer ${!formData.organizationType ? "text-muted-foreground/50" : ""}`}>
                  <option value="" disabled>Select type</option>
                  {organizationTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.organizationType && <p className="mt-1.5 text-xs text-sentinel-threat/80">{errors.organizationType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/90 mb-2">Requirement <span className="text-muted-foreground text-xs">(optional)</span></label>
                <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows={3} className={`${inputClass(!!errors.requirement)} resize-none`} placeholder="Brief description" />
              </div>
              {submitError && <div className="p-3 rounded-xl bg-sentinel-threat/10 border border-sentinel-threat/20"><p className="text-sm text-sentinel-threat/90">{submitError}</p></div>}
              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full btn-premium py-4 text-base disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : "Request Access"}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
