import React from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from '~/apps/Gastro/components/Header';
import { media } from '~/styles/utils';

import XHainLanding from './xhain';
import TempelbergLanding from './tempelberg';

const StyledContainer = styled(Container)`
  h1 {
    ${media.m`
      font-size: 3em;
    `}
  }
`;

const Landing = ({ district }) => {
  return (
    <>
      <Header showInfoLink={false} />
      <StyledContainer maxWidth="sm">
        {district?.name === 'xhain' && <XHainLanding />}
        {district?.name === 'tempelberg' && <TempelbergLanding />}
      </StyledContainer>
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(Landing);
