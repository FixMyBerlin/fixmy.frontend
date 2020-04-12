import React from 'react';

import JoinButton from './components/JoinButton';
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
    <JoinButton />
    <MapLink />
    <HorizontalRuler className="light" />
    <Faq />
    <JoinButton />
    <MapLink />
  </>
);

export default BerlinLanding;
