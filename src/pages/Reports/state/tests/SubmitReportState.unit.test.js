import { rest } from 'msw';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { reportsEndpointUrl } from '~/pages/Reports/apiservice';
import { formatActionType as ft } from '~/utils/test-utils';

import { mswServer } from '../../../../../jest/msw/mswServer';
import { types as errorStateTypes } from '../ErrorState';
import reducer, {
  actions,
  types,
  selectors,
  LOCATION_MODE_GEOCODING,
} from '../SubmitReportState';
import reportsInitialState from '../initialState';
import { worldWidePolygon, nullIslandPolygonFeature } from './mocks/geometries';
import mockedReportItem from './schemaValidation/newReport-jsonSchema-testObject.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Utility func to wrap the state of the SubmitReportState subreducer in the structure of the global redux store.
// This is necessary in thunks, where the reducer is tested indirectly.
const getGlobalState = (submitReportState) => ({
  ReportsState: {
    SubmitReportState: submitReportState,
  },
});

const initialState = reportsInitialState.SubmitReportState;

describe('SubmitReportState reducer and actions', () => {
  describe('LocateMeMap', () => {
    it('returns the initial state for an empty action', () => {
      expect(reducer(undefined, {})).toMatchObject(initialState);
    });

    it('resets the state but keeps the location mode selected for the session', () => {
      expect(
        reducer(
          {
            locationMode: LOCATION_MODE_GEOCODING,
          },
          actions.resetDialogState()
        )
      ).toEqual({
        ...initialState,
        locationMode: LOCATION_MODE_GEOCODING,
      });
    });

    it('sets the location mode', () => {
      expect(
        reducer({}, actions.setLocationMode(LOCATION_MODE_GEOCODING))
      ).toEqual({
        locationMode: LOCATION_MODE_GEOCODING,
      });
    });

    it("sets the temporary location's address", () => {
      const address = 'Teststreet 1, 1337 Testplace';
      expect(reducer({}, actions.setTempLocationAddress(address))).toEqual({
        tempLocation: {
          address,
        },
      });
    });

    it("sets the temporary location's coordinates", () => {
      const lngLat = { lng: 1, lat: 2 };
      expect(reducer({}, actions.setTempLocationCoords(lngLat))).toEqual({
        tempLocation: {
          lngLat,
        },
      });
    });

    it(
      'moves props of a confirmed (former temporary) location to the newReport item ' +
        'and keeps the temporary location',
      () => {
        const stateBefore = {
          tempLocation: {
            deviceLocation: { lng: 1, lat: 2 },
            lngLat: { lng: 1, lat: 2 },
            address: 'Teststreet 1, 1337 Testplace',
          },
          newReport: initialState.newReport,
        };
        expect(reducer(stateBefore, actions.confirmLocation())).toEqual({
          ...stateBefore,
          reverseGeocodeResult: null,
          deviceLocation: null,
          newReport: {
            ...initialState.newReport,
            address: stateBefore.tempLocation.address,
            geometry: {
              type: 'Point',
              coordinates: [
                stateBefore.tempLocation.lngLat.lng,
                stateBefore.tempLocation.lngLat.lat,
              ],
            },
          },
        });
      }
    );

    describe('(Reverse-)Geocoding thunks', () => {
      // test.todo('it geocodes an location', () => {
      //
      // });
      // test.todo('it reverse-geocodes an location', () => {
      //
      // });

      // test.todo('it handles an exeption during reverse Geocoding service call', () => {
      //
      // });

      // test.todo('it handles an contentwise unsuccessfull reverseGeocoding', () => {
      //
      // });

      it(`dispatches ${ft(
        types.VALIDATE_POSITION
      )} when a passed latLon is within a given polygon`, () => {
        const berlinLatLng = { lat: 52.520008, lng: 13.404954 };
        const stateBefore = getGlobalState({
          tempLocation: {
            lngLat: berlinLatLng,
          },
        });
        const store = mockStore(stateBefore);
        const expectedAction = { type: types.VALIDATE_POSITION };
        return store
          .dispatch(actions.validateCoordinates(worldWidePolygon, berlinLatLng))
          .then(() => {
            // test action sequence
            expect(store.getActions()).toEqual([expectedAction]);

            // test reducer
            expect(
              reducer(
                {},
                {
                  type: types.VALIDATE_POSITION,
                }
              )
            ).toEqual({
              tempLocation: {
                ...stateBefore.tempLocation,
                valid: true,
              },
            });
          });
      });

      it(`dispatches ${ft(
        types.INVALIDATE_POSITION
      )} when a passed latLon is outside a given polygon`, () => {
        const berlinLatLng = { lat: 52.520008, lng: 13.404954 };
        const stateBefore = getGlobalState({
          tempLocation: {
            lngLat: berlinLatLng,
          },
        });
        const store = mockStore(stateBefore);
        const expectedAction = { type: types.INVALIDATE_POSITION };
        return store
          .dispatch(
            actions.validateCoordinates(nullIslandPolygonFeature, berlinLatLng)
          )
          .then(() => {
            // test action sequence
            expect(store.getActions()).toEqual([expectedAction]);

            // test reducer
            expect(
              reducer(
                {},
                {
                  type: types.INVALIDATE_POSITION,
                }
              )
            ).toEqual({
              tempLocation: {
                ...stateBefore.tempLocation,
                valid: false,
              },
            });
          });
      });
    });
  });

  describe('ReportDialog', () => {
    it("adds the bikestands count to the new report item's details", () => {
      const ammount = 5;
      const stateBefore = {
        newReport: initialState.newReport,
      };
      expect(reducer(stateBefore, actions.setBikestandCount(ammount))).toEqual({
        newReport: {
          ...stateBefore.newReport,
          details: {
            ...stateBefore.newReport.details,
            number: ammount,
          },
        },
      });
    });
    it("appends info about the conceivable fee to the new report item's details", () => {
      const isFeeAcceptable = true;
      const stateBefore = {
        newReport: {
          details: {
            subject: 'BIKE_STANDS',
            number: 3,
            fee_acceptable: null,
          },
        },
      };
      expect(
        reducer(stateBefore, actions.setFeeAcceptable(isFeeAcceptable))
      ).toEqual({
        newReport: {
          ...stateBefore.newReport,
          details: {
            ...stateBefore.newReport.details,
            fee_acceptable: isFeeAcceptable,
          },
        },
      });
    });
    it("appends additional data (photo, description) to the new report item's details", () => {
      const photo = 'base64string';
      const description = 'someText';
      const stateBefore = {
        newReport: {
          address: 'Teststreet 1',
        },
      };
      expect(
        reducer(stateBefore, actions.setAdditionalData({ photo, description }))
      ).toEqual({
        ...stateBefore,
        newReport: {
          ...stateBefore.newReport,
          photo,
          description,
        },
      });
    });

    describe('thunks', () => {
      it(`dispatches ${ft(
        types.SUBMIT_REPORT_PENDING
      )}, json-schema validates a report and dispatches
       ${ft(types.SUBMIT_REPORT_COMPLETE)} for a valid new report item`, () => {
        // prepare initial mock store

        // reverse marshalling of a report item as the api expects it.
        // as of now this only means adding the base64 prefix to the photo.
        const base64prefix = 'data:image/jpg;base64,';
        const mockedReportsItemCopy = JSON.parse(
          JSON.stringify(mockedReportItem)
        );
        mockedReportsItemCopy.photo = `${base64prefix}${mockedReportItem.photo}`;
        const stateBefore = getGlobalState({
          reports: [],
          newReport: mockedReportsItemCopy,
        });
        const store = mockStore(stateBefore);

        // intercept create request, answer with report as the api would
        const responseResolver = (_, res, ctx) =>
          res(
            ctx.status(200),
            ctx.set('Content-Type', 'application/json'),
            ctx.json(mockedReportItem)
          );
        mswServer.use(rest.post(reportsEndpointUrl, responseResolver));

        // test if thunk dispatches expected action sequence
        const expectedActions = [
          types.SUBMIT_REPORT_PENDING,
          types.SUBMIT_REPORT_COMPLETE,
        ];
        return store.dispatch(actions.submitReport()).then(() => {
          expect(
            store
              .getActions()
              .map((dispatchedActions) => dispatchedActions.type)
          ).toEqual(expectedActions);

          // test reducer
          expect(
            reducer(stateBefore.ReportsState.SubmitReportState, {
              type: types.SUBMIT_REPORT_PENDING,
            })
          ).toEqual({
            ...stateBefore.ReportsState.SubmitReportState,
            apiRequestStatus: {
              ...stateBefore.ReportsState.SubmitReportState.apiRequestStatus,
              submitting: true,
            },
          });

          const mockId = 999;
          expect(
            reducer(stateBefore.ReportsState.SubmitReportState, {
              type: types.SUBMIT_REPORT_COMPLETE,
              submittedReport: {
                id: mockId,
              },
            })
          ).toEqual({
            ...stateBefore.ReportsState.SubmitReportState,
            apiRequestStatus: {
              ...stateBefore.ReportsState.SubmitReportState.apiRequestStatus,
              submitting: false,
              submitted: true,
            },
            newReport: {
              ...stateBefore.ReportsState.SubmitReportState.newReport,
              id: mockId,
            },
          });
        });
      });

      it(`dispatches ${ft(types.SUBMIT_REPORT_PENDING)}, ${ft(
        types.SUBMIT_REPORT_ERROR
      )} and ${ft(
        errorStateTypes.ADD_ERROR
      )} when the POST request fails`, async () => {
        const mockedReportsItemCopy = JSON.parse(
          JSON.stringify(mockedReportItem)
        );

        // compile valid state to submit
        delete mockedReportsItemCopy.photo;
        const stateBefore = getGlobalState({
          newReport: mockedReportsItemCopy,
        });
        const store = mockStore(stateBefore);

        // mock failing request
        const apiResponse = { detail: 'Internal Error' };
        const responseResolver = (_, res, ctx) =>
          res(ctx.status(500), ctx.json(apiResponse));
        mswServer.use(rest.post(reportsEndpointUrl, responseResolver));

        const expectedActions = [
          types.SUBMIT_REPORT_PENDING,
          types.SUBMIT_REPORT_ERROR,
          errorStateTypes.ADD_ERROR,
        ];

        expect.assertions(3);

        try {
          await store.dispatch(actions.submitReport());
        } catch (e) {
          expect(e.message).toEqual('Internal Error');
        }

        const actionsProduced = store
          .getActions()
          .map((dispatchedActions) => dispatchedActions.type);
        expect(actionsProduced).toEqual(expectedActions);

        // test reducer (ErrorState reducer logic is not tested here)
        expect(
          reducer(stateBefore.ReportsState.SubmitReportState, {
            type: types.SUBMIT_REPORT_ERROR,
          })
        ).toEqual({
          ...stateBefore.ReportsState.SubmitReportState,
          apiRequestStatus: {
            ...stateBefore.ReportsState.SubmitReportState.apiRequestStatus,
            submitting: false,
          },
        });
      });
    });
  });

  describe('selectors', () => {
    it(`selects true if the locationMode is ${LOCATION_MODE_GEOCODING}`, () => {
      const stateBefore = {
        locationMode: LOCATION_MODE_GEOCODING,
      };
      expect(selectors.getLocationIsModeGeocoding(stateBefore)).toBe(true);
    });

    it('selects the coordinates of location that has been picked already', () => {
      const coords = [1, 2];
      const stateBefore = {
        newReport: {
          address: 'some address',
          geometry: {
            type: 'Point',
            coordinates: coords,
          },
        },
      };
      expect(selectors.getAlreadyPicketLocation(stateBefore)).toBe(coords);
    });
  });
});
