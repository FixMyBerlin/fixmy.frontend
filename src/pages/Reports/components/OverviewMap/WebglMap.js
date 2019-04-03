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

const MB_STYLE_URL = `${config.reportsOverViewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;


class WebglMap extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'locator-map'
  };

  state = {
    loading: true
  }

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reportsOverViewMap.bounds,
      maxBounds: config.reportsOverViewMap.maxBounds
    });
    window.overviewMap = this.map;

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

  handleSubmitReportBtnTab = () => {
    this.props.history.push(config.routes.submitReport);
  };


  render() {
    const { className } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      />
    );
  }
}

export default withRouter(WebglMap);
