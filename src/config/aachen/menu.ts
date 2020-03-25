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
      link: '/meldungen/radbuegel/aachen/landing',
      border: true
    },
    {
      type: 'link',
      label: 'Kontakt',
      icon: 'info',
      link: '/kontakt',
      border: true
    },
    {
      type: 'separator',
      label: ''
    }
  ],
  footeritems: [
    {
      label: 'Impressum',
      link: 'http://www.aachen.de/DE/stadt_buerger/allgemeines/impressum.html',
      external: true
    },
    {
      label: 'Datenschutz',
      link: '/datenschutz'
    }
  ]
};
