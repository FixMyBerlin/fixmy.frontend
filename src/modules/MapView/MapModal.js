import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import MapSwitch from '~/components/MapSwitch';
import ResetMapButton from '~/components/ResetMapButton';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
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
        {this.props.isClosable && <ResetMapButton />}
        <MapSwitch checked={isChecked} onChange={this.handleChange} />
      </MapModal>
    );
  }
}

export default withRouter(connect(state => ({ isClosable: !!state.MapState.activeSection }))(MapModalComponent));
