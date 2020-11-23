import routes from './routes';

export default {
  size: 325,
  profileLabel: 'Zum Profil',
  loginLabel: 'Login',
  logo: false,
  twitter: false,
  items: [
    {
      type: 'link',
      label: 'Radbügelmeldung',
      icon: 'fixhere',
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
