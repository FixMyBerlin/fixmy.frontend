/**
 *  Displays report items fetched from backend.
 *  TODO: set up routing for meldungen/karte/#meldungenId, render detailDialog
 *  TODO: fetch/mock marker data and pass as prop to WebGl OverviewMap
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import WebglMap from './WebglMap';
import OverviewMapNavBar from './OverviewMapNavBar';
import AddButton from './AddButton';
import LocatorControl from '~/pages/Map/components/LocatorControl';
import ReportsPopup from './ReportsPopup';
import ReportDetails from './ReportDetails';

import {
  removeError,
  loadReportsData,
  setSelectedReport
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


class OverviewMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // [lng, lat]
      mapCenter: null,
      isLoading: true
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

  componentWillUnmount() {
    if (this.props.selectedReport) {
      this.props.setSelectedReport(null);
    }
  }

  onAddButtonTab = () => {
    this.props.history.push(config.routes.reports.new);
  }

  handleMarkerClick = (el, reportItem) => {
    this.props.setSelectedReport(reportItem);
  }

  handleLocationChange = (coords) => {
    this.setState({ mapCenter: coords });
  }

  handlePopupClose = () => {
    // show map by returning to the map route
    this.props.setSelectedReport(null);
  }

  onMapLoad = () => {
    this.setState({ isLoading: false });
  }

  render() {
    const { reports, selectedReport, match } = this.props;

    const mapControls = (
      <Fragment>
        <LocatorControl
          key="ReportsOverviewMap__LocatorControl"
          onChange={this.handleLocationChange}
          customPosition={{ bottom: '42px', right: '7px' }}
        />
        <AddButton onTab={this.onAddButtonTab} />
      </Fragment>
    );

    return (
      <MapView>
        <OverviewMapNavBar heading="Neue Fahrradbügel für Friedrichshain-Kreuzberg" />
        <MapWrapper>
          <WebglMap
            reportsData={reports}
            center={this.state.mapCenter}
            onMarkerClick={this.handleMarkerClick}
            onLoad={this.onMapLoad}
          />
          { this.state.isLoading ? null : mapControls }
          {selectedReport && (
            <Route
              path={match.path}
              exact
              render={() => (
                <ReportsPopup
                  onClose={this.handlePopupClose}
                  reportItem={selectedReport}
                />
              )}
            />
          )}
          <Route
            path={`${match.path}/:id`}
            render={(props) => {
              if (!reports || !reports.length) {
                return null;
              }

              const reportItem = reports.find(r => r.id === +props.match.params.id);

              return (
                <ReportDetails
                  apiEndpoint="reports"
                  onCloseRoute={match.url}
                  onClose={() => this.props.setSelectedReport(null)}
                  token={this.props.token}
                  reportItem={reportItem}
                  subtitle={`Meldung ${reportItem.id}`}
                />
              );
            }}
          />
        </MapWrapper>
      </MapView>
    );
  }
}

const mapDispatchToPros = {
  loadReportsData,
  removeError,
  setSelectedReport
};

export default withRouter(connect(state => ({
  selectedReport: state.ReportsState.selectedReport,
  reports: state.ReportsState.reports
}), mapDispatchToPros)(OverviewMap));
