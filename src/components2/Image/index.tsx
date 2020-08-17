import React, {
  useRef,
  useState,
  ImgHTMLAttributes,
  useLayoutEffect
} from 'react';
import styled from 'styled-components';
import debug from 'debug';
import { media } from '~/styles/utils';

const log = debug('fmc:components:Image.FadeIn');

export const Insert = styled.img`
  width: 100vw;
  height: auto;
  margin-left: -16px;

  ${media.m`
    width: 100%;
    margin-left: initial;
  `}
`;

const FadeInStyle = styled.img`
  color: transparent;
  opacity: ${(props: { loaded: boolean }) => (props.loaded ? '1' : '0')};
  transition: opacity 300ms ease 0s;
`;

/**
 * This component waits for the image set to be loaded,
 * and then sets the `loaded` property on its child to enable transitioning
 * opacity when the image is loaded.
 */
export const FadeIn = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const elemRef = useRef();
  const [isLoaded, setLoaded] = useState(false);
  useLayoutEffect(() => {
    setLoaded(false);
    const imageLoader = new Image();
    try {
      // @ts-ignore
      imageLoader.src = elemRef?.current?.currentSrc;
      imageLoader.onload = () => setLoaded(true);
    } catch {
      log('Failed setting image load opacity fade');
      setLoaded(true);
    }
    // Typescript complains that this object might be undefined. However, that
    // is the indended effect here. I was not able to find out whether
    // `useEffect` has issues with passing in null through this second parameter.
    // @ts-ignore
  }, [elemRef?.current?.currentSrc]);
  return (
    <FadeInStyle ref={elemRef} loaded={isLoaded} alt={props.alt} {...props} />
  );
};
