import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

import { homeLabels } from '~/labels';
// import StyledLink from '~/components/Link';
import ContentOverlay from '~/components/ContentOverlay';
import FMBLogo from '~/components/FMBLogo';
import Title from '~/components/Title';
import MenuButton from '~/components/MenuButton';
import Button from '~/components/Button';
import SocialSharer from '~/components/Social/SocialSharer';
import Text from '~/components/Text';

import SubscribtionWidget from '~/pages/Home/components/SubscribtionWidget';
import bgImage from '~/images/background.jpg';

const HomeContent = styled.div`
  text-align: center;
  padding: 3rem 1.5rem 0 1.5rem;
  max-width: 620px;
  margin: 0 auto;
`;

// const AboutLinkWrapper = styled.div`
//   margin: 10px 40px;
//   font-size: 14px;
// `;

const MapLinkWrapper = styled.div`
  margin: 10px;
`;

// const MapButton = styled(Button)`
//   margin-top: 20px;
//   a {
//     text-decoration: none;
//     color: white;
//     font-weight: 500;
//   }
// `;

const BackgroundMap = styled.div`
  height: 100%;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center center;
`;

export default () => (
  <Fragment>
    <ContentOverlay>
      <MenuButton />
      <HomeContent>
        <FMBLogo />
        <div>
          <Title>{homeLabels.title}</Title>
          <Text>{homeLabels.intro}</Text>
        </div>
        <MapLinkWrapper>
          <Link to="/planungen">
            <Button>{homeLabels.mapButton}</Button>
          </Link>
        </MapLinkWrapper>
        <SubscribtionWidget />
        <SocialSharer />
      </HomeContent>
    </ContentOverlay>
    <BackgroundMap />
  </Fragment>
);
