import React from 'react';
import styled from 'styled-components';

import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
// import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import config from '~/pages/Reports/config';

const IndicatorSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndicatorTitle = styled.p`
  color: ${config.colors.darkbg};
  flex-flow: 2;
  font-weight: bold;
`;

const Text = styled.p`
  color: ${config.colors.darkgrey};
  font-size: 1em;
`;

const IndicatorValue = styled(Text)`
  flex-flow: 1;
  text-align: center;
  white-space: pre-wrap;
`;

// function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString('de-DE', {
//     month: '2-digit',
//     day: '2-digit',
//     year: 'numeric'
//   });
// }

const DetailsBody = ({
  description,
  details: { fee_acceptable: isFeeAcceptable }
  // created_date: createdDate
}) => (
  <>
    {description && (
      <>
        <SubHeading alignLeft>Hinweise zum Ort:</SubHeading>
        <Text data-cy="reports-detail-description">{description}</Text>
      </>
    )}

    <IndicatorSection>
      <IndicatorTitle>Bedarf Fahrradparkhaus:</IndicatorTitle>
      <IndicatorValue>{isFeeAcceptable ? 'ja' : 'nein'}</IndicatorValue>
    </IndicatorSection>

    {/*
    <HorizontalRuler className="light" />

     {createdDate && (
      <Text data-cy="reports-detail-datetime">
        Meldung vom: {formatDate(createdDate)}
      </Text>
    )} */}
  </>
);

export default DetailsBody;
