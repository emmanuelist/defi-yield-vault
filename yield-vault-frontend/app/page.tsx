"use client";

import React, { useState } from "react";
import HeroSection from "@/components/Landing/Hero/HeroSection";
import { useUser } from "@/context/UserContext";
import NewUserOnboarding from "@/components/Landing/Onboarding/NewUserOnboarding";
import YieldVaultFeatures from "@/components/Landing/YieldVaultFeatures";
import HowItWorksSection from "@/components/Landing/HowItWorks";
import ElegantCtaSection from "@/components/Landing/ElegantCtaSection";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { userState, completeOnboarding } = useUser();

  // Handler for starting the onboarding process
  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  // Handler for completing onboarding
  const handleOnboardingComplete = () => {
    completeOnboarding();
    setShowOnboarding(false);
  };

  return (
    <>
      {/* When showOnboarding is true, show the onboarding flow instead of the hero */}
      {showOnboarding ? (
        <NewUserOnboarding onOnboardingComplete={handleOnboardingComplete} />
      ) : (
        // <HeroSection onStartOnboarding={handleStartOnboarding} />
        <>
          <Navbar />
          <main>
            <HeroSection />
            <YieldVaultFeatures />
            <HowItWorksSection />
            <ElegantCtaSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}