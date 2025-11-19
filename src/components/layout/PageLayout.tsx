import React from "react";
import { Navbar } from "./Navbar";
import { IntroOverviewSection } from "../sections/IntroOverviewSection";
import { HeroSection } from "../sections/HeroSection";
import { CostSummarySection } from "../sections/CostSummarySection";
import { FiscalImpactSection } from "../sections/FiscalImpactSection";
import { SocialSecuritySection } from "../sections/SocialSecuritySection";
import { GdpSpilloverSection } from "../sections/GdpSpilloverSection";
import { GeographySection } from "../sections/GeographySection";
import { ProductivitySection } from "../sections/ProductivitySection";
import { UnfairCompetitionSection } from "../sections/UnfairCompetitionSection";
import { PolicyAutopsySection } from "../sections/PolicyAutopsySection";
import { LiteratureExplorerSection } from "../sections/LiteratureExplorerSection";
import { PredictiveModelSection } from "../sections/PredictiveModelSection";
import { ProfilesSection } from "../sections/ProfilesSection";
import { TransitionSection } from "../sections/TransitionSection";
import { ProposalSection } from "../sections/ProposalSection";
import { ImplementationSection } from "../sections/ImplementationSection";
import { ConclusionSection } from "../sections/ConclusionSection";

export const PageLayout: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-layout">
        <IntroOverviewSection />
        <HeroSection />
        <CostSummarySection />
        <FiscalImpactSection />
        <SocialSecuritySection />
        <GdpSpilloverSection />
        <GeographySection />
        <ProductivitySection />
        <UnfairCompetitionSection />
        <PolicyAutopsySection />
        <LiteratureExplorerSection />
        <PredictiveModelSection />
        <ProfilesSection />
        <TransitionSection />
        <ProposalSection />
        <ImplementationSection />
        <ConclusionSection />
      </main>
    </div>
  );
};
