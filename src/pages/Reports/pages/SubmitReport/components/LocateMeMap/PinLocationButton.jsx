import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import logger from '~/utils/logger';

const Button = styled.button`
  height: 48px;
  background-color: ${config.colors.interaction};
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.5);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
  color: #ffffff;
  border: none;
  border-radius: ${config.flatButtons ? '0' : '4px'};
  // TODO: make the wrapping component take care of positioning
  position: absolute;
  bottom: 55px;
  left: 0;
  right: 0;
  margin: auto;
  width: 280px;

  &[disabled] {
    box-shadow: none;
    background-color: ${config.colors.inactivegrey};
  }

  &:focus {
    outline: none;
  }
`;

const PinLocationButton = ({ onConfirm, text, disabled }) => (
  <Button
    className="confirm-location-button"
    onClick={onConfirm}
    disabled={disabled}
    data-cy="reports-form-confirm-location-button"
  >
    {text}
  </Button>
);

PinLocationButton.propTypes = {
  onConfirm: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

PinLocationButton.defaultProps = {
  onConfirm: () => logger('onConfirm says implement me'),
  text: () => 'Diese Position bestätigen',
  disabled: false,
};

export default PinLocationButton;
