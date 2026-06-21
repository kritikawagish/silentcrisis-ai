import React from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/sections/ProblemSection';
import SignalsSection from '@/components/sections/SignalsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import DashboardPreviewSection from '@/components/sections/DashboardPreviewSection';
import InterventionsSection from '@/components/sections/InterventionsSection';
import TrustSection from '@/components/sections/TrustSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import FAQSection from '@/components/sections/FAQSection';

export default function Home() {
  return (
    <motion.main
      id="home_page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />
      <ProblemSection />
      <SignalsSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <InterventionsSection />
      <TrustSection />
      <FinalCTASection />
      <FAQSection />
    </motion.main>
  );
}
