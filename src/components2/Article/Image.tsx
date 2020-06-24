/* eslint-disable import/prefer-default-export, react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import FeelSafe from './FeelSafe';

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

type FeelsafeSize = 'small' | 'big';

interface InnerImageProps extends ImageProps {
  feelsafeSize?: FeelsafeSize;
}

const InnerImg = ({
  source,
  feelsafe = null,
  subtitle = null,
  feelsafeSize = 'small'
}: InnerImageProps) => (
  <>
    <Img src={source} />
    {feelsafe && <FeelSafe value={feelsafe} size={feelsafeSize} />}
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </>
);

interface MultiImageProps {
  sources: string[];
  feelsafes?: number[];
  subtitles?: string[];
}

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

interface ImageProps {
  source: string;
  feelsafe?: number;
  subtitle?: string;
}

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
      feelsafeSize="big"
    />
  </ImageWrapperFull>
);
