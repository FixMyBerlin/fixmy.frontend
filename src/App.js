import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import GlobalStyles from '~/styles/Global';

import history from '~/history';
import { PrivateRoute } from '~/utils/router-utils';
import Menu from '~/components/Menu';
import Home from '~/pages/Home';
import Markdown from '~/pages/Markdown';
import MapView from '~/pages/Map';
import Analysis from '~/pages/Analysis';
import Login from '~/pages/User/pages/Login';
import Signup from '~/pages/User/pages/Signup';
import Profile from '~/pages/User/pages/Profile';
import ForgotPassword from '~/pages/User/pages/ForgotPassword';
import ResetPassword from '~/pages/User/pages/ResetPassword';
import UserVerify from '~/pages/User/pages/Verify';
import { verify } from '~/pages/User/UserState';
import Reports from '~/pages/Reports';
import KatasterKI from '~/pages/KatasterKI';

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

const AppWrapper = styled.div`
  height: 100%;
  position: relative;
`;

class App extends PureComponent {
  componentDidMount() {
    this.props.dispatch(verify());
  }

  render() {
    const { isEmbedMode, token } = this.props;

    return (
      <Fragment>
        <GlobalStyles />
        <Router history={history}>
          <LastLocationProvider>
            <AppWrapper>
              {!isEmbedMode && <Menu />}
              <AppContent>
                <Switch>
                  <Route exact path="/" component={Home} />

                  {
                  /* standard markdown pages */
                  config.staticpages.map(page => <Route key={page} path={page.route} render={() => <Markdown page={page.key} />} />)
                }

                  {/* user pages */}
                  <Route path={config.routes.signup} component={Signup} />
                  <Route path={config.routes.login} component={Login} />
                  <Route path={config.routes.forgotPassword} component={ForgotPassword} />
                  <Route path={`${config.routes.resetPassword}/:uid/:token`} component={ResetPassword} />
                  <Route path={`${config.routes.userVerify}/:uid/:token`} component={UserVerify} />
                  <PrivateRoute path={config.routes.profile} token={token} component={Profile} />

                  {/* map pages */}
                  <Route
                    path={`(${config.routes.status}|${config.routes.projects}|/my-hbi)`}
                    component={MapView}
                  />

                  {/* reports page */}
                  <Route
                    path={`${config.routes.reports.index}`}
                    component={Reports}
                  />

                  {/* reports page */}
                  <Route
                    path={`${config.routes.katasterKI.landing}`}
                    component={KatasterKI}
                  />

                  {/* analysis pages */}
                  <Route
                    path={`${config.routes.analyse}/planungen/:districtName?`}
                    component={Analysis}
                  />

                  {/* reports page */}
                  <Route exact path={config.routes.reports.temporarily_forward_from_this_to_index} render={() => (<Redirect to={config.routes.reports.index} />)} />

                  <Route render={() => <Markdown page="nomatch" />} />
                </Switch>
              </AppContent>
            </AppWrapper>
          </LastLocationProvider>
        </Router>
      </Fragment>
    );
  }
}

export default connect(state => ({
  token: state.UserState.token,
  isEmbedMode: state.AppState.isEmbedMode
}))(App);
