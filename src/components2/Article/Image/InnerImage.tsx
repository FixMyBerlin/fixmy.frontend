import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Subtitle } from './Subtitle';

export type InnerImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  source: string;
  children?: React.ReactNode;
  subtitle?: string;
  alt?: string;
  role?: string;
  loadingStrategy?: ImgHTMLAttributes<HTMLImageElement>['loading'];
};

const Img = styled.img`
  width: 100%;
`;

const Wrapper = styled.figure`
  margin: 0;
`;

export const InnerImg: React.FC<InnerImageProps> = ({
  source,
  alt,
  role = null,
  subtitle = null,
  children = null,
  loading = 'lazy',
  ...props
}) => (
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
