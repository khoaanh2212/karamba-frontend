import 'whatwg-fetch';
import config from 'config';
import {PENDING_DEALER_REGISTER_SUCCESS, PENDING_DEALER_REGISTER_FAILURE} from "dealer/home/DealerHome.uistate";

function pendingDealersRegisterSuccess() {
  return {
    type: PENDING_DEALER_REGISTER_SUCCESS
  }
}

function pendingDealersRegisterFailure(error) {
  return {
    type: PENDING_DEALER_REGISTER_FAILURE,
    error: error.data
  }
}

function checkStatus(response) {
  var resp = response.json();
  switch (response.status) {
    case 200:
      return resp.then(pendingDealersRegisterSuccess);
    case 300:
      return resp.then(pendingDealersRegisterFailure);
  }
}

export function register(pendingDealerApplication) {
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pendingDealerApplication)
  };

  return fetch(config.api + '/public/dealer/application/create', options)
    .then(checkStatus);
}
