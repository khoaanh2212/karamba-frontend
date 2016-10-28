export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_ERROR = 'FETCH_VEHICLES_ERROR';

export const SelectDerivativeState = {
  error: null,
  loading: true
};

export function SelectDerivativeUiReducer(state = SelectDerivativeState, action) {
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
  key: 'select-derivative',
  state: SelectDerivativeState,
  reducer: SelectDerivativeUiReducer
}
