import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const MB_STYLE_URL = `${config.map.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;


class WebglMap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number)
  };

  static defaultProps = {
    className: 'locator-map',
    center: config.map.view.center
  };

  state = {
    loading: true,
    map: false
  }

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL
    });

    const nav = new MapboxGL.NavigationControl({ showCompass: false });
    this.map.addControl(nav, 'bottom-left');
    this.map.on('load', this.handleLoad);
  }

  handleLoad = () => {
    this.setState({ loading: false, map: this.map });

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);
  };

  componentDidUpdate(prevProps) {
    if (this.state.loading) {
      return false;
    }
  }

  handleMoveEnd = () => {
    // use the new coords
    console.log('moveend says implement me');
  };

  handleMove = () => {
    // display coordinates or better geocode them to show an adress
  };


  render() {
    const { className, center } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      />
    );
  }
}

export default withRouter(WebglMap);
