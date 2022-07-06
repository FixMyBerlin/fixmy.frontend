import React from 'react';
import styled from 'styled-components';
import config from '~/config';
import CloseIcon from './close-icon.svg';

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -21px;
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
  style?: React.CSSProperties;
};

/**
 * @param {controlsId} string Space seperated list of one or more ID values referencing the elements being controlled by the current element
 *   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
 */
export const ClosePanelButton: React.FC<Props> = ({
  onClick,
  controlsId = undefined,
  label = 'Schließen',
  style,
}) => {
  return (
    <StyledCloseIcon
      onClick={() => onClick()}
      aria-label={label}
      aria-controls={controlsId}
      role="button"
      style={style}
    />
  );
};
