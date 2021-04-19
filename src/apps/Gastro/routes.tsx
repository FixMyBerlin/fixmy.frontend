import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';

import history from '~/history';
import Markdown from '~/pages/Markdown';
import { getAppPath } from '~/utils/utils';

import config from './config';
import DirectSignup from './pages/DirectSignup';
import { EventApplication } from './pages/EventApplication';
import Landing from './pages/Landing';
import Permit from './pages/Permit';
import Registration from './pages/Registration';
import Renewal from './pages/Renewal';
import Signup from './pages/Signup';
import TrafficOrder from './pages/TrafficOrder';
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
        render={(props) =>
          openSignup(district) ? (
            <EventApplication {...props} />
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
  district: AppState.district,
});

export default connect(mapStateToProps)(Routes);
