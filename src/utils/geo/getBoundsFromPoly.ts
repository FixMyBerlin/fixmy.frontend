import MapboxGL from 'mapbox-gl';

/**
 * Create rectangular bounds given a shape
 *
 * @param feature a shape to build a bonuding box for
 */
const getBoundsFromPoly = (feature: GeoJSON.Feature<GeoJSON.Polygon>) => {
  const coordinates = feature.geometry.coordinates[0] as [number, number][];
  return coordinates.reduce(
    (bounds, coord) => bounds.extend(coord),
    new MapboxGL.LngLatBounds(coordinates[0], coordinates[0])
  );
};

export default getBoundsFromPoly;
