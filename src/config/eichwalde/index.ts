import defaultRoutes from '../default/routes';

export default {
  routes: {
    signup: defaultRoutes.signup,
    login: defaultRoutes.login,
    forgotPassword: defaultRoutes.forgotPassword,
    resetPassword: defaultRoutes.resetPassword,
    emailVerification: defaultRoutes.emailVerification,
    profile: defaultRoutes.profile,
    userVerify: defaultRoutes.userVerify
  },
  menu: {
    profileLabel: 'Zum Profil',
    loginLabel: 'Login',
    logo: false,
    twitter: false,
    items: [],
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
