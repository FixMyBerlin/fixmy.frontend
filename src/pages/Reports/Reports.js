import React, { PureComponent } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Markdown from '~/pages/Markdown';
import history from '~/history';
import Landing from './pages/Landing';
import OverviewMap from './pages/OverviewMap';
import SubmitReport from './pages/SubmitReport';

class Reports extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={config.routes.reports.landing}
            component={Landing}
          />
          <Route
            path={config.routes.reports.map}
            component={OverviewMap}
          />
          <Route
            path={config.routes.reports.new}
            component={SubmitReport}
          />
          <Route
            exact
            path={config.routes.reports.index}
            render={() => (<Redirect to={config.routes.reports.landing} />)}
          />
          <Route
            render={() => <Markdown page="nomatch" />}
          />
        </Switch>
      </Router>
    );
  }
}

export default Reports;
