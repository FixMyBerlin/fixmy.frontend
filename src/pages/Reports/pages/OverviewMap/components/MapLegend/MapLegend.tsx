import React, { useState } from 'react';
import styled from 'styled-components';
import LegendExpanded from './LegendExpanded';
import LegendCollapsed from './LegendCollapsed';
import { breakpoints } from '~/styles/utils';

interface Props {
  isPopupVisible: boolean;
  isDetailOpen: boolean;
}

const Wrapper = styled.div<Props>`
  display: ${({ isPopupVisible, isDetailOpen }) =>
    !isPopupVisible && !isDetailOpen ? 'block' : 'none'};

  @media (min-width: ${breakpoints.m}px) {
    display: ${({ isDetailOpen }) => (!isDetailOpen ? 'block' : 'none')};
  }
`;

const MapLegend = (props: Props) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Wrapper {...props}>
      {isExpanded ? (
        <LegendExpanded onToggle={() => setExpanded(false)} />
      ) : (
        <LegendCollapsed onToggle={() => setExpanded(true)} />
      )}
    </Wrapper>
  );
};

export default MapLegend;
