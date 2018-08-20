import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FixMyLogo from '~/images/logofmb@2x.png';
import BetaIcon from '~/images/beta.svg';

const FMBLogoWrapper = styled.div`
  position: relative;
`;

const StyledBetaIcon = styled(BetaIcon).attrs({
  width: 60
})`
  transform: rotate(-4deg);
  position: absolute;
  top: -18px;

  #Rectangle-6 {
    fill: ${config.colors.darkgrey};
  }
`;

const FMBLogo = props => (
  <FMBLogoWrapper className={props.className}>
    {props.showBetaIcon && <StyledBetaIcon />}
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
