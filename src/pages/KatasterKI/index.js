/**
 * Entry point used for dynamic loading.
 */
import React from 'react';
import Loadable from 'react-loadable';
import Loader from '~/components/PageLoading';

export default Loadable({
  loader: () => import(/* webpackChunkName: "KatasterKI" */ './KatasterKI'),
  loading: () => <Loader />
});
