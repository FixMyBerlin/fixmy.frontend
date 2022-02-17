import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseMap } from '~/components2/BaseMap';
import { BigLoader } from '~/components2/Loaders/';
import config from '~/pages/Reports/config';

const MB_STYLE_URL = `${config.reports.overviewMap.style}${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const MapWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

interface Props {
  children?: React.ReactNode;
  className?: string;
  isReportsDataLoaded?: boolean;
  maxBounds?: MapboxGL.LngLatBoundsLike;
  onLoad?: (map: MapboxGL.Map) => any;
  onMove?: (ev: any) => void;
}

const ReportsBaseMap = ({
  children,
  className,
  maxBounds,
  onLoad,
  onMove,
  isReportsDataLoaded = true,
}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const handleLoad = (map: MapboxGL.Map) => {
    if (onMove) map.on('move', onMove);
    if (onLoad) onLoad(map);
    if (isReportsDataLoaded) setLoading(false);
  };
  useEffect(() => setLoading(!isReportsDataLoaded), [isReportsDataLoaded]);
  return (
    <>
      {isLoading && <BigLoader useAbsolutePositioning />}
      {children}
      <MapWrapper>
        <BaseMap
          bounds={config.reports.overviewMap.bounds}
          className={className}
          data-cy="reports-basemap"
          maxBounds={maxBounds}
          onInit={handleLoad}
          mapboxStyle={MB_STYLE_URL}
        />
      </MapWrapper>
    </>
  );
};

export default ReportsBaseMap;
