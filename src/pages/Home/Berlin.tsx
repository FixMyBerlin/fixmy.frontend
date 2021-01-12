import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import FMBLogo from '~/components2/Logo';
import Button from '~/components2/Button';
import Link from '~/components2/Link';
import NewsletterWidget from '~/components2/NewsletterWidget';
import config from '~/config';
import { media } from '~/styles/utils';
import { toggle as toggleMenu } from '~/AppState';
import { useTypedSelector } from '~/store';
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
  color: ${config.colors.darkbg};
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

const StyledRouterLink = styled(RouterLink)`
  & + & {
    margin-top: 1em;
  }
`;

const SocialWrapper = styled.div`
  margin: 1em auto;
`;

const FacebookButton = styled(FacebookIcon)`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const TwitterButton = styled(TwitterIcon)`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const HomeBerlin = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useTypedSelector((state) => state.AppState.isMenuOpen);
  return (
    <>
      <FMBLogo width={88} />
      <TitleWrapper>
        <Title>Hi, das ist {config.siteTitle}</Title>
        <SubTitle>
          Wir wollen, dass Berlin eine richtig gute Fahrradstadt wird. Auf der
          Karte mit den Planungen sieht du, was Berlin dafür plant.
        </SubTitle>
      </TitleWrapper>
      <CTAWrapper>
        <StyledRouterLink to={config.routes.projects}>
          <MainButton flat>Gehe zur Karte</MainButton>
        </StyledRouterLink>
        <StyledRouterLink to={config.routes.research.survey}>
          <SecondaryButton ghost flat>
            Ergebnisse der Straßencheck-Umfrage
          </SecondaryButton>
        </StyledRouterLink>
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

export default HomeBerlin;
