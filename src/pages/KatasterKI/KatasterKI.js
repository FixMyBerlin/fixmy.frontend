import React from 'react';
import { Router, Route, Switch, Redirect, matchPath } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { media } from '~/styles/utils';
import history from '~/history';
import Landing from './pages/Landing';
import Scenes from './pages/Scenes';
import Profile from './pages/Profile';
import Email from './pages/Email';
import GlobalStyle from './styles/Global';
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
  font-family: FranklinGothic-Book, sans-serif;
  z-index: 1;

  img {
    width: 100%;
  }

  ${(props) => media.m`
    box-shadow: ${props.isLanding ? 'none' : '0 0 8px 3px rgba(0,0,0,.25)'};
    padding: ${props.isLanding ? 0 : '15px 60px'};
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

const KatasterKI = () => {
  const isLanding = matchPath(window.location.pathname, {
    path: config.routes.katasterKI.landing,
    exact: true
  });

  return (
    <BgWrapper isLanding={isLanding}>
      <GlobalStyle />
      <AppGlobalStyle />
      <ScrollToTop />
      <ContentWrapper isLanding={isLanding}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path={config.routes.katasterKI.landing}
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

            <Route
              exact
              path={config.routes.katasterKI.email}
              component={Email}
            />

            {/* Fallback: redirect to landing page */}
            <Route
              render={() => <Redirect to={config.routes.katasterKI.landing} />}
            />
          </Switch>
        </Router>
      </ContentWrapper>
      <Gradient />
    </BgWrapper>
  );
};

export default KatasterKI;
