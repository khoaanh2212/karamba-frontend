import 'whatwg-fetch';
import config from 'config';
import {ErrorsDomain} from "reducers/errorsReducer";
import {AuthDomain} from "reducers/authReducer";


function authSuccess(payload) {
    return {
        type: 'LOGIN_SUCCESS',
        domain: AuthDomain,
        run: state => {
            return {...state, isLogged: true, token: payload.token}
        }
    }
}

function authError(error) {
    return {
        type: 'LOGIN_ERROR',
        domain: ErrorsDomain,
        run: state => {
            return [{errorMessage: error.message}];
        }
    }
}

function checkStatus(response) {
    var resp = response.json();
    switch (response.status) {
        case 200:
            return resp.then(d => authSuccess(d));
        case 400:
            return resp.then(d => authError(d));
    }
}

export function login(username, password) {
    let options = {
        credentials:"include",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
    };
    return fetch(config.api + '/admin/login', options)
        .then(checkStatus);
}