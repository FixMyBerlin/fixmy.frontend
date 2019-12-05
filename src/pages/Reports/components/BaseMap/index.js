import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapboxGL from 'mapbox-gl';

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
      maxBounds: this.props.maxBounds || config.reports.overviewMap.maxBounds
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
    const Loader = this.state.isLoading ? <BigLoader /> : null;
    return (
      <StyledMap
        className={this.props.className}
        ref={(ref) => {
          this.root = ref;
        }}
      >
        {Loader}
        {this.props.children}
      </StyledMap>
    );
  }
}

BaseMap.propTypes = {
  maxBounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  onLoad: PropTypes.func,
  onMove: PropTypes.func
};

BaseMap.defaultProps = {
  maxBounds: config.reports.overviewMap.maxBounds,
  onLoad: () => {},
  onMove: () => {}
};

export default BaseMap;
