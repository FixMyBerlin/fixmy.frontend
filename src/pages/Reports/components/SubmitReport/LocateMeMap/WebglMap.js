import React, {PureComponent} from 'react';
import withRouter from 'react-router/withRouter';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEqual from 'lodash.isequal';
import { animateView, setView } from '~/pages/Map/map-utils';

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
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    onMapDrag: PropTypes.func
  };

  static defaultProps = {
    className: 'locator-map',
    center: config.map.view.center,
    zoom: config.map.view.zoom,
    onMapDrag: () => console.log('onMapDrag says implement me')
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

    const nav = new MapboxGL.NavigationControl({showCompass: false});
    this.map.addControl(nav, 'bottom-left');
    this.map.on('load', this.handleLoad);
  }

  componentDidUpdate(prevProps) {
    if (this.state.loading) {
      return false;
    }

    const viewChanged = prevProps.zoom !== this.props.zoom ||
      !_isEqual(prevProps.center, this.props.center) ||
      prevProps.pitch !== this.props.pitch ||
      prevProps.bearing !== this.props.bearing;

    if (viewChanged) {
      this.setView(this.getViewFromProps(), this.props.animate);
    }
  }

  handleLoad = () => {
    this.setState({loading: false, map: this.map});

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);
  };

  setView = (view, animate = false) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  }

  getViewFromProps = () => (
    {
      zoom: this.props.zoom,
      center: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch
    }
  )

  handleMoveEnd = () => {
    const mapCenter = this.map.getCenter();
    const { lat, lng } = mapCenter;
    this.props.onMapDrag({lat, lng});
  };

  handleMove = () => {
    // display coordinates or better geocode them to show an adress
  };


  render() {
    const { className } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => {
          this.root = ref;
        }}
      />
    );
  }
}

export default withRouter(WebglMap);
