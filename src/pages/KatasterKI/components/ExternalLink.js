import styled from 'styled-components';

export default styled.a`
  color: ${config.colors.black};

  &:visited,
  &:focus,
  &:hover {
    color: ${config.colors.midgrey};
  }
`;
