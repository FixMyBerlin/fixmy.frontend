import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./MyHBI'),
  loading: () => null
});
