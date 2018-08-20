import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FixMyLogo from '~/images/logofmb@2x.png';

const FMBLogoWrapper = styled.div``;

const FMBLogo = props => (
  <FMBLogoWrapper className={props.className}>
    <img width={props.width} src={FixMyLogo} alt="logo" />
  </FMBLogoWrapper>
);

FMBLogo.propTypes = {
  width: PropTypes.number
};

FMBLogo.defaultProps = {
  width: 70
};

export default FMBLogo;
