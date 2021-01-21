import MapboxGL from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';
import Map from '~/components2/Map';

const MB_STYLE_URL = `${config.reports.overviewMap.style}${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const StyledMap = styled(Map)`
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

const BaseMap = ({
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
      <StyledMap
        bounds={config.reports.overviewMap.bounds as MapboxGL.LngLatBoundsLike}
        className={className}
        data-cy="reports-basemap"
        maxBounds={maxBounds}
        onInit={handleLoad}
        style={MB_STYLE_URL}
      />
    </>
  );
};

export default BaseMap;
