import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Link from '~/components/Link';
import MenuButton from '~/pages/Reports/components/MenuButton';
import ScrollLink from '~/pages/Reports/components/ScrollLink';
import { media } from '~/styles/utils';
import FahrRadLogo from '~/images/aachen/fahr-rad-logo@2x.png';

const Section = styled.section`
  height: 100vh;
  background-image: url(${config.reports.landing.background.source});
  background-size: cover;
  background-position: center 80%;
  display: flex;
  flex-direction: column;

  &:after {
    content: '${config.reports.landing.background.attribution}';
    font-size: 10px;
    letter-spacing: 0.2px;
    color: ${config.colors.lightgrey};
    position: absolute;
    bottom: 8px;
    right: 4px;
  }

  ${media.m`
    background-image: url(${config.reports.landing.backgroundDesktop.source});
    background-position: top;

    &:after {
      color: ${config.colors.lightgrey};
      content: '${config.reports.landing.backgroundDesktop.attribution}';
    }
  `}
`;

const FlexWrapper = styled.div`
  flex: 1;
  padding: 0 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMenuButton = styled(MenuButton)`
  padding: 8px;
  background-color: #353535; /*TODO: factor out color to config */
  border-radius: ${config.flatButtons ? '0' : '2px'};
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0 2px 4px 0 rgba(0, 0, 0, 0.5)'};
`;

const StyledHeading = styled.h2`
  font-family: '${config.titleFont}', sans-serif;
  font-size: 3em;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: white;
  margin-bottom: 39px;

  ${media.m`
    font-size: 4em;
  `}
`;

const StyledButton = styled.div`
  border-radius: ${config.flatButtons ? '0' : '4px'};
  border: none;
  outline: none;
  display: inline-block;
  background: ${config.colors.interaction};
  text-decoration: none;
  color: ${config.colors.white};
  font-family: '${config.baseFont}', sans-serif;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  width: 200px;
  padding: 10px 18px;
  box-shadow: ${
    config.flatButtons ? 'initial' : '0 0 2px 1px rgba(0, 0, 0, 0.25)'
  };

  &:hover {
    box-shadow: ${
      config.flatButtons ? 'initial' : '0 0 8px 1px rgba(0, 0, 0, 0.4)'
    };
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 18px;

  &:visited,
  &:hover {
    color: white;
  }
`;

const TopLogo = styled.img`
  position: absolute;
  top: 2em;
  right: 2em;
  width: 92px;

  ${media.m`
    top: 2em;
    right: 2em;
    width: 120px;
  `}
`;

const CenterLogo = styled.img`
  display: none;

  ${media.m`
    display: block;
    width: 5em;
    position: absolute;
    top: 2em;
  `};
`;

const TopSection = ({ toUrl }) => (
  <Section>
    <MenuButton whiteFill="true" />
    <FlexWrapper>
      <StyledMenuButton whiteFill="true" />
      <CenterLogo src={FahrRadLogo} alt="Logo Fahr-Rad Aachen" />
      <TopLogo
        src={config.reports.landing.logo.source}
        alt="Logo Stadt Aachen"
        data-cy="reports-landing-logo"
      />

      <StyledHeading data-cy="reports-landing-header">
        {config.reports.landing?.title}
      </StyledHeading>
      <StyledButton className="wiggle" data-cy="reports-landing-cta">
        <StyledLink to={toUrl}>
          <strong>Sagen Sie uns wo</strong>
          <br /> in 30 Sekunden
        </StyledLink>
      </StyledButton>
    </FlexWrapper>
    <ScrollLink />
  </Section>
);

export default TopSection;
