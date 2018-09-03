import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Analysis" */ './Analysis'),
  loading: () => null
});
