import React from 'react';
import styled from 'styled-components';

import { ImageProps } from './Image';
import Subtitle from './Subtitle';

interface InnerImageProps extends ImageProps {
  children?: React.ReactNode;
}

const Img = styled.img`
  width: 100%;
`;

const InnerImg = ({
  source,
  alt,
  role = null,
  subtitle = null,
  children = null
}: InnerImageProps) => (
  <>
    <Img src={source} alt={alt} role={role} />
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {children}
  </>
);

export default InnerImg;
