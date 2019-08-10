import { dispatch } from 'redux';

import { asyncActionCreator } from './utils';
import { apiFetchReports } from '../apiService';
import { ADD_ERROR } from './ErrorState';

const types = {
    REPORTS_FETCH_PENDING: 'Reports/OverviewMapState/REPORTS_FETCH_PENDING',
    REPORTS_FETCH_COMPLETE: 'Reports/OverviewMapState/REPORTS_FETCH_COMPLETE',
    SET_SELECTED_REPORT: 'Reports/OverviewMapState/SET_SELECTED_REPORT',
    SET_SELECTED_REPORT_POS: 'Reports/OverviewMapState/SET_SELECTED_REPORT_POS',
}



const actions = {}

actions.setSelectedReportPosition = ({ x = 0, y = 0 }) => ({
    type: SET_SELECTED_REPORT_POS,
    payload: { x, y }
})

// thunks

actions.loadReportsData = () => {
    return async (dispatch) => {
        await loadReportsDataInner(dispatch);
    };
}

actions.setSelectedReport = (selectedReport) => {
    return async (dispatch, getState) => {
        const { reports } = getState().ReportsState;

        if (!reports.length) {
            await loadReportsDataInner(dispatch);
        }

        dispatch({
            type: SET_SELECTED_REPORT,
            payload: selectedReport || null
        });
    };
}

const loadReportsDataInner = asyncActionCreator({
    pending: types.REPORTS_FETCH_PENDING,
    complete: types.REPORTS_FETCH_COMPLETE,
    error: types.ADD_ERROR,
},
    () => apiFetchReports)

// reducer

const initialState = {
    reports: [], // report items fetched from api
    selectedReport: null, // an entry within reports
    selectedReportPosition: { x: 0, y: 0 }, // projected position of report popup
}

export default function (state = initialState, { type, payload } = {}) {
    switch (type) {
        case types.REPORTS_FETCH_COMPLETE:
            return { ...state, reports: payload };
        case types.SET_SELECTED_REPORT:
            return {
                ...state, selectedReport: payload
            };
        case types.SET_SELECTED_REPORT_POS:
            return {
                ...state, selectedReportPosition: payload
            };
        default:
            return { ...state };
    }
}

export {
    actions, 
    types
}