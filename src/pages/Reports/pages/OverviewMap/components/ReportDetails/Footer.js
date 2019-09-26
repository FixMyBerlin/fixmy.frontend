import React from 'react';
import styled from 'styled-components';

import PlanningLike from '~/pages/Map/components/DetailView/PlanningDetail/PlanningLike';
import DetailFooter from '~/pages/Map/components/DetailView/DetailFooter';

// using an invisible item to align the LikeButton in the middle and the share button right using justify-content: space-between;
const Fill = styled.div`
  width: 20%;
  height: 20%;
`;

const Footer = styled(DetailFooter)`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const DetailsFooter = ({ token, reportId }) => (
  <Footer>
    <Fill />
    <PlanningLike
      token={token}
      url={`${config.apiUrl}/reports/${reportId}`}
      id={reportId}
      itemType="Meldung"
    />
    <Fill />
  </Footer>
);

export default DetailsFooter;
