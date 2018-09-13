import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "Profil" */ './Profil'),
  loading: () => null
});
