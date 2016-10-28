import 'whatwg-fetch';
import config from 'config';
import {
  DealersConfirmDomain,
  FETCH_DEALER_CONFIRM_SUCCESS,
  FETCH_DEALER_CONFIRM_ERROR
} from 'confirm/dealer/ValidateDealer.reducer';

function fetchDealerConfirmSuccess(response) {
  return {
    type: FETCH_DEALER_CONFIRM_SUCCESS,
    domain: DealersConfirmDomain,
    dealerPassword: response.data
  };
}

function fetchDealerConfirmError(error) {
  return {
    type: FETCH_DEALER_CONFIRM_ERROR,
    domain: DealersConfirmDomain,
    error: error.data
  };
}

function checkStatus(response) {
  var resp = response.json();
  switch (response.status) {
    case 200:
      return resp.then(fetchDealerConfirmSuccess);
    case 404:
      return resp.then(fetchDealerConfirmError);
  }
}

export function fetchPendingDealerFromToken(token) {
  return fetch(config.api + '/public/dealer/application/accepted/' + token)
    .then(checkStatus);
}
