import styled from 'styled-components';

import Button from './Button';

export default styled(Button)`
  border: 1px solid ${config.colors.interaction};
  color: ${config.colors.interaction};
  background: transparent;

  &:hover {
    background: 1px solid ${config.colors.interaction};
    color: ${config.colors.white};
  }
`;
