import React from 'react';
import styled from 'styled-components';
import { Plus } from 'react-feather';

const Button = styled.button`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  width: 220px;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: ${config.colors.interaction};
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
  font-size: 18px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  padding: 0 20px 0 8px;
  align-items: center;

  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5)
  &[disabled] {
     box-shadow: none;
     background-color: ${config.colors.inactivegrey};
  }

  &:focus {
    outline: none;
  }
`;

const PlusIcon = styled(Plus)`
  height: 30px;
  width: 30px;
`;

export default ({ onTab }) => (
  <Button onClick={onTab} className="wiggle">
    <PlusIcon /> Neue Meldung
  </Button>
);
