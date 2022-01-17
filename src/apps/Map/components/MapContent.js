import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import MapSelectorBar from '~/apps/Map/components/MapSelectorBar';
import MapSwitch from '~/apps/Map/components/MapSwitch';
import config from '~/config';
import { orientation, media } from '~/styles/utils';

const MapContent = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;

  ${media.m`
    display: flex;
  `}

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
              <MapSelectorBar
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
              <MapSelectorBar type="plannings" isEmbedMode={props.isEmbedMode} />
            )
          }
        />
        {!props.isEmbedMode && <MapSwitch />}
      </MapContent>
    )}
  />
);
