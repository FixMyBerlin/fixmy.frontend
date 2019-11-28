import styled, { css } from 'styled-components';

import Button from './Button';
import { isTouch } from '~/utils/utils';

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
