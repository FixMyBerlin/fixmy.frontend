import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from '~/history';
import Landing from './pages/Landing';
import Intro from './pages/Intro';
import PerspectiveForm from './pages/PerspectiveForm';
import PerspectiveChange from './pages/PerspectiveChange';
import Rating from './pages/Rating';
import Demographics from './pages/Demographics';
import Share from './pages/Share';

const KatasterKI = () => (
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

      <Route exact path={config.routes.katasterKI.rating} component={Rating} />

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
);

export default KatasterKI;
