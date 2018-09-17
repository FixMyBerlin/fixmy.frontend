import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Router from 'react-router-dom/Router';

import history from '~/history';
import { PrivateRoute } from '~/utils/router-utils';
import Menu from '~/components/Menu';
import Home from '~/pages/Home';
import Markdown from '~/pages/Markdown';
import MapView from '~/pages/Map';
import Analysis from '~/pages/Analysis';
import Login from '~/pages/User/pages/Login';
import Signup from '~/pages/User/pages/Signup';
import Profil from '~/pages/User/pages/Profil';
import ForgotPassword from '~/pages/User/pages/ForgotPassword';
import ResetPassword from '~/pages/User/pages/ResetPassword';
import EmailVerification from '~/pages/User/pages/EmailVerification';
import { verify } from '~/pages/User/UserState';

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
    return (
      <Router history={history}>
        <AppWrapper>
          <Menu />
          <AppContent>
            <Switch>
              <Route exact path="/" component={Home} />

              {
                /* standard markdown pages */
                config.staticpages.map(page =>
                  <Route key={page} path={page.route} render={() => <Markdown page={page.key} />} />
                )
              }

              {/* user pages */}
              <Route path={config.routes.signup} component={Signup} />
              <Route path={config.routes.login} component={Login} />
              <Route path={config.routes.forgotPassword} component={ForgotPassword} />
              <Route path={`${config.routes.resetPassword}/:uid/:token`} component={ResetPassword} />
              <Route path={config.routes.emailVerification} component={EmailVerification} />
              <PrivateRoute path={config.routes.profile} token={this.props.token} component={Profil} />

              {/* map pages */}
              <Route
                path={`(${config.routes.status}|${config.routes.plannings}|/my-hbi)`}
                component={MapView}
              />

              {/* analysis pages */}
              <Route
                path={`${config.routes.analyse}/planungen/:districtName?`}
                component={Analysis}
              />

              <Route render={() => <Markdown page="nomatch" />} />
            </Switch>
          </AppContent>
        </AppWrapper>
      </Router>
    );
  }
}

export default connect(state => ({
  token: state.UserState.token
}))(App);
