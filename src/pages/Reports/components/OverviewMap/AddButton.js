import React from 'react';
import styled from 'styled-components';


const Button = styled.div`
  position: absolute;
  display: flex;
  width: 64px;
  height: 64px;
  bottom: 94px;
  right: 7px;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: white;
  border-radius: 50%;
  background: ${config.colors.interaction};
  font-size:30px;
  cursor: pointer;
   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`;

export default ({ onTab }) => (
  <Button onClick={onTab}>
    +
  </Button>
);
