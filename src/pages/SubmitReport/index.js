import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "SubmitReport" */ './SubmitReport'),
  loading: () => null
});
