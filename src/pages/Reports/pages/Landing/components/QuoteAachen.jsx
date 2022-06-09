import React from 'react';
import styled from 'styled-components';

import Portrait from '~/images/reports/marcel-philipp@2x.jpg';
import config from '~/pages/Reports/config';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';

const QuoteSection = styled.div`
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  margin: 50px 0;
  padding: 28px 8px 58px 8px;
  margin: 0 auto;
`;

const Img = styled.img`
  width: 144px;
  display: block;
  margin: 0 auto;
`;

const BlockQuote = styled.blockquote`
  text-align: center;
  margin: 20px 0 28px 0;
  line-height: 1.5;
`;

const SourcePerson = styled(SubHeading)`
  font-family: '${config.titleFont}', sans-serif;
  font-size: 1.2em;
  margin-bottom: 0;
`;

const SourceFunction = styled(Paragraph)`
  margin-top: 0;
  font-size: 12px;
`;

export default () => (
  <QuoteSection>
    <Img src={Portrait} alt="Ehemaliger Oberbürgermeister Marcel Phillip" />
    <BlockQuote>
      „Wir benötigen mehr Sicherheit und mehr Raum für den Radverkehr in Aachen,
      dazu gehören auch mehr Fahrradabstellanlagen. Seit November letzten Jahres
      haben mir viele Bürgerinnen und Bürger sowie die Initiatoren des
      Radentscheids Standortvorschläge für Fahrradbügel geschickt. Diese wurden
      in das jetzt freigeschaltete Online-Tool bereits eingearbeitet und sind
      zum Teil bereits durch die Verwaltung geprüft worden.“
    </BlockQuote>
    <SourcePerson>Marcel Philipp</SourcePerson>
    <SourceFunction>Ehemaliger Oberbürgermeister</SourceFunction>
  </QuoteSection>
);
