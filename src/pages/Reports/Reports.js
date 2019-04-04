import React, { PureComponent } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Markdown from '~/pages/Markdown';
import history from '~/history';
import Landing from './components/Landing';
import OverviewMap from './components/OverviewMap/OverviewMap';
import SubmitReport from './components/SubmitReport/SubmitReport';


class Reports extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={config.routes.reports.landing} component={Landing} />
          <Route
            path={config.routes.reports.map}
            exact
            render={() => <OverviewMap />}
          />
          <Route
            path={config.routes.reports.new}
            exact
            render={() => <SubmitReport />}
          />

          <Route exact path={config.routes.reports.index} render={() => (<Redirect to={config.routes.reports.landing} />)} />
          <Route render={() => <Markdown page="nomatch" />} />
        </Switch>
      </Router>
    );
  }
}


export default Reports;
