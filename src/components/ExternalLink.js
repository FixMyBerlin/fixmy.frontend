import styled from 'styled-components';

export default styled.a`
  color: ${config.colors.interaction};
  text-decoration: none;

  &:visited, &:hover {
    color: ${config.colors.interaction};
    text-decoration: none;
  }
`;
