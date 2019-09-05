import styled from 'styled-components';

import Button from './Button';

export default styled(Button)`
  border: 1.5px solid ${config.colors.interaction};
  color: ${config.colors.darkgrey};
  background: transparent;
  border-radius: 6px;
  display: block;
  padding: 12px 24px 8px 24px;

  &:hover {
    opacity: 0.8;
  }
`;
