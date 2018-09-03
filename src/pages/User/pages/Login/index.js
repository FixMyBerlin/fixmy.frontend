import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Login" */ './Login'),
  loading: () => null
});
