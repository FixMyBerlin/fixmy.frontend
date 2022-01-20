interface RouteConfig {
  // optional routes
  map?: {
    projectsIndex: string;
    projectsDetail: string;
    hbiIndex: string;
    hbiDetail: string;
  };
  analysis?: string;
  reports?: {
    [page: string]: string;
  };
  katasterKI?: {
    [page: string]: string;
  };
  spielstrassen?: {
    [page: string]: string;
  };
  research?: {
    [page: string]: string;
  };
  wayToSchool?: {
    [page: string]: string;
  };
  // mandatory routes
  signup: string;
  login: string;
  forgotPassword: string;
  resetPassword: string;
  emailVerification: string;
  profile: string;
  userVerify: string;
}

const routes: RouteConfig = {
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
  signup: '/registrieren',
  login: '/anmelden',
  forgotPassword: '/passwort-vergessen',
  resetPassword: '/reset',
  emailVerification: '/email-verification',
  profile: '/profil',
  userVerify: '/bestaetigen',
  research: {
    landing: '/research',
    survey: '/research/subjektive-sicherheit',
  },
};

export default routes;
