import React from 'react';
import styled from 'styled-components';

import PlannerImg from '~/images/reports/planner.jpg';
import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';

const Quote = styled.div`
  text-align: center;
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  margin: 50px 0;
  max-width: 320px;
  padding: 4px 8px;
`;

const Img = styled.img`
  width: 144px;
`;

const BlockQuote = styled.blockquote`
  font-style: italic;
  margin: 20px 0 28px 0;
`;

const SourcePerson = styled(SubHeading)`
  margin-bottom: 0;
`;

const SourceFunction = styled(Paragraph)`
  margin-top: 0;
  font-size: 12px;
`;

export default () => (
  <Quote>
    <Img src={PlannerImg} alt="Planner Icon" />
    {/* TODO: use designated font "Palatino" */}
    <BlockQuote>
      „Wir wollen Friedrichshain-Kreuzberg zusammen mit den Bürger:innen zu einem fahrradfreundlichen Bezirk machen.
      Ihre Meldungen helfen uns dabei, noch schneller zu werden.“
    </BlockQuote>
    <SourcePerson>Felix Weisbrich</SourcePerson>
    <SourceFunction>Leiter des Straßen- und Grünflächenamtes Friedrichshain-Kreuzberg</SourceFunction>
  </Quote>
);
