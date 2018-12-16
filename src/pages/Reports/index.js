import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Reports" */ './Reports'),
  loading: () => null
});
