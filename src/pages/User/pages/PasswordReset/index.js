import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./PasswordReset'),
  loading: () => null
});
