import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';
import config from '~/pages/Reports/config';

import HowItWorksSection from '.';
import Steps from './Steps';

const Wrapper = styled.div`
  max-width: 568px;
  margin: 0 auto;
  padding: 0 16px;

  ${media.m`
  padding: 0 24px;
`}
`;

export default {
  title: 'Meldungen / Landing / How it works',
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

export const Full = () => <HowItWorksSection />;

const stepsConfig = [
  {
    step: 1,
    text: 'Du meldest, wo neue Bügel benötigt werden.',
    color: config.colors.interaction,
  },
  {
    step: 2,
    text: '???',
    color: '#ff99d5', // TODO: add to colors config
  },
  {
    step: 3,
    text: 'Profit!',
    color: config.colors.black,
  },
];

export const onlySteps = () => <Steps steps={stepsConfig} />;
