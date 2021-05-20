import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

import InnerImg, { InnerImageProps } from './InnerImage';
import Subtitle from './Subtitle';

const ImageWrapper = styled.div`
  position: relative;
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
  children?: React.ReactNode | React.ReactNode[];
}

const ImageMultiInner = ({
  children = null,
  ...props
}: ImageMultiInnerProps) => (
  <ImageSpacer>
    <InnerImg {...props}>{children}</InnerImg>
  </ImageSpacer>
);

ImageMulti.Inner = ImageMultiInner;
ImageMulti.Subtitle = Subtitle;

export default ImageMulti;
