import ConstructionIcon from '~/images/planning-icons/bau.svg';
import DoneIcon from '~/images/planning-icons/fertig.svg';
import ConceptIcon from '~/images/planning-icons/konzept.svg';
import PlanningIcon from '~/images/planning-icons/planung.svg';

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

export const VZI_STOPS = [
  {
    value: 0,
    color: HBI_STOPS[3].color,
    label: 'Keine Unfälle',
  },
  {
    value: 1,
    color: HBI_STOPS[2].color,
    label: 'Wenige Unfälle',
  },
  {
    value: 2,
    color: HBI_STOPS[1].color,
    label: 'Vermehrte Unfälle',
  },
  {
    value: 3,
    color: HBI_STOPS[0].color,
    label: 'Unfallschwerpunkt',
  },
];

export const PLANNING_PHASES = [
  {
    id: 'draft',
    color: '#fa96d0',
    icon: ConceptIcon,
    name: 'Konzept',
  },
  {
    id: 'planning',
    color: '#cf0a7d',
    icon: PlanningIcon,
    name: 'Planung',
  },
  {
    id: 'execution',
    color: '#910055',
    icon: ConstructionIcon,
    name: 'im Bau',
  },
  {
    id: 'ready',
    color: '#0f0f0f',
    icon: DoneIcon,
    name: 'Fertig',
  },
];
