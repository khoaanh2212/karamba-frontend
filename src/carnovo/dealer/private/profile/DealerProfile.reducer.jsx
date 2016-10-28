/**
 * Created by ka on 21/10/2016.
 */


import reducerFactory from "shared/utils/ReducerFactory";
import {map, forEach} from 'lodash';

export const FETCH_RATING_DEALER_SUCCESS = "FETCH_RATING_DEALER_SUCCESS";
export const FETCH_RATING_DEALER_ERROR = "FETCH_RATING_DEALER_ERROR";
export const DealerProfileDomain = "DealerProfileDomain";
export const ON_LOAD_MORE_REVIEW_LIST = 'ON_LOAD_MORE_REVIEW_LIST';
export const REJECT_REVIEW_SUCCESS = 'REJECT_REVIEW_SUCCESS';
export const REJECT_REVIEW_ERROR = 'REJECT_REVIEW_ERROR';
export const ACCEPT_REVIEW_SUCCESS = 'ACCEPT_REVIEW_SUCCESS';
export const ACCEPT_REVIEW_ERROR = 'ACCEPT_REVIEW_ERROR';

export const initialState = {
    rating: {},
    allComments: [],
    pageLength: 0,
    loading: true,
    error: null
}


let fetchDealerRatingsSuccess = (state, rating) => {
    rating = decorateReviews(rating);
    let allReviewComments = rating.comments.data;
    rating.comments.data = allReviewComments.slice(state.pageLength, state.pageLength + 5);
    return {
        ...state,
        rating: rating,
        allComments: allReviewComments,
        loading: false,
        error: null
    }
}

let onLoadMoreReviews = (state) => {
    let rating = {...state.rating};
    let allComments = state.allComments;
    let pageLength = 0;
    pageLength += 5;
    if (allComments.length >= pageLength) {
        rating.comments.data = rating.comments.data.concat(allComments.slice(pageLength, pageLength + 5));
    }
    return {
        ...state,
        rating: rating,
        pageLength: pageLength - 5
    }
};

let decorateReviews = (reviews) => {
    let total = 0, totalRating = 0;
    forEach(reviews.ratings, (value, key) => {
        total += value;
        totalRating += parseInt(key) * value;
    });
    reviews.ratings = map(reviews.ratings, (value, key) => {
        return {rating: parseInt(key), total: value, percent: parseInt(value / total * 100)};
    });
    if (total !== 0) {
        reviews.avgRating = parseFloat((totalRating / total).toFixed(1));
    } else {
        reviews.avgRating = 0;
    }
    reviews.totalRating = total;
    return reviews;
};

let rejectReviewSuccess = (state, action) => {
    let rating = {...state.rating};
    let comments = rating.comments;
    comments.data.map((comment) => {
        if (comment.id == action.reviewId) {
            comment.state = 'rejected';
        }
    });
    rating.comments = comments;
    return {
        ...state,
        rating: rating,
        error: null,
        loading: false
    }
};

let acceptReviewSuccess = (state, action) => {
    let rating = {...state.rating};
    let comments = rating.comments;
    comments.data.map((comment) => {
        if (comment.id == action.reviewId) {
            comment.state = 'accepted';
        }
    });
    rating.comments = comments;
    return {
        ...state,
        rating: rating,
        error: null,
        loading: false
    }
}

let cases = (state, action) => {
    switch (action.type) {
        case FETCH_RATING_DEALER_SUCCESS:
            return fetchDealerRatingsSuccess(state, action.rating);
        case FETCH_RATING_DEALER_ERROR:
            return {...state, rating: {}, loading: false, error: action.error};
        case ON_LOAD_MORE_REVIEW_LIST:
            return onLoadMoreReviews(state);
        case REJECT_REVIEW_SUCCESS:
            return rejectReviewSuccess(state, action);
        case REJECT_REVIEW_ERROR:
            return {...state, error: action.error, loading: false};
        case ACCEPT_REVIEW_SUCCESS:
            return acceptReviewSuccess(state, action);
        case ACCEPT_REVIEW_ERROR:
            return {...state, error: action.error, loading: false};
    }
}


export default reducerFactory(initialState, DealerProfileDomain, cases);