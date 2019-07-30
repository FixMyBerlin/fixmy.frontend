/* eslint-disable react/jsx-no-bind */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CloseButton from '~/components/CloseButton';
import history from '~/history';
import { resetDialogState } from '~/pages/Reports/ReportsState';


const Button = styled(CloseButton)`
  position: absolute;
  top: 3px;
  right: 10px;
  transform: scale(0.7);
`;

const clickHandler = (abortDialog) => {
  abortDialog();
  history.push(config.routes.reports.map);
};

const AbortButton = ({ abortDialog }) => (
  <Button onClick={clickHandler.bind(this, abortDialog)} />
);

export default connect(null, { abortDialog: resetDialogState })(AbortButton);
