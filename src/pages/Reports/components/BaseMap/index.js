import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapboxGL from 'mapbox-gl';

import config from '~/pages/Reports/config';
import BigLoader from '~/components/BigLoader';

const MB_STYLE_URL = `${config.reports.overviewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

class BaseMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reports.overviewMap.bounds,
      maxBounds: this.props.maxBounds
    });

    this.map.on('load', () => {
      this.setState({ isLoading: false });
      this.props.onLoad(this.map);
    });

    this.map.on('move', () => {
      this.props.onMove();
    });

    window.map = this.map;
  }

  render() {
    // While the map initializes, show loading animation.
    // If configured (by setting isReportsDataLoaded to a boolean),
    // also show loader until the prop value toggles.
    const isOverlayLoaded = this.props.didOverlayLoad;
    const isOverlayLoadTogglePropused = isOverlayLoaded !== undefined;
    const isMapInitializing = this.state.isLoading;
    const isMapInitializingOrOverlayLoading =
      isMapInitializing || !isOverlayLoaded;
    const isLoaderShown = isOverlayLoadTogglePropused
      ? isMapInitializingOrOverlayLoading
      : isMapInitializing;

    return (
      <>
        {isLoaderShown && <BigLoader useAbsolutePositioning />}
        <StyledMap
          className={this.props.className}
          ref={(ref) => {
            this.root = ref;
          }}
          data-cy="reports-basemap"
        >
          {this.props.children}
        </StyledMap>
      </>
    );
  }
}

BaseMap.propTypes = {
  maxBounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onLoad: PropTypes.func,
  onMove: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  // purposely allowing didOverlayLoad to be undefined
  // eslint-disable-next-line react/require-default-props
  didOverlayLoad: PropTypes.bool
};

BaseMap.defaultProps = {
  maxBounds: config.reports.overviewMap.maxBounds,
  onLoad: () => {},
  onMove: () => {},
  className: '',
  children: null
};

export default BaseMap;
