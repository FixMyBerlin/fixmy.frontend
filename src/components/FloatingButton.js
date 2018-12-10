import React from 'react';
import styled from 'styled-components';


const Button = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  height: 40px;
  bottom: 232px;
  right: 26px;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: white;
  border-radius: 50%;
  background: ${config.colors.interaction};
  font-size:30px;
  cursor: pointer;
`;

export default ({ onTab }) => (
  <Button onClick={onTab}>
      +
  </Button>
);
