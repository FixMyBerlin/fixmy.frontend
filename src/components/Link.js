import styled from 'styled-components';
import Link from 'react-router-dom/Link';

export default styled(Link)`
  color: ${config.colors.interaction};
  text-decoration: none;

  &:visited, &:hover {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;
