import React from 'react';
import styled from 'styled-components';
import PlannerImg from '~/images/reports/planner@3x.jpg';

const blockQuoteText = `„Um Friedrichshain-Kreuzberg zu einem besseren Radbezirk zu machen, 
brauchen wir zu allererst gute Daten als Ausgangslage für die Planungen.“`;

const StyledQuoteSectionWrapper = styled.div`
  margin-top: 56px;
  padding-left: 34px;
  padding-right: 34px;
  text-align: center;
`;

const StyledPlannerImg = styled.img`
  width: 118px;
  margin-bottom: 21px;
`

const StyledBlockQuote = styled.blockquote`
  font-style: italic;
  color: #545454;
  margin: 0 0 28px;
`;

const StyledFooter = styled.footer`
  font-style: italic;
  color: #545454;
  font-size: 14px;
  margin-bottom: 52px;
`;

export default () => (
  <StyledQuoteSectionWrapper>
    <StyledPlannerImg src={PlannerImg} alt="Planner Icon" />
    <StyledBlockQuote>{blockQuoteText}</StyledBlockQuote>
    <StyledFooter>Olaf Rabe <br />
      Radplaner Bezirk Friedrichshain-Kreuzberg
    </StyledFooter>
  </StyledQuoteSectionWrapper>
);
