export const RIGHT_SIDE = 0;
export const LEFT_SIDE = 1;
export const BOTH_SIDES = 2;

export const HBI_WORST = 0;
export const HBI_BAD = 1;
export const HBI_OK = 2;
export const HBI_SUPER = 3;

export const HBI_STOPS = [
  {
    value: HBI_WORST,
    color: '#c01d1d',
    label: 'miserabel',
  },
  {
    value: HBI_BAD,
    color: '#f08141',
    label: 'schlecht',
  },
  {
    value: HBI_OK,
    color: '#abc759',
    label: 'ok',
  },
  {
    value: HBI_SUPER,
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
