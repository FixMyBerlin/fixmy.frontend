import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';
import reducer, { actions, types, initialState, LOCATION_MODE_DEVICE } from '../SubmitReportState';
import { worldWidePolygon, nullIslandPolygonFeature } from './mocks/geometries';

// mocking

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SubmitReportState reducer and actions', () => {
  describe('LocateMeMap', () => {
    it('returns the initial state for an empty action', () => {
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
            reverseGeocodeResult: null,
            deviceLocation: null,
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

    describe('(Reverse-)Geocoding thunks', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      // test.todo('it geocodes an location', () => {
      //
      // });
      // test.todo('it reverse-geocodes an location', () => {
      //
      // });

      it('dispatches VALIDATE_POSITION when a passed latLon is within a given polygon', () => {
        const expectedAction = { type: types.VALIDATE_POSITION};
        const store = mockStore({});
        const berlinLatLng = { lat: 52.520008, lng: 13.404954 };
        return store.dispatch(
          actions.validateCoordinates(worldWidePolygon, berlinLatLng)
        ).then(() => {
          expect(store.getActions()).toEqual([expectedAction]);
        });
      });
      it('dispatches INVALIDATE_POSITION when a passed latLon is outside a given polygon', () => {
        const expectedAction = { type: types.INVALIDATE_POSITION };
        const store = mockStore({});
        const berlinLatLng = { lat: 52.520008, lng: 13.404954 };
        return store.dispatch(
          actions.validateCoordinates(nullIslandPolygonFeature, berlinLatLng)
        ).then(() => {
            expect(store.getActions()).toEqual([expectedAction]);
          });
      });
    });

    describe('ReportDialog', () => {
      it('adds the bikestands count to the new report item\'s details', () => {
        const ammount = 5;
        const stateBefore = {
          newReport: initialState.newReport
        };
        expect(reducer(stateBefore, actions.setBikestandCount(ammount)))
          .toEqual(
            {
              newReport: {
                ...stateBefore.newReport,
                details: {
                  ...stateBefore.newReport.details,
                  number: ammount
                }
              }
            }
          );
      });
      it('appends info about the conceivable fee to the new report item\'s details', () => {
        const isFeeAcceptable = true;
        const stateBefore = {
          newReport: {
            details: {
              subject: 'BIKE_STANDS',
              number: 3,
              fee_acceptable: null
            }
          }
        };
        expect(reducer(stateBefore, actions.setFeeAcceptable(isFeeAcceptable)))
          .toEqual(
            {
              newReport: {
                ...stateBefore.newReport,
                details: {
                  ...stateBefore.newReport.details,
                  fee_acceptable: isFeeAcceptable
                }
              }
            }
          );
      });
      it('appends additional data (photo, description) to the new report item\'s details', () => {
        const photo = 'base64string';
        const description = 'someText';
        const stateBefore = {
          newReport: {
            address: 'Teststreet 1'
          }
        };
        expect(reducer(stateBefore, actions.setAdditionalData({ photo, description })))
          .toEqual(
            {
              ...stateBefore,
              newReport: {
                ...stateBefore.newReport,
                photo,
                description
              }
            }
          );
      });
    });
  });
});
