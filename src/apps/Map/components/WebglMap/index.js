import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';
import { withRouter, matchPath } from 'react-router-dom';
import slugify from 'slugify';

import Store from '~/store';
import { isSmallScreen } from '~/styles/utils';
import config from '~/config';
import * as MapActions from '~/apps/Map/MapState';
import ProjectMarkers from '~/apps/Map/components/ProjectMarkers';
import {
  toggleVisibleHbiLines,
  animateView,
  setView,
  toggleLayer,
  filterLayersById,
  getCenterFromGeom,
  intersectionLayers,
  parseUrlOptions,
  setPlanningLegendFilter,
  setPopupLanesFilter,
} from '~/apps/Map/map-utils';
import resetMap from '~/apps/Map/reset';

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

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popupLngLat: false,
      map: false,
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
    window.map = this.map;
  }

  componentDidUpdate(prevProps) {
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
    }

    if (!this.props.activeSection && this.state.popupLngLat) {
      this.disablePopup();
    }

    if (prevProps.activeSection && !this.props.activeSection) {
      // back button triggered
      resetMap({ zoom: this.map.getZoom() });
    }

    if (
      this.props.activeView === 'planungen' ||
      this.props.activeView === 'popupbikelanes'
    ) {
      Store.dispatch(MapActions.loadPlanningData());
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
    const hbiTarget = config.apps.map.layers.hbi.overlayLine;

    if (this.props.activeView === 'zustand') {
      this.map.off('click', projectsTarget, this.handleClick);
      this.map.on('click', hbiTarget, this.handleClick);
      this.map.on(
        'click',
        config.apps.map.layers.hbi.intersectionsOverlay,
        this.handleIntersectionClick
      );
    } else {
      this.map.off('click', hbiTarget, this.handleClick);
      this.map.off(
        'click',
        config.apps.map.layers.hbi.intersectionsOverlay,
        this.handleIntersectionClick
      );
      this.map.on('click', projectsTarget, this.handleClick);
    }
  };

  updateLayers = () => {
    const isZustand = this.props.activeView === 'zustand';
    let isPlanungen = this.props.activeView === 'planungen';

    const hbiLayers = config.apps.map.layers.hbi;
    const projectsLayers = config.apps.map.layers.projects;

    intersectionLayers.forEach((layerName) =>
      toggleLayer(this.map, hbiLayers[layerName], isZustand)
    );

    if (isZustand) {
      toggleVisibleHbiLines(
        this.map,
        this.props.hbi_values,
        this.props.filterHbi
      );
    }

    if (this.props.activeView === 'popupbikelanes') {
      // Make sure that planning layers are set visible in Mapbox to be
      // able to see popup bike lane geometries
      isPlanungen = true;
      setPopupLanesFilter(this.map);
    } else {
      setPlanningLegendFilter(this.map, this.props.filterPlannings);
    }

    // project layers
    toggleLayer(this.map, 'fmb-projects', false);
    toggleLayer(this.map, projectsLayers.center, isPlanungen);
    toggleLayer(this.map, projectsLayers.side0, isPlanungen);
    toggleLayer(this.map, projectsLayers.side1, isPlanungen);
    toggleLayer(this.map, projectsLayers.overlayLine, isPlanungen);

    // hbi layers
    toggleLayer(this.map, hbiLayers.center, isZustand);
    toggleLayer(this.map, hbiLayers.side0, isZustand);
    toggleLayer(this.map, hbiLayers.side1, isZustand);
    toggleLayer(this.map, hbiLayers.overlayLine, isZustand);
    toggleLayer(this.map, hbiLayers.intersections, isZustand);
    toggleLayer(this.map, hbiLayers.intersectionsSide0, isZustand);
    toggleLayer(this.map, hbiLayers.intersectionsSide1, isZustand);
    toggleLayer(this.map, hbiLayers.intersectionsOverlay, isZustand);

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
        const detailRoute = `/${this.props.activeView}/${id}/${name}`;
        this.props.history.push(detailRoute);
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
            ? config.apps.map.zoomAfterGeocode
            : this.map.getZoom(),
        })
      );

      this.handleMove();
    }

    this.updatePopupPos(center);
  };

  handleIntersectionClick = (evt) => {
    Store.dispatch(MapActions.setPopupData({ isIntersection: true }));
    Store.dispatch(MapActions.setPopupVisible(true));
    Store.dispatch(MapActions.setActiveSection(1));
    Store.dispatch(
      MapActions.setView({
        center: evt.lngLat,
        animate: true,
        zoom: isSmallScreen()
          ? config.apps.map.zoomAfterGeocode
          : this.map.getZoom(),
      })
    );

    this.handleMove();
    this.updatePopupPos(evt.lngLat);
  };

  handleMarkerClick = (evt, data) => {
    evt.preventDefault();
    evt.stopPropagation();

    const { id, street_name: name } = data;
    const center = data.center.coordinates;

    const match = matchPath(this.props.location.pathname, {
      path: '/(zustand|planungen)/:id/:name?',
      exact: true,
    });

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
            ? config.apps.map.zoomAfterGeocode
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
    const markersVisible =
      this.props.activeView === 'planungen' ||
      this.props.activeView === 'popupbikelanes';

    return (
      <StyledMap
        className={this.props.className}
        ref={(ref) => {
          this.root = ref;
        }}
      >
        {this.props.children}
        <ProjectMarkers
          map={this.state.map}
          data={markerData}
          active={markersVisible}
          onClick={this.handleMarkerClick}
          filterPlannings={this.props.filterPlannings}
          onlyPopupbikelanes={this.props.activeView === 'popupbikelanes'}
        />
      </StyledMap>
    );
  }
}

export default withRouter(
  connect((state) => ({
    activeView: state.MapState.activeView,
    activeSection: parseInt(state.MapState.activeSection, 0),
    animate: state.MapState.animate,
    bearing: state.MapState.bearing,
    center: state.MapState.center,
    dim: state.MapState.dim,
    displayPopup: state.MapState.displayPopup,
    filterHbi: state.MapState.filterHbi,
    filterPlannings: state.MapState.filterPlannings,
    hasMoved: state.MapState.hasMoved,
    pitch: state.MapState.pitch,
    planningData: state.MapState.planningData,
    show3dBuildings: state.MapState.show3dBuildings,
    zoom: state.MapState.zoom,
    ...state.UserState,
  }))(Map)
);
