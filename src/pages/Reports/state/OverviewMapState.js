import { dispatch } from 'redux';

// actions constants

const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_SELECTED_REPORT_POS = 'Reports/OverviewMapState/SET_SELECTED_REPORT_POS';
const UNSET_SELECTED_REPORT = 'Reports/OverviewMapState/UNSET_SELECTED_REPORT';
const SET_SELECTED_REPORT = 'Reports/OverviewMapState/SET_SELECTED_REPORT';

// action creators



export function setSelectedReportPosition(selectedReportPosition) {
    return { type: SET_SELECTED_REPORT_POS, selectedReportPosition };
}


// thunks

export function loadReportsData() {
    return async (dispatch) => {
        await loadReportsDataInner(dispatch);
    };
}

export function setSelectedReport(selectedReport) {
    return async (dispatch, getState) => {
        const { reports } = getState().ReportsState;

        if (!reports.length) {
            await loadReportsDataInner(dispatch);
        }

        dispatch({ type: SET_SELECTED_REPORT, selectedReport });
    };
}

// reducer

const initialState = {
    reports: [], // report items fetched from api
    selectedReport: null, // an entry within reports
    selectedReportPosition: { x: 0, y: 0 }, // projected position of report popup
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SET_REPORT_DATA:
            return { ...state, reports: action.payload };
        case SET_SELECTED_REPORT:
            return {
                ...state, selectedReport: action.selectedReport || null
            };
        case SET_SELECTED_REPORT_POS:
            return {
                ...state, selectedReportPosition: action.selectedReportPosition || { x: 0, y: 0 }
            };
        case UNSET_SELECTED_REPORT:
            return {
                ...state, selectedReport: null
            };
        default:
            return { ...state };
    }
}