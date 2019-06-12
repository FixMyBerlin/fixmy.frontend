import React from 'react';
import styled from 'styled-components';

import PlannerImg from '~/images/reports/planner@3x.jpg';

const blockQuoteText = `„Um Friedrichshain-Kreuzberg zu einem besseren Radbezirk zu machen,
brauchen wir zu allererst gute Daten als Ausgangslage für die Planungen.“`;

const Quote = styled.div`
  text-align: center;
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  margin: 50px 0;
`;

const Img = styled.img`
  width: 118px;
`;

const BlockQuote = styled.blockquote`
  font-style: italic;
  margin: 20px 0 28px 0;
`;

const Footer = styled.footer`
  font-style: italic;
  font-size: 14px;
`;

export default () => (
  <Quote>
    <Img src={PlannerImg} alt="Planner Icon" />
    <BlockQuote>{blockQuoteText}</BlockQuote>
    <Footer>
      Olaf Rabe<br />
      Radplaner Bezirk Friedrichshain-Kreuzberg
    </Footer>
  </Quote>
);
