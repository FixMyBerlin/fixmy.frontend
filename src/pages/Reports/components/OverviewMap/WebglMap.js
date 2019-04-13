/* eslint-disable react/forbid-prop-types */ // TODO: state props types properly,
import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import ReportMarkers from '~/pages/Reports/components/OverviewMap/ReportMarkers';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const MB_STYLE_URL = `${config.reportsOverViewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;


class WebglMap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    reportsData: PropTypes.array,
    center: PropTypes.array
  };

  static defaultProps = {
    className: 'locator-map',
    reportsData: [],
    center: null
  };

  state = {
    loading: true,
    map: null
  };

  nav = new MapboxGL.NavigationControl({ showCompass: false });

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reportsOverViewMap.bounds,
      maxBounds: config.reportsOverViewMap.maxBounds
    });
    this.setState({ map: this.map });

    this.toggleZoomControl();
    this.map.on('load', this.handleLoad);
  }

  componentDidUpdate() {
    if (this.state.loading) {
      return false;
    }
    if (this.props.center) {
      this.map.easeTo({ center: this.props.center, zoom: 14 });
    } else {
      this.map.fitBounds(config.reportsOverViewMap.bounds);
    }


    this.toggleMapInteractivity(this.props.disabled);
  }

  handleLoad = () => {
    this.setState({ loading: false });
  };

  toggleZoomControl = (isActive) => {
    if (isActive) {
      this.map.addControl(this.nav, 'bottom-left');
    } else {
      this.map.removeControl(this.nav);
    }
  };

  toggleMapInteractivity(isInteractive) {
    if (isInteractive) {
      this.map.dragPan.enable();
    } else {
      this.map.dragPan.disable();
    }
    this.toggleZoomControl(isInteractive);
  }

  render() {
    const { className, reportsData, onMarkerClick } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      >
        {this.props.children}
        <ReportMarkers
          map={this.state.map}
          data={reportsData}
          onClick={onMarkerClick}
        />
      </StyledMap>

    );
  }
}

export default withRouter(WebglMap);
