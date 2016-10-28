export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';
export const FETCH_PERFORMANCES_SUCCESS = 'FETCH_PERFORMANCES_SUCCESS';
export const FETCH_PERFORMANCES_ERROR = 'FETCH_PERFORMANCES_ERROR';

export const SelectCarState = {
  error: null,
  loading: true
};

export function SelectCarUiReducer(state = SelectCarState, action) {
  switch (action.type) {
    case FETCH_VEHICLES_SUCCESS:
      return {...state, loading: false, error: null};
    case FETCH_VEHICLES_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}

export default {
  key: 'select-car',
  state: SelectCarState,
  reducer: SelectCarUiReducer
}
