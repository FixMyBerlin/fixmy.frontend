/* eslint-disable import/prefer-default-export, react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import FeelSafe from '../Article/FeelSafe';

export const Insert = styled.img`
  width: 100vw;
  height: auto;
  margin-left: -16px;

  ${media.m`
    width: 100%;
    margin-left: initial;
  `}
`;

const ImageWrapper = styled.div`
  display: flex;
  margin: -10px;
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

const Img = styled.img`
  width: 100%;
`;

const ImageWrapperFull = styled.div`
  margin: 0 auto;
  position: relative;

  .feelsafe {
    position: absolute;
    top: 12px;
    right: 12px;
  }
`;

const ImageWrapperSimple = styled(ImageWrapperFull)`
  max-width: 520px;
`;

const Subtitle = styled.div`
  color: #999;
  font-size: 12px;
  margin-top: 5px;
  padding: 0 1px;
`;

interface MultiImageProps {
  sources: string[];
  feelsafes?: number[];
  subtitles?: string[];
}
interface ImageProps {
  source: string;
  feelsafe?: number;
  subtitle?: string;
}

const InnerImg = ({ source, feelsafe = null, subtitle = null }: ImageProps) => (
  <>
    <Img src={source} />
    {feelsafe && <FeelSafe value={feelsafe} />}
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </>
);

export const ImageMulti = ({
  sources,
  feelsafes = null,
  subtitles = null
}: MultiImageProps) => {
  return (
    <ImageWrapper>
      {sources.map((source, index) => (
        <ImageSpacer key={`multi-image__${index}`}>
          <InnerImg
            source={source}
            feelsafe={feelsafes ? feelsafes[index] : null}
            subtitle={subtitles ? subtitles[index] : null}
          />
        </ImageSpacer>
      ))}
    </ImageWrapper>
  );
};

export const Image = ({
  source,
  feelsafe = null,
  subtitle = null
}: ImageProps) => (
  <ImageWrapperSimple>
    <InnerImg
      source={source}
      feelsafe={feelsafe || null}
      subtitle={subtitle || null}
    />
  </ImageWrapperSimple>
);

export const ImageFull = ({
  source,
  feelsafe = null,
  subtitle = null
}: ImageProps) => (
  <ImageWrapperFull>
    <InnerImg
      source={source}
      feelsafe={feelsafe || null}
      subtitle={subtitle || null}
    />
  </ImageWrapperFull>
);
