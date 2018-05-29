/* eslint-disable */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import RcSwitch from 'rc-switch';
import { withRouter } from 'react-router';

import 'rc-switch/assets/index.css';

const MapModal = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 10000;
  padding: 100px 0;
`;

const Toggle = styled(RcSwitch)`
  .react-toggle-track {}
`;

class MapModalComponent extends PureComponent {
  handleChange = (checked) => {
    const to = checked ? '/planungen' : '/zustand';
    this.props.history.push(to);
  }
  
  render() {
    const isChecked = this.props.location.pathname === '/planungen';
    return (
      <MapModal>
        <Toggle checked={isChecked} onChange={this.handleChange} />
      </MapModal>
    );
  }
};

export default withRouter(MapModalComponent);
