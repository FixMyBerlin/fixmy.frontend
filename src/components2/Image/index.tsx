/* eslint-disable import/prefer-default-export, react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

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
`;

const Img = styled.img`
  width: 100%;
`;

export const MultiImage = ({ sources }) => {
  return (
    <ImageWrapper>
      {sources.map((source, index) => (
        <ImageSpacer key={`multi-image__${index}`}>
          <Img src={source} />
        </ImageSpacer>
      ))}
    </ImageWrapper>
  );
};

export const Image = ({ source }) => <MultiImage sources={[source]} />;
