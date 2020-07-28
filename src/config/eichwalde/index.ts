import defaultRoutes from '../default/routes';

export default {
  titleFont: 'Roboto Slab',
  baseFont: 'Roboto',
  routes: {
    signup: defaultRoutes.signup,
    login: defaultRoutes.login,
    forgotPassword: defaultRoutes.forgotPassword,
    resetPassword: defaultRoutes.resetPassword,
    emailVerification: defaultRoutes.emailVerification,
    profile: defaultRoutes.profile,
    userVerify: defaultRoutes.userVerify,
    zesplusResearch: '/forschungsprojekt'
  },
  menu: {
    profileLabel: 'Zum Profil',
    loginLabel: 'Login',
    logo: false,
    twitter: false,
    items: [],
    size: 325,
    footeritems: [
      {
        label: 'Impressum',
        link: '/impressum'
      },
      {
        label: 'Datenschutz',
        link: '/datenschutz'
      }
    ]
  }
};
