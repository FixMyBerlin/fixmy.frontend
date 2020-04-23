import styled from 'styled-components';
import config from '~/config';

export default styled.button`
  border-radius: 24px;
  border: none;
  outline: none;
  display: inline-block;
  padding: 15px 25px;
  background: ${config.colors.interaction};
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  //   text-decoration: none;
  color: ${config.colors.darkbg};
  //   font-family: 'Open Sans', sans-serif;
  //   font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  & a:link,
  & a:visited {
    color: ${config.colors.darkbg};
  }
`;
