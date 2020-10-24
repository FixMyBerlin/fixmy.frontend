import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import {
  SetPlanningData,
  loadPlanningData,
  MapState,
  SET_PLANNING_DATA
} from '~/apps/Map/MapState';
import config from '~/config';
import { mswServer } from '../../../jest/msw/mswServer';
import { RootState } from '~/store';

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

      const response = {
        count: 245,
        next: 'https://fixmyberlin.de/api/projects?page=2&page_size=1',
        previous: null,
        results: [
          {
            id: 4,
            url: 'https://fixmyberlin.de/api/projects/4',
            project_key: 'FK-020',
            title: 'Neue Fahrradstraße',
            description:
              'Die Glogauer Straße ist als Zubringer zum Görlitzer Park und Durchfahrt zur Oberbaumbrücke eine stark befahrene Radstrecke. Die Straße soll daher als Fahrradstraße umgwidmet werden. Die Machbarkeit soll im Jahr 2019 geprüft und bei einem positivem Ergebnis voraussichtlich in 2019 umgesetzt werden.',
            short_description:
              'Die Glogauer Straße wird zu einer Fahrradstraße.',
            category: 'bike street',
            street_name: 'Glogauer Straße',
            borough: 'Friedrichshain-Kreuzberg',
            side: 2,
            costs: null,
            draft_submitted: null,
            construction_started: null,
            construction_completed: 'unbekannt',
            construction_completed_date: null,
            phase: 'draft',
            responsible: 'Bezirksamt Friedrichshain-Kreuzberg',
            external_url: null,
            cross_section: null,
            faq: [],
            geometry: {
              type: 'LineString',
              coordinates: [
                [13.435653786621, 52.4916709861841],
                [13.4357418335253, 52.4917627197358],
                [13.4374143916796, 52.4934570093144],
                [13.4389228394647, 52.4949934633041]
              ]
            },
            center: {
              type: 'Point',
              coordinates: [13.4374143916796, 52.4934570093144]
            },
            length: 431.0,
            photos: [
              {
                copyright: 'Photo by Anthony Ginsbrook',
                src:
                  'https://fmb-aws-bucket.s3.amazonaws.com/photos/Platzhalter_anthony-ginsbrook-225252-unsplash.jpg'
              }
            ],
            likes: 4
          }
        ]
      };
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
      const expectedAction: SetPlanningData = {
        type: SET_PLANNING_DATA,
        payload: { planningData: response as any }
      };
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
