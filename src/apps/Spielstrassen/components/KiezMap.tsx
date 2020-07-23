import React from 'react';
import MapboxGL from 'mapbox-gl';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Map from '~/components2/Map';
import { Spielstrasse } from '../types';
import { getBoundsFromPoly } from '~/utils/geo';

import lors from '~/apps/Spielstrassen/data/lor-features.json';
import { RootState } from '~/store';

type LORData = GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  { PLR_NAME: string; SCHLUESSEL: string }
>;

const MapWrapper = styled(Map)`
  width: 100vw;
  height: 20em;
  margin-left: -1rem;
  margin-bottom: 2em;

  ${media.m`
    margin-left: 0;
    width: 100%;
    height: 30em;
  `}
`;

const getKiezBounds = (PLR: string) =>
  (lors as LORData).features.find((f) => f.properties.PLR_NAME === PLR);

const fitMapToKiez = (street: Spielstrasse, map: MapboxGL.Map) => {
  const feature = getKiezBounds(street.kiez);
  const kiezBounds = getBoundsFromPoly(feature);
  map.fitBounds(kiezBounds, { padding: 10 });
};

const dimMap = (street: Spielstrasse, map: MapboxGL.Map) => {
  map.setLayoutProperty('lor-dim', 'visibility', 'visible');

  map.setPaintProperty('lor-dim', 'fill-color', [
    'match',
    ['get', 'PLR_NAME'],
    street.kiez,
    'hsla(325, 0%, 100%, 0)',
    'hsla(325, 0%, 0%, 0.85)'
  ]);
};

const handleLoad = (street: Spielstrasse, map: MapboxGL.Map) => {
  fitMapToKiez(street, map);
  dimMap(street, map);
};

const connector = connect(({ AppState }: RootState) => ({
  district: AppState.district
}));

type Props = {
  street: Spielstrasse;
};

const KiezMap = ({
  street,
  district
}: ConnectedProps<typeof connector> & Props) => (
  <MapWrapper
    style={district.apps.spielstrassen.mapboxStyle}
    onInit={(map) => handleLoad(street, map)}
    bounds={district.bounds}
    dragPan={false}
    scrollZoom={false}
    doubleClickZoom={false}
    touchZoomRotate={false}
  />
);

export default connector(KiezMap);
