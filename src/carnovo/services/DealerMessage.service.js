import 'whatwg-fetch';
import config from 'config';

import {
    DealerMessageDomain,
    FETCH_DEALER_MESSAGE_SUCCESS,
    FETCH_DEALER_MESSAGE_ERROR,
    SEND_DEALER_MESSAGE_SUCCESS,
    SEND_DEALER_MESSAGE_ERROR
} from 'dealer/private/message/DealerMessage.reducer';

function sendMessageSuccess(response) {
    return {
        type: SEND_DEALER_MESSAGE_SUCCESS,
        domain: DealerMessageDomain,
        id: response.data
    }
}

function sendMessageError(error) {
    return {
        type: SEND_DEALER_MESSAGE_ERROR,
        domain: DealerMessageDomain,
        error: error
    }
}

function fetchDealerMessageSuccess(response) {
    return {
        type: FETCH_DEALER_MESSAGE_SUCCESS,
        domain: DealerMessageDomain,
        messages: response.data
    }
}

function fetchDealerMessageError(error) {
    return {
        type: FETCH_DEALER_MESSAGE_ERROR,
        domain: DealerMessageDomain,
        error: error
    }
}

function checkStatus(response, onSuccess, onError) {
    switch (response.status) {
        case 200:
            var resp = response.json();
            return resp.then(onSuccess);
        case 404:
            return onError('Not found');
    }
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

function getFormOptions(token, method = 'GET') {
    return {
        credentials: "include",
        method: method,
        headers: {
            'X-TOKEN': token
        }
    }
}

export function fetchDealerMessage(token, id) {
    var url = config.api + '/dealer/messages/thread/' + id;

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchDealerMessageSuccess, fetchDealerMessageError));
}

export function sendDealerMessage(token, id, message) {
    let fd = new FormData();
    var url = config.api + '/dealer/messages/thread/' + id;
    if (window.messageUpload) {
        fd.append('attachment', window.messageUpload);
    }
    fd.append('data', JSON.stringify({message: message}));
    var options = getFormOptions(token, 'POST');
    options.body = fd;
    return fetch(url, options)
        .then(data => checkStatus(data, sendMessageSuccess, sendMessageError));
}
