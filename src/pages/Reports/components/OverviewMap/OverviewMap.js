/**
 *  Displays report items fetched from backend.
 *  TODO: set up routing for meldungen/karte/#meldungenId, render detailDialog
 *  TODO: fetch/mock marker data and pass as prop to WebGl OverviewMap
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import { Router, Route } from 'react-router-dom';
import history from '~/history';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import OverviewMapNavBar from './OverviewMapNavBar';
import AddButton from './AddButton';
import LocatorControl from '~/pages/Map/components/LocatorControl';
import ReportsPopup from './ReportsPopup';

import {
  removeError,
  loadReportsData
} from '~/pages/Reports/ReportsState';


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
  constructor(props) {
    super(props);
    this.state = {
      // [lng, lat]
      mapCenter: null
    };
  }

  componentDidMount() {
    this.props.loadReportsData();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedReport } = nextProps;
    if (selectedReport && selectedReport.geometry.coordinates !== this.state.mapCenter) {
      this.setState({
        mapCenter: selectedReport.geometry.coordinates
      });
    }
    if (!nextProps.selectedReport && this.props.selectedReport) {
      this.setState({
        mapCenter: null
      });
    }
    return null;
  }


  onAddButtonTab = () => {
    this.props.history.push(config.routes.reports.new);
  };

  handleMarkerClick = (el, reportItem) => {
    this.props.history.push(`${config.routes.reports.map}/${reportItem.id}`);
  };

  handleLocationChange = (coords) => {
    this.setState({ mapCenter: coords });
  };

  handlePopupClose = () => {
    // show map by returning to the map route
    history.push(this.props.match.path);
  };

  render() {
    const { reports, selectedReport, match } = this.props;
    return (
      <Router history={history}>
        <MapView>

          <MapWrapper>
            <StyledWebGlMap
              reportsData={reports}
              center={this.state.mapCenter}
              onMarkerClick={this.handleMarkerClick}
              disabled={match.isExact}
            />
            <OverviewMapNavBar heading="Neue Fahrradbügel für Friedrichshain-Kreuzberg" />

            <LocatorControl
              key="ReportsOverviewMap__LocatorControl"
              onChange={this.handleLocationChange}
              customPosition={{ bottom: '42px', right: '7px' }}
            />
            <AddButton onTab={this.onAddButtonTab} />

          </MapWrapper>

          <Route
            path={`${match.path}/:reportId`}
            render={() => (
              <ReportsPopup
                onClose={this.handlePopupClose}
                reportItem={selectedReport}
              />
)}
          />

        </MapView>
      </Router>
    );
  }
}


const mapDispatchToPros = {
  loadReportsData,
  removeError
};
export default withRouter(connect(state => ({
  selectedReport: state.ReportsState.selectedReport,
  reports: state.ReportsState.reports
}), mapDispatchToPros)(OverviewMap));
