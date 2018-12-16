import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import withRouter from 'react-router/withRouter';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const MB_STYLE_URL = `${config.map.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;

/**
 * Mapbox-gl.js map that sets up with a drag interaction to determine
 * a geoocoordinate based on the position of a marker positioned in the map center.
 */
class LocatorMap extends PureComponent {
  // TODO: propTypes and defaultProps
  static propTypes = {
    className: PropTypes.string
  //   zoom: PropTypes.number,
  //   center: PropTypes.arrayOf(PropTypes.number),
  //   pitch: PropTypes.number,
  //   bearing: PropTypes.number,
  //   show3dBuildings: PropTypes.bool,
  //   onLocationConfirm: PropTypes.func()
  }

  static defaultProps = {
    className: 'locator-map'
  }

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL
    });
    this.map.on('load', this.handleLoad);
  }

  handleLoad = () => {
    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);
  }

  handleMoveEnd = () => {
    // use the new coords
    console.log('moveend says implement me');
  }

  handleMove = () => {
    // display coordinates or better geocode them to show an adress
  }

  render() {
    const { className } = this.props;
    return (
      // TODO: render ReportMarkers
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      />
    );
  }
}

export default withRouter(LocatorMap);
