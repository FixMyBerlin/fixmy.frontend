import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';

import { media, isSmallScreen } from '~/styles/utils';
import Store from '~/store';
import { setTOSAccepted, setEmbedded } from '../state';
import Flex from '~/components/Flex';

import TOCCheckbox from '~/pages/KatasterKI/components/TOCCheckbox';
import TspLogo from '~/images/strassencheck/tsp-logo.svg';
import fixMyLogoSrc from '~/images/logofmb@2x.png';

const labels = {
  headline: 'Der Berliner Straßencheck',
  teaser:
    'Wie können die Berliner Straßen sicher für alle werden? Sagen Sie es uns!',
  calltoaction: 'Infos und Hintergründe zum Projekt auf tagesspiegel.de'
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
`;

const FixMyImage = styled.img.attrs({ src: fixMyLogoSrc })`
  &&& {
    width: 36px;
    position: absolute;
    transform: translate(-100%, 0);
    left: -10px;
    top: 10px;
  }
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
  font-family: 'FranklinGothic-Demi', sans-serif;
  margin: 16px 0;
  text-align: center;
  color: white;
  text-shadow: 0 0 12px rgba(15, 15, 15, 0.7);
  font-size: 42px;

  ${media.m`
    font-size: 60px;
  `}
`;

const CallToActionWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

const CallToActionLink = styled.a`
  color: white;
  font-weight: 700;
  font-size: 16px;
  margin: 20px 0 10px 0;
  text-align: center;
  font-family: 'FranklinGothic-Demi', sans-serif;

  &:hover,
  &:active,
  &:visited {
    color: white;
  }
`;

const CallToAction = () => (
  <CallToActionWrapper>
    <CallToActionLink target="_blank" href={config.katasterKI.tspArticleLink}>
      {labels.calltoaction}
    </CallToActionLink>
  </CallToActionWrapper>
);

const onAcceptTOS = (ev) => Store.dispatch(setTOSAccepted(ev.target.checked));

/**
 * Check whether an `embedded` query parameter is set and enable embedded mode
 *
 * If the query parameter is set as in `/?embedded`, the Ts and Ps  are set to be
 * agreed to and the user is routed directly into the survey.
 */
const checkEmbeddedParam = (value) => {
  const params = queryString.parse(value);
  if (Object.keys(params).indexOf('embedded') > -1) {
    Store.dispatch(setTOSAccepted(true));
    Store.dispatch(setEmbedded(true));
    return true;
  }
  return false;
};

const Landing = ({ isTosAccepted, location }) => {
  if (checkEmbeddedParam(location.search)) {
    return <Redirect to={`${config.routes.katasterKI.profileBase}/1`} />;
  }

  const isMobile = isSmallScreen();
  const checkBoxLabelColor = isMobile ? config.colors.lightgrey : 'white';

  const renderMobileMarkup = () => (
    <>
      <Headline>{labels.headline}</Headline>
      <BottomContainer>
        <TeaserText>{labels.teaser}</TeaserText>
        <TOCCheckbox
          checked={isTosAccepted}
          onChange={onAcceptTOS}
          labelColor={checkBoxLabelColor}
        />
        <CallToAction />
      </BottomContainer>
    </>
  );

  const renderDesktopMarkup = () => (
    <>
      <CenterContainer>
        <Headline>{labels.headline}</Headline>
        <TeaserText>{labels.teaser}</TeaserText>
        <TOCCheckbox
          checked={isTosAccepted}
          onChange={onAcceptTOS}
          labelColor={checkBoxLabelColor}
        />
      </CenterContainer>
      <BottomContainer>
        <CallToAction />
      </BottomContainer>
    </>
  );

  return (
    <>
      <Wrapper>
        <Header>
          <div>Eine Umfrage von:</div>
          <TspLogo />
          <FixMyImage />
        </Header>
        {isMobile ? renderMobileMarkup() : renderDesktopMarkup()}
      </Wrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted
});

export default connect(mapStateToProps)(Landing);
