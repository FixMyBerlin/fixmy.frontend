import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from '~/history';
import Landing from './pages/Landing';
import IntroQuestion from './pages/IntroQuestion';

const KatasterKI = () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path={config.routes.katasterKI.landing}
        component={Landing}
      />

      <Route
        exact
        path={config.routes.katasterKI.introQuestions}
        component={IntroQuestion}
      />

      {/* Fallback: redirect to landing page */}
      <Route
        render={() => <Redirect to={config.routes.katasterKI.landing} />}
      />
    </Switch>
  </Router>
);

export default KatasterKI;
