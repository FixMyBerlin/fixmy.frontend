import React from 'react';
import styled from 'styled-components';
import { LinkStyle } from '~/components2/Link';
import config from '~/pages/Reports/config';

export const BaseWrapper = styled.div`
  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
  background-color: ${config.colors.darkbg};
  color: ${config.colors.white};
`;

const WrapperSmall = styled(BaseWrapper)`
  display: flex;
`;

const LinkButton = styled(LinkStyle('button'))`
  color: ${config.colors.white};
`;

const LegendSmall = ({ onToggle }) => (
  <WrapperSmall>
    <LinkButton onClick={onToggle}>Weitere Details</LinkButton>
  </WrapperSmall>
);

export default LegendSmall;
