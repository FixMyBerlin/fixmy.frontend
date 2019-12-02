import Loadable from 'react-loadable';

export default Loadable({
  loader: () =>
    import(/* webpackChunkName: "PasswordReset" */ './ForgotPassword'),
  loading: () => null
});
