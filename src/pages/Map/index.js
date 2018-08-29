import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Map'),
  loading: () => null
});
