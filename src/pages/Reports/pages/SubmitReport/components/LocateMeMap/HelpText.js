import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

const Box = styled.div`
  height: 82px;
  position: fixed;
  z-index: 1000;
  top: 59px;
  left: 77px; /* leave space for zoom controls */
  right: 22px;
  margin: auto;
  border-radius: 3px;
  background-color: ${config.colors.darkbg};
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

  ${media.m`
    max-width: 374px;
    margin-left: 0
    margin-right: auto;
    left: 28px;
    top: 64px;
  `}
`;

const HelpText = ({ text }) => (
  <Box data-cy="reports-map-help">
    <span>{text}</span>
  </Box>
);

HelpText.propTypes = {
  text: PropTypes.string,
};

HelpText.defaultProps = {
  text: 'Bewegen Sie die Karte oder tippen Sie eine Adresse ein.',
};

export default HelpText;
