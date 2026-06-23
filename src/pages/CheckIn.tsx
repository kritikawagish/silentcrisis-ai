import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Moon, Calendar, MessageSquare, Coffee, GitBranch,
  Smile, ArrowRight, Sparkles, AlertCircle, CheckCircle2, Brain
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { analyzeSentiment } from '@/lib/sentimentEngine';
import { computeRisk } from '@/lib/riskEngine';
import { computeBaseline } from '@/lib/baselineEngine';
import { saveCheckIn, getCheckInHistory, saveRiskResult, getInterventionHistory } from '@/lib/storageEngine';
import { selectIntervention } from '@/lib/interventionEngine';

const schema = z.object({
  sleep_hours: z.coerce.number().min(0, '0-14h').max(14, '0-14h'),
  meetings: z.coerce.number().min(0).max(20),
  response_time_min: z.coerce.number().min(0).max(300),
  breaks: z.coerce.number().min(0).max(20),
  task_switches: z.coerce.number().min(0).max(60),
  mood_text: z.string().min(5, 'Tell us a bit more — at least 5 characters').max(500),
});

type FormData = z.infer<typeof schema>;

export default function CheckIn() {
  const navigate = useNavigate();
  const [submittedResult, setSubmittedResult] = useState<any>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sleep_hours: 7,
      meetings: 3,
      response_time_min: 15,
      breaks: 3,
      task_switches: 10,
      mood_text: '',
    },
  });

  const moodText = watch('mood_text') || '';
  const sentiment = useMemo(() => analyzeSentiment(moodText), [moodText]);

  const onSubmit = async (data: FormData) => {
    // 1. Sentiment → mood_score
    const s = analyzeSentiment(data.mood_text);
    const mood_score = s.mood_score;

    // 2. Build check-in payload
    const today = new Date().toISOString().slice(0, 10);
    const checkIn = {
      id: `ci-${Date.now()}`,
      timestamp: new Date().toISOString(),
      date: today,
      sleep_hours: data.sleep_hours,
      meetings: data.meetings,
      response_time_min: data.response_time_min,
      breaks: data.breaks,
      mood_score,
      task_switches: data.task_switches,
      mood_text: data.mood_text,
    };

    // 3. Compute risk with current baseline
    const history = getCheckInHistory();
    const baseline = computeBaseline(history);
    const risk = computeRisk({
      sleep_hours: checkIn.sleep_hours,
      meetings: checkIn.meetings,
      response_time_min: checkIn.response_time_min,
      breaks: checkIn.breaks,
      mood_score: checkIn.mood_score,
      task_switches: checkIn.task_switches,
    }, baseline);

    // 4. Pick intervention
    const previousInterventions = getInterventionHistory().map(h => h.id);
    const intervention = selectIntervention(risk.tier, risk.signals, previousInterventions);

    // 5. Persist
    saveCheckIn(checkIn);
    saveRiskResult(today, risk, intervention.id);

    setSubmittedResult({ risk, intervention, sentiment: s, checkIn });
  };

  if (submittedResult) {
    const { risk, intervention } = submittedResult;
    const tierColor = risk.tier === 'WATCHING' ? '#7fd9b8' : risk.tier === 'ELEVATED' ? '#ff9b6a' : '#ff6b8a';

    return (
      <motion.main
        id="checkin_page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageHeader
          eyebrow="CHECK-IN COMPLETE"
          title={<>Signals recorded. <span className="italic text-star-dim">Here is what we see.</span></>}
          subtitle="Your risk constellation has been updated."
        />
        <section className="relative px-6 pb-32 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 md:p-12 space-y-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs tracking-widest text-star-faint uppercase mb-1">Risk Index</p>
                <p className="font-display text-5xl text-star-bright">{Math.round(risk.risk_index)}<span className="text-xl text-star-faint">/100</span></p>
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${tierColor}18`, color: tierColor, border: `1px solid ${tierColor}40` }}>
                {risk.tier}
              </div>
            </div>

            <div>
              <p className="text-star-dim font-extralight leading-relaxed">{risk.explanation}</p>
            </div>

            <div className="border-t border-star-bright/10 pt-6">
              <p className="text-xs tracking-widest text-amber-dawn uppercase mb-2">Recommended intervention · {intervention.tier}</p>
              <h3 className="font-display text-2xl text-star-bright mb-2">{intervention.title} · {intervention.duration}</h3>
              <p className="text-star-dim font-extralight mb-4">{intervention.description}</p>
              {intervention.instructions && (
                <ol className="space-y-2 text-star-dim font-extralight list-decimal list-inside text-sm">
                  {intervention.instructions.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/dashboard"
                className="flex-1 flex items-center justify-center gap-2 bg-amber-dawn text-cosmos-void font-medium px-6 py-3 rounded-xl hover:bg-amber-warm transition-colors"
              >
                View Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setSubmittedResult(null)}
                className="px-6 py-3 rounded-xl glass text-star-bright hover:bg-cosmos-surface transition-colors"
              >
                New check-in
              </button>
            </div>
          </motion.div>
        </section>
      </motion.main>
    );
  }

  return (
    <motion.main
      id="checkin_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        eyebrow="DAILY CHECK-IN"
        title={<>How are you, <span className="italic text-star-dim">really?</span></>}
        subtitle="2 minutes. 6 signals. Your personal baseline learns with you."
      />

      <section className="relative px-6 pb-32 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-strong rounded-3xl p-8 md:p-10 space-y-8">
          
          {/* Behavioral signals grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field icon={Moon} label="Sleep last night (hours)" error={errors.sleep_hours?.message}>
              <input type="number" step="0.1" {...register('sleep_hours')}
                className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none rounded-lg" />
            </Field>

            <Field icon={Calendar} label="Meetings today" error={errors.meetings?.message}>
              <input type="number" {...register('meetings')}
                className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none rounded-lg" />
            </Field>

            <Field icon={MessageSquare} label="Avg response time (min)" error={errors.response_time_min?.message}>
              <input type="number" {...register('response_time_min')}
                className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none rounded-lg" />
            </Field>

            <Field icon={Coffee} label="Breaks taken" error={errors.breaks?.message}>
              <input type="number" {...register('breaks')}
                className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none rounded-lg" />
            </Field>

            <Field icon={GitBranch} label="Task switches" error={errors.task_switches?.message} className="sm:col-span-2">
              <input type="number" {...register('task_switches')}
                className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-xl font-extralight text-star-bright focus:border-amber-dawn/60 focus:outline-none rounded-lg" />
            </Field>
          </div>

          {/* Mood text / sentiment */}
          <div>
            <label className="text-xs tracking-widest text-star-dim uppercase flex items-center gap-2 mb-2">
              <Smile size={14} /> How was your day, in your own words?
            </label>
            <textarea
              {...register('mood_text')}
              rows={4}
              placeholder="I'm feeling… tired but okay, a bit overwhelmed with meetings, looking forward to the weekend…"
              className="w-full bg-cosmos-void/60 border border-star-bright/10 px-4 py-3 text-lg font-extralight text-star-bright placeholder:text-star-faint/50 focus:border-amber-dawn/60 focus:outline-none rounded-xl resize-none"
            />
            {errors.mood_text && <p className="text-sm text-warn-pink mt-2 font-extralight">{errors.mood_text.message}</p>}
            
            {/* Live sentiment */}
            <AnimatePresence>
            {moodText.length > 4 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex flex-wrap items-center gap-3 text-sm font-extralight"
              >
                <span className="text-star-faint">Sentiment:</span>
                <span className="text-star-bright">
                  mood score <span className="font-display text-amber-dawn">{sentiment.mood_score.toFixed(0)}/100</span>
                </span>
                {sentiment.positive_words.length > 0 && (
                  <span className="text-aurora-green/80">+ {sentiment.positive_words.slice(0,3).join(', ')}</span>
                )}
                {sentiment.negative_words.length > 0 && (
                  <span className="text-warn-pink/80">− {sentiment.negative_words.slice(0,3).join(', ')}</span>
                )}
              </motion.div>
            )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 text-xs text-star-faint font-extralight border-t border-star-bright/10 pt-6">
            <Brain size={14} className="text-amber-dawn/70" />
            <span>Sentiment is analyzed locally with AFINN-165. No text ever leaves your browser.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-amber-dawn text-cosmos-void font-medium px-6 py-4 rounded-xl hover:bg-amber-warm transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Analyzing…' : <>Compute risk constellation <ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-center text-xs text-star-faint font-extralight">
            Already checked in today? Submitting again will overwrite today's entry. · <Link to="/dashboard" className="text-amber-dawn hover:underline">View dashboard</Link>
          </p>
        </form>
      </section>
    </motion.main>
  );
}

function Field({ icon: Icon, label, error, children, className = '' }: any) {
  return (
    <div className={className}>
      <label className="text-xs tracking-widest text-star-dim uppercase flex items-center gap-2 mb-2">
        <Icon size={14} className="text-amber-dawn/70" /> {label}
      </label>
      {children}
      {error && <p className="text-sm text-warn-pink mt-1 font-extralight">{error}</p>}
    </div>
  );
}
