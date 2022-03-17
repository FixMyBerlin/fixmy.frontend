import { ConfigRoutePage, ConfigRoutePath } from '../types/ConfigRoute';
import { ConfigMandatoryRoutes, mandatoryRoutes } from './mandatoryRoutes';

type Props = ConfigMandatoryRoutes & {
  analysis: ConfigRoutePath;
  map: ConfigRoutePage;
  reports: ConfigRoutePage;
  katasterKI: ConfigRoutePage;
  spielstrassen: ConfigRoutePage;
  wayToSchool: ConfigRoutePage;
  parkingLane: ConfigRoutePage;
  research: ConfigRoutePage;
};

export const routes: Props = {
  ...mandatoryRoutes,
  analysis: '/analyse',
  map: {
    hbiIndex: '/zustand',
    hbiDetail: '/zustand/:id/:name?',
    projectsIndex: '/planungen',
    projectsDetail: '/planungen/:id/:name?',
  },
  reports: {
    temporarily_forward_from_this_to_index: '/meldungen',
    index: '/meldungen/radbuegel/friedrichshain-kreuzberg',
    landing: '/meldungen/radbuegel/friedrichshain-kreuzberg/landing',
    map: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
    new: '/meldungen/radbuegel/friedrichshain-kreuzberg/neu',
  },
  katasterKI: {
    landing: '/strassencheck',
    landingNational: `/strassencheck/de`,
    profileBase: `/strassencheck/profil`,
    profile: `/strassencheck/profil/:page`,
    scenesBase: `/strassencheck/szenen`,
    scenes: `/strassencheck/szenen/:page`,
    share: `/strassencheck/teilen`,
    feedback: `/strassencheck/auswertung`,
    email: `/strassencheck/email`,
  },
  spielstrassen: {
    landing: '/friedrichshain-kreuzberg/spielstrassen',
    streets: '/friedrichshain-kreuzberg/spielstrassen/kieze',
    register: '/friedrichshain-kreuzberg/spielstrassen/:slug',
    thanks: '/friedrichshain-kreuzberg/spielstrassen/:slug/danke',
  },
  // Note: React router does not like it if I use /friedrichshain-kreuzberg/schulwegsicherheit here, so we turn it around.
  wayToSchool: {
    landing: '/schulwegsicherheit',
    xhain: '/schulwegsicherheit/friedrichshain-kreuzberg',
  },
  parkingLane: {
    landing: '/parkraum',
    xhain: '/parkraum/friedrichshain-kreuzberg',
  },
  research: {
    landing: '/research',
    survey: '/research/subjektive-sicherheit',
  },
};
