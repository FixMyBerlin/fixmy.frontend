import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapboxGL from 'mapbox-gl';

import BigLoader from '~/components/BigLoader';

const MB_STYLE_URL = `${config.reportsMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

class BaseMap extends PureComponent {
  static propTypes = {
    maxBounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    onLoad: PropTypes.func
  }

  static defaultProps = {
    maxBounds: config.reportsMap.maxBounds,
    onLoad: () => {
    }
  }

  state = {
    isLoading: true
  }

  componentDidMount() {
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reportsMap.bounds,
      maxBounds: this.props.maxBounds
    });

    this.map.on('load', () => {
      this.setState({isLoading: false});
      this.props.onLoad(this.map);
    });
  }

  render() {
    const Loader = this.state.isLoading ? (<BigLoader />) : null;
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

export default BaseMap;
