import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import ProjectLike from '~/pages/Map/components/DetailView/ProjectDetail/ProjectLike';
import DetailFooter from '~/pages/Map/components/DetailView/DetailFooter';

const Footer = styled(DetailFooter)`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const DetailsFooter = ({ token, reportId }) => (
  <Footer>
    <ProjectLike
      token={token}
      url={`${config.apiUrl}/reports/${reportId}`}
      id={reportId}
      itemType="Meldung"
    />
  </Footer>
);

export default DetailsFooter;
