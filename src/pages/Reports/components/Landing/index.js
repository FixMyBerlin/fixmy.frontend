import React from 'react';
import TopSection from '~/pages/Reports/components/Landing/TopSection';
import SectionDivider from '~/pages/Reports/components/SectionDivider';
import JoinInButton from '~/pages/Reports/components/Landing/JoinInButton';
import HowItWorksSection from '~/pages/Reports/components/Landing/HowItWorksSection';
import QuoteSection from '~/pages/Reports/components/Landing/QuoteSection';
import FaqSection from '~/pages/Reports/components/Landing/FaqSection';

export default () => (
  <div>
    <TopSection toUrl="/meldungen/wo" />
    <SectionDivider />
    <HowItWorksSection />
    <JoinInButton toUrl="/meldungen/wo" />

    <QuoteSection />
    <FaqSection />
    <JoinInButton toUrl="/meldungen/wo" />
    <p>Footer section TODO</p>
  </div>
);
