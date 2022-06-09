import styled from 'styled-components';

/* eslint-disable-next-line import/no-unresolved */
import CloseIcon from './images/close.svg?component';

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
