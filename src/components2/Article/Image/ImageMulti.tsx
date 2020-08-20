import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import Subtitle from './Subtitle';
import InnerImg from './InnerImage';

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3em -10px;

  ${media.m`
    flex-direction: row;
    margin: 3em -10px;
  `}
`;

const ImageSpacer = styled.div`
  position: relative;
  padding: 10px;
  flex: 1 1 100%;

  .feelsafe {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

const ImageMulti = ({ children }) => <ImageWrapper>{children}</ImageWrapper>;

interface ImageMultiInnerProps {
  source: string;
  alt?: string;
  role?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ImageMultiInner = ({
  source,
  alt,
  role = null,
  children
}: ImageMultiInnerProps) => (
  <ImageSpacer>
    <InnerImg source={source} alt={alt} role={role}>
      {children}
    </InnerImg>
  </ImageSpacer>
);

ImageMulti.Inner = ImageMultiInner;
ImageMulti.Subtitle = Subtitle;

export default ImageMulti;
