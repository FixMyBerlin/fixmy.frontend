import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import detailWrapped from '~/apps/Map/components/DetailView/detailWrapped';
import HorizontalRuler from '~/pages/Reports/components/HorizontalRuler';
import FMCPropTypes from '~/pages/Reports/propTypes';

import Body from './Body';
import DetailsFooter from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.div`
  padding: 16px 16px 180px 16px;
`;

const ReportImage = styled.img`
  width: 100%;
`;

const ReportDetails = ({ reportItem, token }) => {
  if (typeof reportItem === 'undefined') {
    return null;
  }

  const { id, photo, status } = reportItem;

  return (
    <Wrapper data-cy="reports-detail-panel">
      {photo && photo.src && <ReportImage src={photo.src} />}

      <Main>
        <Header {...reportItem} data-cy="reports-detail-header" />
        <HorizontalRuler className="light " />
        <Body {...reportItem} />
      </Main>

      <DetailsFooter reportId={id} token={token} status={status} />
    </Wrapper>
  );
};

ReportDetails.propTypes = {
  token: PropTypes.string,
  reportItem: FMCPropTypes.report,
};

ReportDetails.defaultProps = {
  token: null,
  reportItem: null,
};

export default detailWrapped(ReportDetails);
