import 'whatwg-fetch';
import config from 'config';
import {
  FETCH_DEALER_CONF_SUCCESS,
  FETCH_DEALER_CONF_ERROR
} from 'confirm/dealer/DealerPasswordForm.uistate.jsx';

let fetchDealerConfSuccess = () => ({
  type: FETCH_DEALER_CONF_SUCCESS
});

let fetchDealerConfError = (error) => ({
  type: FETCH_DEALER_CONF_ERROR,
  error: error.data
});

let checkStatus = (response) => {
  var resp = response.json();
  switch (response.status) {
    case 200:
      return resp.then(fetchDealerConfSuccess);
    case 500:
      return resp.then(fetchDealerConfError);
  }
};

export let confirmDealer = (confirmDealer) => {
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(confirmDealer)
  };

  return fetch(config.api + '/public/dealer', options)
    .then(checkStatus);
};
