import React from 'react';
import styled from 'styled-components';

import { breakpoints } from '~/styles/utils';

import LegendExpanded from './LegendExpanded';

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
  // const [isExpanded, setExpanded] = useState(false);

  // on toggle
  return (
    <Wrapper {...props}>
      <LegendExpanded compact onToggle={null} />
    </Wrapper>
  );
};

export default MapLegend;
