import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import {
  LoadPlanningData,
  loadPlanningData,
  MapState,
  SET_PLANNING_DATA
} from '~/apps/Map/MapState';
import config from '~/config';
import { mswServer } from '../../../../jest/msw/mswServer';
import { RootState } from '~/store';
import planningsResponseFixture from './fixtures/planningsResponse.json';

describe('Plannings Map Unit tests', () => {
  describe('loadPlanningData() thunk', () => {
    const mockStore = configureMockStore([thunk]);

    it('does not dispatch any actions if plannings data has been fetched already', async () => {
      /* ARRANGE: mock store with initial state */
      const preSeededMapState = {
        planningData: true
      } as MapState; // omitting non-relevant props
      const preSeededRootState = {
        MapState: preSeededMapState
      } as RootState;
      const store = mockStore(preSeededRootState);

      /* ACT: invoke loadPlanningsThunk */
      const loadPlanningsThunk = loadPlanningData();
      // @ts-ignore FIXME: properly type this
      await store.dispatch(loadPlanningsThunk);

      /* ASSERT: no action should have been called */
      expect(store.getActions()).toHaveLength(0);
    });

    it(`dispatches ${SET_PLANNING_DATA} once the plannings JSON has been fetched successfully`, async () => {
      /* ARRANGE: mock store, intercept request and mock response */
      const store = mockStore({
        MapState: {} as MapState
      });

      const response = planningsResponseFixture;
      mswServer.use(
        rest.get(`${config.apiUrl}/projects`, (_, res, ctx) =>
          res(ctx.json(response))
        )
      );

      /* ACT: invoke thunk */
      const loadPlanningsThunk = loadPlanningData();
      // @ts-ignore FIXME: properly type this
      await store.dispatch(loadPlanningsThunk);

      /* ASSERT: action containing the api response has been dispatched */
      const expectedAction: LoadPlanningData = {
        type: SET_PLANNING_DATA,
        payload: { planningData: response as any }
      };
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
