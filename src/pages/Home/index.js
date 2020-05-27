import React from 'react';
import styled from 'styled-components';
import MenuButton from '~/components/MenuButton';
import ContentOverlay from '~/components/ContentOverlay';
import bgImage from '~/images/background.jpg';

import config from '~/config';

import Berlin from './berlin';
import Aachen from './aachen';

const HomeContent = styled.div`
  text-align: center;
  padding: 3rem 1.5rem 0 1.5rem;
  max-width: 620px;
  margin: 0 auto;
`;

const BackgroundMap = styled.div`
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center center;
`;

let content;
if (config.region === 'berlin') {
  content = <Berlin />;
} else if (config.region === 'aachen') {
  content = <Aachen />;
} else {
  content = (
    <>
      <h1>Seite im Aufbau</h1>
      <p>Diese Seite wird eingerichtet und steht hier bald zur Verfügung.</p>
    </>
  );
}

export default () => (
  <>
    <ContentOverlay>
      <MenuButton />
      <HomeContent>{content}</HomeContent>
    </ContentOverlay>
    <BackgroundMap />
  </>
);
