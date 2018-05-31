import React from 'react';
import styled from 'styled-components';
import Store from '~/redux/store';
import * as MapActions from '~/modules/MapView/MapState';
import ClearIcon from '~/images/clear.svg';

const ResetMapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${config.colors.white};
  border-radius: 50%;
  border: 1px solid ${config.colors.darkgrey};
  cursor: pointer;
`;

function handleClick() {
  Store.dispatch(MapActions.setSectionActive(null));
  Store.dispatch(MapActions.setView({ pitch: 0, animate: true, zoom: 12 }));
}

export default props => (
  <ResetMapButton {...props} onClick={handleClick}>
    <ClearIcon />
  </ResetMapButton>
);
