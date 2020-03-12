export default {
  size: 325,
  profileLabel: 'Zum Profil',
  loginLabel: 'Login',
  items: [
    {
      type: 'link',
      label: 'Radbügelmeldung',
      icon: 'fixhere',
      link: '/meldungen/radbuegel/aachen/landing',
      border: true
    },
    {
      type: 'separator',
      label: 'Weiteres'
    },
    {
      type: 'link',
      label: 'Über FixMyAachen',
      link: '/info',
      icon: 'info',
      border: true
    },
    {
      type: 'link',
      label: 'FAQ',
      link: '/faq',
      icon: 'question',
      border: true
    },
    {
      type: 'link',
      label: 'API',
      link: '/api',
      icon: 'api',
      border: false
    }
  ],
  footeritems: [
    {
      label: 'Presse',
      link: '/presse'
    },
    {
      label: 'Impressum',
      link: '/impressum'
    },
    {
      label: 'Datenschutz',
      link: '/datenschutz'
    }
  ]
};
