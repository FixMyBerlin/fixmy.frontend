import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import config from '~/config';
import { homeLabels } from '~/labels';
import ContentOverlay from '~/components/ContentOverlay';
import FMBLogo from '~/components/FMBLogo';
import Title from '~/components/Title';
import MenuButton from '~/components/MenuButton';
import Button from '~/components/Button';
import SocialSharer from '~/components/Social/SocialSharer';
import Text from '~/components/Text';
import GhostButton from '~/components/GhostButton';

import SubscribtionWidget from '~/pages/Home/components/SubscribtionWidget';
import bgImage from '~/images/background.jpg';

const HomeContent = styled.div`
  text-align: center;
  padding: 3rem 1.5rem 0 1.5rem;
  max-width: 620px;
  margin: 0 auto;
`;

const MapLinkWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    display: block;
    text-decoration: none;
  }

  button {
    width: 250px;
  }
`;

const BackgroundMap = styled.div`
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center center;
`;

const bounce = keyframes`
  0% {
      transform: translateY(0);
  }
  5% {
      transform: translateY(5%);
  }
  10% {
      transform: translateY(0%);
  }
  15% {
    transform: translateY(0%);
  }
  20% {
      transform: translateY(5%);
  }
  25% {
      transform: translateY(0);
  }
`;

const BounceButton = styled(Button)`
  font-weight: 700;
  margin: 16px 0 10px 0;
  animation: ${bounce} 4s ease-in infinite;
`;

export default () => (
  <>
    <ContentOverlay>
      <MenuButton />
      <HomeContent>
        <FMBLogo />
        <div>
          <Title>{homeLabels.title}</Title>
          <Text>{homeLabels.intro}</Text>
        </div>
        <MapLinkWrapper>
          <a href={config.katasterKI.tspArticleLink}>
            <BounceButton>{homeLabels.katasterButton}</BounceButton>
          </a>
          <Link to={config.routes.projects}>
            <GhostButton>{homeLabels.mapButton}</GhostButton>
          </Link>
        </MapLinkWrapper>
        <SubscribtionWidget />
        <SocialSharer />
      </HomeContent>
    </ContentOverlay>
    <BackgroundMap />
  </>
);
