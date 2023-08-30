import AboutIcon from '~/images/info.svg';
import PlanningIcon from '~/images/bike-network-development.svg';
import { ConfigMenu } from '../types/ConfigMenu';
import { routes } from './routes';
import AboutFolder from '~/images/icon-folder.svg';
import { notionUrl } from '~/pages/zesplus/forschungsprojekt/links.const';

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
      border: false,
    },
    {
      type: 'separator',
      label: 'Externe Inhalte',
    },
    {
      type: 'external',
      label: 'Teilprojekte',
      href: notionUrl,
      icon: AboutFolder,
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
