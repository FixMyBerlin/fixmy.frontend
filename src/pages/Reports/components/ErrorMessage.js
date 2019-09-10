import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '~/components/Button';

const Div = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: ${config.colors.darkbg};
  z-index: 99999999999999;
  padding: 8px 12px;
  color: ${config.colors.white};
`;

const Heading = styled.h2`
 color: ${config.colors.error};
`;

const StyledDismissButton = styled(Button)`
  float: right;
`;

const ErrorMessage = ({ message, onDismiss, dismissMessage }) => (
  <Div>
    <Heading>Fehler!</Heading>
    <p>{message}</p>
    <StyledDismissButton onClick={onDismiss}>{dismissMessage}</StyledDismissButton>
  </Div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onDismiss: PropTypes.func,
  dismissMessage: PropTypes.string
};

ErrorMessage.defaultProps = {
  message: 'Ein Fehler ist aufgetreten',
  onDismiss: () => console.log('onDismiss says implement me'),
  dismissMessage: 'OK'
};

export default ErrorMessage;
