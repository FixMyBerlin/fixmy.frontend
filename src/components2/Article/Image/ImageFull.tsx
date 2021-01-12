import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import InnerImg, { InnerImageProps } from './InnerImage';

export const ImageWrapperFull = styled.div`
  margin: 0 auto;
  position: relative;

  ${media.m`
    margin: 3em auto;
  `}
`;

export const ImageFull = ({
  source,
  alt,
  className,
  role = null,
  subtitle = null,
  ...props
}: InnerImageProps) => (
  <ImageWrapperFull className={className}>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      subtitle={subtitle || null}
      {...props}
    />
  </ImageWrapperFull>
);

export default ImageFull;
