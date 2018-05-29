import React from 'react';
import styled from 'styled-components';
import Store from '~/redux/store';
import * as MapActions from '~/modules/MapView/MapState';

const ResetMapButton = styled.button`

`;

function handleClick() {
  Store.dispatch(MapActions.setSectionActive({ id: null }));
  Store.dispatch(MapActions.setView({ pitch: 0, animate: true, zoom: 12 }));
}

export default () => (
  <ResetMapButton onClick={handleClick}>X</ResetMapButton>
);
