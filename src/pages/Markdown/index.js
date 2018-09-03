import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Markdown" */ './Markdown'),
  loading: () => null
});
