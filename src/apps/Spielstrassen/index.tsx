import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { setDistrict } from '~/AppState';
import config from '~/config';
import history from '~/history';
import LinkExternal from '~/images/spielstrassen/icon-external-link@2x.png';
import LinkInternal from '~/images/spielstrassen/icon-internal-link@2x.png';
import Markdown from '~/pages/Markdown';

import Kieze from './pages/Kieze';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Thanks from './pages/Thanks';
import { loadKieze } from './state';

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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Spielstrassen = ({ districtName, district, dispatch }) => {
  useEffect(() => {
    dispatch(setDistrict(districtName));
  }, [districtName]);

  useEffect(() => {
    if (district != null) {
      loadKieze(dispatch, district);
    }
  }, [district]);

  // Skip rendering until redux action has taken effect
  if (district == null) return null;

  return (
    <AppStyles>
      <Router history={history}>
        <ScrollToTop />
        <Switch>
          <Route
            exact
            path={config.routes.spielstrassen.landing}
            component={Landing}
          />
          <Route
            exact
            path={config.routes.spielstrassen.streets}
            component={Kieze}
          />
          <Route
            exact
            path={config.routes.spielstrassen.register}
            component={Register}
          />
          <Route
            exact
            path={config.routes.spielstrassen.thanks}
            component={Thanks}
          />
          <Route render={() => <Markdown page="nomatch" />} />
        </Switch>
      </Router>
    </AppStyles>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Spielstrassen);
