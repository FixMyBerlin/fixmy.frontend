import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import history from '~/history';
import Landing from './pages/Landing';
import Scenes from './pages/Scenes';
import Profile from './pages/Profile';

const ContentWrapper = styled.div`
  padding: ${(props) => (props.isLanding ? 0 : '1rem')};
  max-width: ${(props) => (props.isLanding ? 'none' : '650px')};
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }
`;

const KatasterKI = (props) => (
  <ContentWrapper
    isLanding={props.location.pathname === config.routes.katasterKI.landing}
  >
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

        {/* Fallback: redirect to landing page */}
        <Route
          render={() => <Redirect to={config.routes.katasterKI.landing} />}
        />
      </Switch>
    </Router>
  </ContentWrapper>
);

export default KatasterKI;
