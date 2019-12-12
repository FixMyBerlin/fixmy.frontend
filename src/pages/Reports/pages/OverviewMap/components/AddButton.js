import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Plus } from 'react-feather';

const Button = styled.button`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: ${(props) => (props.shiftLeft ? '0 auto 0 15%' : 'auto')};
  width: 220px;
  height: 48px;
  border: none;
  border-radius: 25px;
  background: ${config.colors.interaction};
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
  font-size: 18px;
  color: white;
  font-weight: bold;
  display: none;
  justify-content: center;
  padding: 0 20px 0 8px;
  align-items: center;

  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5) &[disabled] {
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
  padding-right: 14px;
  box-sizing: content-box;
`;

const AddButton = ({ onTab, shiftLeft }) => (
  <Button onClick={onTab} className="wiggle" shiftLeft={shiftLeft}>
    <PlusIcon /> Neue Meldung
  </Button>
);

AddButton.propTypes = {
  onTab: PropTypes.func.isRequired,
  shiftLeft: PropTypes.bool // if true, position more to the left to leave space for foldout
};

AddButton.defaultProps = {
  shiftLeft: false
};

export default AddButton;
