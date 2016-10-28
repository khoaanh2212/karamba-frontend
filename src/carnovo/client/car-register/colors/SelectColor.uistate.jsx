export const FETCH_EXTRAS_SUCCESS = 'FETCH_EXTRAS_SUCCESS';
export const FETCH_EXTRAS_ERROR = 'FETCH_EXTRAS_ERROR';

export const SelectColorState = {
  error: null,
  loading: true
};

export function SelectColorUiReducer(state = SelectColorState, action) {
  switch (action.type) {
    case FETCH_EXTRAS_SUCCESS:
      return {...state, loading: false, error: null};
    case FETCH_EXTRAS_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}

export default {
  key: 'select-color',
  state: SelectColorState,
  reducer: SelectColorUiReducer
}
