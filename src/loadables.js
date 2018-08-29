import Loadable from 'react-loadable';

function Loading({ error }) {
  if (error) {
    return 'Ein Fehler ist aufgetreten';
  }

  return null;
}

export const Home = Loadable({
  loader: () => import('~/modules/Home'),
  loading: Loading
});

export const MarkdownPage = Loadable({
  loader: () => import('~/modules/MarkdownPage'),
  loading: Loading
});

export const MapView = Loadable({
  loader: () => import('~/modules/MapView'),
  loading: Loading
});

export const Login = Loadable({
  loader: () => import('~/modules/User/Login'),
  loading: Loading
});

export const Signup = Loadable({
  loader: () => import('~/modules/User/Signup'),
  loading: Loading
});

export const PasswordReset = Loadable({
  loader: () => import('~/modules/User/PasswordReset'),
  loading: Loading
});

export const EmailVerification = Loadable({
  loader: () => import('~/modules/User/EmailVerification'),
  loading: Loading
});

const SectionDetail = Loadable({
  loader: () => import('~/components/SectionDetail'),
  loading: Loading
});

const PlanningDetail = Loadable({
  loader: () => import('~/components/PlanningDetail'),
  loading: Loading
});

const MyHBI = Loadable({
  loader: () => import('~/modules/MyHBI'),
  loading: Loading
});

export default {
  Home,
  MarkdownPage,
  MapView,
  Login,
  Signup,
  PasswordReset,
  EmailVerification,
  SectionDetail,
  PlanningDetail,
  MyHBI
};
