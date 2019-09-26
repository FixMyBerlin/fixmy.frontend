import React, { Fragment } from 'react';
import styled from 'styled-components';

import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';

const IndicatorSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndicatorTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.32;
  color: ${config.colors.black};
  flex-flow: 2;
`;

const Text = styled.p`
  color: ${config.colors.darkgrey};
  font-size: 16px;
`;

const IndicatorValue = styled(Text)`
  flex-flow: 1;
  text-align: center;
  white-space: pre-wrap;
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
}

const DetailsBody = ({
  description,
  details: { fee_acceptable: isFeeAcceptable },
  created_date: createdDate
}) => (
  <React.Fragment>
    {description && (
      <Fragment>
        <SubHeading alignLeft>Hinweise an die Verwaltung</SubHeading>
        <Text>{description}</Text>
      </Fragment>
    )}

    <IndicatorSection>
      <IndicatorTitle>Bedarf Fahrradparkhaus</IndicatorTitle>
      <IndicatorValue>{isFeeAcceptable ? 'ja' : 'nein'}</IndicatorValue>
    </IndicatorSection>

    <HorizontalRuler className="light" />

    {createdDate && <Text>Meldung vom: {formatDate(createdDate)}</Text>}
  </React.Fragment>
);

export default DetailsBody;
