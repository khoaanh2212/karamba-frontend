import 'whatwg-fetch';
import config from 'config';
import {checkStatus, getOptions, postOptions} from './Utils';
import {
  authDomain,
  AUTH_SUCCESS,
  AUTH_ERROR
} from '../auth/Login.reducer';

import {
  ClientDomain,
  CREATE_CAR_APPLIANCE_SUCCESS,
  CREATE_CAR_APPLIANCE_ERROR,
  FETCH_CLIENT_SUCCESS,
  FETCH_CLIENT_ERROR,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_ERROR,
  FETCH_APPLIANCES_SUCCESS,
  FETCH_APPLIANCES_ERROR,
  DELETE_APPLIANCE_SUCCESS,
  DELETE_APPLIANCE_ERROR,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR
} from "../client/Client.reducer";

function authSuccess(payload) {
  return {
    type: AUTH_SUCCESS,
    domain: authDomain,
    token: payload.token,
    role: "client",
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

function fetchClientSuccess(response) {
  return {
    type: FETCH_CLIENT_SUCCESS,
    domain: ClientDomain,
    profile: {
      ...response.data
    }
  };
}

function fetchClientError(error) {
  return {
    type: FETCH_CLIENT_ERROR,
    error: error
  };
}

function createClientSuccess(profile) {
  return {
    type: CREATE_CLIENT_SUCCESS
  }
}

function createClientError(error) {
  return {
    type: CREATE_CLIENT_ERROR,
    error
  };
}

function updateClientSuccess() {
  return {
    type: UPDATE_CLIENT_SUCCESS
  }
}

function updateClientError(error) {
  return {
    type: UPDATE_CLIENT_ERROR,
    error: error
  };
}

function createApplianceSuccess() {
  return {
    type: CREATE_CAR_APPLIANCE_SUCCESS
  }
}

function createApplianceError() {
  return {
    type: CREATE_CAR_APPLIANCE_ERROR
  }
}

function deleteApplianceSuccess(applianceId) {
  return {
    type: DELETE_APPLIANCE_SUCCESS,
    domain: ClientDomain,
    applianceId
  }
}

function deleteApplianceError() {
  return {
    type: DELETE_APPLIANCE_ERROR
  }
}

function fetchAppliancesSuccess(appliances) {
  return {
    type: FETCH_APPLIANCES_SUCCESS,
    domain: ClientDomain,
    appliances: appliances.data
  }
}

function fetchAppliancesError(error) {
  return {
    type: FETCH_APPLIANCES_ERROR,
    error
  }
}

export function clientCreate(name, email, zipCode, password, carAppliance) {
  return fetch(config.api + '/public/client', postOptions({ name: name, email: email, zipCode: zipCode, password: password, carAppliance: carAppliance }))
      .then(data => checkStatus(data, createClientSuccess, createClientError))
}

export function clientUpdate(updatedClient, token) {
  let options = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'X-TOKEN': token
    },
    body: updatedClient
  };

  return fetch(config.api + '/client/current', options)
    .then(data => checkStatus(data, updateClientSuccess, updateClientError))
}

export function clientLogin(username, password) {
  let options = {
    credentials: "include",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
  };
  return fetch(config.api + '/client/login', options)
    .then(data => checkStatus(data, authSuccess, authError))
}

export function createAppliance(token, carAppliance) {
  return fetch(config.api + '/client/appliances', postOptions(carAppliance, token))
      .then(data => checkStatus(data, createApplianceSuccess, createApplianceError))
}

export function fetchAppliances(token) {
  return fetch(config.api + '/client/appliances', getOptions(token))
      .then(data => checkStatus(data, fetchAppliancesSuccess, fetchAppliancesError))
}

export function deleteAppliance(token, applianceId) {
  let options = {
    credentials: "include",
    method: 'DELETE',
    headers: {
      'X-TOKEN': token
    }
  };
  let deleteSuccess = () => deleteApplianceSuccess(applianceId);
  return fetch(config.api + '/client/appliances/' + applianceId, options)
      .then(data => checkStatus(data, deleteSuccess, deleteApplianceError))
}

export function fetchCurrentClient(token) {
  let options = {
    credentials: "include",
    method: 'GET',
    headers: {
      'X-TOKEN': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return fetch(config.api + '/client/current', options)
    .then(data => checkStatus(data, fetchClientSuccess, fetchClientError));
}
