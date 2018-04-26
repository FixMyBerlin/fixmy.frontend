import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Menu from '~/modules/Menu';
import Home from '~/modules/Home';
import About from '~/modules/About';
import MapView from '~/modules/MapView';

import Content from '~/modules/Content';

import { init as initStyle } from './AppStyle';

initStyle();

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

const AppWrapper = () => (
  <App>
    <Menu />
    <AppContent>
      <Route exact path="/" component={Home} />
      <Route path="/info" component={About} />

      <Route path="/kontakt" render={() => <Content title="Kontakt" />} />
      <Route path="/presse" render={() => <Content title="Presse" />} />
      <Route path="/datenschutz" render={() => <Content title="Datenschutz" />} />
      <Route path="/impressum" render={() => <Content title="Impressum" />} />

      <MapView />
    </AppContent>
  </App>
);

export default AppWrapper;
