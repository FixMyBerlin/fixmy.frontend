import React from 'react';
import styled from 'styled-components';

import InnerImg from './InnerImage';
import { ImageWrapperFull } from './ImageFull';

export interface ImageProps {
  source: string;
  alt?: string; // required for accessibility
  role?: string; // for purely decorative images set alt="" role="presentation"
  subtitle?: string;
}

const ImageWrapperSimple = styled(ImageWrapperFull)`
  max-width: 520px;
`;

const Image = ({ source, alt, role = null, subtitle = null }: ImageProps) => (
  <ImageWrapperSimple>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      subtitle={subtitle || null}
    />
  </ImageWrapperSimple>
);

export default Image;
