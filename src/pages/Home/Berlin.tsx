import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import FMBLogo from '~/components2/Logo';
import Button from '~/components2/Button';
import Link from '~/components2/Link';
import SocialSharer from '~/components/Social/SocialSharer';
import NewsletterWidget from '~/components2/NewsletterWidget';
import config from '~/config';
import { media } from '~/styles/utils';
import { toggle as toggleMenu } from '~/AppState';
import { RootState } from '~/store';
import FacebookIcon from '~/images/button-social-facebook.svg';
import TwitterIcon from '~/images/button-social-twitter.svg';

const CTAWrapper = styled.div`
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 3rem auto 1rem;
  line-height: 2.5rem;
  font-weight: 700;
  font-family: '${config.titleFont}', serif;
  color: ${config.colors.darkbg}
`;

const SubTitle = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${config.colors.darkgrey};
`;

const NewsletterWrapper = styled.div`
  max-width: 280px;
  margin: 0 auto;
`;

const MainButton = styled(Button)`
  width: 280px;
  word-break: break-word;
  margin-top: 20px; // >= size of button drop shadow
  hyphens: none;
  ${media.s`
    width: 280px;
    word-break: break-word;
    hyphens: none;
  `}
`;

const SecondaryButton = styled(MainButton)`
  background-color: white;
  // font-weight: 600;
  // border: none;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
  margin-top: 1em;
`;

const SocialWrapper = styled.div`
  margin: 1em auto;
`;

const FacebookButton = styled(FacebookIcon)`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;
`;
const TwitterButton = styled(TwitterIcon)`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;
`;

export default () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(
    (state: RootState) => state.AppState.isMenuOpen
  );
  return (
    <>
      <FMBLogo width={88} />
      <TitleWrapper>
        <Title>
          <FormattedMessage
            id="home.title"
            defaultMessage="Hi, das ist {siteName}"
            values={{ siteName: config.siteTitle }}
          />
        </Title>
        <SubTitle>
          <FormattedMessage
            id="home.subTitle"
            defaultMessage="Wir wollen, dass Berlin eine richtig gute Fahrradstadt wird. Auf der Karte mit den Planungen sieht du, was Berlin dafür plant."
          />
        </SubTitle>
      </TitleWrapper>
      <CTAWrapper>
        <RouterLink to={config.routes.projects}>
          <MainButton>
            <FormattedMessage
              id="home.mapButton"
              defaultMessage="Gehe zur Karte"
            />
          </MainButton>
        </RouterLink>
        <RouterLink to={config.routes.research.survey}>
          <SecondaryButton ghost flat>
            <FormattedMessage
              id="home.researchButton"
              defaultMessage="Ergebnisse der Straßencheck-Umfrage"
            />
          </SecondaryButton>
        </RouterLink>
        <StyledLink
          internal
          onClick={(ev) => {
            ev.preventDefault();
            dispatch(toggleMenu());
          }}
          role="button"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          tabIndex={0}
          href={null}
        >
          Weitere Projekte
        </StyledLink>
      </CTAWrapper>
      <NewsletterWrapper>
        <NewsletterWidget height={120} />
      </NewsletterWrapper>
      <SocialWrapper>
        <a
          href="https://www.facebook.com/FixMyCityApp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookButton />
        </a>
        <a
          href="https://twitter.com/fixmyberlin"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterButton />
        </a>
      </SocialWrapper>
    </>
  );
};
