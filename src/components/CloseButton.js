import React from 'react';
import styled from 'styled-components';

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: ${config.colors.white};
  border-radius: 50%;
  border: 1px solid ${config.colors.midgrey};
  cursor: pointer;
  font-size: 24px;
  color: ${config.colors.midgrey};

  &:focus {
    outline: none;
  }
`;

export default (props) => <CloseButton {...props}>×</CloseButton>;
