import React from 'react';
import Styled from 'styled-components';
import Route from 'react-router/Route';

import MapLegend from '~/components/MapLegend';
import MapSwitch from '~/components/MapSwitch';

const MapContent = Styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  min-height: ${props => (props.hasLegend ? '200px' : 0)};
`;

export default props => (
  <MapContent hasLegend={props.displayLegend}>
    <Route
      exact
      path="/zustand"
      render={() => (
        props.displayLegend && (
          <MapLegend
            type="hbi"
            filterHbiIndex={props.filterHbiIndex}
          />
        )
      )}
    />
    <Route
      exact
      path="/planungen"
      render={() => (
        props.displayLegend && <MapLegend type="plannings" />
      )}
    />
    <Route
      exact
      path="(/zustand|/planungen)"
      component={MapSwitch}
    />
  </MapContent>
);
