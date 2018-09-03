import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Signup" */ './Signup'),
  loading: () => null
});
