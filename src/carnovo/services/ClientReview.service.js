import 'whatwg-fetch';
import config from 'config';
import {postOptions, getOptions, checkStatus} from '../services/Utils'

import {
  ClientReviewDomain,
  FETCH_REVIEW_LIST_DEALER_SUCCESS,
  FETCH_REVIEW_LIST_DEALER_ERROR,
  FETCH_REVIEW_GIFT_SUCCESS,
  FETCH_REVIEW_GIFT_ERROR,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_ERROR
} from '../client/feature/review/ClientReview.reducer';

function fetchDealersListSuccess(response) {
  return {
    type: FETCH_REVIEW_LIST_DEALER_SUCCESS,
    domain: ClientReviewDomain,
    dealers: response.data
  }
}

function fetchDealersListError(error) {
  return {
    type: FETCH_REVIEW_LIST_DEALER_ERROR,
    domain: ClientReviewDomain,
    error: error
  }
}

function fetchGiftsSuccess(response) {
  return {
    type: FETCH_REVIEW_GIFT_SUCCESS,
    domain: ClientReviewDomain,
    gifts: response.data
  }
}

function fetchGiftsError(error) {
  return {
    type: FETCH_REVIEW_GIFT_ERROR,
    domain: ClientReviewDomain,
    error: error
  }
}

function sendReviewSuccess() {
  return {
    type: SEND_REVIEW_SUCCESS,
    error: null
  }
}

function sendReviewError(error) {
  return {
    type: SEND_REVIEW_ERROR,
    error: error
  }
}

export function sendReview(token, body) {
  var url = config.api + '/client/review';
  return fetch(url, postOptions(body, token))
    .then(data => checkStatus(data, sendReviewSuccess, sendReviewError))
}

export function fetchReviewDealersList(token) {
  var url = config.api + '/client/review/dealers';

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchDealersListSuccess, fetchDealersListError));
}

export function fetchReviewGifts(token) {
  var url = config.api + '/client/gifts';

  return fetch(url, getOptions(token))
    .then(data => checkStatus(data, fetchGiftsSuccess, fetchGiftsError));
}

