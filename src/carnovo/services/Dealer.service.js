import 'whatwg-fetch';
import config from 'config';
import {
    FETCH_DEALER_SUCCESS,
    FETCH_DEALER_ERROR
} from "dealer/private/edit/DealerEditForm.uistate";

import {
    FETCH_RATING_DEALER_SUCCESS,
    FETCH_RATING_DEALER_ERROR,
    REJECT_REVIEW_SUCCESS,
    REJECT_REVIEW_ERROR,
    ACCEPT_REVIEW_SUCCESS,
    ACCEPT_REVIEW_ERROR,
    DealerProfileDomain
} from "dealer/private/profile/DealerProfile.reducer";

function fetchDealerSuccess(response) {
    return {
        type: FETCH_DEALER_SUCCESS,
        profile: {
            ...response.data.profile,
            avatar: response.data.avatar,
            background: response.data.background
        },
        conditions: response.data.conditions
    };
}

function fetchDealerError(error) {
    return {
        type: FETCH_DEALER_ERROR,
        error: error
    };
}

function checkStatus(response) {
    switch (response.status) {
        case 200:
            var resp = response.json();
            return resp.then(fetchDealerSuccess);
        case 404:
            return fetchDealerError('Not found');
    }
}

function checkActionStatus(response, onSuccess, onError) {
    switch (response.status) {
        case 200:
            var resp = response.json();
            return resp.then(onSuccess);
        case 400:
            return resp.then(onError);
        case 404:
            return onError('Not found');
    }
}

function fetchRatingSuccess(response) {
    return {
        type: FETCH_RATING_DEALER_SUCCESS,
        domain: DealerProfileDomain,
        rating: response.data.rating
    }
}

function fetchRatingError(response) {
    return {
        type: FETCH_RATING_DEALER_ERROR,
        domain: DealerProfileDomain,
        error: response.error
    }
}

function rejectReviewSuccess(response) {
    return {
        type: REJECT_REVIEW_SUCCESS,
        domain: DealerProfileDomain,
        reviewId: response.data
    }
}

function rejectReviewError(response) {
    return {
        type: REJECT_REVIEW_ERROR,
        domain: DealerProfileDomain,
        error: response.error
    }
}

function acceptReviewSuccess(response) {
    return {
        type: ACCEPT_REVIEW_SUCCESS,
        domain: DealerProfileDomain,
        reviewId: response.data
    }
}

function acceptReviewError(response) {
    return {
        type: ACCEPT_REVIEW_ERROR,
        domain: DealerProfileDomain,
        error: response.error
    }
}

export function fetchCurrentDealer(token) {
    let options = {
        credentials: "include",
        method: 'GET',
        headers: {
            'X-TOKEN': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    return fetch(config.api + '/dealer/current', options)
        .then(checkStatus);
}

export function fetchRating(token) {
    let url = config.api + '/dealer/rating';
    return fetch(url, getOptions(token)).then(response => checkActionStatus(response, fetchRatingSuccess, fetchRatingError));
}

export function rejectReview(token, reviewId) {
    let url = config.api + '/dealer/review/' + reviewId;
    return fetch(url, getOptions(token, 'DELETE')).then(response => checkActionStatus(response, rejectReviewSuccess, rejectReviewError));
}

export function acceptReview(token, reviewId) {
    let url = config.api + '/dealer/review/' + reviewId;
    return fetch(url, getOptions(token, 'POST')).then(response => checkActionStatus(response, acceptReviewSuccess, acceptReviewError));
}


function getOptions(token, method = 'GET') {
    return {
        credentials: "include",
        method: method,
        headers: {
            'X-TOKEN': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
}