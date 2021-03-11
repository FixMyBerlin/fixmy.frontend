import React from 'react';

import config from '~/pages/Reports/config';

import AachenLanding from './aachen';
import BerlinLanding from './berlin';

const Landing = () => {
  switch (config.region) {
    case 'aachen':
      return <AachenLanding />;
    default:
      return <BerlinLanding />;
  }
};

export default Landing;
