import styled from 'styled-components';

import CloseIcon from './images/close.svg';

const Close = styled(CloseIcon)`
  cursor: pointer;
  &:focus {
    outline: none;
  }
  width: 40px;
  height: 40px;
`;

export default {
  Close,
};
