import React, { useEffect, useState } from 'react';
import { IntlProvider, IntlConfig } from 'react-intl';
import { connect, useSelector } from 'react-redux';
import ReactPiwik from 'react-piwik';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { ThemeProvider } from '@material-ui/styles';
import debug from 'debug';
import { Theme } from '@material-ui/core';

import history from '~/history';
import Routes from '~/routes';
import { RootState } from '~/store';
import GlobalStyles from '~/styles/Global';
import ErrorBoundary from '~/components/ErrorBoundary';
import Menu from '~/components/Menu';
import { verify } from '~/pages/User/UserState';
import { getTheme } from '~/styles/mui-utils';

import defaultMessages from '~/lang/compiled/de.json';
import loadLocaleMessages from './lang/loader';
import intlErrorHandler from './lang/errorHandler';

const log = debug('fmc');

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

const AppWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const App = ({ dispatch, isEmbedMode }) => {
  const locale = useSelector((state: RootState) => state.AppState.locale);
  const [messages, setMessages] = useState<IntlConfig['messages']>(
    defaultMessages
  );
  const [theme, setTheme] = useState<Theme>(getTheme(locale));

  useEffect(() => {
    log('switching to locale', locale);
    const doLoad = async () => {
      setMessages(await loadLocaleMessages(locale));
      setTheme(getTheme(locale));
      log('finished switching locale');
    };
    doLoad();
  }, [locale]);

  useEffect(() => {
    dispatch(verify());

    // track the initial pageview
    ReactPiwik.push(['trackPageView']);
  }, []);

  log('rendering app');
  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        messages={messages}
        locale={locale}
        defaultLocale="de"
        onError={intlErrorHandler}
      >
        <GlobalStyles />
        <Router history={history}>
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
        </Router>
      </IntlProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  isEmbedMode: state.MapState.isEmbedMode,
});

export default connect(mapStateToProps)(App);
