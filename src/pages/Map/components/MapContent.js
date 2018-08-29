import React from 'react';
import Styled from 'styled-components';
import Route from 'react-router/Route';

import { orientation } from '~/utils/style-utils';
import MapLegend from '~/pages/Map/components/MapLegend';
import MapSwitch from '~/pages/Map/components/MapSwitch';

const MapContent = Styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  min-height: ${props => (props.hasLegend ? '180px' : 0)};

  ${orientation.landscape`
    min-height: 80px;
  `}
`;

export default props => (
  <Route
    path="(/zustand|/planungen)"
    exact
    render={() => (
      <MapContent hasLegend={props.displayLegend}>
        <Route
          exact
          path="/zustand"
          render={() => (
            props.displayLegend && (
              <MapLegend
                type="hbi"
                filterHbi={props.filterHbi}
              />
            )
          )}
        />
        <Route
          exact
          path="/planungen"
          render={() => props.displayLegend && <MapLegend type="plannings" />}
        />
        <MapSwitch />
      </MapContent>
    )}
  />
);
