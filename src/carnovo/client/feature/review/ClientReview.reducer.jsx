import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_REVIEW_LIST_DEALER_SUCCESS = 'FETCH_REVIEW_LIST_DEALER_SUCCESS';
export const FETCH_REVIEW_LIST_DEALER_ERROR = 'FETCH_REVIEW_LIST_DEALER_ERROR';
export const FETCH_REVIEW_GIFT_SUCCESS = 'FETCH_REVIEW_GIFT_SUCCESS';
export const FETCH_REVIEW_GIFT_ERROR = 'FETCH_REVIEW_GIFT_ERROR';
export const SEND_REVIEW_SUCCESS = 'SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_ERROR = 'SEND_REVIEW_ERROR';


export const ClientReviewDomain = 'ClientReviewDomain';
export const initialState = {
  loading: true,
  error: null,
  dealers: [],
  gifts: []
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_REVIEW_GIFT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        gifts: action.gifts,
      };
    case FETCH_REVIEW_LIST_DEALER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        dealers: action.dealers.dealers,
      };
    case FETCH_REVIEW_GIFT_ERROR:
      return {...state, error: action.error, loading: false, gifts: []};
    case FETCH_REVIEW_LIST_DEALER_ERROR:
      return {...state, error: action.error, loading: false, dealers: []};
    case SEND_REVIEW_SUCCESS:
      return {...state, error: null};
    case SEND_REVIEW_ERROR:
      return {...state, error: action.error};
  }
};

export default reducerFactory(initialState, ClientReviewDomain, cases);
