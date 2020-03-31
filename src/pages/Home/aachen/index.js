import React from 'react';
import { Redirect } from 'react-router-dom';

import config from '~/config';

export default () => <Redirect to={config.routes.reports.index} />;
