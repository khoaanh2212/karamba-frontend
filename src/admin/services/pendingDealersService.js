import 'whatwg-fetch';
import config from 'config';
import {PendingDealersDomain} from "reducers/pendingDealersReducer";
import {ErrorsDomain} from "reducers/errorsReducer";

function checkStatus(response) {
    var resp = response.json();
    switch (response.status) {
        case 200:
            return resp.then(pendingDealersSuccess);
        case 400:
            return resp.then(pendingDealersError);
    }
}
function checkResponse(response, onSuccess, onError, args) {
    var resp = response.json();
    switch (response.status) {
        case 200:
            return resp.then(data => onSuccess(data, args));
        case 400:
            return resp.then(data => onError(data, args));
    }
}

function pendingDealersSuccess(payload) {
    return {
        type: 'FETCH_PENDING_DEALERS_SUCCESS',
        domain: PendingDealersDomain,
        pendingDealers: payload.data
    }
}

function acceptDealerSuccess(payload, id){
    return {
        type: 'ACCEPT_DEALER_SUCCESS',
        domain: PendingDealersDomain,
        dealerId: id
    }
}
function rejectDealerSuccess(payload, id){
    return {
        type: 'REJECT_DEALER_SUCCESS',
        domain: PendingDealersDomain,
        dealerId: id
    }
}
function acceptDealerError(payload, id){
    return {
        type: 'ACCEPT_DEALER_ERROR',
        domain:PendingDealersDomain,
        dealerId: id
    }
}
function rejectDealerError(payload, id){
    return {
        type: 'REJECT_DEALER_ERROR',
        domain:PendingDealersDomain,
        dealerId: id
    }
}

function pendingDealersError(error) {
    return {
        type: 'FETCH_PENDING_DEALERS_ERROR',
        domain: ErrorsDomain,
        errorMessage: error.message
    }
}

export function fetchPendingDealers(token) {
    console.log(token);
    let options = {
        credentials:"include",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-TOKEN': token
        }
    };
    
    return fetch(config.api + '/dealer/application', options)
        .then(checkStatus);
}

export function acceptPendingDealer(id, token) {
    let options = {
        credentials:"include",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-TOKEN': token
        }
    };

    return fetch(config.api + '/dealer/application/' + id, options)
        .then(data => checkResponse(data, acceptDealerSuccess, acceptDealerError, id));
}

export function rejectPendingDealer(id, token) {
    let options = {
        credentials:"include",
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'X-TOKEN': token
        }
    };
   
    return fetch(config.api + '/dealer/application/' + id, options)
        .then(data => checkResponse(data, rejectDealerSuccess, rejectDealerError, id));
}