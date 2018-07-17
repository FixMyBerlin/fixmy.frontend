import React from 'react';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';

import StyledLink from '~/components/styled/Link';
import ContentOverlay from '~/components/styled/ContentOverlay';
import FMBLogo from '~/components/FMBLogo';
import Headline from '~/components/styled/Headline';
import MenuButton from '~/components/MenuButton';
import SocialSharer from '~/components/Social/SocialSharer';
import Text from '~/components/styled/Text';
import Button from '~/components/styled/Button';

import SubscribtionWidget from '~/components/SubscribtionWidget';

const HomeContent = styled.div`
  text-align: center;
  padding: 3rem 1.5rem 0 1.5rem;
  max-width: 620px;
  margin: 0 auto;
`;

// const NewsletterForm = styled.form`
//   padding: 1rem;
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const NewsletterSubmitWrapper = styled.div`
//   margin-top: 10px;
// `;

const AboutLinkWrapper = styled.div`
  margin: 10px 40px;
  font-size: 14px;
`;

const MapButton = styled(Button)`
  margin-top: 20px;
  a {
    text-decoration: none;
    color: white;
    font-weight: 500;
  }
`;

export default () => (
  <ContentOverlay>
    <MenuButton />
    <HomeContent>
      <FMBLogo />
      <div>
        <Headline>Hi, das ist FixMyBerlin</Headline>
        <Text>Wir wollen, dass Berlin eine richtig gute Fahrradstadt wird. Hier siehst du bald, was dafür geplant wird. Trage dich für Updates zum Newsletter ein.</Text>
      </div>
      <MapButton>
        <Link to="/zustand">Karte anzeigen</Link>
      </MapButton>
      <AboutLinkWrapper>
        <StyledLink to="/info">Worum geht es hier genau?</StyledLink>
      </AboutLinkWrapper>

      <SubscribtionWidget />
      <SocialSharer />
    </HomeContent>
  </ContentOverlay>
);
