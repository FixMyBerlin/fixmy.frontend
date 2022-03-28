export const MAP_STYLE = 'mapbox://styles/hejco/ckwxid5n96rhj15nqo0nxee9j';

export const BOUNDS: mapboxgl.MapboxOptions['maxBounds'] = [
  [13.3651, 52.4658],
  [13.4945, 52.5479],
];

export const CENTER: mapboxgl.MapboxOptions['center'] = [13.423, 52.506];

export const ZOOM: mapboxgl.MapboxOptions['zoom'] = 12.5;

export const ALL_LAYERS = [
  'accidents-fuss',
  'crosswalk-xhain',
  'elementary-schools-allblue',
  'elementary-schools-HVS',
  'knotenpunkte-withnocrossing',
  'network-schoolways-labels',
  'network-schoolways',
  'schools-einzugsbereich',
  'speedlimits',
  'streetclass',
  'traffic-light-system-xhain',
];
