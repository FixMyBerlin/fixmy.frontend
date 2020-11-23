import defaultRoutes from '../default/routes';

export default {
  reports: {
    index: '/',
    landing: '/meldungen',
    map: '/meldungen/karte',
    new: '/meldungen/neu',
  },
  signup: defaultRoutes.signup,
  login: defaultRoutes.login,
  forgotPassword: defaultRoutes.forgotPassword,
  resetPassword: defaultRoutes.resetPassword,
  emailVerification: defaultRoutes.emailVerification,
  profile: defaultRoutes.profile,
  userVerify: defaultRoutes.userVerify,
};
