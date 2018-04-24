import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ContentOverlay from '~/components/ContentOverlay';
import FMBLogo from '~/components/FMBLogo';
import Headline from '~/components/Headline';
import MenuButton from '~/components/MenuButton';
import SocialButtons from '~/components/SocialButtons';
import Button from '~/components/Button';
import Text from '~/components/Text';
import Input from '~/components/Input';

const HomeContent = styled.div`
  text-align: center;
  padding: 3rem 2rem 0 2rem;
  max-width: 620px;
  margin: 0 auto;
`;

const NewsletterForm = styled.form`
  padding: 1rem;
`;

const NewsletterSubmitWrapper = styled.div`
  margin-top: 10px;
`;

const AboutLinkWrapper = styled.div`
  margin-top: 30px;
  font-size: 14px;
`;

const SocialWrapper = styled.div`
  margin-top: 50px;
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
      <NewsletterForm>
        <Input type="text" placeholder="Deine Emailadresse" />
        <NewsletterSubmitWrapper>
          <Button type="submit">Newsletter abonnieren</Button>
        </NewsletterSubmitWrapper>
      </NewsletterForm>
      <AboutLinkWrapper>
        <Link to="/info">Worum geht es hier genau?</Link>
      </AboutLinkWrapper>
      <SocialWrapper>
        <SocialButtons />
      </SocialWrapper>
    </HomeContent>
  </ContentOverlay>
);
