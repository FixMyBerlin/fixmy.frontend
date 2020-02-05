import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import config from '~/config';
import PrivateRoute from '~/components/PrivateRoute';
import Home from '~/pages/Home';
import Login from '~/pages/User/pages/Login';
import Signup from '~/pages/User/pages/Signup';
import Profile from '~/pages/User/pages/Profile';
import ForgotPassword from '~/pages/User/pages/ForgotPassword';
import ResetPassword from '~/pages/User/pages/ResetPassword';
import UserVerify from '~/pages/User/pages/Verify';

const Analysis = lazy(() => import('~/pages/Analysis'));
const KatasterKI = lazy(() => import('~/pages/KatasterKI'));
const MapView = lazy(() => import('~/pages/Map'));
const Markdown = lazy(() => import('~/pages/Markdown'));
const Reports = lazy(() => import('~/pages/Reports'));

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
      <Route path={`(${config.routes.status})`} component={MapView} />
    )}
    {config.routes.projects != null && (
      <Route path={`${config.routes.projects})`} component={MapView} />
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
        path={`${config.routes.analyse}/planungen/:districtName?`}
        component={Analysis}
      />
    )}

    <Route render={() => <Markdown page="nomatch" />} />
  </Switch>
);

export default connect((state) => ({
  token: state.UserState.token
}))(Routes);
