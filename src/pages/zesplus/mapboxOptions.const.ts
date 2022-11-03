export const ZES_MAP_STYLE: mapboxgl.MapboxOptions['style'] =
  'mapbox://styles/hejco/cl6gf6d0v000n14mhzosikw45';
export const ZES_MAX_BOUNDS: mapboxgl.MapboxOptions['maxBounds'] = [
  [13.2081, 51.9899],
  [13.9158, 52.5453],
];
export const ZES_INITAL_CENTER: mapboxgl.MapboxOptions['center'] = [
  13.634, 52.342,
];
export const ZES_INITIAL_ZOOM: mapboxgl.MapboxOptions['zoom'] = 11.5;

// To update this list…
// 1. Check the console in on localhost for 'fmc:Article:Map:Map all non-mapbox-layers'
// 2. Copy the first part of the array, remove "mapbox-satelite"
export const ZES_ALL_LAYERS = [
  'anschlusspunkte',
  'Border-ZES-Betrachtungsraum',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Fuehung mit Fuss',
  'Fuhrung getrennnt',
  'landuse_residential-commercial',
  'maxSpeed',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'poibarriers_water_aerodrome',
  'poiEducation-label',
  'poiEducation',
  'poiShopCategory',
  'poiShopping-heatmap',
  'problemstellen-heatmap',
  'problemstellen',
  'problemstellen2',
  'publicTransport',
  'siedlungszentren-center',
  'siedlungszentren-name-only',
  'siedlungszentren-name',
  'strassentyp',
  'surf_fahrbahn-all',
  'surf_fahrbahn-bad',
  'surf_mainWay_gehUndRadwegGemeinsam',
  'surf_mainWay_gehUndRadwegGetrennt',
  'surf_mainWay_gehwegRadfFrei',
  'surf_mainWay_radwegBaulichAbgesetzt',
  'surf_mainWay_radwegFreiGefuehrt',
  'surf_mainWay_radwegVerbindungsstueck',
  'surf_mainWay_verkehrsberuhigterBereichMitFahrradFrei',
  'surfacedata_cycleway',
  'surfacedata_sidewalk',
  'Verkehrsberuhigt',
  'Vorhandene-netze-und-planungen-neu',
  'Vorhandene-netze-und-planungen',
];
