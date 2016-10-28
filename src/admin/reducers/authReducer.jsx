export const CLEAR_SESSION = 'CLEAR_SESSION';
export const AuthDomain = 'auth';
export const initialState = {
    isLogged: false,
    token: null
};

export default function authReducer(state = initialState, action) {
    if(action.domain !== AuthDomain) return state;

    if (action.type === CLEAR_SESSION) {
        return {
          ...state,
          token: null,
          isLogged: false
        }
    }

    if (typeof action.run === "function") {
        return action.run(state);
    }
}
