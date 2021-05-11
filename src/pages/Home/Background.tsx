import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import bgImage from '~/images/home-bg.jpg';
import bgImage2 from '~/images/home-bg@2x.jpg';
import bgImage3 from '~/images/home-bg@3x.jpg';

type BGProps = {
  loaded: boolean;
};

const BackgroundMap = styled.div`
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center center;
  opacity: ${(props: BGProps) => (props.loaded ? 1 : 0)};
  transition: opacity 500ms ease 0s;

  @media (-webkit-min-device-pixel-ratio: 2) or (min-resolution: 192dpi) {
    background-image: url(${bgImage2});
  }

  @media (-webkit-min-device-pixel-ratio: 3) or (min-resolution: 288dpi) {
    background-image: url(${bgImage3});
  }
`;

/**
 * This component waits for the image set as `background-image` to be loaded,
 * and then sets the `loaded` property on its child to enable transitioning
 * opacity when the image is loaded.
 */
const Background = ({ onLoad }: { onLoad?: () => any }) => {
  const elemRef = useRef();
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    const imageLoader = new Image();
    try {
      imageLoader.src = window
        .getComputedStyle(elemRef.current)
        .backgroundImage.slice(5, -2); // remove 'url()' wrapper
    } catch {
      setLoaded(true);
    }
    imageLoader.onload = () => {
      setLoaded(true);
      if (onLoad) onLoad();
    };
  }, []);
  return <BackgroundMap ref={elemRef} loaded={isLoaded} />;
};

export default Background;
