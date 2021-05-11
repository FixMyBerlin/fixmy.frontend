import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import MapLegend from '~/apps/Map/components/MapLegend';
import MapSwitch from '~/apps/Map/components/MapSwitch';
import config from '~/config';
import { orientation } from '~/styles/utils';

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
    path={`(${config.routes.map.hbiIndex}|${config.routes.map.projectsIndex})`}
    exact
    render={() => (
      <MapContent
        hasLegend={props.displayLegend}
        isEmbedMode={props.isEmbedMode}
      >
        <Route
          exact
          path={config.routes.map.hbiIndex}
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
          path={config.routes.map.projectsIndex}
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
