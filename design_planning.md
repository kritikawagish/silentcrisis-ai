# SilentCrisis AI — Design Planning Contract
## Phase 1: Extraction

### 1.1 Brief
- Mental health early-warning platform for individuals + teams
- Classification: **EDITORIAL MARKETING** (not dashboard, not e-commerce)
- Success: Visitor *feels* the quiet vigilance of the brand within 5 seconds; understands the metaphor (cosmic patterns = behavioral signals) by section 2

### 1.2 Visual DNA
- Metaphor shape: **CONSTELLATION** (points connected forming meaningful patterns)
- Materials: cosmic glass, soft amber starlight, drifting aurora
- Shape transformation: stars → labeled signals → drawn lines → data points → guiding light

### 1.3 Colors
- Deep indigo void `#0a0418` (from NASA Hubble deep-field photography)
- Warm amber starlight `#ff9b6a` (from star-formation regions like the Carina Nebula)
- Violet nebula `#a380ff` (from purple emission nebulae)
- Aurora green `#7fd9b8` (intervention success)
- Warn pink `#ff6b8a` (elevated risk only — never alarming)
- Font: **Fraunces** display (warm, humane serif — not generic geometric sans) + **DM Sans** body (200 weight)

### 1.4 Motion
- Character: ORGANIC (cubic-bezier 0.22, 1, 0.36, 1), 600-1200ms
- Scroll: VERTICAL primary, with TracingBeam scrolls and useScroll-driven timeline beam

### 1.5 Component Ledger

| # | Slug | Category | Used In |
|---|------|----------|---------|
| 1 | aurora | BACKGROUND | Hero, FinalCTA |
| 2 | particles | BACKGROUND | Hero, Signals, Trust, PageHeader |
| 3 | spotlight-new | BACKGROUND | HowItWorks |
| 4 | split-text | TEXT | Hero headline |
| 5 | flip-words | TEXT | Hero rotating concept |
| 6 | animated-number | CONTENT | Problem, Trust, ForTeams, Science, Dashboard |
| 7 | scroll-reveal | TEXT | Available for use |
| 8 | tracing-beam | REVEAL | HowItWorks, Science, About |
| 9 | timeline | CONTENT | HowItWorks |
| 10 | 3d-pin | INTERACTION | Available |
| 11 | mask-expand | CONTENT | DashboardPreview |
| 12 | text-reveal-card | CONTENT | FinalCTA |
| 13 | infinite-moving-cards | CONTENT | Trust testimonials |
| 14 | bento-grid-creator | CONTENT | Available |
| 15 | faq-section | CONTENT | FAQSection, Pricing |

### 1.6 Pages
Home / HowItWorks / ForIndividuals / ForTeams / Science / Dashboard / Pricing / About / Contact (9 pages)

## Phase 2: Section commitments
17 fields per section implemented (see code in src/components/sections/)

## Phase 3: Escalation
- Hero: video + particle disturbance + flip-words (3-layer)
- Dashboard demo: live interactive sample user with 11+ widgets
- Final CTA: dual cards with TextRevealCard divider

## Phase 4: Custom Components
1. ConstellationMap — cursor-interactive SVG signal map
2. WellnessSparkline — decline → intervention → recovery animated trajectory
3. RiskMeter — circular animated risk gauge
4. SignalCard — behavioral signal with mini-chart
5. InterventionTrigger — animated intervention demo

## Uniqueness
1. Cosmic-warmth pairing (mental health usually uses mint pastels; we use indigo + amber)
2. Constellation pattern motif explicitly maps to AI metaphor
3. Interactive intervention preview — visitors trigger sample care
