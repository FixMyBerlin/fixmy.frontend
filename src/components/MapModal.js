/* eslint-disable */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Toggle from 'react-toggle';
import { withRouter } from 'react-router';

import 'react-toggle/style.css';

const MapModal = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 10000;
  padding: 100px 0;
`;

const StyledToggle = styled(Toggle)`
  .react-toggle-track {}
`;

class MapModalComponent extends PureComponent {
  handleChange = (evt) => {
    console.log(evt.target.checked);
    const to = evt.target.checked ? '/planungen' : '/zustand';
    console.log(to);
    this.props.history.push(to);
  }
  
  render() {
    return (
      <MapModal>
        <StyledToggle onChange={this.handleChange} />
      </MapModal>
    );
  }
};

export default withRouter(MapModalComponent);
