import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import history from '~/history';
import Landing from './pages/Landing';
import Intro from './pages/Intro';
import PerspectiveForm from './pages/PerspectiveForm';
import PerspectiveChange from './pages/PerspectiveChange';
import Scene from './pages/Scene';
import Demographics from './pages/Demographics';
import Share from './pages/Share';

const ContentWrapper = styled.div`
  padding: 1rem;
  max-width: 650px;
  margin: 0 auto;

  img {
    width: 100%;
  }
`;

const KatasterKI = () => (
  <ContentWrapper>
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={config.routes.katasterKI.landing}
          component={Landing}
        />

        <Route exact path={config.routes.katasterKI.intro} component={Intro} />

        <Route
          exact
          path={config.routes.katasterKI.perspective}
          component={PerspectiveForm}
        />

        <Route
          exact
          path={config.routes.katasterKI.changePerspective}
          component={PerspectiveChange}
        />

        <Route exact path={config.routes.katasterKI.scene} component={Scene} />

        <Route
          exact
          path={config.routes.katasterKI.demographics}
          component={Demographics}
        />

        <Route exact path={config.routes.katasterKI.share} component={Share} />

        {/* Fallback: redirect to landing page */}
        <Route
          render={() => <Redirect to={config.routes.katasterKI.landing} />}
        />
      </Switch>
    </Router>
  </ContentWrapper>
);

export default KatasterKI;
