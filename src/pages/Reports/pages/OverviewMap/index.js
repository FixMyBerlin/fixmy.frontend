/**
 *  Displays report items fetched from backend.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import styled from 'styled-components';

import config from '~/pages/Reports/config';
import { matchMediaSize, breakpoints } from '~/styles/utils';
import WebglMap from './components/WebglMap';
import OverviewMapNavBar from './components/OverviewMapNavBar';
import CTAButton from './components/CTAButton';
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

  componentDidUpdate(prevProps) {
    const { selectedReport: prevReport } = prevProps;
    const { selectedReport } = this.props;
    const hasReportBeenSelected = !!selectedReport?.id;

    if (hasReportBeenSelected) {
      const hasSelectedReportChanged = prevReport?.id !== selectedReport.id;
      if (hasSelectedReportChanged) {
        // setState is okay because conditionals will prevent this
        // from occuring in a loop
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ mapCenter: selectedReport.geometry.coordinates });
      }
    } else if (!hasReportBeenSelected) {
      const isBeingLoadedWithDeepLink = this.props.match.params.id;
      if (isBeingLoadedWithDeepLink) {
        this.handleDeepLinkLoad();
      } else if (prevReport) {
        // Unsetting report

        // setState is okay because conditionals will prevent this
        // from occuring in a loop
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          mapCenter: null
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetMapState();
  }

  onCTAButtonTab = () => {
    this.props.history.push(
      config.reports.enabled
        ? config.routes.reports.new
        : config.routes.reports.landing
    );
  };

  onMarkerClick = (el, reportItem) => {
    const { selectedReport, match } = this.props;
    const hasDetailId = match.params.id;

    this.props.setSelectedReport(reportItem);
    this.updateSelectedReportPosition();

    if (hasDetailId && selectedReport.id !== reportItem.id) {
      this.props.history.push(`${config.routes.reports.map}/${reportItem.id}`);
    }
  };

  onLocationChange = (coords) => {
    this.setState({ mapCenter: coords });
  };

  onPopupClose = () => {
    // show map by returning to the map route
    this.props.setSelectedReport(null);
    this.props.history.push(config.routes.reports.map);
  };

  onMapLoad = (map) => {
    this.map = map;
    this.setState({ isLoading: false });
  };

  onMapMove() {
    if (this.props.selectedReport) this.updateSelectedReportPosition();
  }

  handleDeepLinkLoad() {
    const linkedReportId = this.props.match.params.id;
    const linkedReport = this.props.reports.find(
      (r) => r.id === +linkedReportId
    );
    this.props.setSelectedReport(linkedReport, true);
  }

  updateSelectedReportPosition() {
    if (this.map && this.props.selectedReport) {
      const selectedReportsPosition = this.map.project(
        this.props.selectedReport.geometry.coordinates
      );
      this.props.setSelectedReportPosition(selectedReportsPosition);
    }
  }

  render() {
    const {
      reports,
      selectedReport,
      match,
      token,
      isMenuOpen,
      errorMessage
    } = this.props;
    const hasDetailId = match.params.id;
    const isDesktopView = matchMediaSize(breakpoints.m);
    const isCTAButtonShifted = isDesktopView && hasDetailId && !isMenuOpen;
    const isCTAHidden = isDesktopView && hasDetailId && isMenuOpen;

    const mapControls = (
      <>
        <LocatorControl
          key="ReportsOverviewMap__LocatorControl"
          onChange={this.onLocationChange}
          customPosition={{ bottom: '105px', right: '7px' }}
        />
        {!isCTAHidden && (
          <CTAButton
            onTab={this.onCTAButtonTab}
            shiftLeft={isCTAButtonShifted}
          />
        )}
      </>
    );

    return (
      <MapView>
        {errorMessage && (
          <ErrorMessage
            message={this.props.errorMessage}
            onDismiss={this.props.removeError}
          />
        )}

        <OverviewMapNavBar heading={config.reports.title} />
        <MapWrapper>
          <WebglMap
            reportsData={reports}
            center={this.state.mapCenter}
            zoomIn={this.state.zoomIn}
            onMarkerClick={this.onMarkerClick}
            onLoad={(m) => this.onMapLoad(m)}
            onMove={() => this.onMapMove()}
            selectedReport={selectedReport}
            detailId={match.params.id}
            zoomControlPosition="top-left"
            fitExtentOnPopupClose={false}
          />
          {this.state.isLoading ? null : mapControls}
          {selectedReport && !hasDetailId && (
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

              const reportItem = reports.find(
                (r) => r.id === +props.match.params.id
              );

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

export default withRouter(
  connect(
    (state) => ({
      selectedReport: state.ReportsState.OverviewMapState.selectedReport,
      reports: state.ReportsState.OverviewMapState.reports,
      zoomIn: state.ReportsState.OverviewMapState.reports.zoomIn,
      token: state.UserState.token,
      isMenuOpen: state.AppState.isMenuOpen,
      errorMessage: state.ReportsState.ErrorState.message
    }),
    mapDispatchToPros
  )(OverviewMap)
);
