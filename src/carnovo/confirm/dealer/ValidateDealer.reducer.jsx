import reducerFactory from 'shared/utils/ReducerFactory';

export const DealersConfirmDomain = 'dealersConfirm';
export const FETCH_DEALER_CONFIRM_SUCCESS = 'FETCH_DEALER_CONFIRM_SUCCESS';
export const FETCH_DEALER_CONFIRM_ERROR = 'FETCH_DEALER_CONFIRM_ERROR';
export const initialState = {
  error: null,
  loading: true,
  dealerPassword: {}
};

export function fetchDealerApplication(state, dealerPassword) {
  return {...state, error: null, dealerPassword: dealerPassword, loading: false}
}

export function fetchDealerApplicationError(state, error) {
  return {...state, error: error, dealerPassword: {}, loading: false}
}

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_DEALER_CONFIRM_SUCCESS:
      return fetchDealerApplication(state, action.dealerPassword);
    case FETCH_DEALER_CONFIRM_ERROR:
      return fetchDealerApplicationError(state, action.error);

  }
};

let dealersReducer = reducerFactory(initialState, DealersConfirmDomain, cases);
export default dealersReducer;
