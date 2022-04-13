import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';
import { InnerImageProps, InnerImg } from './InnerImage';
import { Subtitle } from './Subtitle';

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

type ImageMultiProps = React.FC & {
  Inner: React.FC<InnerImageProps>;
  Subtitle: React.FC;
};

export const ImageMulti: ImageMultiProps = ({ children }) => (
  <ImageWrapper>{children}</ImageWrapper>
);

const Inner: React.FC<InnerImageProps> = ({ children, ...props }) => (
  <ImageSpacer>
    <InnerImg {...props}>{children}</InnerImg>
  </ImageSpacer>
);

// <ImageMulti.Inner {...props}>{children}</ImageMulti.Inner>
ImageMulti.Inner = Inner;
ImageMulti.Subtitle = Subtitle;
