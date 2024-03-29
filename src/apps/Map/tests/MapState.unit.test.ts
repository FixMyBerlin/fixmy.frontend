import { rest } from 'msw';
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { mswServer } from '~/../jest/msw/mswServer';
import {
  initialState,
  loadPlanningData,
  selectors,
  setPlanningData,
  setPlanningDataFetchState,
  SET_PLANNING_DATA,
} from '~/apps/Map/MapState';
import config from '~/config';
import { RootState } from '~/store';
import { HBI_STOPS } from '../constants';
import featureIntersection from './fixtures/featureIntersection.json';
import featureSection from './fixtures/featureSection.json';
import planningsResponseFixture from './fixtures/planningsResponse.json';

type RootStateSlice = Pick<RootState, 'MapState'>;

describe('MapState.ts', () => {
  type DispatchExts = ThunkDispatch<RootStateSlice, void, AnyAction>;
  const mockStore = configureMockStore<RootStateSlice, DispatchExts>([thunk]);

  describe('loadPlanningData() thunk', () => {
    it('does not dispatch any actions if plannings data has been fetched already', async () => {
      const store = mockStore({
        MapState: {
          ...initialState,
          planningDataFetchState: 'success',
        },
      });
      await store.dispatch(loadPlanningData());
      expect(store.getActions()).toHaveLength(0);
    });

    it(`dispatches ${SET_PLANNING_DATA} once the plannings JSON has been fetched successfully`, async () => {
      const store = mockStore({
        MapState: {
          ...initialState,
          planningDataFetchState: 'waiting',
        },
      });

      mswServer.use(
        rest.get(`${config.apiUrl}/projects`, (_, res, ctx) =>
          res(ctx.json(planningsResponseFixture))
        )
      );

      await store.dispatch(loadPlanningData());

      const expectedActions: AnyAction[] = [
        setPlanningDataFetchState('pending'),
        setPlanningData(planningsResponseFixture),
        setPlanningDataFetchState('success'),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('selectors', () => {
    describe('getPopupHBI', () => {
      it('composes hbi as expected for intersections from mapbox', () => {
        const store = mockStore({
          MapState: {
            ...initialState,
            activeView: 'zustand',
            popupData: featureIntersection,
          },
        });
        const expected = {
          '0': {
            color: config.colors.darkgrey,
            label: 'Nicht genug Daten',
            level: null,
          },
          '1': {
            color: config.colors.darkgrey,
            label: 'Nicht genug Daten',
            level: null,
          },
          '2': {
            color: HBI_STOPS[0].color,
            label: HBI_STOPS[0].label,
            level: 0,
          },
          components: {
            visionZeroIndex: {
              '0': null,
              '1': null,
              '2': {
                killed: 0,
                risk_level: 3,
                severely_injured: 3,
                slightly_injured: 10,
                source: `Polizei Berlin: Unfälle mit Radfahrenden, Daten aus 2017-2018 und Unfallatlas, Statistische Ämter des Bundes und der Länder, Daten aus 3096`,
              },
            },
          },
        };
        // @ts-ignore
        expect(selectors.getPopupHBI(store.getState())).toEqual(expected);
      });

      it('composes hbi as expected for sections from mapbox', () => {
        const store = mockStore({
          MapState: {
            ...initialState,
            activeView: 'zustand',
            popupData: featureSection,
          },
        });
        const expected = {
          '0': {
            color: config.colors.darkgrey,
            label: 'Nicht genug Daten',
            level: null,
          },
          '1': {
            color: config.colors.darkgrey,
            label: 'Nicht genug Daten',
            level: null,
          },
          '2': {
            color: config.colors.darkgrey,
            label: 'Nicht genug Daten',
            level: null,
          },
          components: {
            visionZeroIndex: {
              '0': null,
              '1': null,
              '2': null,
            },
          },
        };
        // @ts-ignore
        expect(selectors.getPopupHBI(store.getState())).toEqual(expected);
      });
    });
  });
});
