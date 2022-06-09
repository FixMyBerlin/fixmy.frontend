import React from 'react';
import styled from 'styled-components';

import CloseIcon from '~/images/close.svg?component';

const Button = styled(CloseIcon)`
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default (props) => <Button {...props} />;
