import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import idx from 'idx';
import { If } from 'react-extras';

import MapSwitch from '~/components/MapSwitch';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 24px;
`;

const MapModalLocation = styled.div`

`;

class MapModalComponent extends PureComponent {
  handleChange = (checked) => {
    const to = checked ? '/planungen' : '/zustand';
    this.props.history.push(to);
  }

  render() {
    const isChecked = this.props.location.pathname === '/planungen';
    const location = idx(this.props, _ => _.activeSection.name);

    return (
      <MapModal>
        <If condition={!!location}>
          <MapModalLocation>{location}</MapModalLocation>
        </If>
        <MapSwitch checked={isChecked} onChange={this.handleChange} />
      </MapModal>
    );
  }
}

export default withRouter(connect(state => ({ activeSection: state.MapState.activeSection }))(MapModalComponent));
