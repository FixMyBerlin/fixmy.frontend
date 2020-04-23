import React, { useEffect } from 'react';
import { Router, Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import config from '~/pages/Spielstrassen/config';
import Landing from './pages/Landing';
import Kieze from './pages/Kieze';
import Register from './pages/Register';
import Thanks from './pages/Thanks';
import Markdown from '~/pages/Markdown';
import history from '~/history';

const Styles = styled.div`
  font-size: 16px;
  line-height: 24px;

  h1 {
    font-family: ${config.titleFont};
    line-height: 1.25em;
  }

  h2 {
    font-size: 24px;
    line-height: 1.25em;
  }

  ol {
    padding-left: 1em;
  }

  a,
  a:link,
  a:visited,
  a:active {
    color: ${config.colors.darkbg};
    text-decoration: none;
    border-bottom: 1px solid ${config.colors.interaction};
  }
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Spielstrassen = () => {
  return (
    <Styles>
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
            path={config.routes.spielstrassen.kieze}
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
    </Styles>
  );
};

export default Spielstrassen;