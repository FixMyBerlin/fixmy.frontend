import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "MyHBI" */ './MyHBI'),
  loading: () => null
});
