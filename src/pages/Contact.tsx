import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Mail, Building2, User, Check } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const schema = z.object({
  name: z.string().min(2, 'Please share your name.'),
  email: z.string().email('Please enter a valid email.'),
  company: z.string().optional(),
  type: z.enum(['individual', 'team', 'research', 'press']),
  message: z.string().min(10, 'Tell us a little more — at least 10 characters.'),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'individual' },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.main
      id="contact_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="Get in touch"
        accent="08"
        title={<>We&apos;d love <span className="italic text-star-dim">to hear from you.</span></>}
        subtitle="Sales, support, research, press — pick a path, tell us a story."
      />

      <section className="relative w-full bg-cosmos-deep py-32 overflow-hidden">
        <div className="absolute -right-32 top-1/4 w-[40vw] h-[60vh] opacity-15 pointer-events-none" style={{ clipPath: 'ellipse(60% 70% at 60% 50%)' }}>
          <div className="w-full h-full" style={{ background: 'radial-gradient(circle, rgba(255,155,106,0.4) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-[2400px] mx-auto">
          <div className="grid grid-cols-12 gap-y-12">
            <div className="col-span-12 px-4 md:col-start-2 md:col-span-4">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
                <span className="text-lg font-extralight uppercase tracking-wide-cosmic text-amber-dawn/70 block mb-6">
                  Reach the right person
                </span>
                <h2 className="font-display text-4xl md:text-5xl leading-[0.98] font-extralight text-star-bright tracking-editorial text-balance mb-10">
                  Direct lines, <span className="italic text-star-dim">no maze.</span>
                </h2>

                <div className="space-y-6">
                  {[
                    { icon: User, label: 'Individuals', email: 'hello@silentcrisis.ai', color: '#ff9b6a' },
                    { icon: Building2, label: 'Enterprise sales', email: 'sales@silentcrisis.ai', color: '#a380ff' },
                    { icon: Mail, label: 'Research & press', email: 'research@silentcrisis.ai', color: '#7fd9b8' },
                  ].map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div
                        className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${c.color}15` }}
                      >
                        <c.icon style={{ color: c.color }} size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-lg font-extralight uppercase tracking-wide-cosmic" style={{ color: c.color }}>
                          {c.label}
                        </p>
                        <a href={`mailto:${c.email}`} className="text-xl font-extralight text-star-bright hover:text-amber-dawn transition-colors">
                          {c.email}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-star-bright/10">
                  <p className="text-lg font-extralight uppercase tracking-wide-cosmic text-warn-pink/80 mb-3">
                    In immediate crisis?
                  </p>
                  <p className="text-lg font-extralight text-star-dim leading-relaxed">
                    Please reach out to{' '}
                    <a href="tel:988" className="text-warn-pink hover:underline">988 (US Suicide & Crisis Lifeline)</a>
                    {' '}or your local emergency services. SilentCrisis is not a crisis response service.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="col-span-12 px-4 md:col-start-7 md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="glass-strong p-8 md:p-10"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-aurora-green/15 flex items-center justify-center mx-auto mb-6">
                      <Check className="text-aurora-green" size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-3xl font-extralight text-star-bright mb-3">Message received.</h3>
                    <p className="text-lg font-extralight text-star-dim">
                      We&apos;ll be in touch within one business day.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <div>
                      <label htmlFor="contact_name" className="text-lg font-extralight text-star-dim uppercase tracking-wide-cosmic block mb-2">
                        Your name
                      </label>
                      <input
                        id="contact_name"
                        type="text"
                        {...register('name')}
                        className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright placeholder:text-star-faint/50 focus:border-amber-dawn/60 focus:outline-none transition-colors"
                        placeholder="What should we call you?"
                      />
                      {errors.name && <p className="text-lg font-extralight text-warn-pink mt-2">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact_email" className="text-lg font-extralight text-star-dim uppercase tracking-wide-cosmic block mb-2">
                        Email
                      </label>
                      <input
                        id="contact_email"
                        type="email"
                        {...register('email')}
                        className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright placeholder:text-star-faint/50 focus:border-amber-dawn/60 focus:outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-lg font-extralight text-warn-pink mt-2">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="contact_company" className="text-lg font-extralight text-star-dim uppercase tracking-wide-cosmic block mb-2">
                        Company <span className="text-star-faint">· optional</span>
                      </label>
                      <input
                        id="contact_company"
                        type="text"
                        {...register('company')}
                        className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright placeholder:text-star-faint/50 focus:border-amber-dawn/60 focus:outline-none transition-colors"
                        placeholder="Where do you work?"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact_type" className="text-lg font-extralight text-star-dim uppercase tracking-wide-cosmic block mb-2">
                        I am reaching out as
                      </label>
                      <select
                        id="contact_type"
                        {...register('type')}
                        className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none transition-colors"
                      >
                        <option value="individual">An individual</option>
                        <option value="team">A team / HR leader</option>
                        <option value="research">A researcher</option>
                        <option value="press">Press / media</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact_message" className="text-lg font-extralight text-star-dim uppercase tracking-wide-cosmic block mb-2">
                        Your message
                      </label>
                      <textarea
                        id="contact_message"
                        rows={5}
                        {...register('message')}
                        className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright placeholder:text-star-faint/50 focus:border-amber-dawn/60 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us a little about what you're looking for..."
                      />
                      {errors.message && <p className="text-lg font-extralight text-warn-pink mt-2">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center gap-3 text-xl font-extralight bg-amber-dawn text-cosmos-void px-7 py-4 hover:bg-amber-warm transition-all duration-500 disabled:opacity-50"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)', paddingRight: '36px' }}
                    >
                      {isSubmitting ? 'Sending quietly...' : 'Send message'}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" strokeWidth={1.5} />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
