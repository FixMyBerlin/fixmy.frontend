import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import createBrowserHistory from 'history/createBrowserHistory';
import styled from 'styled-components';

import { updateHistory } from '~/AppState';
import Menu from '~/components/Menu';
import Home from '~/pages/Home';
import Markdown from '~/pages/Markdown';
import MapView from '~/pages/Map';
import Login from '~/pages/User/pages/Login';
import Signup from '~/pages/User/pages/Signup';
import Analysis from '~/pages/Analysis';
import PasswordReset from '~/pages/User/pages/PasswordReset';
import EmailVerification from '~/pages/User/pages/EmailVerification';

import { init as initStyle } from '~/utils/style-utils';
import Store from './store';

const history = createBrowserHistory();

const App = styled.div`
  height: 100%;
  position: relative;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

history.listen(location => Store.dispatch(updateHistory(location)));
Store.dispatch(updateHistory(history.location));

initStyle();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <App>
        <Menu />
        <AppContent>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* standard markdown pages */}
            <Route path="/info" render={() => <Markdown page="about" />} />
            <Route path="/kontakt" render={() => <Markdown page="contact" />} />
            <Route path="/datenschutz" render={() => <Markdown page="privacy" />} />
            <Route path="/impressum" render={() => <Markdown page="imprint" />} />

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

            {/* analysis pages */}
            <Route
              path="/analyse/planungen"
              component={Analysis}
            />

            <Route render={() => <Markdown page="nomatch" />} />
          </Switch>
        </AppContent>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
