import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '~/config';

export function getLinkStyles() {
  return `
    color: ${config.colors.interaction};
    text-decoration: none;

    &:visited, &:hover {
      color: ${config.colors.interaction};
      text-decoration: none;
    }
  `;
}

export default styled(Link)`
  ${getLinkStyles()}
`;
