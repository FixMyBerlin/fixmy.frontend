import React, { useState } from 'react';
import styled from 'styled-components';
import { LinkStyle } from '~/components2/Link';

const BaseWrapper = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
`;

const WrapperSmall = styled(BaseWrapper)`
  display: flex;
`;

const WrapperLarge = styled(BaseWrapper)`
  display: flex;
  height: 50%;
`;

const LinkButton = LinkStyle('button');

const LegendSmall = ({ onToggle }) => (
  <WrapperSmall>
    <LinkButton onClick={onToggle}>Weitere Details</LinkButton>
  </WrapperSmall>
);
const LegendLarge = ({ onToggle }) => (
  <WrapperLarge>
    <LinkButton onClick={onToggle}>Weniger Details</LinkButton>
  </WrapperLarge>
);

const MapLegend = () => {
  const [isExtended, setExtended] = useState(false);

  return isExtended ? (
    <LegendLarge onToggle={() => setExtended(false)} />
  ) : (
    <LegendSmall onToggle={() => setExtended(true)} />
  );
};

export default MapLegend;
