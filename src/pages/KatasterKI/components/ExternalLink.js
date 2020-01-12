import styled from 'styled-components';
import config from '~/pages/KatasterKI/config';

export default styled.a`
  color: ${config.colors.black};

  &:visited,
  &:focus,
  &:hover {
    color: ${config.colors.midgrey};
  }
`;
