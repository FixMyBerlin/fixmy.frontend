import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./WebglMap'),
  loading: () => null
});
