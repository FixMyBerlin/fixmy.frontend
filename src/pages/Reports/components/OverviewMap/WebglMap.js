import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import ReportMarkers from '~/pages/Reports/components/ReportMarkers';

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
    // eslint-disable-next-line react/forbid-prop-types
    reportsData: PropTypes.array  // TODO: state type properly
  };

  static defaultProps = {
    className: 'locator-map',
    reportsData: []
  };

  state = {
    loading: true,
    map: null
  }

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reportsOverViewMap.bounds,
      maxBounds: config.reportsOverViewMap.maxBounds
    });
    this.setState({ map: this.map });

    const nav = new MapboxGL.NavigationControl({ showCompass: false });
    this.map.addControl(nav, 'bottom-left');
    this.map.on('load', this.handleLoad);
  }

  componentDidUpdate() {
    if (this.state.loading) {
      return false;
    }
  }

  handleLoad = () => {
    this.setState({ loading: false });
  };

  render() {
    const { className, reportsData } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      >
        {this.props.children}
        <ReportMarkers
          map={this.state.map}
          data={reportsData}
          onClick={this.handleMarkerClick}
        />
      </StyledMap>

    );
  }
}

export default withRouter(WebglMap);
