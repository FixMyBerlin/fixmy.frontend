const katasterPath = process.env.KATASTER_PATH || '';

export default {
  projects: '/planungen',
  status: '/zustand',
  analyse: '/analyse',
  reports: {
    temporarily_forward_from_this_to_index: '/meldungen',
    index: '/meldungen/radbuegel/friedrichshain-kreuzberg',
    landing: '/meldungen/radbuegel/friedrichshain-kreuzberg/landing',
    map: '/meldungen/radbuegel/friedrichshain-kreuzberg/karte',
    new: '/meldungen/radbuegel/friedrichshain-kreuzberg/neu'
  },
  katasterKI: {
    landing: katasterPath || '/',
    landingNational: '/de',
    profileBase: `${katasterPath}/profil`,
    profile: `${katasterPath}/profil/:page`,
    scenesBase: `${katasterPath}/szenen`,
    scenes: `${katasterPath}/szenen/:page`,
    share: `${katasterPath}/teilen`,
    feedback: `${katasterPath}/auswertung`,
    iframe: `${katasterPath}/iFrame-test`,
    email: `${katasterPath}/email`
  },
  signup: '/registrieren',
  login: '/anmelden',
  forgotPassword: '/passwort-vergessen',
  resetPassword: '/reset',
  emailVerification: '/email-verification',
  profile: '/profil',
  userVerify: '/bestaetigen'
};
