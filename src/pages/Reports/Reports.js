/**
 * Designated Responsibilities:
 * - Routing: Seperates landing page and map/dialog from another, loads landing page on route enter. TODO: make route names configurable
 * - initial API calls to fetch reports data.
 * - connected to state node which holds existing reports and the new report item which is populated in stages
 */


import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Markdown from '~/pages/Markdown';
import history from '~/history';
import Landing from './components/Landing';
import OverviewMap from './components/OverviewMap';
import SubmitReport from './components/SubmitReport';


/*
  The first approach was to only use one map to prevent deduplication and page refreshes when going from
  /karte to /meldung machen. Since
  - the latter happens now anyways
  - I have no good clue on how to design the map state so that it can follow two responsibilities (overview, locating),
  - I have no good Idea on how to use Redux state for navigating through a dialog (step1, step2) without making a mess
  I would propose to
  - use two maps (overview, locator) with separate state
  - use the following routes
  /karte
  /karte/:MeldungId      // detail dialog
  /meldung-machen

  The dialog step is determined by the state item "newReport":


 */

class Reports extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/meldungen/landing" component={Landing} />
          <Route
            path="/meldungen/karte"
            exact
            render={() => <OverviewMap {...this.props} />}
          />
          <Route
            path="/meldungen/meldung-machen"
            exact
            render={() => <SubmitReport {...this.props} />}
          />

          <Route exact path="/meldungen" render={() => (<Redirect to="/meldungen/landing" />)} />
          <Route render={() => <Markdown page="nomatch" />} />
        </Switch>
      </Router>
    );
  }
}

export default connect(state => state.ReportsState)(Reports);
