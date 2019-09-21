import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { actions, initialState, LOCATION_MODE_DEVICE } from '../SubmitReportState';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SubmitReportState reducer and actions', () => {
  it('returs the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
      .toMatchObject(initialState);
  });

  it('resets the state but keeps the location mode selected for the session', () => {
    expect(reducer({ locationMode: LOCATION_MODE_DEVICE }, actions.resetDialogState()))
      .toEqual(
        {
          ...initialState,
          locationMode: LOCATION_MODE_DEVICE
        }
      );
  });

  it('sets the location mode', () => {
    expect(reducer({}, actions.setLocationMode(LOCATION_MODE_DEVICE)))
      .toEqual(
        {
          locationMode: LOCATION_MODE_DEVICE
        }
      );
  });

  it('sets the temporary location\'s address', () => {
    const address = 'Teststreet 1, 1337 Testplace';
    expect(reducer({}, actions.setTempLocationAddress(address)))
      .toEqual(
        {
          tempLocation: {
            address
          }
        }
      );
  });

  it('sets the temporary location\'s coordinates', () => {
    const lngLat = { lng: 1, lat: 2 };
    expect(reducer({}, actions.setTempLocationCoords(lngLat)))
      .toEqual(
        {
          tempLocation: {
            lngLat
          }
        }
      );
  });

  it('moves props of a confirmed (former temporary) location to the newReport item ' +
    'and keeps the temporary location', () => {
    const stateBefore = {
      tempLocation: {
        deviceLocation: { lng: 1, lat: 2 },
        lngLat: { lng: 1, lat: 2 },
        address: 'Teststreet 1, 1337 Testplace'
      }
    };
    expect(reducer(stateBefore, actions.confirmLocation()))
      .toEqual(
        {
          ...stateBefore,
          reverseGeocodeResult: null, // TODO: do we still use this? check if it can be removed
          deviceLocation: null, // TODO: check if this is necessary
          newReport: {
            address: stateBefore.tempLocation.address,
            geometry: {
              type: 'Point',
              coordinates: [
                stateBefore.tempLocation.lngLat.lng,
                stateBefore.tempLocation.lngLat.lat
              ]
            }
          }
        }
      );
  });
});
