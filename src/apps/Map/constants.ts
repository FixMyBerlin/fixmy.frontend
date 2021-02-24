export const RIGHT_SIDE = 0;
export const LEFT_SIDE = 1;
export const BOTH_SIDES = 2;

export const HBI = [
  { label: 'Geschwindgkeit', type: 'speed', value: 5, min: 0, max: 10 },
  { label: 'Sicherheit', type: 'security', value: 5, min: 0, max: 10 },
];

export const HBI_STOPS = [
  {
    min: 0,
    max: 2.5,
    color: '#c01d1d',
    label: 'miserabel',
  },
  {
    min: 2.5,
    max: 5,
    color: '#f08141',
    label: 'schlecht',
  },
  {
    min: 5,
    max: 7.5,
    color: '#abc759',
    label: 'ok',
  },
  {
    min: 7.5,
    max: 100,
    color: '#45b834',
    label: 'super',
  },
];

export const PLANNING_PHASES = [
  {
    id: 'draft',
    color: '#fa96d0',
    icon: 'konzept.svg',
    name: 'Konzept',
  },
  {
    id: 'planning',
    color: '#cf0a7d',
    icon: 'planung.svg',
    name: 'Planung',
  },
  {
    id: 'execution',
    color: '#910055',
    icon: 'bau.svg',
    name: 'im Bau',
  },
  {
    id: 'ready',
    color: '#0f0f0f',
    icon: 'fertig.svg',
    name: 'Fertig',
  },
];
