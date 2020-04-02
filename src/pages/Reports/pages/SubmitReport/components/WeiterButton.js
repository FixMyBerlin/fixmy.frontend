import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Button from '~/components/Button';

export default styled(Button)`
  display: block;
  margin-top: 51px;
  height: 48px;
  width: 167px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: ${config.flatButtons
    ? 'initial'
    : '0 0 12px 0 rgba(0, 0, 0, 0.2)'};

  &&[disabled] {
    background-color: ${config.colors.lightgrey};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
`;
