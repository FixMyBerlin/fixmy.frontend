import { Dispatch } from 'redux';

import api from './api';
import config from './config';

import { Spielstrasse } from './types';
import logger from '~/utils/logger';

const SET_KIEZE = 'Spielstrassen/SET_KIEZE';
const LOAD_KIEZE_PENDING = 'Spielstrassen/LOAD_KIEZE_PENDING';
const LOAD_KIEZE_ERROR = 'Spielstrassen/LOAD_KIEZE_ERROR';
const LOAD_KIEZE_COMPLETE = 'Spielstrassen/LOAD_KIEZE_COMPLETE';
export interface State {
  streets: Spielstrasse[];
  streetRequest: {
    state: RequestState;
    message?: string;
  };
}

export enum RequestState {
  waiting = 'waiting',
  pending = 'pending',
  delayed = 'delayed',
  success = 'success',
  error = 'error'
}

interface Action {
  type: string;
  error?: string;
  streets?: string;
}

const initialState = {
  streets: config.spielstrassen.streets,
  streetRequest: {
    state: RequestState.waiting
  }
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SET_KIEZE:
      return {
        ...state,
        streets: action.streets
      };

    case LOAD_KIEZE_PENDING:
      return {
        ...state,
        streetRequest: { state: RequestState.pending }
      };

    case LOAD_KIEZE_ERROR:
      return {
        ...state,
        streetRequest: { state: RequestState.error, message: action.error }
      };
    case LOAD_KIEZE_COMPLETE:
      return {
        ...state,
        streetRequest: { state: RequestState.success }
      };
    default:
      return state;
  }
}

export function setStreets(streets: string): Action {
  return { type: SET_KIEZE, streets };
}

export function loadKiezePending(): Action {
  return { type: LOAD_KIEZE_PENDING };
}
export function loadKiezeError(message: string): Action {
  return { type: LOAD_KIEZE_ERROR, error: message };
}
export function loadKiezeComplete(): Action {
  return { type: LOAD_KIEZE_COMPLETE };
}

export const loadKieze = async (dispatch: Dispatch) => {
  dispatch(loadKiezePending());
  let counts: { [street: string]: number };
  try {
    counts = await api.getData();
    dispatch(loadKiezeComplete());
  } catch (e) {
    dispatch(loadKiezeError(e.message));
    logger(e);
    throw e;
  }

  const streets = config.spielstrassen.streets.map((streetInfo) => ({
    ...streetInfo,
    supporters: counts[streetInfo.street] || 0
  }));

  dispatch(setStreets(streets));
};
