import { combineReducers } from 'redux';
import ErrorState from './ErrorState';
import OverviewMapState from './ErrorState';
import SubmitReportState from './ErrorState';

export default combineReducers({
  ErrorState,
  OverviewMapState,
  SubmitReportState
});