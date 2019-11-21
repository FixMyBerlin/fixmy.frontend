import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Store from '~/store';
import { setTOSAccepted } from '../state';
import Flex from '~/components/Flex';

import IconBar from '~/pages/KatasterKI/components/IconBar';
import IntroImgSrc from '~/images/404-weg-zu-ende.jpg';
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
  border-bottom: 2px solid white;
  color: white;
  font-weight: bold;
  font-size: 14px;
  margin: 20px 0 10px 0;
  text-decoration: none;

  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
    color: white;
  }
`;

const onAcceptTOS = (ev) => Store.dispatch(setTOSAccepted(ev.target.checked));

const Landing = ({ isTosAccepted }) => {
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
