import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import { ImageProps } from './Image';
import InnerImg from './InnerImage';

export const ImageWrapperFull = styled.div`
  margin: 0 auto;
  position: relative;

  .feelsafe {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  ${media.m`
    margin: 3em auto;
  `}
`;

export const ImageFull = ({
  source,
  alt,
  role = null,
  feelsafe = null,
  subtitle = null
}: ImageProps) => (
  <ImageWrapperFull>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      feelsafe={feelsafe || null}
      subtitle={subtitle || null}
      feelsafeSize="big"
    />
  </ImageWrapperFull>
);

export default ImageFull;
