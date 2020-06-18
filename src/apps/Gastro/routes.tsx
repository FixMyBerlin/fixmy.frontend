import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import config from './config';
import Registration from './pages/Registration';
import Permit from './pages/Permit';
import TrafficOrder from './pages/TrafficOrder';
import Landing from './pages/Landing';
import Markdown from '~/pages/Markdown';
import history from '~/history';
import LinkExternal from '~/images/spielstrassen/icon-external-link@2x.png';
import LinkInternal from '~/images/spielstrassen/icon-internal-link@2x.png';
import { setDistrict } from '~/AppState';
import { getAppPath } from '~/utils/utils';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

type DistrictConfig = {
  name: string;
};

export const getPath = (district: DistrictConfig, name: string) =>
  getAppPath(district, 'gastro') + config.gastro[district.name].routes[name];

const Routes = ({ district }) => (
  <Router history={history}>
    <ScrollToTop />
    <Switch>
      <Route exact path={getPath(district, 'landing')} component={Landing} />

      <Route exact path={getPath(district, 'signup')}>
        <Redirect to={getPath(district, 'landing')} />
      </Route>
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
