import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Box = styled.div`
  height: 82px;
  position: fixed;
  z-index: 1000;
  top: 62px;
  left: 25px;
  right: 25px;
  margin: auto;
  border-radius: 3px;
  background-color: #353535;
  opacity: 0.7;
  font-size: 16px;
  font-weight: bold;
  color: white;
  letter-spacing: 0.9px;
  line-height: 1.5;
  padding: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HelpText = ({ text }) => (
  <Box><span>{text}</span></Box>
);

HelpText.proptypes = {
  text: PropTypes.string
};

HelpText.defaultProps = {
  text: 'Bewege die Karte oder tippe eine Adresse ein.'
};

export default HelpText;
