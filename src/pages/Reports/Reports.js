/**
 * Designated Responsibilities:
 * - Routing: Seperates landing page and map/dialog from another, loads landing page on route enter. TODO: make route names configurable
 * - initial API calls to fetch reports data.
 * - connected to state node which holds existing reports and the new report item which is populated in stages
 */


import React, { PureComponent } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Markdown from '~/pages/Markdown';
import history from '~/history';
import Landing from './components/Landing';
import OverviewMap from './components/OverviewMap';
import SubmitReport from './components/SubmitReport';


class Reports extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/meldungen/landing" component={Landing} />
          <Route
            path="/meldungen/karte"
            exact
            render={() => <OverviewMap />}
          />
          <Route
            path="/meldungen/meldung-machen"
            exact
            render={() => <SubmitReport />}
          />

          <Route exact path="/meldungen" render={() => (<Redirect to="/meldungen/landing" />)} />
          <Route render={() => <Markdown page="nomatch" />} />
        </Switch>
      </Router>
    );
  }
}


export default Reports;
