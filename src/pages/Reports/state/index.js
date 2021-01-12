import { combineReducers } from 'redux';
import ErrorState from './ErrorState';
import OverviewMapState from './OverviewMapState';
import SubmitReportState from './SubmitReportState';

export default combineReducers({
  ErrorState,
  OverviewMapState,
  SubmitReportState,
});
