import React from 'react';
import styled from 'styled-components';

import InnerImg, { InnerImageProps } from './InnerImage';
import { ImageWrapperFull } from './ImageFull';

const ImageWrapperSimple = styled(ImageWrapperFull)`
  max-width: 520px;
`;

const Image = ({
  source,
  alt,
  role = null,
  subtitle = null,
  ...props
}: InnerImageProps) => (
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

export default Image;
