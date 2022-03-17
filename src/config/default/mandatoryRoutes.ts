export type ConfigMandatoryRoutes = {
  signup: string;
  login: string;
  forgotPassword: string;
  resetPassword: string;
  emailVerification: string;
  profile: string;
  userVerify: string;
};

export const mandatoryRoutes: ConfigMandatoryRoutes = {
  signup: '/registrieren',
  login: '/anmelden',
  forgotPassword: '/passwort-vergessen',
  resetPassword: '/reset',
  emailVerification: '/email-verification',
  profile: '/profil',
  userVerify: '/bestaetigen',
};
