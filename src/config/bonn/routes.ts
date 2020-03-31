import defaultRoutes from '../default/routes';

export default {
  reports: {
    index: '/meldungen/radbuegel/bonn',
    landing: '/meldungen/radbuegel/bonn/landing',
    map: '/meldungen/radbuegel/bonn/karte',
    new: '/meldungen/radbuegel/bonn/neu'
  },
  signup: defaultRoutes.signup,
  login: defaultRoutes.login,
  forgotPassword: defaultRoutes.forgotPassword,
  resetPassword: defaultRoutes.resetPassword,
  emailVerification: defaultRoutes.emailVerification,
  profile: defaultRoutes.profile,
  userVerify: defaultRoutes.userVerify
};
