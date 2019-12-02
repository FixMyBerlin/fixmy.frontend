import React from 'react';
import styled from 'styled-components';

function getBorderRadius(props) {
  return props.side === 'left' ? '40px 0 0 40px' : '0 40px 40px 0';
}

function getBG(props) {
  return props.isActive ? config.colors.inactivegrey : config.colors.darkbg;
}

function getColor(props) {
  return props.isActive ? 'white' : config.colors.darkgrey;
}

function getBoxShadow(props) {
  return props.isActive
    ? 'inset 2px 1px rgba(0, 0, 0, 0.3)'
    : '0 0 2px 1px rgba(0, 0, 0, 0.2)';
}

const Button = styled.button`
  border-radius: ${getBorderRadius};
  height: 50px;
  font-weight: 400;
  background: ${getBG};
  color: ${getColor};
  width: 100px;
  font-size: 14px;
  font-family: 'Roboto Slab', serif;
  box-shadow: ${getBoxShadow};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 20px 0;
  background: ${config.colors.lightbg};
  box-shadow: 0 0px 8px 2px rgba(0, 0, 0, 0.5);
  position: relative;
`;

export default (props) => (
  <Button
    className={props.className}
    side={props.side}
    isActive={props.sideIndex === props.activeSideIndex}
    onClick={props.onClick(props.sideIndex)}
  >
    {props.title}
  </Button>
);
