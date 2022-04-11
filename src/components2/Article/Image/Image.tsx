import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';
import { InnerImageProps, InnerImg } from './InnerImage';

const ImageWrapperSimple = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 518px;
  ${media.m`
    margin: 3em auto;
  `}
  ${media.l`
    max-width: 598px;
  `}
`;

export const Image: React.FC<InnerImageProps> = ({
  source,
  alt,
  role = null,
  subtitle = null,
  ...props
}) => (
  <ImageWrapperSimple>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      subtitle={subtitle || null}
      {...props}
    />
  </ImageWrapperSimple>
);
