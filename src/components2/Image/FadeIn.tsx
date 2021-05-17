import debug from 'debug';
import React, {
  useRef,
  useState,
  ImgHTMLAttributes,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';

const log = debug('fmc:components:Image.FadeIn');

const FadeInStyle = styled.img`
  color: transparent;
  opacity: ${(props: { loaded: boolean }) => (props.loaded ? '1' : '0')};
  transition: opacity 500ms ease 0s;
`;

/**
 * This component waits for the image set to be loaded,
 * and then sets the `loaded` property on its child to enable transitioning
 * opacity when the image is loaded.
 */
const FadeIn = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const elemRef = useRef<HTMLImageElement>();
  const [isLoaded, setLoaded] = useState(true);
  useLayoutEffect(() => {
    // @ts-ignore
    setLoaded(false);
    if (elemRef.current == null) return;
    log('Source changed to', elemRef?.current?.currentSrc);

    const currentSrcSet = elemRef.current.currentSrc;
    if (currentSrcSet) {
      try {
        const imageLoader = new Image();
        imageLoader.src = currentSrcSet;
        imageLoader.onload = () => setLoaded(true);
      } catch {
        setLoaded(true);
      }
    } else {
      // IE11 doesn't support srcset, so we fall back to waiting for the main
      // image source to load
      log('Fall back to observing img.src');
      try {
        elemRef.current.onload = () => setLoaded(true);
      } catch {
        setLoaded(true);
      }
    }
    // Typescript complains that this object might be undefined. However, that
    // is the indended effect here. I was not able to find out whether
    // `useEffect` has issues with passing in null through this second parameter.
    // @ts-ignore
  }, [elemRef.current?.currentSrc]);
  return (
    <FadeInStyle ref={elemRef} loaded={isLoaded} alt={props.alt} {...props} />
  );
};

export default FadeIn;
