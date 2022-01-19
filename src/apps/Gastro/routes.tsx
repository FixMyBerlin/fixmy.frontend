import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';

import history from '~/history';
import Markdown from '~/pages/Markdown';
import { DistrictConfig } from '~/types';
import { getAppPath } from '~/utils/utils';

import config from './config';
import { EventApplication } from './pages/Events/Application';
import PermitEvent from './pages/Events/Permit';
import TrafficOrderEvent from './pages/Events/TrafficOrder';
import DirectSignup from './pages/Gastro/DirectSignup';
import Permit from './pages/Gastro/Permit';
import Registration from './pages/Gastro/Registration';
import Renewal from './pages/Gastro/Renewal';
import Signup from './pages/Gastro/Signup';
import TrafficOrderGastro from './pages/Gastro/TrafficOrder';
import Landing from './pages/Landing';
import { openSignup } from './utils';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Resolve path specific to a district configuration
 *
 * @param district district configuration containing route paths
 * @param name name of the route to return a path for
 * @returns string relative URL
 */
export const getPath = (district: DistrictConfig, name: string): string =>
  getAppPath(district, 'gastro') + config.gastro[district.name].routes[name];

const renderSignup = (props) => {
  if (props.district == null) return null;

  if (openSignup(props.district)) {
    if (props.district.apps.gastro.directSignup)
      return <DirectSignup {...props} />;
    return <Signup {...props} />;
  }
  return <Redirect to={getPath(props.district, 'landing')} />;
};

const Routes = ({ district }) => (
  <Router history={history}>
    <ScrollToTop />
    <Switch>
      <Route exact path={getPath(district, 'landing')} component={Landing} />

      <Route
        exact
        path={getPath(district, 'signup')}
        render={(props) => renderSignup({ district, ...props })}
      />

      <Route
        exact
        path={getPath(district, 'registration')}
        component={Registration}
      />

      <Route
        exact
        path={getPath(district, 'signupEvents')}
        render={() =>
          openSignup(district) ? (
            <EventApplication />
          ) : (
            <Redirect to={getPath(district, 'landing')} />
          )
        }
      />

      <Route exact path={getPath(district, 'renewal')} component={Renewal} />

      <Route exact path={getPath(district, 'directory')}>
        <Redirect to={getPath(district, 'landing')} />
      </Route>
      <Route exact path={getPath(district, 'directoryEntry')}>
        <Redirect to={getPath(district, 'landing')} />
      </Route>

      {/* Permits for Terrassen */}

      <Route exact path={getPath(district, 'permit')} component={Permit} />
      <Route
        exact
        path={getPath(district, 'trafficOrder')}
        component={TrafficOrderGastro}
      />

      {/* Permits for events */}

      <Route
        exact
        path={getPath(district, 'permitEvents')}
        component={PermitEvent}
      />
      <Route
        exact
        path={getPath(district, 'trafficOrderEvents')}
        component={TrafficOrderEvent}
      />

      <Route render={() => <Markdown page="nomatch" />} />
    </Switch>
  </Router>
);

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Routes);
