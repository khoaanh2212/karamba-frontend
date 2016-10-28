import reducerFactory from 'shared/utils/ReducerFactory';

export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_ERROR = 'FETCH_OFFERS_ERROR';

export const OffersDomain = 'OffersDomain';
export const initialState = {
  loading: true,
  error: null,
  appliance: {},
  offers: {}
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_OFFERS_SUCCESS:
      return {...state, error: null, loading: false, appliance: action.appliance, offers: action.offers};
    case FETCH_OFFERS_ERROR:
      return {...state, error: action.error, loading: false, appliance: {}, offers: {}};
  }
};

export default reducerFactory(initialState, OffersDomain, cases);
