import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Store from '~/store';
import { setAGBAccepted } from '../state';
import Button from '~/pages/KatasterKI/components/Button';
import ExternalLink from '~/pages/KatasterKI/components/ExternalLink';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import IntroImgSrc from '~/images/404-weg-zu-ende.jpg';

const IntroHeadline = styled.h1`
  font-family: 'Roboto Slab', serif;
  margin: 0.5em 0;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
`;

const ParagraphWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-bottom: ${(props) => (props.isExpanded ? 0 : '20px')};

  ${(props) =>
    !props.isExpanded &&
    css`
      &:after {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    `}
`;

const ExtendButton = styled.button`
  position: absolute;
  bottom: 0;
  z-index: 2;
  text-decoration: underline;
  width: 100%;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  input {
    margin-right: 10px;
  }
`;

const landingText = `
  Diese Umfrage untersucht: Wie können die Berliner Straßen sicher für
  alle Menschen werden. Wir fragen Sie als Radfahrer, Fußgänger oder
  Autofahrer, wo Sie sicher fühlen und wo nicht. Oder wo Sie Konflikte mit
  anderen Verkehrsteilnehmern sehen. Erklärung längere Erklärung längere
  Erklärunglängere Erklärung längere Erklärunglängere Erklärunglängere Erk der wo Sie Konflikte mit
  anderen Verkehrsteilnehmern sehen. Erklärung längere Erklärung längere
  Erklärunglängere Erklärung längere Erklärunglängere Erklärunglängere Erk der wo Sie Konflikte mit
  anderen Verkehrsteilnehmern sehen. Erklärung längere Erklärung längere
  Erklärunglängere Erklärung längere Erklärunglängere Erklärunglängere Erk
`;

const onAcceptTOS = (ev) => Store.dispatch(setAGBAccepted(ev.target.checked));

const Landing = ({ isAgbAccepted }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleText = isExpanded ? landingText : landingText.slice(0, 300);

  return (
    <>
      <IntroHeadline>Der Straßencheck für Berlin</IntroHeadline>
      <img src={IntroImgSrc} alt="Intro Bild" />
      <ParagraphWrapper isExpanded={isExpanded}>
        <Paragraph>{visibleText}</Paragraph>
        {!isExpanded && (
          <ExtendButton onClick={() => setIsExpanded(true)}>
            Mehr lesen
          </ExtendButton>
        )}
      </ParagraphWrapper>

      <CheckboxWrapper>
        <input
          type="checkbox"
          checked={isAgbAccepted}
          onChange={onAcceptTOS}
          id="check_agb"
        />
        <label htmlFor="check_agb">
          Ich habe die{' '}
          <ExternalLink
            href="https://fixmyberlin.de/datenschutz"
            rel="noopener noreferrer"
            target="_blank"
          >
            Datenschutzerklärung
          </ExternalLink>{' '}
          gelesen und stimme ihr zu
        </label>
      </CheckboxWrapper>
      <ButtonWrapper>
        <Button
          as={Link}
          to={`${config.routes.katasterKI.profileBase}/1`}
          disabled={!isAgbAccepted}
        >
          Umfrage beginnen
        </Button>
      </ButtonWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAgbAccepted: state.KatasterKIState.isAgbAccepted
});

export default connect(mapStateToProps)(Landing);
