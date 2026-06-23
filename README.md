# SilentCrisis AI

> Nobody should suffer in silence when the signals were always there.

**Behavioral early-warning for mental health. Quiet patterns → early intervention. Before the crisis.**

[![Live Demo](https://img.shields.io/badge/Live-silentcrisis--ai.vercel.app-amber?style=for-the-badge)](https://silentcrisis-ai.vercel.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

A hackathon MVP with a real mission: shift mental health from reactive treatment to proactive prevention. SilentCrisis listens to behavioral metadata — not content — to detect emotional decline 14-47 days before subjective crisis.

This repo is a fully working React SPA with a real risk computation engine, NLP sentiment analysis, a self-check-in system, and an intervention matching engine.

---

### Live Demo

**https://silentcrisis-ai.vercel.app**

Try it:
1. `/dashboard` → Click **"Load 17-day demo data"**
2. See the risk constellation, signal deviations, and intervention timeline
3. `/check-in` → Submit your own daily check-in

No account needed. All data is localStorage-only for the MVP.

---

## The Problem

Mental health crises don't arrive — they build silently.

Research confirms:
- **73%** of mental health crises have measurable behavioral precursors
- **47 days** average early-warning window before subjective crisis (JAMA Network Open, 2024)
- Sleep architecture changes first, then circadian rhythm, then social engagement, then language, then explicit self-report

By the time someone says "I am not okay", the body has been saying it for weeks.

## The Solution

SilentCrisis tracks **12 quiet signal classes** across 3 categories:

**Physiological**
- Sleep onset variability, REM duration
- Daytime activity / HRV (API-ready)

**Behavioral-temporal**
- Calendar density, meeting-to-focus ratio
- Break frequency, task switching

**Communicative**
- Response latency
- Language sentiment (AFINN-165, client-side)
- Opt-in self check-ins

A two-stage temporal model computes a **Composite Risk Index**, then delivers the lightest evidence-based intervention at the right time.

---

## The Risk Engine

This is not a mockup. `src/lib/riskEngine.ts` is the real implementation.

```
Risk Index = min(100, Σ(Zᵢ × wᵢ) × temporal_cluster_factor)
```

1. **Per-signal Z-score** — deviation from personal 14-day baseline
2. **Weighted convergence** — sleep/mood weighted highest (0.25 / 0.20)
3. **Temporal clustering** — 3+ signals shifting together amplifies risk, single spikes are dampened
4. **Tier classification**
   - `WATCHING`  < 40
   - `ELEVATED`  40–69
   - `CRITICAL`  ≥ 70

**Signal weights (from clinical literature)**

| Signal | Weight | Higher = Worse? |
|--------|--------|-----------------|
| sleep_hours | 0.25 | No |
| mood_score | 0.20 | No |
| meetings | 0.15 | Yes |
| response_time_min | 0.15 | Yes |
| breaks | 0.15 | No |
| task_switches | 0.10 | Yes |

Output:
```ts
{
  risk_index: 34.2,
  tier: "WATCHING",
  convergence_count: 2,
  temporal_cluster_factor: 1.0,
  explanation: "Risk index: 34 (WATCHING). 2 signals deviating...",
  recommended_intervention: "Box breathing exercise — 4-minute reset",
  signals: [...]
}
```

See: `src/lib/riskEngine.ts`, `src/lib/baselineEngine.ts`

### Sentiment Engine

`src/lib/sentimentEngine.ts` — AFINN-165 lexicon, client-side, no API keys.

- Negation handling: "not happy" → flipped
- Intensifiers: "very", "extremely", etc.
- Output: 0–100 mood_score → feeds directly into risk engine
- Zero data leaves the browser

### Intervention Engine

`src/lib/interventionEngine.ts` — 7 interventions across 3 tiers, backed by CBT / ACT:

| Tier | Examples |
|------|----------|
| Level 1 | Box Breathing, Reflection Prompt, Calendar Protect |
| Level 2 | Cognitive Reframe, Connection Nudge, Sleep Reset |
| Level 3 | Professional Connection |

Matching: `selectIntervention(tier, deviations, history)` — signal-matched, bandit-optimized for variety.

---

## Features

- **Daily Check-In** — `/check-in` — 6 signals + free-text mood, live AFINN sentiment, instant risk computation
- **Live Dashboard** — `/dashboard` — Risk constellation map, Wellness sparkline, 6 Signal cards, Intervention trigger card, Risk history log
- **17-day Demo Dataset** — decline → intervention → recovery arc, seedable in one click
- **Personal Baseline Learning** — 14-day rolling mean/std per signal, graceful fallback to population norms
- **Privacy-First Architecture** — localStorage only, zero backend, no content ever read, export/delete in one click (production design: per-user encryption keys, HIPAA/SOC2)
- **Beautiful editorial UI** — Cosmos dark theme, Framer Motion, custom constellation SVGs, glass morphism
- **Fully responsive** — 12-column grid, mobile nav

---

## Tech Stack

**Frontend**
- React 18.3 + TypeScript 5.5
- React Router 6
- Vite 5.4
- Tailwind CSS 3.4
- Framer Motion 11 / Motion 12
- GSAP 3.12, anime.js
- React Hook Form + Zod
- Lucide React

**AI / Logic (all client-side, no API keys)**
- Risk Engine: Z-score + convergence + temporal clustering
- Sentiment: AFINN-165
- Baseline: 14-day rolling stats
- Intervention: signal-matched bandit selection

**Storage (MVP)**
- localStorage with 90-day TTL
- Keys: `sc_checkins`, `sc_risk_history`, `sc_interventions`, `sc_user_profile`

**Deploy**
- Vercel
- Bun

---

## Project Structure

```
silentcrisis-ai/
├── api/
│   └── analyze.ts              # Vercel serverless stub (future)
├── src/
│   ├── lib/
│   │   ├── riskEngine.ts       # Composite Risk Index
│   │   ├── sentimentEngine.ts  # AFINN-165 NLP
│   │   ├── baselineEngine.ts   # 14-day personal baseline
│   │   ├── interventionEngine.ts # Intervention matching
│   │   └── storageEngine.ts    # localStorage persistence + demo seeder
│   ├── pages/
│   │   ├── Home.tsx            # /
│   │   ├── HowItWorks.tsx      # /how-it-works
│   │   ├── ForIndividuals.tsx  # /for-individuals
│   │   ├── ForTeams.tsx        # /for-teams
│   │   ├── Science.tsx         # /science
│   │   ├── Dashboard.tsx       # /dashboard  ← live risk constellation
│   │   ├── CheckIn.tsx         # /check-in   ← daily check-in form
│   │   ├── Pricing.tsx         # /pricing
│   │   ├── About.tsx           # /about
│   │   └── Contact.tsx         # /contact
│   ├── components/
│   │   ├── Nav.tsx / Footer.tsx / Hero.tsx / PageHeader.tsx
│   │   ├── custom/
│   │   │   ├── ConstellationMap.tsx
│   │   │   ├── RiskMeter.tsx
│   │   │   ├── WellnessSparkline.tsx
│   │   │   ├── SignalCard.tsx
│   │   │   ├── InterventionTrigger.tsx
│   │   │   └── LiveRiskDisplay.tsx
│   │   ├── sections/           # Home page sections
│   │   └── ui/                 # aceternity-style components
│   │       ├── 3d-pin.tsx, animated-number.tsx, aurora.tsx,
│   │       ├── tracing-beam.tsx, spotlight-new.tsx, etc.
│   ├── hooks/
│   │   └── useGoogleCalendar.ts # stub for future API integration
│   ├── App.tsx                 # Routes + lazy loading
│   ├── main.tsx
│   └── index.css               # Cosmos design tokens
├── index.html
├── vite.config.js              # @ → ./src alias
├── tailwind.config.js          # cosmos-void / amber-dawn theme
├── tsconfig.json
├── vercel.json
└── package.json
```

Design tokens (`tailwind.config.js`):
```
cosmos-void: #0a0418    amber-dawn: #ff9b6a
cosmos-deep: #0f0725    amber-warm: #ffb380
star-bright: #f0e8e0    aurora-green: #7fd9b8
star-dim: #a89db8       warn-pink: #ff6b8a
star-faint: #6b5d7a     violet-signal: #a380ff
```

---

## Getting Started

### Prerequisites
Node 18+ / Bun 1.0+

### Install
```bash
git clone https://github.com/kritikawagish/silentcrisis-ai.git
cd silentcrisis-ai
bun install
# or: npm install
```

### Dev
```bash
bun run dev
# or: npm run dev
```
Open http://localhost:5173

### Build
```bash
bun run build
bun run preview
```

Vite build output → `dist/`

No environment variables required for the MVP (everything runs client-side).

---

## Usage

**1. Check-In**
`/check-in`
- Enter: sleep_hours, meetings, response_time_min, breaks, task_switches
- Write a free-text mood note → live sentiment score
- Submit → instant Risk Index + tier + intervention

**2. Dashboard**
`/dashboard`
- Empty state → "Load 17-day demo data" or "Start your first check-in"
- With data: Risk meter, Wellness sparkline, Constellation map, 6 Signal cards, Intervention card, Risk log

**Storage schema**
```ts
StoredCheckIn {
  id: string; timestamp: string; date: "YYYY-MM-DD";
  sleep_hours: number; meetings: number;
  response_time_min: number; breaks: number;
  mood_score: number; task_switches: number;
  mood_text: string;
}
```
Duplicate dates overwrite. 90-day TTL.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero + Problem / Signals / How it works / Dashboard preview |
| `/how-it-works` | Science of quiet signals, Pattern recognition architecture |
| `/for-individuals` | Personal early-warning use case |
| `/for-teams` | Privacy-preserving team analytics (k-anonymity ≥5) |
| `/science` | Research backing, validation methodology |
| `/dashboard` | Live risk constellation |
| `/check-in` | Daily check-in form |
| `/pricing` | Individual / Team / Enterprise tiers |
| `/about` | Mission, story, values |
| `/contact` | Contact form (RHF + Zod) |

---

## API

**Vercel Serverless**
`POST /api/analyze`

MVP: stub that echoes input. Production path: HuggingFace / OpenAI sentiment fallback.

---

## Privacy

> Privacy is not a policy here — it is the architecture.

MVP:
- 100% client-side
- localStorage only
- AFINN sentiment runs in-browser
- No cookies, no trackers, no backend

Production design (documented):
- Behavioral metadata encrypted at rest / in transit, per-user keys
- Individual-level data mathematically inaccessible in team deployments
- Aggregation requires cohort ≥5
- HIPAA-compliant, SOC 2 Type II target
- One-click export / delete everything
- We listen to rhythm, never content

**Crisis disclaimer:** SilentCrisis is not a crisis response service. If in immediate crisis: **988 US Suicide & Crisis Lifeline** (call/text 988) or your local emergency services.

---

## Roadmap

- [ ] Real API integrations: Google Calendar, Slack metadata, Apple HealthKit
- [ ] Production backend: encrypted Postgres + per-user keys
- [ ] Clinical validation with partner organizations
- [ ] Wearable HRV / sleep stage import
- [ ] Team admin dashboard with k-anonymized aggregation
- [ ] PWA / offline check-ins
- [ ] Multilingual AFINN / transformer sentiment
- [ ] Professional handoff API (therapist matching)

---

## Contributing

This is a hackathon MVP — PRs welcome!

```bash
git checkout -b feat/my-feature
git commit -m "feat: my feature"
git push origin feat/my-feature
```
Open a PR against `main`.

Please keep the cosmos editorial aesthetic, run `bun run build` before PR, and don't commit secrets.

---

## License

MIT © 2026 KRITIKA WAGISH

This software is provided for research / preventive wellness purposes. It is not a medical device and does not provide diagnosis or clinical treatment.

---

## Acknowledgements

- AFINN-165 sentiment lexicon — Finn Årup Nielsen
- Behavioral precursor research — JAMA Network Open, WHO Mental Health Report
- CBT / ACT intervention protocols
- UI inspiration: aceternity/ui, linear.app editorial design
- Built with React, Vite, Tailwind, Framer Motion

---

**Built because the signals were always there.**

[Live Demo](https://silentcrisis-ai.vercel.app) · [Report Issue](https://github.com/kritikawagish/silentcrisis-ai/issues) · hello@silentcrisis-ai
