import React from 'react';
import styled from 'styled-components';

import DetailFooter from '~/apps/Map/components/DetailView/DetailFooter';
import ProjectLike from '~/apps/Map/components/DetailView/ProjectDetail/ProjectLike';
import config from '~/pages/Reports/config';
import utils from '~/pages/Reports/utils';

const Footer = styled(DetailFooter)`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: white;
`;

const DetailsFooter = ({ token, reportId, status }) => (
  <Footer>
    <ProjectLike
      token={token}
      url={`${config.apiUrl}/reports/${reportId}`}
      id={reportId}
      itemType={utils.isPlanning({ status }) ? 'Planung' : 'Meldung'}
      data-cy="reports-detail-likes"
    />
  </Footer>
);

export default DetailsFooter;
