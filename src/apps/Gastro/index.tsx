import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import config from './config';
import Landing from './pages/Landing';
import Registration from './pages/Registration';
import Permit from './pages/Permit';
import TrafficOrder from './pages/TrafficOrder';
import Markdown from '~/pages/Markdown';
import history from '~/history';
import LinkExternal from '~/images/spielstrassen/icon-external-link@2x.png';
import LinkInternal from '~/images/spielstrassen/icon-internal-link@2x.png';
import { setDistrict } from '~/AppState';
import { getAppPath } from '~/utils/utils';

const AppStyles = styled.div`
  font-size: 16px;
  line-height: 24px;

  h1 {
    font-family: ${config.titleFont};
    line-height: 1.25em;
  }

  h1 + .subline {
    margin-top: -1em;
  }

  h2 {
    font-size: 24px;
    line-height: 1.25em;
  }

  ol {
    padding-left: 1em;
  }

  li {
    margin-bottom: 0.5em;
  }

  a.internal,
  a.external,
  a.internal:link,
  a.external:link,
  a.internal:visited,
  a.external:visited,
  a.internal:active,
  a.external:active {
    color: ${config.colors.darkbg};
    text-decoration: none;
    border-bottom: 1px solid ${config.colors.interaction};
  }

  .external,
  .internal {
    background-size: 9px 9px;
    background-repeat: no-repeat;
    background-position: center left;
    padding-left: 15px;
  }

  .external {
    background-image: url(${LinkExternal});
  }

  .internal {
    background-image: url(${LinkInternal});
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: config.colors.interaction },
    secondary: { main: config.colors.change_4 },
    error: { main: config.colors.error },
    info: { main: config.colors.interaction },
    success: { main: config.colors.label_01 }
  }
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Gastro = ({ districtName, district, dispatch }) => {
  useEffect(() => dispatch(setDistrict(districtName)), [districtName]);
  // Skip rendering until redux action has taken effect
  if (district == null) return null;
  const basePath = getAppPath(district, 'gastro');
  return (
    <AppStyles>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            <Route
              exact
              path={basePath + config.gastro.routes.landing}
              component={Landing}
            />

            <Route exact path={basePath + config.gastro.routes.signup}>
              <Redirect to={basePath + config.gastro.routes.landing} />
            </Route>
            <Route
              exact
              path={basePath + config.gastro.routes.registration}
              component={Registration}
            />

            <Route exact path={basePath + config.gastro.routes.directory}>
              <Redirect to={basePath + config.gastro.routes.landing} />
            </Route>
            <Route exact path={basePath + config.gastro.routes.directoryEntry}>
              <Redirect to={basePath + config.gastro.routes.landing} />
            </Route>

            <Route
              exact
              path={basePath + config.gastro.routes.permit}
              component={Permit}
            />
            <Route
              exact
              path={basePath + config.gastro.routes.trafficOrder}
              component={TrafficOrder}
            />

            <Route render={() => <Markdown page="nomatch" />} />
          </Switch>
        </Router>
      </ThemeProvider>
    </AppStyles>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Gastro);
