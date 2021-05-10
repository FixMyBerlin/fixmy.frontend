import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggle } from '~/AppState';
import MenuIcon from '~/images/hamburger.svg';
import MenuIconWhite from '~/images/hamburgerWhite.svg';

const Wrapper = styled.div`
  position: fixed;
  left: 2rem;
  top: 2rem;
  cursor: pointer;
  z-index: 100;
`;

const enterKeyCode = 13;
const spaceKeyCode = 32;

const MenuButton = (props) => {
  const dispatch = useDispatch();

  const handleKey = ({ keyCode }: KeyboardEvent) => {
    if ([enterKeyCode, spaceKeyCode].includes(keyCode)) dispatch(toggle());
  };

  return (
    <Wrapper
      data-cy="hamburger-button"
      role="button"
      tabIndex={0}
      onClick={() => dispatch(toggle())}
      onKeyUp={handleKey}
      {...props}
    >
      {props.whiteFill && <MenuIconWhite />}
      {!props.whiteFill && <MenuIcon />}
    </Wrapper>
  );
};

export default MenuButton;
