'use client';

import Image from "next/image";
import { useState } from 'react';
import FloatingNavigation from "@/components/FloatingNavigation";
import HeroSection from "@/components/HeroSection";
import PackagesSection from "@/components/PackagesSection";
import StatsSection from "@/components/StatsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import FamousAttractionsSection from "@/components/FamousAttractionsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import VideoSection from "@/components/VideoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FooterSection from "@/components/FooterSection";
import MultiStepFormPopup from "@/components/MultiStepFormPopup";
import FloatingCtaButtons from "@/components/FloatingCtaButtons";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <FloatingNavigation />
      <FloatingCtaButtons />
      <HeroSection />
      <StatsSection />
      <PackagesSection />
      <ActivitiesSection />
      <FamousAttractionsSection />
      <WhyChooseUsSection />
      <VideoSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />

      {/* Multi-Step Form Popup */}
      <MultiStepFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
