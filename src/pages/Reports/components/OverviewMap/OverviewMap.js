/**
 *  Displays report items fetched from backend.
 *  TODO: set up routing for meldungen/karte/#meldungenId, render detailDialog
 *  TODO: fetch/mock marker data and pass as prop to WebGl OverviewMap
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import OverviewMapNavBar from './OverviewMapNavBar';
import AddButton from './AddButton';
import LocatorControl from '~/pages/Map/components/LocatorControl';

const MapView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledWebGlMap = styled(WebglMap)`
  order: 2; // this makes sure that the NavBar is on top
`;


class OverviewMap extends Component {
  onLocate = ({ lng, lat }) => {
    console.log([lng, lat]);
    // this.updateView({ center: userLocation, zoom: config.map.zoomAfterGeocode, animate: true });
  };

  onAddButtonTab = () => {
    this.props.history.push('/meldungen/meldung-machen');
  };

  render() {
    return (
      <MapView>
        <MapWrapper>
          <StyledWebGlMap />
          <OverviewMapNavBar heading="Neue Fahrradbügel für Friedrichshain-Kreuzberg" />

          <LocatorControl
            key="ReportsOverviewMap__LocatorControl"
            onChange={this.handleLocationChange}
            customPosition={{ bottom: '42px', right: '7px' }}
          />
          <AddButton onTab={this.onAddButtonTab} />

        </MapWrapper>
      </MapView>
    );
  }
}

export default OverviewMap;
