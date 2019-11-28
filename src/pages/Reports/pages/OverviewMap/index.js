/**
 *  Displays report items fetched from backend.
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { matchMediaSize, breakpoints } from '~/styles/utils';
import WebglMap from './components/WebglMap';
import OverviewMapNavBar from './components/OverviewMapNavBar';
import AddButton from './components/AddButton';
import ErrorMessage from '~/components/ErrorMessage';
import ReportsPopup from './components/ReportsPopup';
import ReportDetails from './components/ReportDetails';
import LocatorControl from '~/pages/Map/components/LocatorControl';
import { actions as overviewMapStateActions } from '~/pages/Reports/state/OverviewMapState';
import { actions as errorStateActions } from '~/pages/Reports/state/ErrorState';

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
      isLoading: true,
      selectedReportsPosition: []
    };
  }

  componentDidMount() {
    this.props.loadReportsData();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedReport, match, reports } = nextProps;

    // handle deeplink load
    if (!selectedReport && match.params.id) {
      this.props.setSelectedReport(reports.find(r => r.id === +match.params.id));
    }

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
    this.props.resetMapState();
  }

  onAddButtonTab = () => {
    this.props.history.push(config.routes.reports.new);
  }

  onMarkerClick = (el, reportItem) => {
    const { selectedReport, match } = this.props;
    const hasDetailId = match.params.id;

    this.props.setSelectedReport(reportItem);
    this.updateSelectedReportPosition();

    if (hasDetailId && (selectedReport.id !== reportItem.id)) {
      this.props.history.push(`${config.routes.reports.map}/${reportItem.id}`);
    }
  }

  onLocationChange = (coords) => {
    this.setState({ mapCenter: coords });
  }

  onPopupClose = () => {
    // show map by returning to the map route
    this.props.setSelectedReport(null);
    this.props.history.push(config.routes.reports.map);
  }

  onMapLoad = (map) => {
    this.map = map;
    this.setState({ isLoading: false });
  }

  onMapMove() {
    if (!this.props.selectedReport) {
      return null;
    }

    this.updateSelectedReportPosition();
  }

  updateSelectedReportPosition() {
    if (!this.map || !this.props.selectedReport) {
      return false;
    }

    const selectedReportsPosition = this.map.project(this.props.selectedReport.geometry.coordinates);

    this.props.setSelectedReportPosition(selectedReportsPosition);
  }

  render() {
    const { reports, selectedReport, match, token, isMenuOpen, errorMessage } = this.props;
    const hasDetailId = match.params.id;
    const isDesktopView = matchMediaSize(breakpoints.m);
    const isAddButtonShifted = isDesktopView && hasDetailId && !isMenuOpen;
    const isAddButtonHidden = isDesktopView && hasDetailId && isMenuOpen;

    const mapControls = (
      <Fragment>
        <LocatorControl
          key="ReportsOverviewMap__LocatorControl"
          onChange={this.onLocationChange}
          customPosition={{ bottom: '105px', right: '7px' }}
        />
        {
        !isAddButtonHidden && (
          <AddButton
            onTab={this.onAddButtonTab}
            shiftLeft={isAddButtonShifted}
          />
        )
      }

      </Fragment>
    );

    return (
      <MapView>
        {
          errorMessage && (
            <ErrorMessage
              message={this.props.errorMessage}
              onDismiss={this.props.removeError}
            />
          )
        }

        <OverviewMapNavBar
          heading="Fahrradbügel für Friedrichshain-Kreuzberg (Status: In Bearbeitung durch den Bezirk)"
        />
        <MapWrapper>
          <WebglMap
            reportsData={reports}
            center={this.state.mapCenter}
            onMarkerClick={this.onMarkerClick}
            onLoad={m => this.onMapLoad(m)}
            onMove={() => this.onMapMove()}
            selectedReport={selectedReport}
            detailId={match.params.id}
            zoomControlPosition="top-left"
            fitExtentOnPopupClose={false}
          />
          {this.state.isLoading ? null : mapControls}
          {(selectedReport && !hasDetailId) && (
            <ReportsPopup
              onClose={this.onPopupClose}
              reportItem={selectedReport}
              position={this.state.selectedReportsPosition}
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
                  onClose={() => this.onPopupClose()}
                  token={token}
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
  ...overviewMapStateActions,
  ...errorStateActions
};

export default withRouter(connect(state => ({
  selectedReport: state.ReportsState.OverviewMapState.selectedReport,
  reports: state.ReportsState.OverviewMapState.reports,
  token: state.UserState.token,
  isMenuOpen: state.AppState.isMenuOpen,
  errorMessage: state.ReportsState.ErrorState.message
}), mapDispatchToPros)(OverviewMap));
