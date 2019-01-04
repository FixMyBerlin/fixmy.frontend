/**
 *  Holds map in two modi: Overview and Locate-Me-Map as well as dialogs to make a new report or to show an
 *  existing report item.
 *  TODO: set up routing for meldungen/karte/#meldungenId, render detailDialog
 *  TODO: fetch/mock marker data and pass as prop to WebGl OverviewMap
 *  TODO: pass toUrl as prop
 */

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import Route from 'react-router-dom/Route';
import OverviewMapNavBar from './OverviewMapNavBar';
import AddButton from './AddButton';
import LocateModeChooser from './LocateModeChooser';
import LocatorControl from '~/pages/Map/components/LocatorControl';

const StyledLocatorControl = styled(LocatorControl)`
  // TODO: fix positioning. won't move through relative positioning
`;

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


class Map extends Component {
  state = {
    // flags used as rendering conditionals
    showChooseLocationModePopup: false
    // showDetailPopup: false
  };

  onLocate = ({ lng, lat }) => {
    // this.updateView({ center: userLocation, zoom: config.map.zoomAfterGeocode, animate: true });
  };

  onAddButtonTab = () => {
    this.setState({
      showChooseLocationModePopup: true
    });
  };

  onLocationModeChooserClose = () => {
    this.setState({
      showChooseLocationModePopup: false
    });
  };


  render() {
    const { showChooseLocationModePopup} = this.state;
    return (
      <MapView>
        <MapWrapper>
          <StyledWebGlMap />
          <Route
            exact
            path="/meldungen/karte"
            render={() => (
              <Fragment>
                <OverviewMapNavBar heading="Neue Fahrradbügel für Friedrichshain-Kreuzberg" />
                {showChooseLocationModePopup && <LocateModeChooser onClose={this.onLocationModeChooserClose} />}
                <StyledLocatorControl
                  className="Test"
                  key="Map__LocatorControl"
                  onChange={this.handleLocationChange}
                  position="bottom-right"
                />
                <AddButton onTab={this.onAddButtonTab}/>
              </Fragment>
          )}
          />
          {
          /*
            <Route
          exact
          path="/meldung-machen"
          render={() => (

          )}
        />
          */
        }

        </MapWrapper>
      </MapView>
      );
  }
}

export default Map;
