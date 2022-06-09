/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import history from '~/history';
import config from '~/pages/Reports/config';
import { actions } from '~/pages/Reports/state/SubmitReportState';

/* eslint-disable import/no-unresolved */
import CloseIcon from '~/images/close.svg?component';

const Button = styled(CloseIcon)`
  position: absolute;
  top: 3px;
  right: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const clickHandler = (abortDialog) => {
  abortDialog();
  history.push(config.routes.reports.map);
};

const AbortButton = ({ abortDialog }) => (
  <Button onClick={clickHandler.bind(this, abortDialog)} />
);

export default connect(null, { abortDialog: actions.resetDialogState })(
  AbortButton
);
