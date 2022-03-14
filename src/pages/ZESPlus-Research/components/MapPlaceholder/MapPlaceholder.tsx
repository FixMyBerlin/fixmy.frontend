import React from 'react';
import styled from 'styled-components';
import { ImageFull } from '~/components2/Article';
import { media } from '~/styles/utils';
import PlaceholderImage from './images/default.jpg';
import PlaceholderImageMobile from './images/mobile.jpg';

const Mobile = styled(ImageFull)`
  margin: 1em 0;
  ${media.m`
    display: none;
  `}
`;

const Desktop = styled(ImageFull)`
  display: none;
  ${media.m`
    display: block;
  `}

  ${media.l`
    margin: 2em -5em 0 auto;
    width: calc(100% - 24px + 5em);
  `}

  ${media.xl`
    margin: 2em -5em 2em auto;
    width: calc(100% - 151px + 5em);
  `}
`;

type Props = {
  alt?: string;
  className?: string;
};

export const MapPlaceholder: React.VFC<Props> = ({ alt, className }) => {
  const defaultAlt = 'Platzhalter für ein fehlendes Bild';

  return (
    <>
      <Mobile
        source={PlaceholderImageMobile}
        alt={alt || defaultAlt}
        className={className}
      />
      <Desktop
        source={PlaceholderImage}
        alt={alt || defaultAlt}
        className={className}
      />
    </>
  );
};
