import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

import Subtitle from './Subtitle';

export interface InnerImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  source: string;
  children?: React.ReactNode;
  subtitle?: string;
  alt?: string;
  role?: string;
  loadingStrategy?: ImgHTMLAttributes<HTMLImageElement>['loading'];
}

const Img = styled.img`
  width: 100%;
`;

const Wrapper = styled.figure`
  margin: 0;
`;

const InnerImg = ({
  source,
  alt,
  role = null,
  subtitle = null,
  children = null,
  loading = 'lazy',
  ...props
}: InnerImageProps) => (
  <Wrapper>
    <Img
      src={source}
      alt={alt || subtitle}
      role={role}
      loading={loading}
      {...props}
    />
    {subtitle && <Subtitle className="inner-img-caption">{subtitle}</Subtitle>}
    {children}
  </Wrapper>
);

export default InnerImg;
