import defaultRoutes from '../default/routes';

export default {
  reports: {
    index: '/meldungen/radbuegel/aachen',
    landing: '/meldungen/radbuegel/aachen/landing',
    map: '/meldungen/radbuegel/aachen/karte',
    new: '/meldungen/radbuegel/aachen/neu'
  },
  signup: defaultRoutes.signup,
  login: defaultRoutes.login,
  forgotPassword: defaultRoutes.forgotPassword,
  resetPassword: defaultRoutes.resetPassword,
  emailVerification: defaultRoutes.emailVerification,
  profile: defaultRoutes.profile,
  userVerify: defaultRoutes.userVerify
};
