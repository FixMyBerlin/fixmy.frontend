/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import Loader from '~/components/Loader';

const boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.2)';
const boxShadowHover = '0 0 2px 0 rgba(0, 0, 0, 0.2)';

const StyledButton = styled.button`
  border-radius: 32px;
  border: none;
  outline: none;
  padding: 16px 25px;
  background: ${(props) =>
    props.disabled ? config.colors.lightgrey : config.colors.katasterHighlight};
  text-decoration: none;
  color: ${(props) =>
    props.disabled ? config.colors.midgrey : config.colors.black};
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-weight: 700;
  box-shadow: ${(props) => (props.disabled ? 'none' : boxShadow)};
  width: 100%;
  max-width: 500px;
  display: block;
  text-align: center;

  &:hover {
    box-shadow: ${(props) => (props.disabled ? 'none' : boxShadowHover)};
  }
`;

export default ({ children, isLoading, ...rest }) => (
  <StyledButton {...rest}>
    {isLoading ? <Loader css={{ display: 'inline-block' }} /> : children}
  </StyledButton>
);
