interface Menu {
  size: number;
  profileLabel: string;
  loginLabel: string;
  logo?: boolean;
  twitter?: boolean;
  items: MenuItem[];
  footeritems: FooterItem[];
}

type MenuItem = Link | ExternalLink | Separator | Plus;

type Link = {
  type: 'link';
  label: string;
  link: string;
  icon: string;
  border: boolean;
};

type ExternalLink = {
  type: 'external';
  label: string;
  href: string;
  icon: string;
  border: boolean;
};

type Separator = {
  type: 'separator';
  label: string;
};

type Plus = {
  type: 'plus';
  label: string;
  icon?: string;
  children: Link[];
};

type FooterItem = {
  label: string;
  link: string;
};

const menuConfig: Menu = {
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
      label: 'Analyse Planungen',
      link: '/analyse/planungen',
      icon: 'analysis',
      border: false
    },
    {
      type: 'separator',
      label: 'Friedrichshain-Kreuzberg'
    },
    {
      type: 'link',
      label: 'Terrassen für XHain',
      icon: 'reports-icon',
      link: '/friedrichshain-kreuzberg/terrassen',
      border: true
    },
    {
      type: 'link',
      label: 'Radbügelmeldungen in XHain',
      icon: 'reports-icon',
      link: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
      border: true
    },
    {
      type: 'link',
      label: 'Spielstraßen in XHain',
      icon: 'spielstrassen-icon',
      link: '/friedrichshain-kreuzberg/spielstrassen',
      border: true
    },
    {
      type: 'separator',
      label: 'Weiteres'
    },
    {
      type: 'external',
      label: 'Angebote für Kommunen',
      href: 'https://fixmycity.de',
      icon: 'icon-kommunen',
      border: true
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

export default menuConfig;
