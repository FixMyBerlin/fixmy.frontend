import config from '~/config';

import * as utils from '../map-utils';
import mapboxHBIFilter from './fixtures/mapboxHBIFilter.json';
import mapBoxPlanningsFilter from './fixtures/mapboxPlanningsFilter.json';

const view = {
  zoom: true,
  center: true,
  pitch: true,
  bearing: true,
};

describe('setView()', () => {
  it('calls Mapbox setters with extra event flag', () => {
    const map = {
      setZoom: jest.fn(),
      setCenter: jest.fn(),
      setPitch: jest.fn(),
      setBearing: jest.fn(),
    };
    utils.setView(map, view);
    Object.keys(map).forEach((fn) =>
      expect(map[fn]).toHaveBeenCalledWith(true, {
        programmaticMove: true,
      })
    );
  });
});

describe('animateView()', () => {
  it('calls mapbox handler', () => {
    const map = { easeTo: jest.fn() };
    utils.animateView(map, view);
    expect(map.easeTo).toHaveBeenCalled();
  });
});

describe('toggleLayer()', () => {
  let map;
  beforeEach(() => {
    map = {
      getLayer: jest.fn(() => true),
      setLayoutProperty: jest.fn(),
    };
  });
  it('sets layout properties for visible layers', () => {
    utils.toggleLayer(map, 'test', true);
    expect(map.getLayer).toHaveBeenCalled();
    expect(map.setLayoutProperty).toHaveBeenCalledWith(
      'test',
      'visibility',
      'visible'
    );
  });
  it('sets layout properties for invisible layers', () => {
    utils.toggleLayer(map, 'test', false);
    expect(map.setLayoutProperty).toHaveBeenCalledWith(
      'test',
      'visibility',
      'none'
    );
  });
  it("doesn't act on missing layers", () => {
    map.getLayer = jest.fn(() => false);
    utils.toggleLayer(map, 'test', true);
    expect(map.getLayer).toHaveBeenCalled();
    expect(map.setLayoutProperty).not.toHaveBeenCalled();
  });
});

describe('filterLayersById()', () => {
  let map;
  beforeEach(() => {
    map = { setPaintProperty: jest.fn() };
    jest.mock('~/config');
    config.apps = {
      map: {
        layers: {
          subMap: {
            center: 'center',
            side0: 'side0',
            side1: 'side1',
            xCenter: 'xCenter',
            xSide0: 'xSide0',
            xSide1: 'xSide1',
          },
        },
      },
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('sets correct layout properties', () => {
    const myId = 'myId';
    utils.filterLayersById(map, 'subMap', myId);
    expect(map.setPaintProperty.mock.calls).toEqual([
      ['center', 'line-opacity', ['case', ['!=', ['get', 'id'], myId], 0.2, 1]],
      ['side0', 'line-opacity', ['case', ['!=', ['get', 'id'], myId], 0.2, 1]],
      ['side1', 'line-opacity', ['case', ['!=', ['get', 'id'], myId], 0.2, 1]],
      [
        'xCenter',
        'line-opacity',
        ['case', ['!=', ['get', 'id'], myId], 0.2, 1],
      ],
      ['xSide0', 'line-opacity', ['case', ['!=', ['get', 'id'], myId], 0.2, 1]],
      ['xSide1', 'line-opacity', ['case', ['!=', ['get', 'id'], myId], 0.2, 1]],
    ]);
  });
  it('resets layout properties', () => {
    utils.filterLayersById(map, 'subMap', null);
    expect(map.setPaintProperty.mock.calls).toEqual([
      ['center', 'line-opacity', 1],
      ['side0', 'line-opacity', 1],
      ['side1', 'line-opacity', 1],
      ['xCenter', 'line-opacity', 1],
      ['xSide0', 'line-opacity', 1],
      ['xSide1', 'line-opacity', 1],
    ]);
  });
});

describe('setPlanningLegendFilter()', () => {
  it('assembles correct rules for filter permutations', () => {
    const map = { setFilter: jest.fn() };

    config.apps = {
      map: {
        layers: {
          projects: {
            overlayLine: 'overlayLine',
            center: 'center',
            side0: 'side0',
            side1: 'side1',
          },
        },
      },
    };
    utils.setPlanningLegendFilter(map, [true, true, false, true]);
    expect(map.setFilter.mock.calls).toEqual(mapBoxPlanningsFilter);
  });
});

describe('toggleVisibleHbiLines', () => {
  it('sets filters to toggle visibility of hbi segments', () => {
    const map = { setFilter: jest.fn() };
    config.apps = {
      map: {
        layers: {
          hbi: {
            xCenter: 'intersection-center',
            xSide0: 'intersection-side0',
            xSide1: 'intersection-side1',
            xOverlay: 'intersection-overlayLine',
          },
        },
      },
    };

    utils.toggleVisibleHbiLines(map, [true, true, false, true]);
    expect(map.setFilter.mock.calls).toEqual(mapboxHBIFilter);
  });
});

describe('getCenterFromGeom', () => {
  it('returns a default center if no coordinates are defined', () => {
    const geometry = {
      coordinates: null,
    };
    const center = utils.getCenterFromGeom(geometry);
    expect(center).toEqual(null);
  });

  it('calculates a center for linestring geometries', () => {
    const geometry = {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [0, 5],
        [10, 5],
        [10, 10],
      ],
    };
    const center = utils.getCenterFromGeom(geometry);
    expect(center).toEqual([5,5])
  });

  it('returns the original geometry if given a point', () => {
    const geometry = {
      type: 'Point',
      coordinates: [-122.48369693756104, 37.83381888486939],
    };
    const center = utils.getCenterFromGeom(geometry);
    expect(center[0]).toEqual(geometry.coordinates[0]);
    expect(center[1]).toEqual(geometry.coordinates[1]);
  });
});

describe('getGeoLocation', () => {
  it.todo('retrieves current position from geolocation api');
  it.todo('handles browser without support for geolocation api');
});

describe('parseURLOptios', () => {
  it.todo('parses view parameters from current browser location');
});
