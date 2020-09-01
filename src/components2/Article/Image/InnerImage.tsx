import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

import Subtitle from './Subtitle';

export interface InnerImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  source: string;
  children?: React.ReactNode;
  subtitle?: string;
  alt?: string;
  role?: string;
}

const Img = styled.img`
  width: 100%;
`;

const InnerImg = ({
  source,
  alt,
  role = null,
  subtitle = null,
  children = null,
  ...props
}: InnerImageProps) => (
  <>
    <Img src={source} alt={alt} role={role} {...props} />
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {children}
  </>
);

export default InnerImg;
