import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Markdown from '~/pages/Markdown';
import history from '~/history';
import Landing from '~/pages/Reports/components/Landing/index';
import LocatorMap from './components/LocatorMap';

/**
 * Wires routes and components together
 * TODO: make sure that when meldungen route is entered, the landing page is loaded
 * TODO: make route names configurable
 */
class Reports extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/meldungen/landing" component={Landing} />
          <Route
            exact
            path="/meldungen/wo"
            render={() => (
              <Fragment>
                <LocatorMap />
                <div>Next component</div>
              </Fragment>
            )}
          />

          <Route exact path="/meldungen" render={() => (<Redirect to="/meldungen/landing" />)} />
          <Route render={() => <Markdown page="nomatch" />} />
        </Switch>
      </Router>
    );
  }
}

export default connect(state => state.ReportsState)(Reports);
