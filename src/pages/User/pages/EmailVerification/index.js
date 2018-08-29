import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./EmailVerification'),
  loading: () => null
});
