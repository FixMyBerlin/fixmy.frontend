import { rest } from 'msw';
import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import config from '~/config';

import reducer, {
  AnalysisState,
  initialState,
  loadProjectData,
  setDistrictFilter,
  setPhaseFilter,
  setSort,
} from './state';
import { mswServer } from '~/../jest/msw/mswServer';

const mockStore = reduxMockStore<AnalysisState>([thunk]);
const PROJECTS_API_URL = `${config.apiUrl}/projects?page_size=500`;

describe('AnalysisState', () => {
  it('provides initial state', () => {
    const state = reducer(initialState);
    expect(state.data).toHaveLength(0);
  });

  it('sets selected districts', () => {
    const state = reducer(initialState, setDistrictFilter('xhain'));
    expect(state.selectedDistrict).toEqual('xhain');
    expect(state.selectedPhase).toEqual(null);
  });

  it('sets phase filters', () => {
    const state = reducer(initialState, setPhaseFilter('planning'));
    expect(state.selectedPhase).toEqual('planning');
  });

  it('sets sort filters', () => {
    const state = reducer(initialState, setSort('ASC'));
    expect(state.selectedSort).toEqual('ASC');
  });

  it('loads project data', async () => {
    const mockProjects = [{ id: 1 }];
    const store = mockStore(initialState);
    mswServer.use(
      rest.get(PROJECTS_API_URL, (_, res, ctx) =>
        res(ctx.json({ results: mockProjects }))
      )
    );
    const targetDistrict = 'Friedrichshain-Kreuzberg';
    await store.dispatch<any>(loadProjectData(targetDistrict));
    const expectedActions = [
      {
        type: 'Analysis/AnalysisState/LOAD_DATA',
        payload: {
          isLoading: true,
        },
      },
      {
        type: 'Analysis/AnalysisState/SET_DISTRICT_FILTER',
        payload: {
          selectedDistrict: targetDistrict,
          selectedPhase: null,
        },
      },
      {
        type: 'Analysis/AnalysisState/LOAD_DATA_SUCCESS',
        payload: {
          isLoading: false,
          data: mockProjects,
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('responds to failing api', async () => {
    const store = mockStore(initialState);
    mswServer.use(
      rest.get(PROJECTS_API_URL, (_, res, ctx) => res(ctx.status(500)))
    );
    await store.dispatch<any>(loadProjectData());
    const expectedActions = [
      {
        type: 'Analysis/AnalysisState/LOAD_DATA',
        payload: {
          isLoading: true,
        },
      },
      {
        type: 'Analysis/AnalysisState/LOAD_DATA_FAIL',
        payload: {
          isLoading: false,
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
