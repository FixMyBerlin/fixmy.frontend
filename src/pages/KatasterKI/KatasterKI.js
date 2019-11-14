import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import history from '~/history';
import Landing from './pages/Landing';
import LandingEmbedded from './pages/LandingEmbedded';
import Scenes from './pages/Scenes';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import Email from './pages/Email';
import landingSrc from '~/images/strassencheck-bg.jpg';

const BgWrapper = styled.div`
  height: 100%;
  ${(props) =>
    !props.isLanding
      ? media.m`
          background: url(${landingSrc}) no-repeat center center;
          background-size: cover;
          padding: ${!props.isLanding ? '20px' : 0};
        `
      : null}
`;

const ContentWrapper = styled.div`
  padding: ${(props) => (props.isLanding ? 0 : '1rem')};
  max-width: ${(props) => (props.isLanding ? 'none' : '740px')};
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: ${(props) =>
    props.isLanding ? 'none' : '0 0 8px 3px rgba(0,0,0,.25)'};
  img {
    width: 100%;
  }
`;

const KatasterKI = (props) => {
  const isLanding =
    props.location.pathname === config.routes.katasterKI.landing;

  return (
    <BgWrapper isLanding={isLanding}>
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
              path={config.routes.katasterKI.landingEmbedded}
              component={LandingEmbedded}
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
              path={config.routes.katasterKI.feedback}
              component={Feedback}
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
    </BgWrapper>
  );
};

export default KatasterKI;
