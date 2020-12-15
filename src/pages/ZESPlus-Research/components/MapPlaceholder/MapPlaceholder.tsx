import React from 'react';
import styled from 'styled-components';
import { ImageFull } from '~/components2/Article';
import { media } from '~/styles/utils';

import PlaceholderImage from './assets/default.jpg';
import PlaceholderImageMobile from './assets/mobile.jpg';

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
`;

const defaultAlt = 'Platzhalter für ein fehlendes Bild';

interface Props {
  alt?: string;
  className?: string;
}

const MapPlaceholder = ({ alt, className }: Props) => (
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

export default MapPlaceholder;
