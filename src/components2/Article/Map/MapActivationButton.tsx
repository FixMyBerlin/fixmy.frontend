import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '~/components2/Button';
import { media } from '~/styles/utils';

const ActivateButton = styled(Button)<{ mapActive: boolean }>`
  & {
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    height: 48px;
    justify-content: center;
    padding: 0 24px;
    width: initial;
    z-index: 100;

    &:focus {
      box-shadow: none;
      border-color: transparent;
      outline-style: none;
    }

    & > svg {
      margin-right: 0.5em;
    }

    // Move button outside of map wrapper when activated
    transition: transform 0.3s;
    ${({ mapActive }) =>
      mapActive
        ? css`
            transform: translateY(200%);
          `
        : null}
  }
`;

const ButtonArea = styled.div`
  bottom: 1em;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;

  ${media.m`
    bottom: 2em;
  `}

  ${media.xl`
    bottom: 2em;
  `}
`;

type Props = {
  isActive: boolean;
  setActive: (isActive: boolean) => void;
};

export const MapActivationButton: React.FC<Props> = ({
  isActive,
  setActive,
  children,
}) => {
  return (
    <ButtonArea>
      <ActivateButton
        ghost
        onClick={() => setActive(true)}
        mapActive={isActive}
      >
        {children}
      </ActivateButton>
    </ButtonArea>
  );
};
