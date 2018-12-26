import React from 'react';
import TopSection from '~/pages/Reports/components/Landing/TopSection';
import SectionDivider from '~/pages/Reports/components/SectionDivider';
import JoinInButton from '~/pages/Reports/components/JoinInButton';
import HowItWorksSection from '~/pages/Reports/components/Landing/HowItWorksSection';

export default () => (
  <div>
    <TopSection toUrl="/meldungen/wo" />
    <SectionDivider />
    <HowItWorksSection />
    <JoinInButton toUrl="/meldungen/wo" />

    <p>quote section TODO</p>
    <p>FAQ section TODO</p>
    <JoinInButton toUrl="/meldungen/wo" />
    <p>Footer section TODO</p>
  </div>
);
