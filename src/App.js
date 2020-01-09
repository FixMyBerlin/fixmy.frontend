import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import history from '~/history';
import GlobalStyles from '~/styles/Global';
import DotLoader from '~/components/DotLoader';
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

class App extends PureComponent {
  componentDidMount() {
    this.props.dispatch(verify());
  }

  render() {
    const { isEmbedMode } = this.props;

    return (
      <>
        <GlobalStyles />
        <Router history={history}>
          <Suspense fallback={<DotLoader />}>
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
      </>
    );
  }
}

export default connect((state) => ({
  isEmbedMode: state.AppState.isEmbedMode
}))(App);
