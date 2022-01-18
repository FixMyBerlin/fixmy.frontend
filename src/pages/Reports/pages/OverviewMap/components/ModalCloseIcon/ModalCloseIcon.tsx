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
  controlsId?: string;
  label?: string;
};

/**
 * @param {controlsId} string Space seperated list of one or more ID values referencing the elements being controlled by the current element
 *   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 */
export const ModalCloseIcon: React.FC<Props> = ({
  onClick,
  controlsId = undefined,
  label = 'Schließen',
}) => {
  return (
    <StyledCloseIcon
      onClick={() => onClick()}
      aria-label={label}
      aria-controls={controlsId}
      role="button"
      style={{ overflow: 'visible', width: '41px', height: '41px' }}
    />
  );
};
