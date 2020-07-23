import 'react-hot-loader'; // keep first

import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import ReactPiwik from 'react-piwik';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import config from '~/config';
import history from '~/history';
import GlobalStyles from '~/styles/Global';
import BigLoader from '~/components/BigLoader';
import ErrorBoundary from '~/components/ErrorBoundary';
import Menu from '~/components/Menu';
import { verify } from '~/pages/User/UserState';

import Routes from './routes';

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

const AppWrapper = styled.div`
  height: 100%;
  position: relative;
`;

export const theme = createMuiTheme({
  palette: {
    primary: { main: config.colors.interaction },
    secondary: { main: config.colors.change_4 },
    error: { main: config.colors.error },
    info: { main: config.colors.interaction },
    success: { main: config.colors.label_01 }
  }
});

const App = ({ dispatch, isEmbedMode }) => {
  useEffect(() => {
    dispatch(verify());

    // track the initial pageview
    ReactPiwik.push(['trackPageView']);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router history={history}>
        <Suspense fallback={<BigLoader />}>
          <LastLocationProvider>
            <AppWrapper>
              {!isEmbedMode && <Menu />}
              <AppContent>
                <ErrorBoundary>
                  <Routes />
                </ErrorBoundary>
              </AppContent>
            </AppWrapper>
          </LastLocationProvider>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isEmbedMode: state.AppState.isEmbedMode
});

export default hot(connect(mapStateToProps)(App));
