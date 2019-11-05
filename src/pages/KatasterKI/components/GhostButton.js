import styled from 'styled-components';

import Button from './Button';

export default styled(Button)`
  border: 1.5px solid ${config.colors.katasterHighlight};
  color: ${config.colors.darkgrey};
  background: transparent;
  box-shadow: none;

  &:hover {
    box-shadow: none;
    background: ${config.colors.katasterHighlight};
  }
`;
