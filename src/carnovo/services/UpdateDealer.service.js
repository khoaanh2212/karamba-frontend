import 'whatwg-fetch';
import config from 'config';
import {UPDATE_DEALER_SUCCESS, UPDATE_DEALER_ERROR} from "dealer/private/edit/DealerEditForm.uistate";

function updateDealerSuccess(profile) {
  return {
    type: UPDATE_DEALER_SUCCESS,
    profile: {...profile.data.profile, avatar: profile.data.avatar, background: profile.data.background}
  };
}

function updateDealerError(error) {
  return {
    type: UPDATE_DEALER_ERROR,
    error
  };
}

function checkStatus(response) {
  var resp = response.json();
  switch (response.status) {
    case 200:
      return resp.then(updateDealerSuccess);
    case 404:
      return resp.then(updateDealerError);
  }
}

export function updateDealer(updatedDealer, token) {
  let options = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'X-TOKEN': token
    },
    body: updatedDealer
  };

  return fetch(config.api + '/dealer/current', options)
    .then(checkStatus);
}
