import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import FMBLogo from '~/components/FMBLogo';
import Title from '~/components/Title';
import Button from '~/components/Button';
import SocialSharer from '~/components/Social/SocialSharer';
import Text from '~/components/Text';
import GhostButton from '~/components/GhostButton';
import config from '~/config';

import SubscribtionWidget from '../SubscribtionWidget';

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

const FeatureButton = styled(GhostButton)`
  margin-bottom: 10px;
`;

const labels = {
  title: `Hi, das ist ${config.siteTitle}`,
  intro: (
    <>
      Nimm an unserer aktuellen Umfrage teil, dem Berliner Straßencheck. Hier
      kannst du uns sagen, wie die Berliner Straßen sicher für alle werden
      können.
    </>
  ),
  button: 'Worum geht es hier genau?',
  reportsButton: 'Karte der Radbügelmeldungen',
  mapButton: 'Gehe zur Planungskarte',
  katasterButton: 'Umfrage beginnen'
};

export default () => (
  <>
    <FMBLogo />
    <div>
      <Title>{labels.title}</Title>
      <Text>{labels.intro}</Text>
    </div>
    <MapLinkWrapper>
      <a href={config.tspKatasterURL}>
        <BounceButton>{labels.katasterButton}</BounceButton>
      </a>
      <Link to={config.routes.projects}>
        <FeatureButton>{labels.mapButton}</FeatureButton>
      </Link>
      <Link to={config.routes.reports.map}>
        <FeatureButton>{labels.reportsButton}</FeatureButton>
      </Link>
    </MapLinkWrapper>
    <SubscribtionWidget />
    <SocialSharer />{' '}
  </>
);
