import fetchMock from 'fetch-mock'

import reducer, { types, actions } from './OverviewMapState';
import { ADD_ERROR } from './ErrorState'; // TODO: unify reducer structure

const initialState = {
  reports: [],
  selectedReport: null,
  selectedReportPosition: { x: 0, y: 0 }
}

describe('overviewMapState reducer', () => {

  
  
  it('returs the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
    .toMatchObject(initialState)
  })

  it('sets the position of a selected report', () => {
    const pixelPositxion = {x: 50, y: 100};
    expect(reducer({}, actions.setSelectedReportPosition(pixelPositxion)))
    .toEqual(
      {
        selectedReportPosition: pixelPositxion
      }
    )
  })

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('fetches reports and creates REPORTS_FETCH_COMPLETE', () => {

    })
  
    it('fails to fetch reports and creates REPORTS_FETCH_COMPLETE', () => {
  
    })
  })
})

