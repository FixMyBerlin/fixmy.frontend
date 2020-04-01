import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Link from '~/components/Link';

const Anchor = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  display: block;
  text-align: center;
  margin: 1em auto 2em auto;
`;

export default () => (
  <Anchor to={config.routes.reports.map} data-cy="reports-landing-mapLink">
    Schauen Sie sich Meldungen anderer ab
  </Anchor>
);
