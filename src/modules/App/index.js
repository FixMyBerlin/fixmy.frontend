import React, { PureComponent } from 'react';
import Route from 'react-router-dom/Route';
import styled from 'styled-components';
import idx from 'idx';

import Menu from '~/modules/Menu';
import Home from '~/modules/Home';
import MarkdownPage from '~/modules/MarkdownPage';
import MapView from '~/modules/MapView';

import Store from '~/redux/store';
import { setSectionActive } from '~/modules/MapView/MapState';

const App = styled.div`
  height: 100%;
  position: relative;
`;

const AppContent = styled.div`
  width: 100%;
  height: 100%;
`;

class RouteStateHelper extends PureComponent {
  componentDidMount() {
    this.update();
  }

  update = () => {
    const id = idx(this.props, _ => _.match.params.id);

    if (id) {
      Store.dispatch(setSectionActive({ id: +id }));
    }
  }

  render() {
    return null;
  }
}

const AppWrapper = () => (
  <App>
    <Menu />
    <AppContent>
      <Route exact path="/" component={Home} />
      <Route path="/info" render={() => <MarkdownPage page="about" />} />

      <Route path="/kontakt" render={() => <MarkdownPage page="contact" />} />
      <Route path="/datenschutz" render={() => <MarkdownPage page="privacy" />} />
      <Route path="/impressum" render={() => <MarkdownPage page="imprint" />} />

      <Route
        path="(/zustand|/planungen|/my-hbi)"
        component={MapView}
      />

      <Route
        path="/zustand/:id"
        component={RouteStateHelper}
      />
    </AppContent>
  </App>
);

export default AppWrapper;
