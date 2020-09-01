import React from 'react';

import CTA from './components/CTA';
import HowItWorksSection from './components/HowItWorksSecion';
import Quote from './components/QuoteWeisbrich';
import MapLink from './components/MapLink';
import Faq from './components/Faq';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';

const BerlinLanding = () => (
  <>
    <HowItWorksSection />
    <HorizontalRuler className="light" />
    <Quote />
    <CTA />
    <MapLink />
    <HorizontalRuler className="light" />
    <Faq />
    <CTA />
    <MapLink />
  </>
);

export default BerlinLanding;
