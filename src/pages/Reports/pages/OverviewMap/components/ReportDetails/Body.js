import React from 'react';
import styled from 'styled-components';

import Link from '~/components/Link';
import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
// import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import config from '~/pages/Reports/config';
import { getReportStatusCaption } from '~/pages/Reports/apiservice';

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

const EntryLink = styled(Link)`
  && {
    color: ${config.colors.black};
    border-bottom: 1px solid ${config.colors.interaction};
    line-height: 1.6;
  }
`;

const DetailsBody = ({
  description,
  details: { fee_acceptable: isFeeAcceptable },
  origin,
  plannings
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

    {origin.length > 0 && (
      <>
        <SubHeading alignLeft>Eingeflossene Meldungen</SubHeading>
        <p>Folgende Meldungen sind in dieser Planung berücksichtigt worden:</p>
        <ul>
          {origin.map((source) => (
            <li key={`origin-${source.id}`}>
              <EntryLink to={`${config.routes.reports.map}/${source.id}`}>
                {source.address}
              </EntryLink>
            </li>
          ))}
        </ul>
      </>
    )}

    {plannings.length > 0 && (
      <>
        <SubHeading alignLeft>Umsetzung in der Nähe</SubHeading>
        <p>
          In der unmittelbaren Nähe dieses Vorschlags werden Radbügel an
          folgenden Standorten umgesetzt:
        </p>
        <ul>
          {plannings.map((source) => (
            <li key={`planning-${source.id}`}>
              <EntryLink to={`${config.routes.reports.map}/${source.id}`}>
                {source.address} ({getReportStatusCaption(source.status)})
              </EntryLink>
            </li>
          ))}
        </ul>
      </>
    )}
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
