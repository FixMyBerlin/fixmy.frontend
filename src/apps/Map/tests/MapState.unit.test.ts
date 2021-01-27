import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { rest } from 'msw';

import { mswServer } from '~/../jest/msw/mswServer';
import {
  loadPlanningData,
  setPlanningData,
  setPlanningDataFetchState,
  SET_PLANNING_DATA,
} from '~/apps/Map/MapState';
import config from '~/config';
import { RootState } from '~/store';
import planningsResponseFixture from './fixtures/planningsResponse.json';

describe('Plannings Map Unit tests', () => {
  describe('loadPlanningData() thunk', () => {
    type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;
    const mockStore = configureMockStore<RootState, DispatchExts>([thunk]);

    it('does not dispatch any actions if plannings data has been fetched already', async () => {
      const store = mockStore({
        // @ts-ignore this is not a complete `MapState` but it should suffice
        MapState: {
          planningDataFetchState: 'success',
        },
      });
      await store.dispatch(loadPlanningData());
      expect(store.getActions()).toHaveLength(0);
    });

    it(`dispatches ${SET_PLANNING_DATA} once the plannings JSON has been fetched successfully`, async () => {
      const store = mockStore({
        // @ts-ignore this is not a complete `MapState` but it should suffice
        MapState: {
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
});
