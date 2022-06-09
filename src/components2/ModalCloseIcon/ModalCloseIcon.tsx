import React from 'react';
import styled from 'styled-components';
import config from '~/config';

/* eslint-disable-next-line import/no-unresolved */
import CloseIcon from './close.svg?component';

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: ${(props) => (props.positionRight ? props.positionRight : '10px')};
  top: -18px;
  z-index: 500;
  overflow: visible;
  width: 41px;
  height: 41px;

  &:focus {
    outline: none;
    & .close-icon-background {
      fill: ${config.colors.midgrey};
    }
  }
`;

type Props = {
  onClick: () => void;
  controlsId?: string;
  label?: string;
  positionRight?: string;
};

/**
 * @param {controlsId} string Space seperated list of one or more ID values referencing the elements being controlled by the current element
 *   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 */
export const ModalCloseIcon: React.FC<Props> = ({
  onClick,
  controlsId = undefined,
  label = 'Schließen',
  positionRight = undefined,
}) => {
  return (
    <StyledCloseIcon
      onClick={() => onClick()}
      aria-label={label}
      aria-controls={controlsId}
      role="button"
      positionRight={positionRight}
    />
  );
};
