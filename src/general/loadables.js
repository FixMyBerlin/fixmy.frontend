import Loadable from 'react-loadable';

function Loading({ error }) {
  if (error) {
    console.log(error);
    return 'Ein Fehler ist aufgetreten';
  }

  return null;
}

export const Home = Loadable({
  loader: () => import('~/pages/Home'),
  loading: Loading
});

export const MarkdownPage = Loadable({
  loader: () => import('~/pages/Markdown'),
  loading: Loading
});

export const MapView = Loadable({
  loader: () => import('~/pages/Map'),
  loading: Loading
});

export const Login = Loadable({
  loader: () => import('~/pages/User/pages/Login'),
  loading: Loading
});

export const Signup = Loadable({
  loader: () => import('~/pages/User/pages/Signup'),
  loading: Loading
});

export const PasswordReset = Loadable({
  loader: () => import('~/pages/User/pages/PasswordReset'),
  loading: Loading
});

export const EmailVerification = Loadable({
  loader: () => import('~/pages/User/pages/EmailVerification'),
  loading: Loading
});

export const SectionDetail = Loadable({
  loader: () => import('~/pages/Map/components/DetailView/SectionDetail'),
  loading: () => null
});

export const PlanningDetail = Loadable({
  loader: () => import('~/pages/Map/components/DetailView/PlanningDetail'),
  loading: () => null
});

export const MyHBI = Loadable({
  loader: () => import('~/pages/MyHBI'),
  loading: () => null
});

export const Map = Loadable({
  loader: () => import('~/pages/Map/components/Map'),
  loading: () => null
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
  Map
};
