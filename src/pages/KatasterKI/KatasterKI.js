import React from 'react';
import { Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ReactPiwik from 'react-piwik';

import { media } from '~/styles/utils';
import history from '~/history';
import Landing from './pages/Landing';
import Scenes from './pages/Scenes';
import Profile from './pages/Profile';
import AppGlobalStyle from '~/styles/Global';
import { ScrollToTop } from './utils';
import mapBgSrc from '~/images/strassencheck/map-bg.jpg';
import landingBgSrc from '~/images/strassencheck/landing-bg.jpg';

const BgWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.isLanding
      ? css`
          background: url(${landingBgSrc}) no-repeat center center;
          background-size: cover;
        `
      : media.m`
          background: url(${mapBgSrc}) no-repeat center top;
          padding: ${!props.isLanding ? '20px' : 0};
          background-size: cover;
        `}
`;

const ContentWrapper = styled.div`
  padding: ${(props) => (props.isLanding ? 0 : '15px')};
  max-width: ${(props) => (props.isLanding ? 'none' : '740px')};
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.isLanding ? 'transparent' : 'white')};
  flex-grow: 1;
  width: 100%;
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  font-weight: 400;
  z-index: 1;

  img {
    width: 100%;
  }

  ${(props) => media.m`
    box-shadow: ${props.isLanding ? 'none' : '0 0 8px 3px rgba(0,0,0,.25)'};
    padding: ${props.isLanding ? 0 : '15px 60px'};
    max-height: 1000px;
    height: 90vh;
  `}
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  height: 50%;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const piwik = new ReactPiwik({
  url: 'fixmyberlin.de/stats',
  siteId: config.debug
    ? config.piwik.siteId.katasterTesting
    : config.piwik.siteId.kataster,
  trackErrors: true
});

// track the initial pageview
ReactPiwik.push(['trackPageView']);

/** Define the path for the landing page to be able to check whether it's active
 *
 * The path is prepended with the BASE_NAME env var, which
 * ends with a "/" that is then duplicated at the beinning of the configured
 * landing page path, which is why it is remove with slice.
 *
 * @param {string} path current window.location.pathname
 */
const isLandingPage = (path) => {
  const LANDING_PATH =
    process.env.BASE_NAME.slice(0, -1) + config.routes.katasterKI.landing;
  const isLanding = matchPath(path, { path: LANDING_PATH, exact: true });

  const LANDING_PATH_NATIONAL =
    process.env.BASE_NAME.slice(0, -1) +
    config.routes.katasterKI.landingNational;
  const isLandingNational = matchPath(path, {
    path: LANDING_PATH_NATIONAL,
    exact: true
  });

  return isLanding || isLandingNational;
};

const KatasterKI = () => {
  const isLanding = isLandingPage(window.location.pathname);

  return (
    <BgWrapper isLanding={isLanding}>
      <AppGlobalStyle />
      <ScrollToTop />
      <ContentWrapper isLanding={isLanding}>
        <Router history={piwik.connectToHistory(history)}>
          <Switch>
            <Route
              exact
              path={config.routes.katasterKI.landing}
              component={Landing}
            />

            <Route
              exact
              path={config.routes.katasterKI.landingNational}
              component={Landing}
            />

            <Route
              exact
              path={config.routes.katasterKI.profile}
              component={Profile}
            />

            <Route
              exact
              path={config.routes.katasterKI.scenes}
              component={Scenes}
            />

            {/* Fallback: redirect to landing page */}
            <Route
              render={() => <Redirect to={config.routes.katasterKI.landing} />}
            />
          </Switch>
        </Router>
      </ContentWrapper>
      {isLanding && <Gradient />}
    </BgWrapper>
  );
};

export default KatasterKI;
