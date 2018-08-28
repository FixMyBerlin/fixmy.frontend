import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import styled from 'styled-components';

import Menu from '~/modules/Menu';
import Home from '~/modules/Home';
import MarkdownPage from '~/modules/MarkdownPage';
import MapView from '~/modules/MapView';
import Login from '~/modules/User/Login';
import Signup from '~/modules/User/Signup';
import PasswordReset from '~/modules/User/PasswordReset';
import EmailVerification from '~/modules/User/EmailVerification';
import NoMatch from '~/modules/NoMatch';

const App = styled.div`
  height: 100%;
  position: relative;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

const AppWrapper = () => (
  <App>
    <Menu />
    <AppContent>
      <Switch>
        <Route exact path="/" component={Home} />

        {/* standard markdown pages */}
        <Route path="/info" render={() => <MarkdownPage page="about" />} />
        <Route path="/kontakt" render={() => <MarkdownPage page="contact" />} />
        <Route path="/datenschutz" render={() => <MarkdownPage page="privacy" />} />
        <Route path="/impressum" render={() => <MarkdownPage page="imprint" />} />

        {/* user pages */}
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" render={() => <Signup />} />
        <Route path="/password-reset" render={() => <PasswordReset />} />
        <Route path="/email-verification" render={() => <EmailVerification />} />

        {/* map pages */}
        <Route
          path="(/zustand|/planungen|/my-hbi)"
          component={MapView}
        />

        <Route component={NoMatch} />
      </Switch>
    </AppContent>
  </App>
);

export default AppWrapper;
