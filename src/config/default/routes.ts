const katasterPath = process.env.KATASTER_PATH || '';

export default {
  projects: '/planungen',
  status: '/zustand',
  analysis: '/analyse',
  reports: {
    temporarily_forward_from_this_to_index: '/meldungen',
    index: '/meldungen/radbuegel/friedrichshain-kreuzberg',
    landing: '/meldungen/radbuegel/friedrichshain-kreuzberg/landing',
    map: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
    new: '/meldungen/radbuegel/friedrichshain-kreuzberg/neu'
  },
  katasterKI: {
    landing: katasterPath || '/',
    landingNational: `${katasterPath}/de`,
    profileBase: `${katasterPath}/profil`,
    profile: `${katasterPath}/profil/:page`,
    scenesBase: `${katasterPath}/szenen`,
    scenes: `${katasterPath}/szenen/:page`,
    share: `${katasterPath}/teilen`,
    feedback: `${katasterPath}/auswertung`,
    iframe: `${katasterPath}/iFrame-test`,
    email: `${katasterPath}/email`
  },
  spielstrassen: {
    landing: '/friedrichshain-kreuzberg/spielstrassen',
    streets: '/friedrichshain-kreuzberg/spielstrassen/kieze',
    register: '/friedrichshain-kreuzberg/spielstrassen/:slug',
    thanks: '/friedrichshain-kreuzberg/spielstrassen/:slug/danke'
  },
  popupbikelanes: '/popupbikelanes',
  signup: '/registrieren',
  login: '/anmelden',
  forgotPassword: '/passwort-vergessen',
  resetPassword: '/reset',
  emailVerification: '/email-verification',
  profile: '/profil',
  userVerify: '/bestaetigen',
  research: {
    landing: '/research',
    survey: '/research/subjektive-sicherheit'
  }
};
