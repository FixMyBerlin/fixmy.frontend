import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import { ImageProps } from './Image';
import InnerImg from './InnerImage';

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
  role = null,
  subtitle = null
}: ImageProps) => (
  <ImageWrapperFull>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      subtitle={subtitle || null}
    />
  </ImageWrapperFull>
);

export default ImageFull;
