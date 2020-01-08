export default {
  size: 325,
  profileLabel: 'Zum Profil',
  loginLabel: 'Login',
  items: [
    {
      type: 'link',
      label: 'Planungen für den Radverkehr',
      link: '/planungen',
      icon: 'map',
      border: true
    },
    {
      type: 'link',
      label: 'Happy-Bike-Index (beta)',
      link: '/zustand',
      icon: 'hbi-icon',
      border: true
    },
    {
      type: 'link',
      label: 'Radbügel in X-Hain (Meldungen nicht mehr möglich)',
      icon: 'fixhere',
      link: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
      border: true
    },
    {
      type: 'link',
      label: 'Analyse Planungen',
      link: '/analyse/planungen',
      icon: 'analysis',
      border: false
    },
    {
      type: 'separator',
      label: 'Weiteres'
    },
    {
      type: 'link',
      label: 'Über FixMyBerlin',
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
