import 'whatwg-fetch';
import config from 'config';

import {
    ClientMessageDomain,
    FETCH_CLIENTMESSAGE_SUCCESS,
    FETCH_CLIENTMESSAGE_ERROR,
    SEND_CLIENTMESSAGE_SUCCESS,
    SEND_CLIENTMESSAGE_ERROR
} from 'client/feature/message/ClientMessage.reducer';

function sendMessageSuccess(response) {
    return {
        type: SEND_CLIENTMESSAGE_SUCCESS,
        domain: ClientMessageDomain,
        id: response.data
    }
}

function sendMessageError(error) {
    return {
        type: SEND_CLIENTMESSAGE_ERROR,
        domain: ClientMessageDomain,
        error: error
    }
}

function fetchClientMessageSuccess(response) {

    return {
        type: FETCH_CLIENTMESSAGE_SUCCESS,
        domain: ClientMessageDomain,
        messages: response.data
    }
}

function fetchClientMessageError(error) {
    return {
        type: FETCH_CLIENTMESSAGE_ERROR,
        domain: ClientMessageDomain,
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

export function fetchClientMessage(token, id) {
    var url = config.api + '/client/messages/thread/' + id;

    return fetch(url, getOptions(token))
        .then(data => checkStatus(data, fetchClientMessageSuccess, fetchClientMessageError));
}

export function sendClientMessage(token, id, message, upload) {
    let fd = new FormData();
    if (window.messageUpload) {
        fd.append('attachment', window.messageUpload);
    }
    fd.append('data', JSON.stringify({message: message}));
    var url = config.api + '/client/messages/thread/' + id;
    var options = getFormOptions(token, 'POST');
    options.body = fd;
    return fetch(url, options)
        .then(data => checkStatus(data, sendMessageSuccess, sendMessageError));
}
