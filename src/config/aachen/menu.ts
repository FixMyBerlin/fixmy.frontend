import { ConfigMenu } from '../types/ConfigMenu';
import { routes } from './routes';
import FixHere from '~/images/fixhere.svg';

export const menu: ConfigMenu = {
  size: 325,
  profileLabel: 'Zum Profil',
  loginLabel: 'Login',
  logo: false,
  twitter: false,
  items: [
    {
      type: 'link',
      label: 'Radbügelmeldung',
      icon: FixHere,
      link: routes.reports.landing,
      border: false,
    },
    {
      type: 'separator',
      label: '',
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
