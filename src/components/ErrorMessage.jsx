import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Button from '~/components/Button';
import config from '~/config';
import logger from '~/utils/logger';

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

const ErrorMessage = ({ title, message, onDismiss, dismissMessage }) => (
  <Div>
    <Heading>{title}</Heading>
    <p>{message}</p>
    <StyledDismissButton onClick={onDismiss}>
      {dismissMessage}
    </StyledDismissButton>
  </Div>
);

ErrorMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onDismiss: PropTypes.func,
  dismissMessage: PropTypes.string,
};

ErrorMessage.defaultProps = {
  title: 'Fehler',
  message: 'Ein Fehler ist aufgetreten',
  onDismiss: () => logger('onDismiss says implement me'),
  dismissMessage: 'OK',
};

export default ErrorMessage;
