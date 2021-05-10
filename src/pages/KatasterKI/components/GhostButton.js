import styled, { css } from 'styled-components';

import config from '~/pages/KatasterKI/config';
import { isTouch } from '~/utils/utils';

import Button from './Button';

export default styled(Button)`
  border: 1px solid ${config.colors.katasterHighlight};
  color: ${config.colors.darkgrey};
  background: ${(props) =>
    props.isActive ? config.colors.katasterHighlight : 'transparent'};
  box-shadow: none;

  &:focus {
    outline: none;
  }

  ${!isTouch &&
  css`
    &:hover {
      box-shadow: none;
      background: ${config.colors.katasterHighlight};
    }
  `}
`;
