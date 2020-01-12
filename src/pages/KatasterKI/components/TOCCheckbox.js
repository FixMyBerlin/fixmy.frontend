import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import config from '~/config';
import { media, isSmallScreen } from '~/styles/utils';
import Checkbox from '~/pages/KatasterKI/components/Checkbox';
import Button from '~/pages/KatasterKI/components/Button';
import ExternalLink from '~/pages/KatasterKI/components/ExternalLink';

const ButtonWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
`;

const CheckboxWrapper = styled.div`
  font-size: 12px;
  margin-top: 10px;
  line-height: 1.3;

  label {
    display: flex;
    color: ${(props) => props.labelColor};
  }

  a,
  a:visited,
  a:focus,
  a:active {
    color: ${(props) => props.labelColor};
  }

  ${media.m`
    display: flex;
    justify-content: center;
  `}
`;

export default (props) => {
  const labelColor = props.labelColor || config.colors.darkbg;
  const TextBreak = isSmallScreen() ? ' ' : <br />;
  const onClick = (evt) => {
    if (!props.checked) {
      evt.preventDefault();
    }
  };

  return (
    <>
      <ButtonWrapper>
        <Button
          as={Link}
          to={`${config.routes.katasterKI.profileBase}/1`}
        >
          Umfrage beginnen
        </Button>
      </ButtonWrapper>
      <CheckboxWrapper labelColor={labelColor}>
        <label htmlFor="check_agb">
          <Checkbox
            type="checkbox"
            checked={props.checked}
            onChange={props.onChange}
            id="check_agb"
          />
          <div>
            Die Umfrage wird von FixMyBerlin durchgeführt.{TextBreak}Ich habe
            deren{' '}
            <ExternalLink
              href="https://fixmyberlin.de/datenschutz"
              rel="noopener noreferrer"
              target="_blank"
            >
              Datenschutzerklärung
            </ExternalLink>{' '}
            gelesen und stimme ihr zu.
          </div>
        </label>
      </CheckboxWrapper>
    </>
  );
};
