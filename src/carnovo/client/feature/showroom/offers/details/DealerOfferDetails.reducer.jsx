import reducerFactory from 'shared/utils/ReducerFactory';
import {map, forEach} from 'lodash';

export const FETCH_DEALER_OFFER_DETAILS_SUCCESS = 'FETCH_DEALER_OFFER_DETAILS_SUCCESS';
export const FETCH_DEALER_OFFER_DETAILS_ERROR = 'FETCH_DEALER_DETAILS_OFFER_ERROR';
export const ON_LOAD_MORE_REVIEW_LIST = 'ON_LOAD_MORE_REVIEW_LIST';

export const DealerOfferDetailsDomain = 'DealerOfferDetailsDomain';
export const initialState = {
  loading: true,
  error: null,
  profile: {},
  offers: [],
  reviews: {
    comments: {
      data: []
    }
  },
  allComments: [],
  pageLength: 0
};

let decorateReviews = (reviews, pageLength) => {
  let total = 0, totalRating = 0;
  forEach(reviews.ratings, (value, key) => {
    total += value;
    totalRating += parseInt(key) * value;
  });
  reviews.ratings = map(reviews.ratings, (value, key) => {
    return { rating: parseInt(key), total: value, percent: parseInt(value / total * 100) };
  });
  if (total !== 0) {
    reviews.avgRating = parseFloat((totalRating/total).toFixed(1));
  } else {
    reviews.avgRating = 0;
  }
  reviews.totalRating = total;
  return reviews;
};

let onFetchDealerOfferDetailsSuccess = (state, action) => {
  let reviews = action.reviews;
  let allComments = action.reviews.comments.data;
  let pageLength = 0;
  decorateReviews(reviews);
  reviews.comments.data = allComments.slice(pageLength, pageLength + 5);
  return {
    ...state,
    pageLength: pageLength,
    error: null,
    loading: false,
    profile: action.profile,
    offers: action.offers,
    reviews: reviews,
    allComments: allComments
  }
};

let onLoadMoreReviews = (state) => {
  let reviews = {...state.reviews};
  let allComments = state.allComments;
  let pageLength = state.pageLength;
  pageLength += 5;
  reviews.comments.data = reviews.comments.data.concat(allComments.slice(pageLength, pageLength + 5));
  return {
    ...state,
    reviews: reviews,
    pageLength: pageLength
  }
};

let cases = (state, action) => {
  switch (action.type) {
    case FETCH_DEALER_OFFER_DETAILS_SUCCESS:
      return onFetchDealerOfferDetailsSuccess(state, action);
    case ON_LOAD_MORE_REVIEW_LIST:
      return onLoadMoreReviews(state);
  }
};

export default reducerFactory(initialState, DealerOfferDetailsDomain, cases);
