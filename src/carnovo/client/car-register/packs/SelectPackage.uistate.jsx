export const FETCH_PACKS_SUCCESS  = 'FETCH_PACKS_SUCCESS';
export const FETCH_PACKS_ERROR = 'FETCH_PACKS_ERROR';

export const SelectPackageState = {
  error: null,
  loading: true
};

export function SelectPackageUiReducer(state = SelectPackageState, action) {
  switch (action.type) {
    case FETCH_PACKS_SUCCESS:
      return {...state, loading: false, error: null};
    case FETCH_PACKS_ERROR:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
}

export default {
  key: 'select-package',
  state: SelectPackageState,
  reducer: SelectPackageUiReducer
}
