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
import PasswordReset from '~/pages/User/pages/PasswordReset';
import EmailVerification from '~/pages/User/pages/EmailVerification';

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

const AppWrapper = styled.div`
  height: 100%;
  position: relative;
`;

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <AppWrapper>
          <Menu />
          <AppContent>
            <Switch>
              <Route exact path="/" component={Home} />

              {/* standard markdown pages */}
              <Route path="/info" render={() => <Markdown page="about" />} />
              <Route path="/kontakt" render={() => <Markdown page="contact" />} />
              <Route path="/datenschutz" render={() => <Markdown page="privacy" />} />
              <Route path="/impressum" render={() => <Markdown page="imprint" />} />
              <Route path="/presse" render={() => <Markdown page="press" />} />
              <Route path="/faq" render={() => <Markdown page="faq" />} />

              {/* user pages */}
              <Route path="/registrieren" render={() => <Signup />} />
              <Route path="/anmelden" render={() => <Login />} />
              <Route path="/passwort-vergessen" render={() => <PasswordReset />} />
              <Route path="/email-verification" render={() => <EmailVerification />} />
              <PrivateRoute path="/profil" token={this.props.token} component={Profil} />

              {/* map pages */}
              <Route
                path="(/zustand|/planungen|/my-hbi)"
                component={MapView}
              />

              {/* analysis pages */}
              <Route
                path="/analyse/planungen/:districtName?"
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
