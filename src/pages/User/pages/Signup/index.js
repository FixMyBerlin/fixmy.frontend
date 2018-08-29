import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Signup'),
  loading: () => null
});
