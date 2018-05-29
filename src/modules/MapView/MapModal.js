import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import MapSwitch from '~/components/MapSwitch';
import ResetMapButton from '~/components/ResetMapButton';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
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
        <ResetMapButton />
        <MapSwitch checked={isChecked} onChange={this.handleChange} />
      </MapModal>
    );
  }
}

export default withRouter(MapModalComponent);
