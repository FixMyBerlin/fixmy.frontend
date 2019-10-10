import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "EmailVerification" */ './EmailVerification'),
  loading: () => null
});
