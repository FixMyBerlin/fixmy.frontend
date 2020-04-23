import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Kieze from './pages/Kieze';
import Register from './pages/Register';
import Thanks from './pages/Thanks';
import config from '~/pages/Spielstrassen/config';
import Markdown from '~/pages/Markdown';

import history from '~/history';

const Spielstrassen = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={config.routes.spielstrassen.landing}
          component={Landing}
        />
        <Route
          exact
          path={config.routes.spielstrassen.kieze}
          component={Kieze}
        />
        <Route
          exact
          path={config.routes.spielstrassen.register}
          component={Register}
        />
        <Route
          exact
          path={config.routes.spielstrassen.thanks}
          component={Thanks}
        />
        <Route render={() => <Markdown page="nomatch" />} />
      </Switch>
    </Router>
  );
};

export default Spielstrassen;
