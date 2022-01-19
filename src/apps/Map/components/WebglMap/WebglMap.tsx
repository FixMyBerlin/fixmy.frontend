import _isEqual from 'lodash.isequal';
import MapboxGL from 'mapbox-gl';
import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  generatePath,
  matchPath,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components';
import ProjectMarkers from '~/apps/Map/components/ProjectMarkers';
import {
  animateView,
  filterLayersById,
  getCenterFromGeom,
  intersectionLayers,
  parseUrlOptions,
  setPlanningLegendFilter,
  setView,
  standardLayersWithOverlay,
  toggleLayer,
  toggleVisibleHbiLines,
} from '~/apps/Map/map-utils';
import * as MapActions from '~/apps/Map/MapState';
import resetMap from '~/apps/Map/reset';
import { BigLoader } from '~/components2/Loaders';
import config from '~/config';
import Store, { RootState } from '~/store';
import { isSmallScreen } from '~/styles/utils';

let MB_STYLE_URL;
if (config.debug) {
  MB_STYLE_URL = `${config.apps.map.style}?fresh=true`;
} else {
  MB_STYLE_URL = config.apps.map.style;
}

MapboxGL.accessToken = config.mapbox.accessToken;

const StyledMap = styled.div`
  width: 100%;
  flex: 1;
`;

const connector = connect(({ MapState }: RootState) => ({
  activeView: MapState.activeView,
  activeSection: MapState.activeSection,
  animate: MapState.animate,
  bearing: MapState.bearing,
  center: MapState.center,
  dim: MapState.dim,
  displayPopup: MapState.displayPopup,
  filterHbi: MapState.filterHbi,
  filterPlannings: MapState.filterPlannings,
  hasMoved: MapState.hasMoved,
  pitch: MapState.pitch,
  planningData: MapState.planningData,
  planningDataFetchState: MapState.planningDataFetchState,
  show3dBuildings: MapState.show3dBuildings,
  zoom: MapState.zoom,
}));

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ id: string }> & {
    calculatePopupPosition: boolean;
    className?: string; // for styled-components
  };

type State = {
  loading: boolean;
  popupLngLat?: any;
  map?: mapboxgl.Map;
};

class Map extends PureComponent<Props, State> {
  map: mapboxgl.Map;

