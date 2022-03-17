import AnalysisIcon from '~/images/analysis.svg';
import ApiIcon from '~/images/api.svg';
import ResearchIcon from '~/images/icon-flask.svg';
import GastroIcon from '~/images/icon-gastro.svg';
import KommunenIcon from '~/images/icon-kommunen.svg';
import AboutIcon from '~/images/info.svg';
import MapIcon from '~/images/map.svg';
import QuestionIcon from '~/images/question.svg';
import ReportsIcon from '~/images/reports-icon.svg';
import SpielstrassenIcon from '~/images/spielstrassen-icon.svg';
import { ConfigMenu } from '../types/ConfigMenu';
import { routes } from './routes';

export const menu: ConfigMenu = {
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
