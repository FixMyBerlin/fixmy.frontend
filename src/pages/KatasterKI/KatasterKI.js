import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import history from '~/history';
import Landing from './pages/Landing';
import LandingEmbedded from './pages/LandingEmbedded';
import Scenes from './pages/Scenes';
import Profile from './pages/Profile';
import Email from './pages/Email';
import GlobalStyle from './styles/Global';
import landingSrc from '~/images/strassencheck-bg.jpg';

const BgWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;

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
  flex-grow: 1;
  width: 100%;
  font-family: FranklinGothic-Book, sans-serif;

  img {
    width: 100%;
  }

  ${(props) => media.m`
    box-shadow: ${props.isLanding ? 'none' : '0 0 8px 3px rgba(0,0,0,.25)'};
  `}
`;

const KatasterKI = (props) => {
  const isLanding =
    props.location.pathname === config.routes.katasterKI.landing;

  useEffect(() => {
    document.title = 'Der Straßencheck für Berlin';
  }, [props.location.pathname]);

  return (
    <BgWrapper isLanding={isLanding}>
      <GlobalStyle />
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
