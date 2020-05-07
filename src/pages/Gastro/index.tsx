import React from 'react';
import { Box, Container } from '@material-ui/core';
import styled from 'styled-components';
import SubscriptionWidget from './components/SubscriptionWidget';
import Header from './components/Header';
import config from '~/config';
import Logo from './components/Logo';
import { Insert as ImageInsert } from '~/components2/Image';
import BackgroundImageA1 from '~/images/spielstrassen/landing-bg.jpg';
import BackgroundImageA2 from '~/images/spielstrassen/landing-bg@2x.jpg';
import BackgroundImageA3 from '~/images/spielstrassen/landing-bg@3x.jpg';

const SignupWrapper = styled(Box)`
  margin: 0 -20px 0 -20px;
`;

const Gastro = () => {
  return (
    <>
      <Header
        title="Gastro Sonderflächen für Friedrichshain-Kreuzberg"
        url={config.routes.gastro.landing}
      />
      <Container maxWidth="md">
        <h1>Erweitern Sie die Außenflächen für Ihre Gastronomie</h1>
        <ImageInsert
          src={BackgroundImageA2}
          srcSet={`${BackgroundImageA1} 450w, ${BackgroundImageA2} 750w, ${BackgroundImageA3} 1125w`}
        />
        <SignupWrapper>
          <SubscriptionWidget url="https://app.mailjet.com/widget/iframe/2YIa/qYV" />
        </SignupWrapper>
        <Logo />
      </Container>
    </>
  );
};

export default Gastro;
