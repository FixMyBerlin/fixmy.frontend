import styled from 'styled-components';
import config from '~/config';

export default styled.button`
  border-radius: ${config.roundCorners ? '4px' : '0'};
  border: none;
  outline: none;
  display: inline-block;
  padding: 10px 25px;
  background: ${config.colors.interaction};
  text-decoration: none;
  color: ${config.colors.white};
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