  root: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      popupLngLat: null,
      map: null,
    };
  }

  componentDidMount() {
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.apps.map.bounds,
    });
    const nav = new MapboxGL.NavigationControl({ showCompass: false });
    this.map.addControl(nav, 'bottom-left');
    this.map.on('load', this.handleLoad);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.loading) {
      return false;
    }

    const viewChanged =
      prevProps.zoom !== this.props.zoom ||
      !_isEqual(prevProps.center, this.props.center) ||
      prevProps.pitch !== this.props.pitch ||
      prevProps.bearing !== this.props.bearing;

    if (viewChanged) {
      this.setView(this.getViewFromProps(), this.props.animate);
    }

    const layerChanged =
      prevProps.activeView !== this.props.activeView ||
      prevProps.activeSection !== this.props.activeSection ||
      prevProps.show3dBuildings !== this.props.show3dBuildings ||
      !_isEqual(prevProps.filterHbi, this.props.filterHbi);

    if (layerChanged) {
      this.updateLayers();
    }

    if (prevProps.activeView !== this.props.activeView) {
      this.registerClickHandler();
      this.registerMouseHoverHandler();
    }

    if (!this.props.activeSection && this.state.popupLngLat) {
      this.disablePopup();
    }

    if (prevProps.activeSection && !this.props.activeSection) {
      // back button triggered
      resetMap({ zoom: this.map.getZoom() });
    }

    if (this.props.activeView === 'planungen') {
      Store.dispatch<any>(MapActions.loadPlanningData());
    }

    return this.map.resize();
  }

  getViewFromProps = () => ({
    zoom: this.props.zoom,
    center: this.props.center,
    bearing: this.props.bearing,
    pitch: this.props.pitch,
  });

  setView = (view, animate = false) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  };

  handleLoad = () => {
    this.registerClickHandler();
    this.registerMouseHoverHandler();
    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);

    const urlMapOptions = parseUrlOptions();

    if (urlMapOptions) {
      this.setView(urlMapOptions, false);
    } else if (!this.props.activeSection) {
      this.map.fitBounds(config.apps.map.bounds, { animate: false });
    } else {
      this.setView(this.getViewFromProps(), false);
    }

    this.updateLayers();
    this.setState({ loading: false, map: this.map });

    this.map.resize();
  };

  registerClickHandler = () => {
    const projectsTarget = config.apps.map.layers.projects.overlayLine;
    const hbiSectionTarget = config.apps.map.layers.hbi.overlayLine;
    const hbiIntersectionTarget = config.apps.map.layers.hbi.xOverlay;

    if (this.props.activeView === 'zustand') {
      this.map.off('click', projectsTarget, this.handleClick);
      this.map.on('click', hbiSectionTarget, this.handleClick);
      this.map.on('click', hbiIntersectionTarget, this.handleClick);
    } else {
      this.map.off('click', hbiSectionTarget, this.handleClick);
      this.map.off('click', hbiIntersectionTarget, this.handleClick);
      this.map.on('click', projectsTarget, this.handleClick);
    }
  };

  registerMouseHoverHandler = () => {
    const clickableLayers = [
      config.apps.map.layers.hbi.overlayLine,
      config.apps.map.layers.hbi.xOverlay,
      config.apps.map.layers.projects.overlayLine,
    ];

    // Events 'mouseenter' & 'mouseleave' didn't worked
    // when hovering from clickable layer to another clickable layer
    this.map.on('mousemove', (e) => {
      const features = this.map.queryRenderedFeatures(e.point);
      // If there are any features under mouse pointer
      if (!features.length) return;

      if (clickableLayers.includes(features[0].layer.id)) {
        this.map.getCanvas().style.cursor = 'pointer';
      } else {
        this.map.getCanvas().style.cursor = '';
      }
    });
  };

  updateLayers = () => {
    const isZustand = this.props.activeView === 'zustand';
    const isPlanungen = this.props.activeView === 'planungen';

    const hbiLayers = config.apps.map.layers.hbi;
    const projectsLayers = config.apps.map.layers.projects;

    if (isZustand) {
      toggleVisibleHbiLines(this.map, this.props.filterHbi);
    }

    setPlanningLegendFilter(this.map, this.props.filterPlannings);

    // project layers
    // toggleLayer(this.map, 'fmb-projects', false);
    standardLayersWithOverlay.forEach((layer) =>
      toggleLayer(this.map, projectsLayers[layer], isPlanungen)
    );

    // hbi layers
    const combinedHbiLayers =
      standardLayersWithOverlay.concat(intersectionLayers);
    combinedHbiLayers.forEach((layer) =>
      toggleLayer(this.map, hbiLayers[layer], isZustand)
    );

    // other layers
    toggleLayer(
      this.map,
      config.apps.map.layers.buildings3d,
      this.props.show3dBuildings
    );
    toggleLayer(this.map, config.apps.map.layers.dimmingLayer, this.props.dim);

    const subMap = isZustand ? 'hbi' : 'projects';
    filterLayersById(this.map, subMap, this.props.activeSection);
  };

  handleClick = (e) => {
    const properties = e.features?.[0].properties;
    const geometry = e.features?.[0].geometry;
    const center = getCenterFromGeom(geometry, [e.lngLat.lng, e.lngLat.lat]);

    if (properties) {
      const name = slugify(
        properties.name || properties.street_name || ''
      ).toLowerCase();
      const { id } = properties;
      // when user is in detail mode, we don't want to show the tooltip again,
      // but directly switch to another detail view
      if (this.props.activeSection && !this.props.displayPopup) {
        const detailRoutes = {
          zustand: config.routes.map.hbiDetail,
          planungen: config.routes.map.projectsDetail,
        };
        const url = generatePath(detailRoutes[this.props.activeView], {
          id,
          name,
        });
        this.props.history.push(url);
      } else {
        Store.dispatch(MapActions.setPopupData(properties));
        Store.dispatch(MapActions.setPopupVisible(true));
      }

      Store.dispatch(MapActions.setActiveSection(id));
      Store.dispatch(
        MapActions.setView({
          center,
          animate: true,
          zoom: isSmallScreen()
            ? config.apps.map.geocoder.zoomAfterGeocode
            : this.map.getZoom(),
        })
      );

      this.handleMove();
    }

    this.updatePopupPos(center);
  };

  handleMarkerClick = (evt, data) => {
    evt.preventDefault();
    evt.stopPropagation();

    const { id, street_name: name } = data;
    const center = data.center.coordinates;

    const match = matchPath<{ id: string; name?: string }>(
      this.props.location.pathname,
      {
        path: '/(zustand|planungen)/:id/:name?',
        exact: true,
      }
    );

    const isDetailViewOpen = match?.params.id != null;
    if (isDetailViewOpen) {
      const slugifiedName = slugify(name || '').toLowerCase();
      const detailRoute = `/${this.props.activeView}/${id}/${slugifiedName}`;
      this.props.history.push(detailRoute);
    } else {
      Store.dispatch(MapActions.setPopupData(data));
      Store.dispatch(MapActions.setPopupVisible(true));
      Store.dispatch(MapActions.setActiveSection(id));
      Store.dispatch(
        MapActions.setView({
          center,
          animate: true,
          zoom: isSmallScreen()
            ? config.apps.map.geocoder.zoomAfterGeocode
            : this.map.getZoom(),
        })
      );

      this.handleMove();
      this.updatePopupPos(center);
    }
  };

  handleMoveEnd = () => {
    if (!this.props.hasMoved) {
      Store.dispatch(MapActions.setHasMoved(true));
    }
  };

  handleMove = () => {
    if (this.state.popupLngLat && this.props.calculatePopupPosition) {
      const center = this.map.project(this.state.popupLngLat);
      Store.dispatch(MapActions.setPopupLocation(center));
    }
  };

  updatePopupPos(center) {
    if (center && this.props.calculatePopupPosition) {
      this.setState({ popupLngLat: center });
      const projCenter = this.map.project(center);
      Store.dispatch(MapActions.setPopupLocation(projCenter));
    }
  }

  disablePopup() {
    this.setState({ popupLngLat: null });
  }

  render() {
    const markerData = this.props.planningData?.results;
    const markersVisible = this.props.activeView === 'planungen';

    const isLoading =
      this.state.loading || this.props.planningDataFetchState === 'pending';

    return (
      <StyledMap
        className={this.props.className}
        ref={(ref) => {
          this.root = ref;
        }}
      >
        {this.props.children}
        {isLoading && <BigLoader useAbsolutePositioning />}
        <ProjectMarkers
          map={this.state.map}
          data={markerData}
          active={markersVisible}
          onClick={this.handleMarkerClick}
          filterPlannings={this.props.filterPlannings}
        />
      </StyledMap>
    );
  }
}

export default withRouter(connector(Map));
