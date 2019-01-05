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
  };

  componentDidUpdate(prevProps) {
    if (this.state.loading) {
      return false;
    }
  }

  handleSubmitReportBtnTab = () => {
    this.props.history.push(config.routes.submitReport);
  };


  render() {
    const { className, center } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => { this.root = ref; }}
      >
      </StyledMap>
    );
  }
}

export default withRouter(WebglMap);
