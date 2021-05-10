import queryString from 'query-string';
import React from 'react';
import { Redirect, Link, matchPath } from 'react-router-dom';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import fixMyLogoSrc from '~/images/logofmb@2x.png';
import TspLogo from '~/images/strassencheck/tsp-logo.svg';
import Button from '~/pages/KatasterKI/components/Button';
import ExternalLink from '~/pages/KatasterKI/components/ExternalLink';
import config from '~/pages/KatasterKI/config';
import Store from '~/store';
import { media, isSmallScreen } from '~/styles/utils';

import { setEmbedded } from '../state';

const labelsBerlin = {
  headline: 'Der Berliner Straßencheck',
  teaser:
    'Wie können die Berliner Straßen sicher für alle werden? Sagen Sie es uns!',
  calltoaction: 'Infos und Hintergründe zum Projekt auf tagesspiegel.de',
};

const labelsNational = {
  headline: 'Der große Straßencheck',
  teaser: 'Wie können die Straßen sicher für alle werden? Sagen Sie es uns!',
  calltoaction: 'Infos und Hintergründe zum Projekt auf tagesspiegel.de',
};

const Wrapper = styled.div`
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  font-size: 12px;
  color: white;
  flex-direction: column;
  width: 150px;
  margin: 0 auto;
  align-items: center;
  position: relative;

  svg {
    margin-top: 10px;
    width: 100%;
  }

  ${media.m`
    width: 200px;
  `}
`;

const FixMyLogoWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  display: flex;
  align-items: center;
`;

const FixMyLabel = styled.div`
  display: none;

  ${media.m`
    color: white;
    font-size: 20px;
    margin-left: 10px;
    display: block;
    line-height: 1;
    position: relative;
    top: -4px;
  `}
`;

const FixMyImage = styled.img.attrs({ src: fixMyLogoSrc })`
  &&& {
    width: 47px;
  }

  ${media.m`
    &&& {
      width: 60px;
    }
  `}
`;

const BottomContainer = styled.div`
  max-width: 650px;
  width: 100%;
  margin: auto auto 0 auto;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
`;

const TeaserText = styled.div`
  text-align: center;
  color: white;
  font-weight: 700;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  font-size: 22px;
`;

const Headline = styled.h1`
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  margin: 16px 0;
  text-align: center;
  color: white;
  text-shadow: 0 0 12px rgba(15, 15, 15, 0.7);
  font-size: 42px;

  ${media.m`
    font-size: 60px;
  `}
`;

const TOCWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TOCText = styled.div`
  width: 100%;
  max-width: 500px;
  color: white;
  font-size: 14px;
  margin-top: 15px;
  font-family: FranklinGothicFS-Med, sans-serif;

  a,
  a:visited,
  a:focus,
  a:active {
    color: white;
  }
`;

const CallToActionWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

const CallToActionLink = styled.a`
  color: white;
  font-size: 16px;
  margin: 20px 0 20px 0;
  text-align: center;
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  font-weight: 500;

  &:hover,
  &:active,
  &:visited {
    color: white;
  }
`;

const AttributionLabel = styled.span`
  position: absolute;
  right: 1em;
  bottom: 1em;
  font-size: 10px;
  color: #0f0f0f;

  ${media.m`
    & {
      font-size: 14px;
    }
  `}
`;

const CallToAction = ({ labels }) => (
  <CallToActionWrapper>
    <CallToActionLink target="_blank" href={config.tspKatasterURL}>
      {labels.calltoaction}
    </CallToActionLink>
    <AttributionLabel>Illustration: Martin Baaske</AttributionLabel>
  </CallToActionWrapper>
);

const TOC = () => (
  <TOCWrapper>
    <Button
      as={Link}
      to={`${config.routes.katasterKI.profileBase}/1`}
      data-cy="kat-start-survey-btn"
    >
      Umfrage beginnen
    </Button>
    <TOCText>
      Die Umfrage wird von FixMyBerlin durchgeführt. Ergebnisse werden
      ausschließlich anonymisiert gespeichert. Zur{' '}
      <ExternalLink
        href="https://fixmyberlin.de/datenschutz"
        rel="noopener noreferrer"
        target="_blank"
      >
        Datenschutzerklärung
      </ExternalLink>
    </TOCText>
  </TOCWrapper>
);

/**
 * Check whether an `embedded` query parameter is set and enable embedded mode
 *
 * If the query parameter is set as in `/?embedded`, the Ts and Ps  are set to be
 * agreed to and the user is routed directly into the survey.
 */
const checkEmbeddedParam = (value) => {
  const params = queryString.parse(value);
  if (Object.keys(params).indexOf('embedded') > -1) {
    Store.dispatch(setEmbedded(true));
    return true;
  }
  return false;
};

const Landing = ({ location }) => {
  if (checkEmbeddedParam(location.search)) {
    return <Redirect to={`${config.routes.katasterKI.profileBase}/1`} />;
  }

  const isMobile = isSmallScreen();

  const isNationalVersion = matchPath(window.location.pathname, {
    path: config.routes.katasterKI?.landingNational,
    exact: true,
  });

  const labels = isNationalVersion ? labelsNational : labelsBerlin;

  const renderMobileMarkup = () => (
    <>
      <Headline>{labels.headline}</Headline>
      <BottomContainer>
        <TeaserText>{labels.teaser}</TeaserText>
        <TOC />
        <CallToAction labels={labels} />
      </BottomContainer>
    </>
  );

  const renderDesktopMarkup = () => (
    <>
      <CenterContainer>
        <Headline>{labels.headline}</Headline>
        <TeaserText>{labels.teaser}</TeaserText>
        <TOC />
      </CenterContainer>
      <BottomContainer>
        <CallToAction labels={labels} />
      </BottomContainer>
    </>
  );

  return (
    <>
      <Wrapper>
        <Header>
          <TspLogo />
        </Header>

        <FixMyLogoWrapper>
          <FixMyImage />
          <FixMyLabel>FixMyBerlin</FixMyLabel>
        </FixMyLogoWrapper>

        {isMobile ? renderMobileMarkup() : renderDesktopMarkup()}
      </Wrapper>
    </>
  );
};

export default Landing;
