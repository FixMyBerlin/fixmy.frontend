import React from 'react';
import styled from 'styled-components';
import config from '~/config';
import CloseIcon from './close.svg';

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -18px;
  z-index: 1200;
  &:focus {
    outline: none;
    & .close-icon-background {
      fill: ${config.colors.midgrey};
    }
  }
`;

type Props = {
  onClick: () => void;
  controls: string;
  label?: string;
};

export const ModalCloseIcon: React.FC<Props> = ({
  onClick,
  controls,
  label = 'Schließen',
}) => {
  return (
    <StyledCloseIcon
      onClick={() => onClick()}
      aria-label={label}
      aria-controls={controls}
      role="button"
    />
  );
};
