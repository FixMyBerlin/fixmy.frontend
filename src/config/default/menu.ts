import AnalysisIcon from '~/images/analysis.svg?component';
import ApiIcon from '~/images/api.svg?component';
import ResearchIcon from '~/images/icon-flask.svg?component';
import GastroIcon from '~/images/icon-gastro.svg?component';
import KommunenIcon from '~/images/icon-kommunen.svg?component';
import AboutIcon from '~/images/info.svg?component';
import MapIcon from '~/images/map.svg?component';
import QuestionIcon from '~/images/question.svg?component';
import ReportsIcon from '~/images/reports-icon.svg?component';
import SpielstrassenIcon from '~/images/spielstrassen-icon.svg?component';

import routes from './routes';

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

type SVGIcon = JSX.Element;

type Link = {
  type: 'link';
  label: string;
  link: string;
  icon: SVGIcon;
  border: boolean;
};

type ExternalLink = {
  type: 'external';
  label: string;
  href: string;
  icon: SVGIcon;
  border: boolean;
};

type Separator = {
  type: 'separator';
  label: string;
};

type Plus = {
  type: 'plus';
  label: string;
  icon?: SVGIcon;
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
      type: 'separator',
      label: 'Berlin',
    },
    {
      type: 'link',
      label: 'Planungskarte',
      link: routes.map.projectsIndex,
      icon: MapIcon,
      border: true,
    },
    {
      type: 'link',
      label: 'Analyse',
      link: routes.analysis,
      icon: AnalysisIcon,
      border: false,
    },
    {
      type: 'separator',
      label: 'Friedrichshain-Kreuzberg',
    },
    {
      type: 'link',
      label: 'Xhain-Terrassen',
      icon: GastroIcon,
      link: '/friedrichshain-kreuzberg/terrassen',
      border: true,
    },
    {
      type: 'link',
      label: 'Temporäre Spielstraßen',
      icon: SpielstrassenIcon,
      link: routes.spielstrassen.landing,
      border: true,
    },
    {
      type: 'link',
      label: 'Radbügel-Meldedialog',
      icon: ReportsIcon,
      link: routes.reports.landing,
      border: true,
    },
    {
      type: 'link',
      label: 'Schulwegsicherheit',
      icon: ResearchIcon,
      link: routes.wayToSchool.xhain,
      border: true,
    },
    {
      type: 'link',
      label: 'Parkraum',
      icon: MapIcon,
      link: routes.parkingLane.xhain,
      border: false,
    },
    {
      type: 'separator',
      label: 'Weiteres',
    },
    {
      type: 'external',
      label: 'Angebote für Kommunen',
      href: 'https://www.fixmycity.de/',
      icon: KommunenIcon,
      border: true,
    },
    {
      type: 'link',
      label: 'Ergebnisse der Straßencheck-Umfrage',
      icon: ResearchIcon,
      link: routes.research.survey,
      border: true,
    },
    {
      type: 'external',
      label: 'Über FixMyCity',
      href: 'https://www.fixmycity.de/wer-wir-sind',
      icon: AboutIcon,
      border: true,
    },
    {
      type: 'link',
      label: 'FAQ',
      link: '/faq',
      icon: QuestionIcon,
      border: true,
    },
    {
      type: 'link',
      label: 'API',
      link: '/api',
      icon: ApiIcon,
      border: false,
    },
  ],
  footeritems: [
    {
      label: 'Presse',
      link: '/presse',
    },
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

export default menuConfig;
