import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import config from './config';
import Registration from './pages/Registration';
import Permit from './pages/Permit';
import TrafficOrder from './pages/TrafficOrder';
import Landing from './pages/Landing';
import Markdown from '~/pages/Markdown';
import Signup from './pages/Signup';
import history from '~/history';
import { getAppPath } from '~/utils/utils';
import { openSignup } from './utils';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const getPath = (district, name: string) =>
  getAppPath(district, 'gastro') + config.gastro[district.name].routes[name];

const Routes = ({ district }) => (
  <Router history={history}>
    <ScrollToTop />
    <Switch>
      <Route exact path={getPath(district, 'landing')} component={Landing} />

      <Route
        exact
        path={getPath(district, 'signup')}
        render={(props) =>
          openSignup(district) ? (
            <Signup {...props} />
          ) : (
            <Redirect to={getPath(district, 'landing')} />
          )
        }
      />

      <Route
        exact
        path={getPath(district, 'registration')}
        component={Registration}
      />

      <Route exact path={getPath(district, 'directory')}>
        <Redirect to={getPath(district, 'landing')} />
      </Route>
      <Route exact path={getPath(district, 'directoryEntry')}>
        <Redirect to={getPath(district, 'landing')} />
      </Route>

      <Route exact path={getPath(district, 'permit')} component={Permit} />
      <Route
        exact
        path={getPath(district, 'trafficOrder')}
        component={TrafficOrder}
      />

      <Route render={() => <Markdown page="nomatch" />} />
    </Switch>
  </Router>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Routes);
