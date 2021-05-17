import React from 'react';
import styled from 'styled-components';

import { FadeIn } from '~/components2/Image';
import config from '~/config';
import FixMyLogo1 from '~/images/logofmb.png';
import FixMyLogo2 from '~/images/logofmb@2x.png';
import FixMyLogo3 from '~/images/logofmb@3x.png';

import BetaIcon from './images/beta.svg';

const FMBLogoWrapper = styled.div`
  position: relative;
`;

const StyledBetaIcon = styled(BetaIcon).attrs(() => ({ width: 60 }))`
  transform: rotate(-4deg);
  position: absolute;
  top: -18px;

  #Rectangle-beta-6 {
    fill: ${config.colors.darkgrey};
  }
`;

type Props = {
  className?: string;
  showBetaIcon?: boolean;
  width?: number;
};

const FMBLogo = ({
  className = null,
  showBetaIcon = false,
  width = 70,
}: Props) => (
  <FMBLogoWrapper className={className}>
    {showBetaIcon && <StyledBetaIcon alt="beta!" role="img" />}
    <FadeIn
      width={width}
      height={width * 1.164556962}
      src={FixMyLogo1}
      srcSet={`${FixMyLogo1} 1x, ${FixMyLogo2} 2x, ${FixMyLogo3} 3x`}
      alt="FixMyBerlin logo"
    />
  </FMBLogoWrapper>
);

export default FMBLogo;
