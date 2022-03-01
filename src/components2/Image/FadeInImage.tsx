import debug from 'debug';
import React, {
  ImgHTMLAttributes,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

const log = debug('fmc:components:FadeInImage');

const StyledFadeInImage = styled.img`
  color: transparent;
  opacity: ${(props: { loaded: boolean }) => (props.loaded ? '1' : '0')};
  transition: opacity 500ms ease 0s;
`;

/**
 * This component waits for the image set to be loaded,
 * and then sets the `loaded` property on its child to enable transitioning
 * opacity when the image is loaded.
 */
export const FadeInImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const elemRef = useRef<HTMLImageElement>();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(false);
    if (elemRef.current == null) return;

    log('Source changed to', elemRef?.current?.currentSrc);
    const currentSrcSet = elemRef.current.currentSrc;
    if (currentSrcSet) {
      try {
        const imageLoader = new Image();
        imageLoader.src = currentSrcSet;
        imageLoader.onload = () => setLoading(true);
      } catch {
        setLoading(true);
      }
    } else {
      // IE11 doesn't support srcset, so we fall back to waiting for the main
      // image source to load
      log('Fall back to observing img.src');
      try {
        elemRef.current.onload = () => setLoading(true);
      } catch {
        setLoading(true);
      }
    }
  }, [elemRef]);

  return (
    <StyledFadeInImage
      ref={elemRef}
      loaded={loading}
      alt={props.alt}
      {...props}
    />
  );
};
