import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import { orientation } from '~/styles/utils';
import MapLegend from '~/pages/Map/components/MapLegend';
import MapSwitch from '~/pages/Map/components/MapSwitch';

function getHeight(props) {
  if (props.isEmbedMode) {
    return 'auto';
  }

  return props.hasLegend ? '180px' : 0;
}

const MapContent = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  min-height: ${getHeight};

  ${orientation.landscape`
    min-height: 80px;
  `}
`;

export default (props) => (
  <Route
    path="(/zustand|/planungen)"
    exact
    render={() => (
      <MapContent
        hasLegend={props.displayLegend}
        isEmbedMode={props.isEmbedMode}
      >
        <Route
          exact
          path="/zustand"
          render={() =>
            props.displayLegend && (
              <MapLegend
                type="hbi"
                filterHbi={props.filterHbi}
                isEmbedMode={props.isEmbedMode}
              />
            )
          }
        />
        <Route
          exact
          path="/planungen"
          render={() =>
            props.displayLegend && (
              <MapLegend type="plannings" isEmbedMode={props.isEmbedMode} />
            )
          }
        />
        {!props.isEmbedMode && <MapSwitch />}
      </MapContent>
    )}
  />
);
