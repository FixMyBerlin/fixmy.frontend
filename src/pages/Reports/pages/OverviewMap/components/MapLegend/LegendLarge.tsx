import React from 'react';
import styled from 'styled-components';
import { LinkStyle } from '~/components2/Link';
import { BaseWrapper } from './LegendSmall';

const WrapperLarge = styled(BaseWrapper)`
  display: flex;
  height: 50%;
`;

const LinkButton = LinkStyle('button');

const LegendLarge = ({ onToggle }) => (
  <WrapperLarge>
    <LinkButton onClick={onToggle}>Weniger Details</LinkButton>
  </WrapperLarge>
);

export default LegendLarge;
