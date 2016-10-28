import authReducer from 'auth/Login.reducer';
import {AUTH_SUCCESS, AUTH_ERROR, REMOVE_ERROR} from 'auth/Login.reducer';

describe("[unit] login.reducer", () => {
  const authDomain = 'auth';
  const token = 'test-token';
  const initialState = {
    token: null,
    errorMessage: null,
    role: null,
    first_use: false,
    profile: null,
    hidePopup: false
  };

  const reducer = (action, initialState = initialState) => authReducer(initialState, action);

  it("should return initial state", () => {
    expect(reducer({}, initialState)).to.deep.equal(initialState)
  });

  it("should return logged state when action type is AUTH_SUCCESS", () => {
    let action = {
      type: AUTH_SUCCESS,
      domain: authDomain,
      token: token,
      errorMessage: null,
      role: 'dealer',
      first_use: false,
      profile: null,
      hidePopup: false
    };
    expect(reducer(action)).to.deep.equal({token: token, errorMessage: null, role: 'dealer', first_use: false, profile: null, hidePopup: false});
  });

  it("should return error state when action type is AUTH_ERROR", () => {
    let action = {
      type: AUTH_ERROR,
      domain: authDomain,
      errorMessage: 'test-error',
      first_use: false,
      hidePopup: false
    };
    expect(reducer(action)).to.deep.equal({errorMessage: 'test-error', token: null, role: null, first_use: false, profile: null, hidePopup: false})
  });

  it("should return empty token if user tries to auth when already logged in", () => {
    let state = {
      errorMessage: null,
      token: token
    };

    let action = {
      type: AUTH_ERROR,
      domain: authDomain,
      errorMessage: 'test-error',
      first_use: false
    };
    let nextState = reducer(action, state);
    expect(nextState).to.deep.equal({errorMessage: 'test-error', token: null, role: null})
  });

  it("should remove error when action type is REMOVE_ERROR", () => {
    let action = {
      type: REMOVE_ERROR,
      domain: authDomain,
      errorMessage: 'not-null-error'
    };
    expect(reducer(action, initialState)).to.deep.equal({errorMessage: null, token: null, role: null, first_use: false, profile: null, hidePopup: false})
  });
});
