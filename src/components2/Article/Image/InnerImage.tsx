import React from 'react';
import styled from 'styled-components';

import FeelSafe, {
  FeelsafeSize,
  FeelsafeIcon
} from '~/pages/Research/components/FeelSafe';

import { ImageProps } from './Image';
import Subtitle from './Subtitle';

interface InnerImageProps extends ImageProps {
  feelsafeSize?: FeelsafeSize;
  feelsafeIcon?: FeelsafeIcon;
  children?: React.ReactNode;
}

const Img = styled.img`
  width: 100%;
`;

const InnerImg = ({
  source,
  alt,
  role = null,
  feelsafe = null,
  subtitle = null,
  feelsafeSize = 'small',
  feelsafeIcon = 'bike',
  children = null
}: InnerImageProps) => (
  <>
    <Img src={source} alt={alt} role={role} />
    {feelsafe && (
      <FeelSafe value={feelsafe} size={feelsafeSize} icon={feelsafeIcon} />
    )}
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {children}
  </>
);

export default InnerImg;
