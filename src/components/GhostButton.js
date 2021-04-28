import styled from 'styled-components';

import config from '~/config';

import Button from './Button';

export default styled(Button)`
  border: 1.5px solid ${config.colors.interaction};
  color: ${config.colors.darkgrey};
  background: transparent;
  border-radius: ${config.flatButtons ? 'initial' : '6px'};
  display: block;
  padding: 12px 24px 12px 24px;

  &:hover {
    opacity: 0.8;
  }
`;
