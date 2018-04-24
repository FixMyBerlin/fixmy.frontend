import React from 'react';
import { Route } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

import Menu from '~/modules/Menu';
import Home from '~/modules/Home';
import About from '~/modules/About';
import MapView from '~/modules/MapView';

injectGlobal([`
  @import url("https://fonts.googleapis.com/css?family=Roboto+Slab|Open+Sans");

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    width: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    position: relative;
    height: 100%;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
  }

  #root {
    height: 100%;
    position: relative;
  }
`]);

const App = styled.div`
  height: 100%;
  position: relative;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
`;

export default () => (
  <App>
    <Menu />
    <AppContent>
      <Route exact path="/" component={Home} />
      <Route path="/info" component={About} />
      <MapView />
    </AppContent>
  </App>
);
