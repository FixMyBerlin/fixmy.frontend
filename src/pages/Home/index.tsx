import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { MenuButton } from '~/components2/MenuButton';
import config from '~/config';
import { media } from '~/styles/utils';

import Background from './Background';
import Berlin from './Berlin';

const ContentOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledMenuButton = styled(MenuButton)`
  // Override material ui by increasing specificity
  && {
    position: absolute;
    top: 0
    left: 0;
    margin: 1rem;

    ${media.m`
    margin: 1.875rem 0 0 2.5rem;
  `}
  }
`;

const HomeContent = styled.div`
  text-align: center;
  padding: 5rem 1.5rem 0 1.5rem;
  max-width: 512px;
  margin: 0 auto;
`;

let content: ReactNode;
if (config.region === 'berlin') {
  content = <Berlin />;
} else if (config.region === 'aachen') {
  content = <Redirect to={config.routes.reports.landing} />;
} else {
  content = (
    <>
      <h1>Seite im Aufbau</h1>
      <p>Diese Seite wird eingerichtet und steht hier bald zur Verfügung.</p>
    </>
  );
}

const Home = () => (
  <>
    <ContentOverlay>
      <StyledMenuButton />
      <HomeContent>{content}</HomeContent>
    </ContentOverlay>
    <Background />
  </>
);

export default Home;
