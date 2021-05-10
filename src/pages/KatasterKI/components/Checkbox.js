/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import config from '~/pages/KatasterKI/config';

const CheckboxWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${config.colors.darkbg};
  stroke-width: 3px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  opacity: 0;
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: white;
  margin-right: 10px;
  border: 1px solid
    ${(props) => config.colors[props.checked ? 'katasterHighlight' : 'midgrey']};
  cursor: pointer;

  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxWrapper className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 32 32">
        <polyline points="24,8 12,22 6,16" />
      </Icon>
    </StyledCheckbox>
  </CheckboxWrapper>
);

export default Checkbox;
