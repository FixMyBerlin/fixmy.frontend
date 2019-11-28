/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';

const Radio = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  opacity: 0;
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledRadio = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  border: 1px solid
    ${(props) => config.colors[props.checked ? 'katasterHighlight' : 'midgrey']};
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.checked
      ? css`
          &:after {
            content: '';
            position: absolute;
            border-radius: 50%;
            top: 0;
            left: 0;
            width: 11px;
            height: 11px;
            background: ${config.colors.darkbg};
            transform: translate(50%, 50%);
          }
        `
      : null}
`;

const Checkbox = ({ className, checked, ...props }) => (
  <Radio className={className}>
    <HiddenRadio checked={checked} {...props} />
    <StyledRadio checked={checked} />
  </Radio>
);

export default Checkbox;
