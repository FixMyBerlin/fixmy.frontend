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
      selectedReport: null
    };
  }

  componentWillMount() {
    this.fetchRequest = this.props.loadReportsData()
      .then(() => {
        this.fetchRequest = null;
      });
  }

  componentDidUpdate() {
    this.setSelectedReport();
  }

  componentWillUnmount() {
    if (this.fetchRequest) {
      this.fetchRequest.cancel();
    }
  }

  onAddButtonTab = () => {
    this.props.history.push(config.routes.reports.new);
  };

  /**
   * Bit hacky solution to check if a subroute /:id has been entered, to get the report from the pool of loaded reports
   * and set it as state prop.
   */
  setSelectedReport = () => {
    if (!this.props.match.isExact) {
      const reportId = Number(this.props.history.location.pathname.split('/').slice(-1));
      const reportItem = this.props.reports.find(report => report.id === reportId);
      if (!reportItem) this.props.history.push('/unbekannte-meldung'); // TODO: eventually give a nicer error feedback
      if (!this.state.selectedReport) {
        this.setState({ selectedReport: reportItem });
      }
    } else if (this.state.selectedReport) {
          this.setState({ selectedReport: null });
        }
  };

  handleMarkerClick = (el, reportItem) => {
    this.props.history.push(`${config.routes.reports.map}/${reportItem.id}`);
  };

  handleLocationChange = ({ lng, lat }) => {
    console.log([lng, lat]); // TODO: pass new center to map
  };

  render() {
    return (
      <Router history={history}>
        <MapView>
          <MapWrapper>
            <StyledWebGlMap
              reportsData={this.props.reports}
              center={this.state.selectedReport && this.state.selectedReport.location.coordinates}
              onMarkerClick={this.handleMarkerClick}
            />
            <OverviewMapNavBar heading="Neue Fahrradbügel für Friedrichshain-Kreuzberg" />

            <LocatorControl
              key="ReportsOverviewMap__LocatorControl"
              onChange={this.handleLocationChange}
              customPosition={{ bottom: '42px', right: '7px' }}
            />
            <AddButton onTab={this.onAddButtonTab} />

          </MapWrapper>

          <Route path={`${config.routes.reports.map}/:id`} render={() => (<ReportsPopup report={this.state.selectedReport} />)} />

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
  reports: state.ReportsState.reports
}), mapDispatchToPros)(OverviewMap));
