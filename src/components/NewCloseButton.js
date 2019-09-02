import CloseIcon from '~/images/close.svg';

import React from 'react';
import styled from 'styled-components';

const Button = styled(CloseIcon)`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default props => (
  <Button {...props} />
)