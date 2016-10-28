import {clientLogin} from "services/Client.service";
import {authDomain, AUTH_SUCCESS, REMOVE_ERROR} from '../../auth/Login.reducer'
import {browserHistory} from 'react-router';

export function LoginPropsBindings(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export function LoginDispatchBindings(dispatch) {
  return {
    onSubmit: (username, password) => {
      clientLogin(username, password)
        .then(dispatch)
        .then((result) => {
          if (result.type === AUTH_SUCCESS) {
            browserHistory.push(process.env.PUBLIC_PATH + "client/showroom");
          }
        });
    },
    removeErrors: () => {
      dispatch({type: REMOVE_ERROR, domain: authDomain})
    }
  }
}
