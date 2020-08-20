import React from 'react';
import styled from 'styled-components';

import { FeelsafeIcon } from '~/pages/Research/components/FeelSafe';

import InnerImg from './InnerImage';
import { ImageWrapperFull } from './ImageFull';

export interface ImageProps {
  source: string;
  alt?: string; // required for accessibility
  role?: string; // for purely decorative images set alt="" role="presentation"
  feelsafe?: number;
  feelsafeIcon?: FeelsafeIcon;
  subtitle?: string;
}

const ImageWrapperSimple = styled(ImageWrapperFull)`
  max-width: 520px;
`;

const Image = ({
  source,
  alt,
  role = null,
  feelsafe = null,
  subtitle = null
}: ImageProps) => (
  <ImageWrapperSimple>
    <InnerImg
      source={source}
      alt={alt}
      role={role}
      feelsafe={feelsafe || null}
      subtitle={subtitle || null}
    />
  </ImageWrapperSimple>
);

export default Image;
