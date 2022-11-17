import AboutIcon from '~/images/info.svg';
import PlanningIcon from '~/images/bike-network-development.svg';
import { ConfigMenu } from '../types/ConfigMenu';
import { routes } from './routes';

export const menu: ConfigMenu = {
  size: 325,
  profileLabel: 'Zum Profil',
  login: false,
  loginLabel: 'Login',
  logo: false,
  twitter: false,
  items: [
    {
      type: 'link',
      label: 'Start',
      icon: AboutIcon,
      link: routes.landing,
      border: true,
    },
    {
      type: 'link',
      label: 'Radnetzplanung',
      icon: PlanningIcon,
      link: routes.radnetzplanung,
      border: true,
    },
  ],
  footeritems: [
    {
      label: 'Impressum',
      link: '/impressum',
    },
    {
      label: 'Datenschutz',
      link: '/datenschutz',
    },
  ],
};
