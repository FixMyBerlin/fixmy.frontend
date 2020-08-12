import 'react-hot-loader'; // keep first

import React, { Suspense, useEffect, useState } from 'react';
import { IntlProvider, IntlConfig } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import ReactPiwik from 'react-piwik';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import debug from 'debug';

import config from '~/config';
import history from '~/history';
import Routes from '~/routes';
import { RootState } from '~/store';
import { LocaleCode } from '~/types';
import GlobalStyles from '~/styles/Global';
import BigLoader from '~/components/BigLoader';
import ErrorBoundary from '~/components/ErrorBoundary';
import Menu from '~/components/Menu';
import { verify } from '~/pages/User/UserState';

import defaultMessages from '~/lang/compiled/de.json';

const log = debug('fmc');

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

const loadLocaleMessages = async (
  locale: LocaleCode,
  prevLocale: LocaleCode,
  setResult
) => {
  if (locale === prevLocale) return;
  log('switching to locale', locale);
  switch (locale) {
    case 'en':
      setResult(await import('~/lang/compiled/en.json'));
      break;
    case 'es':
      setResult(await import('~/lang/compiled/es.json'));
      break;
    default:
      setResult(defaultMessages);
  }
};

const App = ({ dispatch, isEmbedMode }) => {
  const [messages, setMessages] = useState<
    [LocaleCode, IntlConfig['messages']]
  >(['de', defaultMessages]);
  useEffect(() => {
    dispatch(verify());

    // track the initial pageview
    ReactPiwik.push(['trackPageView']);
  }, []);

  const locale = useSelector((state: RootState) => state.AppState.locale);

  useEffect(() => {
    loadLocaleMessages(locale, messages[0], (m) => setMessages([locale, m]));
  }, [locale]);

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider messages={messages[1]} locale={locale} defaultLocale="de">
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
      </IntlProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isEmbedMode: state.AppState.isEmbedMode
});

export default hot(connect(mapStateToProps)(App));
