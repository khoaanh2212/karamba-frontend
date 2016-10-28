import reducerFactory from 'shared/utils/ReducerFactory';

export const authDomain = 'auth';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const CLEAR_SESSION = 'CLEAR_SESSION';
export const HIDE_POPUP = 'HIDE_POPUP';

export const initialState = {
    token: null,
    errorMessage: null,
    role: null,
    first_use: false,
    hidePopup: false,
    profile: null
};

export let onSuccess = (prevState, action) => ({
    ...prevState,
    token: action.token,
    errorMessage: null,
    role: action.role,
    profile: action.profile,
    first_use: action.first_use,
    hidePopup: action.hidePopup
});

export let onError = (prevState, message) => ({
    ...prevState,
    errorMessage: message,
    token: null,
    role: null
});

export let onRemoveError = (prevState) => ({
    ...prevState,
    errorMessage: null
});

export let onClearSession = (prevState) => ({
    ...prevState,
    token: null,
    errorMessage: null,
    role: null,
    first_use: false,
    hidePopup: false
});

let cases = (state, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return onSuccess(state, action);
        case AUTH_ERROR:
            return onError(state, action.errorMessage);
        case  REMOVE_ERROR:
            return onRemoveError(state);
        case CLEAR_SESSION:
            return onClearSession(state);
      case HIDE_POPUP:
            return {...state, hidePopup: true};
    }
};

export default reducerFactory(initialState, authDomain, cases);
