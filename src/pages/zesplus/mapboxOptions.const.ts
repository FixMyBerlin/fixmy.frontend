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
  'landuse_residential-commercial',
  'landuse_residential-commercial -outlines',
  'buildings-black',
  'surf_mainWay_gehwegRadfFrei',
  'surf_mainWay_gehUndRadwegGemeinsam',
  'surf_mainWay_gehUndRadwegGetrennt',
  'surf_mainWay_radwegBaulichAbgesetzt',
  'surf_mainWay_radwegFreiGefuehrt',
  'surf_mainWay_radwegVerbindungsstueck',
  'surf_mainWay_verkehrsberuhigterBereichMitFahrradFrei',
  'surfacedata_cycleway',
  'surfacedata_sidewalk',
  'surf_fahrbahn-all',
  'poiShopCategory',
  'poiShopping-heatmap',
  'poiEducation',
  'poiEducation-label',
  'Fuehung mit Fuss',
  'Fuhrung getrennnt',
  'Verkehrsberuhigt',
  'strassentyp',
  'strassentyp-wohnstrassenonly',
  'maxSpeed',
  'surf_fahrbahn-bad',
  'surf_fahrbahn-bad-rot',
  'Netzvorschlaege_buergerInnen',
  'Vorhandene-netze_uebergeordnet',
  'poibarriers_water_aerodrome',
  'poibarriers_motorway',
  'poibarriers_train',
  'poibarriers_train2',
  'publicTransport',
  'problemstellen',
  'problemstellen-heatmap',
  'problemstellen2',
  'dimmlayer-ZES-Betrachtungsraum',
  'dimmlayer-ZESplus',
  'Border-ZES-Betrachtungsraum',
  'nudafa-ramboll-wunschlininien',
  'nudafa-ramboll-netzentwurf',
  'nudafa-ramboll-zielpunkte',
  'nudafa-ramboll-zwangspunkte',
  'siedlungszentren-name-only',
  'siedlungszentren-center',
  'siedlungszentren-name',
  'unsichererstellen-8n5geh',
  'schulwege-real-761p90',
  'unfaelle-210727',
  'poiEducation-schoolsafety',
];
