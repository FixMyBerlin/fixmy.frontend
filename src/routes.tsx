import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Analysis from '~/apps/Analysis';
import Gastro from '~/apps/Gastro';
import MapView from '~/apps/Map';
import Spielstrassen from '~/apps/Spielstrassen';
import PrivateRoute from '~/components/PrivateRoute';
import config from '~/config';
import Home from '~/pages/Home';
import KatasterKI from '~/pages/KatasterKI';
import Markdown from '~/pages/Markdown';
import Reports from '~/pages/Reports';
import Research from '~/pages/Research';
import ForgotPassword from '~/pages/User/pages/ForgotPassword';
import Login from '~/pages/User/pages/Login';
import Profile from '~/pages/User/pages/Profile';
import ResetPassword from '~/pages/User/pages/ResetPassword';
import Signup from '~/pages/User/pages/Signup';
import UserVerify from '~/pages/User/pages/Verify';
import ZESPlusResearch from '~/pages/ZESPlus-Research';

import { RootState } from './store';

const apps = {
  gastro: Gastro,
  spielstrassen: Spielstrassen,
  map: MapView,
};

/**
 * The District component assembles a router configuration dependent on the
 * apps that are installed in the current instance's region.
 *
 * @param name of the district e.g. aachen
 */
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

/**
 * This component provides routes that can be used to redirect users to
 * ressources independent of the region-specific routes used in this instance.
 *
 * As an example, notification e-mails about reports can be sent by the backend
 * with deeplinks to report detail pages without adapting to the route config
 * used for reports in the frontend instance.
 */
const RedirectHelper = () => (
  <Switch>
    <Redirect
      from="/redirect-to/reports/:id"
      to={`${config.routes.reports.map}/:id`}
    />
    <Route render={() => <Markdown page="nomatch" />} />
  </Switch>
);

const Routes = ({ token }) => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route path="/redirect-to" component={RedirectHelper} />

    {
      /* standard markdown pages */
      config.staticpages.map((page) => (
        <Route
          key={page}
          path={page.route}
          render={() => <Markdown page={page.key} />}
        />
      ))
    }

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
    {config.routes.map?.hbiIndex && (
      <Route path={config.routes.map.hbiIndex} component={MapView} />
    )}
    {config.routes.map?.projectsIndex && (
      <Route path={config.routes.map.projectsIndex} component={MapView} />
    )}

    {/* reports page */}
    {config.routes.reports && (
      <Route path={`${config.routes.reports.index}`} component={Reports} />
    )}

    {/* kataster survey page */}
    {config.routes.katasterKI && (
      <Route path={config.routes.katasterKI.landing} component={KatasterKI} />
    )}

    {/* analysis pages */}
    {config.routes.analysis && (
      <Route
        path={[
          config.routes.analysis,
          `${config.routes.analysis}/planungen/:districtName?`,
        ]}
        component={Analysis}
      />
    )}

    {config.districts && Object.keys(config.districts).map(District)}

    {/* Research pages */}
    {config.routes.research && (
      <Route
        exact
        path={config.routes.research.landing}
        render={() => <Redirect to={config.routes.research.survey} />}
      />
    )}
    {config.routes.research && (
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
  token: state.UserState.token,
}))(Routes);
