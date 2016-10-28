export const DealerEditFormKey = 'dealer-edit-form';
export const UPDATE_DEALER_SUCCESS = 'UPDATE_DEALER_SUCCESS';
export const UPDATE_DEALER_ERROR = 'UPDATE_DEALER_ERROR';
export const FETCH_DEALER_SUCCESS = 'FETCH_DEALER_SUCCESS';
export const FETCH_DEALER_ERROR = 'FETCH_DEALER_ERROR';

export const DealerEditFormState = {
  profile: null,
  conditions: [],
  error: null,
  loading: true,
  updated: false
};

export function DealerEditFormUiReducer(state = DealerEditFormState, action) {
  switch (action.type) {
    case FETCH_DEALER_SUCCESS:
      return state.merge({loading: false, error: null, profile: action.profile, conditions: action.conditions});
    case FETCH_DEALER_ERROR:
      return state.merge({loading: false, error: action.error, profile: null, conditions: []});
    case UPDATE_DEALER_SUCCESS:
      return state.merge({loading: false, error: null, profile: {...action.profile, updated: true}});
    case UPDATE_DEALER_ERROR:
      return state.merge({loading: false, error: action.error});
    default:
      return state;
  }
}

export default {
  key: DealerEditFormKey,
  state: DealerEditFormState,
  reducer: DealerEditFormUiReducer
}
