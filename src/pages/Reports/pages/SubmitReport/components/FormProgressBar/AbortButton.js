/* eslint-disable react/jsx-no-bind */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import config from '~/pages/Reports/config';
import CloseIcon from '~/images/close.svg';
import history from '~/history';
import { actions } from '~/pages/Reports/state/SubmitReportState';

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

export default connect(
  null,
  { abortDialog: actions.resetDialogState }
)(AbortButton);
