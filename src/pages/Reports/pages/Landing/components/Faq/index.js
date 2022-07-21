import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

import FaqItem from './FaqItem';

const FaqWrapper = styled.div`
  margin: 2em 0;

  .feedbackmail {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;

const content = config.reports.enabled
  ? config.reports.landing.reportsActive
  : config.reports.landing.reportsInactive;

const FaqSection = () => (
  <FaqWrapper>
    <Heading>Häufige Fragen</Heading>
    {content.faq?.map(({ heading, text }) => (
      <FaqItem key={heading} heading={heading} text={text} />
    ))}
  </FaqWrapper>
);

export default FaqSection;
