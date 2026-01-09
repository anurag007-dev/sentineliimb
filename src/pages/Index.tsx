import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import AudienceSection from "@/components/AudienceSection";
import DifferentiatorSection from "@/components/DifferentiatorSection";
import WaitlistSection from "@/components/WaitlistSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Auto-complete splash after delay
    const timer = setTimeout(() => {
      setShowSplash(false);
      setContentVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SplashScreen 
        isVisible={showSplash} 
        onComplete={handleSplashComplete}
      />
      
      {contentVisible && (
        <>
          <Header />
          <main>
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <AudienceSection />
            <DifferentiatorSection />
            <WaitlistSection />
            <TrustSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
