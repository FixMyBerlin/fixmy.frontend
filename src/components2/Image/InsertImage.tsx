import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';
import { AnchorLink } from '../Link';

export const StyledImage = styled.img`
  width: 100vw;
  height: auto;
  margin-left: -16px;
  max-width: 100%;

  ${media.m`
    width: 100%;
    margin-left: initial;
  `}
`;

const StyledAttribution = styled.div`
  font-size: 0.75em;
  margin-top: -2.5em;
  position: relative;
  float: right;
  right: 1em;
  z-index: 9999;

  && a {
    color: white;
    text-decoration: none;
  }
`;

// When attributionLink is given, attributionText is required.
type Props =
  | React.ImgHTMLAttributes<HTMLImageElement> &
      (
        | {
            attributionLink: `https://${string}`;
            attributionText: string;
          }
        | {
            attributionLink?: never;
            attributionText?: string;
          }
      );

export const InsertImage: React.FC<Props> = ({
  attributionText,
  attributionLink,
  ...imageProps
}) => {
  const attibution = attributionLink ? (
    <AnchorLink href={attributionLink}>{attributionText}</AnchorLink>
  ) : (
    attributionText
  );

  return (
    <>
      <StyledImage {...imageProps} />
      {attibution && <StyledAttribution>{attibution}</StyledAttribution>}
    </>
  );
};
