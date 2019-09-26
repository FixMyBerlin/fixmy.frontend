import React from 'react';
import styled from 'styled-components';

import PlanningLike from '~/pages/Map/components/DetailView/PlanningDetail/PlanningLike';
import DetailFooter from '~/pages/Map/components/DetailView/DetailFooter';

const Footer = styled(DetailFooter)`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const DetailsFooter = ({ token, reportId }) => (
  <Footer>
    <PlanningLike
      token={token}
      url={`${config.apiUrl}/reports/${reportId}`}
      id={reportId}
      itemType="Meldung"
    />
  </Footer>
);

export default DetailsFooter;
