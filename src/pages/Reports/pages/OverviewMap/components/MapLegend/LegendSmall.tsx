import React from 'react';
import styled from 'styled-components';
import { LinkStyle } from '~/components2/Link';

export const BaseWrapper = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
`;

const WrapperSmall = styled(BaseWrapper)`
  display: flex;
`;

const LinkButton = LinkStyle('button');

const LegendSmall = ({ onToggle }) => (
  <WrapperSmall>
    <LinkButton onClick={onToggle}>Weitere Details</LinkButton>
  </WrapperSmall>
);

export default LegendSmall;
