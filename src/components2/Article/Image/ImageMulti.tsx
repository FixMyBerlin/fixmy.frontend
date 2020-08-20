import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import Subtitle from './Subtitle';
import InnerImg, { InnerImageProps } from './InnerImage';

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
`;

const ImageMulti = ({ children }) => <ImageWrapper>{children}</ImageWrapper>;

interface ImageMultiInnerProps extends InnerImageProps {
  children: React.ReactNode | React.ReactNode[];
}

const ImageMultiInner = ({ children, ...props }: ImageMultiInnerProps) => (
  <ImageSpacer>
    <InnerImg {...props}>{children}</InnerImg>
  </ImageSpacer>
);

ImageMulti.Inner = ImageMultiInner;
ImageMulti.Subtitle = Subtitle;

export default ImageMulti;
