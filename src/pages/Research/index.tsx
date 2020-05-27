import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import config from '~/config';
import history from '~/history';
import Markdown from '~/pages/Markdown';

const theme = createMuiTheme({
  palette: {
    primary: { main: config.colors.interaction },
    secondary: { main: config.colors.change_4 },
    error: { main: config.colors.error },
    info: { main: config.colors.interaction },
    success: { main: config.colors.label_01 }
  }
});

const Research = () => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={config.routes.research.landing}
          render={() => <Markdown page="nomatch" />}
        />
        <Route render={() => <Markdown page="nomatch" />} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default Research;
