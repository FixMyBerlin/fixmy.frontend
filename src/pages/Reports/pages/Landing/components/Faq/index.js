import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import FaqItem from './FaqItem';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

const FaqWrapper = styled.div`
  padding-top: 48px;
  margin-bottom: 62px;

  .feedbackmail {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;

const FaqSection = () => (
  <FaqWrapper>
    <Heading>Häufige Fragen</Heading>
    {config.reports.faq.map(({ heading, text }) => (
      <FaqItem key={heading} heading={heading} text={text} />
    ))}
  </FaqWrapper>
);

export default FaqSection;
