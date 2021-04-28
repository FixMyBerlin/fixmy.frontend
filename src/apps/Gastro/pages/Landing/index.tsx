import { Container } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '~/apps/Gastro/components/Header';
import { media } from '~/styles/utils';

import TempelbergLanding from './tempelberg';
import XhainLanding from './xhain';

const StyledContainer = styled(Container)`
  h1 {
    ${media.m`
      font-size: 3em;
    `}
  }

  h2 {
    ${media.m`
      margin: 1.5em auto 1em;
    `}
  }
`;

const Landing = ({ district }) => {
  return (
    <>
      <Header showInfoLink={false} />
      <StyledContainer maxWidth="sm">
        {district?.name === 'xhain' && <XhainLanding />}
        {district?.name === 'tempelberg' && <TempelbergLanding />}
      </StyledContainer>
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Landing);
