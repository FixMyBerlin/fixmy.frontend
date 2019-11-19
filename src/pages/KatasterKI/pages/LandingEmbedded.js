import React from 'react';
import { Redirect } from 'react-router-dom';

import Store from '~/store';
import { setTOSAccepted, setEmbedded } from '../state';

const LandingEmbedded = () => {
  Store.dispatch(setTOSAccepted(true));
  Store.dispatch(setEmbedded(true));
  return <Redirect to={`${config.routes.katasterKI.profileBase}/1`} />;
};

export default LandingEmbedded;
