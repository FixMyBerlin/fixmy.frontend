import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';

import Store from '~/store';
import { setTOSAccepted, setEmbedded } from '../state';
import Flex from '~/components/Flex';

import IconBar from '~/pages/KatasterKI/components/IconBar';
import IntroImgSrc from '~/images/strassencheck/landing-bg.jpg';
import TOCCheckbox from '~/pages/KatasterKI/components/TOCCheckbox';

const IntroScreen = styled.div`
  background: url(${IntroImgSrc}) no-repeat center center;
  background-size: cover;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const IntroSubline = styled.div`
  color: white;
  font-size: 16px;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
`;

const IntroBottom = styled.div`
  max-width: 650px;
  width: 100%;
  margin: auto auto 0 auto;
`;

const IntroQuestion = styled.div`
  text-align: center;
  color: white;
  font-weight: 700;
`;

const IntroHeadline = styled.h1`
  font-family: 'FranklinGothic-Demi', sans-serif;
  margin: 0.5em 0;
  text-align: center;
  color: white;
`;

const IntroCallToAction = styled.a`
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 20px 0 10px 0;
  text-align: center;

  &:hover,
  &:active,
  &:visited {
    color: white;
  }
`;

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

  return (
    <>
      <IntroScreen>
        <IntroHeadline>Der Straßencheck für Berlin</IntroHeadline>
        <IntroSubline>
          Eine Umfrage für:
          <IconBar />
        </IntroSubline>

        <IntroBottom>
          <IntroQuestion>
            Wie können die Berliner Straßen sicher für alle werden? Sagen Sie es
            uns!
          </IntroQuestion>

          <TOCCheckbox
            checked={isTosAccepted}
            onChange={onAcceptTOS}
            labelColor="white"
          />
          <Flex alignItems="center" justifyContent="center">
            <IntroCallToAction
              target="_blank"
              href={config.katasterKI.tspArticleLink}
            >
              Infos und Hintergründe zum Projekt auf tagesspiegel.de
            </IntroCallToAction>
          </Flex>
        </IntroBottom>
      </IntroScreen>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted
});

export default connect(mapStateToProps)(Landing);
