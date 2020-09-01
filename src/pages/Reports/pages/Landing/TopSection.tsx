import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { History } from 'history';

import config from '~/pages/Reports/config';
import { actions } from '~/pages/Reports/state/SubmitReportState';
import Link from '~/components/Link';
import MenuButton from '~/pages/Reports/components/MenuButton';
import ScrollLink from '~/pages/Reports/components/ScrollLink';
import { media } from '~/styles/utils';
import FahrRadLogo from '~/images/aachen/fahr-rad-logo@2x.png';
import LogoAachen from '~/images/aachen/logo-stadt-aachen@2x.png';

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
  font-size: 18px;
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
    width: 148px;
  `}
`;

const CenterLogo = styled.img`
  display: none;

  ${media.m`
    display: block;
    width: 80px;
    position: absolute;
    top: 2em;
  `};
`;

const OnlyDesktop = styled.span`
  display: none;
  ${media.l`
    display: inline;
  `}
`;

const OnlyMobile = styled.span`
  ${media.l`
    display: none;
  `}
`;

const navigateToMap = (dispatch: Dispatch, history: History) => {
  dispatch(actions.setLocationModeGeocoding());
  history.push(config.routes.reports.new);
};

const navigateToOverview = (dispatch: Dispatch, history: History) => {
  history.push(config.routes.reports.map);
};

const ModeChooserLink = () => (
  <StyledButton className="wiggle" data-cy="reports-landing-cta">
    <StyledLink to={config.routes.reports.new}>
      <strong>Sagen Sie uns wo</strong>
      <br /> in 30 Sekunden
    </StyledLink>
  </StyledButton>
);

const MapButton = ({ onClick, children = null }) => (
  <StyledButton
    className="wiggle"
    data-cy="reports-landing-cta"
    onClick={onClick}
  >
    {!children && (
      <>
        <strong>Sagen Sie uns wo</strong>
        <br /> in 30 Sekunden
      </>
    )}
    {children}
  </StyledButton>
);

type Props = {
  dispatch: Dispatch;
  history: History;
};

const TopSection = ({ dispatch, history }: Props) => (
  <Section>
    <MenuButton whiteFill="true" />
    <FlexWrapper>
      <StyledMenuButton whiteFill="true" />
      <CenterLogo src={FahrRadLogo} alt="Logo Fahr-Rad Aachen" />
      <TopLogo
        src={LogoAachen}
        alt="Logo Stadt Aachen"
        data-cy="reports-landing-logo"
      />

      <StyledHeading data-cy="reports-landing-header">
        {config.reports.landing?.title}
      </StyledHeading>
      {config.reports.enabled && (
        <>
          <OnlyMobile>
            <ModeChooserLink />
          </OnlyMobile>
          <OnlyDesktop>
            <MapButton onClick={() => navigateToMap(dispatch, history)} />
          </OnlyDesktop>
        </>
      )}
      {!config.reports.enabled && (
        <MapButton onClick={() => navigateToOverview(dispatch, history)}>
          Schauen Sie sich alle Meldungen an
        </MapButton>
      )}
    </FlexWrapper>
    <ScrollLink />
  </Section>
);

export default withRouter(connect()(TopSection));
