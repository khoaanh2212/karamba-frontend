import 'whatwg-fetch';
import config from 'config';
import {checkStatus} from './Utils';
import {authDomain, AUTH_SUCCESS, AUTH_ERROR} from 'auth/Login.reducer'

function authSuccess(payload) {
  return {
    type: AUTH_SUCCESS,
    domain: authDomain,
    token: payload.token,
    role: "dealer",
    first_use: payload.first_use,
    hidePopup: false
  }
}

function authError(error) {
  return {
    type: AUTH_ERROR,
    domain: authDomain,
    errorMessage: error.message
  }
}

export function dealerLogin(username, password) {
  let options = {
    credentials: "include",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
  };
  return fetch(config.api + '/dealer/login', options)
    .then(data => checkStatus(data, authSuccess, authError));
}
