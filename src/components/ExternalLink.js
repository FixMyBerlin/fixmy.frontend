import styled from 'styled-components';
import config from '~/config';

export default styled.a`
  color: ${(props) => props.color || config.colors.interaction};
  text-decoration: none;

  &:visited,
  &:hover {
    color: ${(props) => props.color || config.colors.interaction};
    text-decoration: none;
  }
`;
