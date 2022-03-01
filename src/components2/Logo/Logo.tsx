import React from 'react';
import styled from 'styled-components';
import { FadeInImage } from '~/components2/Image';
import FixMyLogo1 from '~/images/logofmb.png';
import FixMyLogo2 from '~/images/logofmb@2x.png';
import FixMyLogo3 from '~/images/logofmb@3x.png';

const FMBLogoWrapper = styled.div`
  position: relative;
`;

type Props = {
  className?: string;
  width?: number;
};

const FMBLogo: React.FC<Props> = ({ className = null, width = 70 }) => (
  <FMBLogoWrapper className={className}>
    <FadeInImage
      width={width}
      height={width * 1.164556962}
      src={FixMyLogo1}
      srcSet={`${FixMyLogo1} 1x, ${FixMyLogo2} 2x, ${FixMyLogo3} 3x`}
      alt="FixMyBerlin logo"
    />
  </FMBLogoWrapper>
);

export default FMBLogo;
