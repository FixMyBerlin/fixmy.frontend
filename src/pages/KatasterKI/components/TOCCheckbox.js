import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Checkbox from '~/pages/KatasterKI/components/Checkbox';
import Button from '~/pages/KatasterKI/components/Button';
import ExternalLink from '~/pages/KatasterKI/components/ExternalLink';

const ButtonWrapper = styled.div`
  margin: 15px 0 0 0;
  display: flex;
  justify-content: center;
`;

const CheckboxWrapper = styled.div`
  font-size: 16px;
  margin-top: 10px;

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
`;

export default (props) => {
  const labelColor = props.labelColor || config.colors.darkbg;
  return (
    <>
      <ButtonWrapper>
        <Button
          disabled={!props.checked}
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
            Ich habe die{' '}
            <ExternalLink
              href="https://fixmyberlin.de/datenschutz"
              rel="noopener noreferrer"
              target="_blank"
            >
              Datenschutzerklärung
            </ExternalLink>{' '}
            gelesen und stimme ihr zu
          </div>
        </label>
      </CheckboxWrapper>
    </>
  );
};
