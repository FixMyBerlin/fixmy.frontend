import React from 'react';
import styled from 'styled-components';
import config from '~/pages/Reports/config';
import { BaseWrapper } from './LegendSmall';
import CloseIcon from './close.svg';
import LegendGrid from './LegendGrid';

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -18px;
  z-index: 900;
  &:focus {
    outline: none;
    & .close-icon-background {
      fill: ${config.colors.midgrey};
    }
  }
`;

const LegendLarge = ({ onToggle }) => (
  <Wrapper role="complementary" aria-expanded="true" id="reports-map-legend">
    <StyledCloseIcon
      onClick={onToggle}
      alt="Legende schließen"
      aria-controls="reports-map-legend"
    />
    <LegendGrid />
  </Wrapper>
);

export default LegendLarge;
