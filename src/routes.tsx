import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import config from '~/config';
import PrivateRoute from '~/components/PrivateRoute';
import Home from '~/pages/Home';
import Login from '~/pages/User/pages/Login';
import Signup from '~/pages/User/pages/Signup';
import Profile from '~/pages/User/pages/Profile';
import ForgotPassword from '~/pages/User/pages/ForgotPassword';
import ResetPassword from '~/pages/User/pages/ResetPassword';
import UserVerify from '~/pages/User/pages/Verify';
import ZESPlusResearch from '~/pages/ZESPlus-Research';

import Analysis from '~/pages/Analysis';
import KatasterKI from '~/pages/KatasterKI';
import Markdown from '~/pages/Markdown';
import Reports from '~/pages/Reports';
import Research from '~/pages/Research';
import { RootState } from './store';

import Gastro from '~/apps/Gastro';
import Spielstrassen from '~/apps/Spielstrassen';
import MapView from '~/apps/Map';

const apps = {
  gastro: Gastro,
  spielstrassen: Spielstrassen,
  map: MapView
};

const District = (name: string) => {
  const district = config.districts[name];
  const districtApps = Object.keys(district.apps).map((app) => {
    const AppComponent = apps[app];
    return (
      <Route
        key={`${name}-${app}`}
        path={`/${district.path}/${district.apps[app].path}`}
        render={(props) => <AppComponent districtName={name} {...props} />}
      />
    );
  });

  return (
    <Route key={name} path={`/${district.path}`}>
      <Switch>
        {districtApps}

        <Route render={() => <Markdown page="nomatch" />} />
      </Switch>
    </Route>
  );
};

const Routes = ({ token }) => (
  <Switch>
    <Route exact path="/" component={Home} />

    {/* standard markdown pages */
    config.staticpages.map((page) => (
      <Route
        key={page}
        path={page.route}
        render={() => <Markdown page={page.key} />}
      />
    ))}

    {/* user pages */}
    <Route path={config.routes.signup} component={Signup} />
    <Route path={config.routes.login} component={Login} />
    <Route path={config.routes.forgotPassword} component={ForgotPassword} />
    <Route
      path={`${config.routes.resetPassword}/:uid/:token`}
      component={ResetPassword}
    />
    <Route
      path={`${config.routes.userVerify}/:uid/:token`}
      component={UserVerify}
    />
    <PrivateRoute
      path={config.routes.profile}
      token={token}
      component={Profile}
    />

    {/* map pages */}
    {config.routes.status != null && (
      <Route path={config.routes.status} component={MapView} />
    )}
    {config.routes.projects != null && (
      <Route path={config.routes.projects} component={MapView} />
    )}

    {config.routes.popupbikelanes != null && (
      <Route path={config.routes.popupbikelanes} component={MapView} />
    )}

    {/* reports page */}
    {config.routes.reports != null && (
      <Route path={`${config.routes.reports.index}`} component={Reports} />
    )}

    {/* kataster survey page */}
    {config.routes.katasterKI != null && (
      <Route path={config.routes.katasterKI.landing} component={KatasterKI} />
    )}

    {/* analysis pages */}
    {config.routes.analysis != null && (
      <Route
        path={`${config.routes.analysis}/planungen/:districtName?`}
        component={Analysis}
      />
    )}

    {config.districts && Object.keys(config.districts).map(District)}

    {/* Research pages */}
    {config.routes.research != null && (
      <Route
        exact
        path={config.routes.research.landing}
        render={() => <Redirect to={config.routes.research.survey} />}
      />
    )}

    {config.routes.research != null && (
      <Route path={config.routes.research.survey} component={Research} />
    )}

    {/* ZES-Plus research page */}
    {config.routes.zesplusResearch && (
      <Route path={config.routes.zesplusResearch} component={ZESPlusResearch} />
    )}

    <Route render={() => <Markdown page="nomatch" />} />
  </Switch>
);

export default connect((state: RootState) => ({
  token: state.UserState.token
}))(Routes);
