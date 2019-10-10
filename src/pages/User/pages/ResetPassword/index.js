import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "PasswordReset" */ './ResetPassword'),
  loading: () => null
});
